# Guide Asset Guide

Every guide owns six original SVGs under `public/guides/[slug]/`:

- `hero.svg`: title, category, main parts, input, and output
- `step-01.svg`: first instructional reference panel
- `step-02.svg`: second instructional reference panel
- `step-03.svg`: third instructional reference panel
- `concept.svg`: motion and energy map with major losses
- `builder-moment.svg`: original project-specific humor card

Run `npm run generate:guide-art` after changing a slug, title, category, material name, step title, motion map, or builder moment. The command also refreshes `scripts/guide-visual-manifest.json`.

## Visual review

After generation, inspect the hero, three step panels, concept map, and humor card for long labels, clipped text, ambiguous arrows, and contrast. Instructions and safety must remain in article HTML, because diagrams supplement rather than replace the written build.

Use the existing yellow, black, white, blue, red, green, teal, and violet accents. Keep strong outlines, readable labels, and consistent 1200 × 800 view boxes. Do not add official LEGO assets, kit diagrams, product packaging, third-party photos, or copyrighted meme templates.

Raster photos may be added only when BrickLabClips owns or has permission to use them. Include fixed dimensions, a descriptive alt, and an optimized source. Do not replace instructional diagrams with decorative stock images.

## Animation

If a future diagram uses meaningful animation, preserve a complete static state, honor `prefers-reduced-motion`, and provide a pause control. No primary instruction may depend on motion.
