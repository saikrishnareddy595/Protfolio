#!/usr/bin/env python3
"""
Bake a depth + subject mask for the hero portrait.

The hero renders the avatar as real displaced geometry rather than a flat
plane, which needs two things the photograph does not carry: how far each
pixel is from the camera, and where the subject ends and the room begins.

Both are derived here, offline, and packed into a single PNG so the site
ships no ML runtime and pays no runtime cost:

    R = depth   (0 = far background, 255 = closest point of the face)
    G = mask    (0 = room, 255 = subject)
    B = unused

The cues were chosen by measuring the actual regions rather than guessing.
Focus turned out to be a trap: smooth rendered skin carries no high-frequency
detail, so a sharpness map reads the face as background. What does separate
cleanly:

1. Darkness. The sweater sits at luminance 0.08 and the hair at 0.17; nothing
   in the room goes below 0.48.
2. Warmth. Skin has a red-minus-blue spread of +0.34, against +0.19 for the
   wood panelling and ~0.0 for the shelves and monitor.

Those two cover the subject between them — dark hair, beard and knitwear from
the first, lit skin from the second. A morphological closing bridges the gaps
where they meet, and an elliptical prior discards warm wood in the corners.

Run:  python3 scripts/build-portrait-depth.py
"""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "avatar.jpg"
OUT = ROOT / "public" / "avatar-depth.png"
PREVIEW = ROOT / "scripts" / ".preview-depth.png"

# Where the face sits in the crop, in normalised (x, y) from the top-left.
FACE = (0.50, 0.34)


def blur(arr: np.ndarray, radius: float) -> np.ndarray:
    """Gaussian blur on a float array in 0..1."""
    img = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    return np.asarray(img.filter(ImageFilter.GaussianBlur(radius)), dtype=np.float32) / 255.0


def morph(arr: np.ndarray, size: int, op: str) -> np.ndarray:
    """Dilate or erode a 0..1 array with a square structuring element."""
    img = Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8))
    f = ImageFilter.MaxFilter(size) if op == "dilate" else ImageFilter.MinFilter(size)
    return np.asarray(img.filter(f), dtype=np.float32) / 255.0


def close(arr: np.ndarray, size: int) -> np.ndarray:
    """Dilate then erode: bridges the seams between the dark and warm cues."""
    return morph(morph(arr, size, "dilate"), size, "erode")


def open_(arr: np.ndarray, size: int) -> np.ndarray:
    """Erode then dilate: shaves small protrusions off the silhouette."""
    return morph(morph(arr, size, "erode"), size, "dilate")


def largest_blob(arr: np.ndarray, seed: tuple[int, int], level: float = 0.45) -> np.ndarray:
    """Keep only the region connected to `seed`, discarding detached specks."""
    # .copy() is load-bearing: Image.fromarray shares the numpy buffer, and
    # floodfill's writes then never reach what asarray reads back.
    binary = Image.fromarray(((arr > level) * 255).astype(np.uint8), mode="L").copy()
    x, y = seed
    if binary.getpixel((x, y)) == 0:
        # The seed missed the subject; leave the mask untouched rather than
        # silently returning an empty one.
        return arr
    ImageDraw.floodfill(binary, (x, y), 128, thresh=64)
    kept = (np.asarray(binary) == 128).astype(np.float32)
    return arr * kept


def fill_holes(arr: np.ndarray, level: float = 0.5) -> np.ndarray:
    """
    Close pockets fully enclosed by the subject.

    Displaced into 3D, a hole is not a hole — it is a pit, and its steep walls
    sample whatever the photograph had underneath, which shows up as a bright
    slab hanging off the head.
    """
    binary = ((arr > level) * 255).astype(np.uint8)
    inverted = Image.fromarray((255 - binary).astype(np.uint8), mode="L").copy()
    h, w = binary.shape
    for seed in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        if inverted.getpixel(seed) == 255:
            ImageDraw.floodfill(inverted, seed, 128, thresh=64)
    # Still 255 => enclosed by the subject rather than open to the border.
    holes = (np.asarray(inverted) == 255).astype(np.float32)
    return np.clip(arr + holes, 0.0, 1.0)


def normalise(arr: np.ndarray, lo_pct: float = 2.0, hi_pct: float = 98.0) -> np.ndarray:
    lo, hi = np.percentile(arr, [lo_pct, hi_pct])
    if hi - lo < 1e-6:
        return np.zeros_like(arr)
    return np.clip((arr - lo) / (hi - lo), 0.0, 1.0)


def main() -> int:
    if not SRC.exists():
        print(f"missing {SRC}", file=sys.stderr)
        return 1

    src = Image.open(SRC).convert("RGB")
    # Work at a reduced size: the displacement is smooth, and the mesh that
    # samples it is far coarser than the photo.
    work = src.resize((512, int(512 * src.height / src.width)), Image.LANCZOS)
    w, h = work.size
    rgb = np.asarray(work, dtype=np.float32) / 255.0
    lum = rgb @ np.array([0.299, 0.587, 0.114], dtype=np.float32)

    # ---- Subject cues -----------------------------------------------------
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    warmth = r - b

    # Hair, beard and knitwear: darker than anything in the room, which
    # bottoms out at 0.48. The threshold deliberately overlaps the skin cue
    # below — brows, lashes and lips sit between the two, and a gap there
    # punches holes through the middle of the face.
    dark = np.clip((0.38 - lum) / 0.14, 0.0, 1.0)
    # Lit skin: far warmer than the wood panelling behind it.
    skin = np.clip((warmth - 0.22) / 0.10, 0.0, 1.0) * np.clip((lum - 0.28) / 0.12, 0.0, 1.0)

    cue = np.clip(np.maximum(dark, skin), 0.0, 1.0)

    # ---- Elliptical prior -------------------------------------------------
    ys = np.linspace(0.0, 1.0, h, dtype=np.float32)[:, None]
    xs = np.linspace(0.0, 1.0, w, dtype=np.float32)[None, :]
    fx, fy = FACE
    dx = (xs - fx) / 0.44
    dy = (ys - (fy + 0.20)) / 0.70
    prior = np.clip(1.5 - np.sqrt(dx * dx + dy * dy), 0.0, 1.0)
    prior = np.clip(blur(prior, 6.0) * 1.6, 0.0, 1.0)

    # ---- Subject mask -----------------------------------------------------
    filled = close(cue * prior, 15)

    # Dark background furniture — the monitor bezel, the shelf shadows — also
    # trips the darkness cue. None of it is really attached to the person, but
    # the closing above bridges the few pixels between the bezel and a
    # shoulder. Eroding first snaps those hairline bridges, so the flood fill
    # keeps the body alone; dilating the result back restores the silhouette.
    seed = (int(fx * w), int((fy + 0.06) * h))
    core = largest_blob(morph(filled, 9, "erode"), seed)
    keep = morph((core > 0.5).astype(np.float32), 11, "dilate")
    # Shave the stubs left where furniture grazed the shoulder line; displaced
    # into 3D they stick out of the bust as obvious slabs.
    mask = open_(filled * keep, 13)
    mask = fill_holes(mask)
    mask = blur(mask, 3.0)
    # A soft shoulder rather than a hard cut: a feathered silhouette reads as
    # intentional in a dark scene, a jagged one reads as a bad cut-out.
    mask = np.clip((mask - 0.24) / 0.34, 0.0, 1.0)
    mask = mask * mask * (3.0 - 2.0 * mask)
    mask = blur(mask, 3.0)

    # ---- Depth ------------------------------------------------------------
    # A dome centred on the face, so the nose sits closest and the head falls
    # away toward the ears, modulated by luminance as a crude shape-from-
    # shading term (lit surfaces face the camera).
    ddx = (xs - fx) / 0.40
    ddy = (ys - fy) / 0.46
    dome = np.clip(1.0 - (ddx * ddx + ddy * ddy), 0.0, 1.0) ** 0.65

    shading = blur(normalise(lum, 12, 92), 6.0)
    body = np.clip(1.0 - (ys - 0.52) * 0.55, 0.0, 1.0)

    depth = dome * 0.62 + shading * 0.24 + body * 0.24
    depth = normalise(blur(depth, 4.0), 2, 99)
    depth = mask * (0.34 + 0.66 * depth)
    depth = blur(depth, 2.5)

    # ---- Pack -------------------------------------------------------------
    packed = np.zeros((h, w, 3), dtype=np.uint8)
    packed[..., 0] = (np.clip(depth, 0, 1) * 255).astype(np.uint8)
    packed[..., 1] = (np.clip(mask, 0, 1) * 255).astype(np.uint8)
    Image.fromarray(packed).save(OUT, optimize=True)

    # A side-by-side so the result can actually be looked at.
    strip = Image.new("RGB", (w * 3 + 16, h), (10, 10, 12))
    strip.paste(work, (0, 0))
    strip.paste(Image.fromarray((mask * 255).astype(np.uint8)).convert("RGB"), (w + 8, 0))
    strip.paste(Image.fromarray((depth * 255).astype(np.uint8)).convert("RGB"), (w * 2 + 16, 0))
    strip.save(PREVIEW)

    print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024}KB, {w}x{h})")
    print(f"preview {PREVIEW.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
