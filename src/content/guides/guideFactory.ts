import { builderMomentPhoto, coverPhotoForGuide } from "./media";
import type { GuideArticle, GuideVisual } from "./types";

export type GuideDraft = Omit<
  GuideArticle,
  "coverPhoto" | "conceptVisual" | "builderMomentPhoto" | "publishedAt" | "updatedAt"
> & {
  publishedAt?: string;
  updatedAt?: string;
};

const PUBLICATION_DATE = "2026-07-22";

function visual(slug: string, file: string, alt: string, caption?: string): GuideVisual {
  return {
    src: `/guides/${slug}/${file}`,
    alt,
    caption
  };
}

export function defineGuide(draft: GuideDraft): GuideArticle {
  return {
    ...draft,
    publishedAt: draft.publishedAt ?? PUBLICATION_DATE,
    updatedAt: draft.updatedAt ?? PUBLICATION_DATE,
    coverPhoto: coverPhotoForGuide(draft.slug),
    conceptVisual: visual(
      draft.slug,
      "concept.svg",
      `${draft.title} concept diagram with labeled input, output, and motion arrows.`,
      `The ${draft.motion} motion path, with the main efficiency losses called out.`
    ),
    builderMomentPhoto
  };
}
