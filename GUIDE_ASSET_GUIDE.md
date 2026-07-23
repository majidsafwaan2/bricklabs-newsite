# Guide Asset Guide

Each guide keeps one generated instructional asset under `public/guides/[slug]/`:

- `concept.svg`: the motion-and-energy map showing input, output, and major losses

Run `npm run generate:guide-art` after changing a slug, title, motion map, or motion labels. The command regenerates the concept maps and refreshes `scripts/guide-visual-manifest.json`.

## Cover photos

Cover photos are optional. When BrickLabClips owns a useful project photo or has permission to use one, add an optimized image under `public/guides/[slug]/` and register it in `src/content/guides/media.ts`. Guides without an authorized photo use the intentional text-only cover.

Every registered photo must include fixed dimensions, descriptive alt text, an honest caption, a build relationship, and source metadata. Use one of these relationships:

- `exact-build`
- `bricklabs-demonstration`
- `same-mechanism-example`
- `inspiration-example`

Do not describe an example or rendered image as the exact build. Do not use official LEGO assets, instructions, kit diagrams, product packaging, random search-result images, or another creator's media without permission.

## Build steps

Build steps are text-first and do not have generated reference panels. Keep dimensions, orientation, checkpoints, mistakes, concept pauses, and safety notes in semantic HTML. Do not add decorative step images or leave empty media columns beside the instructions.

Useful technical diagrams such as wiring layouts, code flows, mathematical graphs, and motion-and-energy maps may remain when they communicate information the prose cannot show as clearly.

## Builder Moment

Every guide uses the shared owner-supplied image at `public/images/chuck-norris-builder-meme.webp`. Its metadata lives in `src/content/guides/media.ts`. Replace it only with media BrickLabClips owns or has permission to publish, and update its alt text, caption, dimensions, and source metadata at the same time.

## Visual review

Inspect every supplied cover in the directory card and article hero at desktop and mobile widths. Confirm the crop shows the mechanism, captions remain readable, text-only covers look intentional, the concept map does not overflow, and the Builder Moment image keeps its portrait proportions.

If a future diagram uses meaningful animation, preserve a complete static state, honor `prefers-reduced-motion`, and provide a pause control. No primary instruction may depend on motion.
