# Static assets

## `avatar.*` — the hero subject

The hero renders your avatar as real 3D geometry, not a picture on a card: a
dense plane displaced along Z by a baked depth map, so the face physically
stands out from the chest, the room behind is cut away, and turning the bust
with the pointer changes its silhouette.

Drop the image in this folder as one of:

    avatar.png   avatar.jpg   avatar.jpeg   avatar.webp   avatar.avif

The first one that loads wins. A portrait crop (roughly 4:5) with the face in
the upper half works best.

Then regenerate the depth companion:

    python3 scripts/build-portrait-depth.py

That writes `avatar-depth.png` (R = depth, G = subject mask) next to it, and
`scripts/.preview-depth.png` so you can check the cut-out before shipping. The
subject is separated by darkness and skin warmth, with thresholds tuned to this
photograph — a very different portrait may need the constants at the top of the
script adjusted. Without the depth file the hero degrades to a flat billboard;
without any `avatar.*` file it falls back to an abstract neural core, never a
stand-in likeness.

## `Sai-Krishna-Reddy-Resume.pdf`

Linked from the nav "Résumé" button.
