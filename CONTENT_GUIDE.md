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

When you send the BricklabClips TikTok video list, paste each video URL into the matching guide's `videoUrl` field.

Do not copy official LEGO instructions, official imagery, official packaging, or proprietary assets. Use original builds, original photos/video, or neutral diagrams.

## Founder background deck

The founder background modal uses slide images in `public/docs/founder-deck/` and keeps `public/docs/founder-stem-advocacy.pdf` as the full PDF link. Replace both if you update the slideshow later.
