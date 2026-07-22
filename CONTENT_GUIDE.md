# BrickLabClips Content Guide

Public site copy lives in `src/data/siteContent.ts`. Complete build-guide articles live in `src/content/guides/` and are registered in `src/content/guides/registry.ts`.

## Update site facts

- Audience reach: edit `siteContent.audienceStats`.
- School impact: edit `siteContent.impactStats` using confirmed values only.
- Devpost: set `NEXT_PUBLIC_HACKATHON_DEVPOST_URL`.
- Logo: replace `public/images/bricklabs-logo.jpg` or update `siteContent.brand.logoPath`.
- Founder deck: replace both `public/docs/founder-deck/page-*.png` and `public/docs/founder-stem-advocacy.pdf`.

## Add or edit a guide

Guides are grouped by category:

- `src/content/guides/brick-compatible/guides.ts`
- `src/content/guides/cardboard/guides.ts`
- `src/content/guides/household/guides.ts`
- `src/content/guides/classroom/guides.ts`
- `src/content/guides/robotics/guides.ts`
- `src/content/guides/coding/guides.ts`

Each entry is a typed `GuideBlueprint`. Use a lowercase, hyphenated, permanent slug. Write a unique description, hook, measurable finished result, mechanism inputs and outputs, materials with quantities and purposes, project-specific safety, eight or more meaningful steps, a worked math example, controlled test, four troubleshooting rows, tuning tradeoffs, three extensions, and three to six related slugs.

The factory adds shared article structure, but the engineering details in every blueprint must remain project-specific. Do not produce a new article by replacing only the project noun in another guide.

## Steps and concepts

Each step uses this format:

```ts
"Action title|Specific placement, dimension, or connection instruction.|Checkpoint detail or likely mistake."
```

The guide renderer places checkpoints after major subassemblies and associates the three generated instructional panels with the ordered steps. Essential instructions must remain in HTML; an image cannot be the only source of a measurement or safety rule.

## Electronics and code

Electronics guides need a `wiring` table that states source, destination, and purpose. Include battery voltage, polarity, current limiting, motor driver or transistor requirements, flyback protection, and common ground where applicable. Never use mains electricity.

Coding guides need a complete `code` object with language, filename, source, and explanation. Source shown inline must run without missing libraries or private assets. If an article later links to a downloadable file, commit that file under `public/downloads/` and extend the validator to check it.

## Verification basis

Use one internal value:

- `bricklabs-video-demonstrated`
- `standard-mechanism`
- `dimensionally-specified-classroom-build`
- `code-executed`
- `circuit-checked`
- `editorial-geometry-review`

This records the editorial basis; it is not permission to claim physical testing. Only use `bricklabs-video-demonstrated` after verifying the exact public BrickLabClips post.

## TikTok mapping

Record verified posts in `src/content/tiktok/bricklabclips-video-manifest.json`. Use only URLs matching `https://www.tiktok.com/@bricklabclips/video/[post-id]`, and record the visible caption, date, mechanism, candidate slug, and confidence. Never infer a post URL or hidden assembly detail.

Add a guide `video` field only after the manifest entry is verified. Guides without a match intentionally show no video placeholder.

## Visual assets

Generate the six original local SVGs for every registered guide:

```bash
npm run generate:guide-art
```

The command writes `hero.svg`, three step panels, `concept.svg`, and `builder-moment.svg` under `public/guides/[slug]/`. Review generated labels and geometry before publishing. See `GUIDE_ASSET_GUIDE.md`.

## Required checks

```bash
npm run generate:guide-art
npm run validate:guides
npm run lint
npm run typecheck
npm test
npm run build
```

The validator enforces the exact published count, metadata, depth, unique content, safety, steps, math, testing, troubleshooting, related links, TikTok ownership, and local assets. Never bypass it to publish an incomplete guide.

## Copyright and brand rules

Use original BrickLabClips text and diagrams. Do not copy official LEGO instructions, kit manuals, product imagery, packaging, proprietary MOCs, other creators' posts, copyrighted meme templates, or third-party article prose. Use “brick-compatible” for generic mechanisms and retain the site's independent LEGO trademark disclaimer.
