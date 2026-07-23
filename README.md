# BrickLabClips Website

Production Next.js App Router site for BrickLabClips, including 125 statically generated STEM build guides, school-material requests, sponsor inquiries, and the BrickLab Build Challenge.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```bash
npm run generate:guide-art
npm run validate:guides
npm run lint
npm run typecheck
npm test
npm run build
```

The guide validator checks all 125 published articles, 125 local motion maps, optional authorized cover photos, and the shared Builder Moment image. Playwright covers directory search and filters, photo and text-only covers, representative article types, structured data, sitemap entries, related links, 404 behavior, mobile overflow, and JavaScript-disabled reading.

## Guide architecture

- Article data: `src/content/guides/`
- Registry and summaries: `src/content/guides/registry.ts`
- Article renderer: `src/components/guides/GuideArticle.tsx`
- Static route: `src/app/library/[slug]/page.tsx`
- Local visuals: `public/guides/[slug]/`
- Catalog: `GUIDE_CATALOG.md`
- Editing: `CONTENT_GUIDE.md`
- Architecture: `GUIDE_ARCHITECTURE.md`
- Asset rules: `GUIDE_ASSET_GUIDE.md`
- TikTok inventory notes: `TIKTOK_INVENTORY_NOTES.md`

## Environment variables

Copy `.env.example` to `.env.local` and configure:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_HACKATHON_DEVPOST_URL=
```

Forms log submissions in development when Resend is not configured. In production, forms return a configuration error until the Resend key and contact addresses are set.

## Brand assets

The primary logo and favicon source is `public/images/bricklabs-logo.jpg`, configured at `siteContent.brand.logoPath`. The build-loop image is `public/images/build-loop-bubbles.png`. The founder modal uses `public/docs/founder-deck/page-*.png` and `public/docs/founder-stem-advocacy.pdf`.

BrickLabClips remains independent and does not use official LEGO logos, instructions, packaging, fonts, or product imagery.
