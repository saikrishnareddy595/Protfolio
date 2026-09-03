# Static assets

## `avatar.*` — the hero subject

The hero scene renders your avatar artwork inside the WebGL canvas as a
floating, pointer-tracked glass slab, graded into the site palette.

Drop the image in this folder as one of:

    avatar.png   avatar.jpg   avatar.jpeg   avatar.webp   avatar.avif

The first one that loads wins — no code change and no rebuild config needed.
A portrait crop (roughly 4:5) with the face in the upper half works best; the
parallax and grading are keyed to a focal point at 50% × 68% of the image.

If none of those files exist, the scene falls back to an abstract neural core
— never a stand-in likeness.

## `Sai-Krishna-Reddy-Resume.pdf`

Linked from the nav "Résumé" button.
