# Guide Architecture

## Data flow

`GuideBlueprint` entries are parsed by Zod, expanded into complete `GuideArticle` objects, and collected in the server-side registry. The library route receives only `GuideSummary` records; full article bodies stay out of the client filter bundle.

1. Category files define project-specific engineering content.
2. `blueprintFactory.ts` adds category policies, orientation, checkpoints, access options, and shared article fields.
3. `curatedFactory.ts` converts compact material, step, troubleshooting, extension, and glossary strings into typed objects.
4. `guideFactory.ts` attaches dated metadata, an optional authorized cover photo, one local concept-map path, and the shared Builder Moment photo.
5. `registry.ts` exposes ordered articles, summaries, slug lookup, related lookup, and category counts.
6. `/library/[slug]` statically generates one semantic article route per registry entry.

## Rendering boundaries

The article route and renderer are server components. Client JavaScript is limited to the searchable library, material checkboxes, print button, mobile navigation, and consent-to-load TikTok component. Article headings, steps, visuals, testing, troubleshooting, source notes, and related links render in static HTML.

## Static generation and SEO

`generateStaticParams` returns all 125 slugs. `generateMetadata` creates a unique canonical title, description, Open Graph record, and Twitter card. Guides with an authorized cover include that image in social metadata; text-only guides omit it. Each article emits matching `HowTo` and `BreadcrumbList` JSON-LD. `src/app/sitemap.ts` uses each guide's real `updatedAt` date.

## Validation contract

`scripts/validate-guides.ts` is the publishing gate. It checks exact counts, numbering, categories, unique slugs and titles, content depth, required sections, wiring and code, related routes, duplicate editorial text, local assets, manifest coverage, and TikTok ownership. It also reports catalog breadth and difficulty counts.

## Performance

All article pages are SSG. The directory sends summaries rather than article bodies to its client component. Authorized raster photos are optimized local assets with stable dimensions, and every guide keeps a local SVG motion map. TikTok loads only after consent and only on a page with a verified mapping.
