# BricklabClips Content Guide

Most public site copy and editable data lives in `src/data/siteContent.ts`.

## Update audience stats

Edit `siteContent.audienceStats`.

Keep the public labels short and visitor-friendly. Use internal notes or analytics screenshots for detailed sourcing instead of adding caveats to the homepage UI.

## Update impact metrics

Edit `siteContent.impactStats`.

Use only real funded/request data. If a metric is still at launch stage, keep the value honest and use the dashboard note already on the Home page.

## Update the Devpost URL

Set this environment variable:

```bash
NEXT_PUBLIC_HACKATHON_DEVPOST_URL=https://your-devpost-url
```

The Hackathon page shows "Devpost page coming soon." when the value is empty.

## Add a build guide

Add a new item to `siteContent.library.guides`.

Each guide supports:

- `title`
- `category`
- `difficulty`
- `estimatedTime`
- `estimatedCost`
- `materials`
- `alternatives`
- `concepts`
- `description`
- `videoUrl`
- `status`

Use `status: "draft"` for starter drafts, `status: "coming-soon"` for placeholders, and `status: "published"` only after the guide has been written, checked, and linked to your own demo or video.

Do not copy official LEGO instructions, official imagery, official packaging, or proprietary assets. Use original builds, original photos/video, or neutral diagrams.

## Founder award line

If proof is available and you want the award shown, set:

```ts
founderAwardEnabled: true
```

in `siteContent.brand`.
