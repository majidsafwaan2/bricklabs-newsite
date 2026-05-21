# BricklabClips STEM Access Website

This is the production-ready BricklabClips website built with Next.js App Router.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` for local configuration.

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_HACKATHON_DEVPOST_URL=
```

Forms log submissions in development when Resend is not configured. In production, form submissions return a configuration error unless `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are set.

## Content editing

Most site content is in `src/data/siteContent.ts`.

Use `CONTENT_GUIDE.md` for guide-card updates, impact metrics, Devpost URL setup, and founder background toggles.

## Logo

The logo path is configured at `siteContent.brand.logoPath`.

The current asset is `public/images/bricklabs-logo.jpg`. Replace that file or update `logoPath` if you store a different final mark elsewhere under `public`.

## Loop diagram

The simple build-loop diagram is built with text bubbles in `src/components/ImpactLoopGraphic.tsx` so the text stays crisp and editable.
