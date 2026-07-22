import type { GuideArticle, GuideStep, GuideVisual } from "./types";

export type GuideDraft = Omit<
  GuideArticle,
  "heroImage" | "heroAlt" | "conceptVisual" | "humorVisual" | "publishedAt" | "updatedAt" | "steps"
> & {
  publishedAt?: string;
  updatedAt?: string;
  steps: Array<Omit<GuideStep, "visual">>;
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
  const heroAlt = `Instructional overview of the ${draft.title.toLowerCase()}, showing its input, output, and main parts.`;

  return {
    ...draft,
    publishedAt: draft.publishedAt ?? PUBLICATION_DATE,
    updatedAt: draft.updatedAt ?? PUBLICATION_DATE,
    heroImage: `/guides/${draft.slug}/hero.svg`,
    heroAlt,
    conceptVisual: visual(
      draft.slug,
      "concept.svg",
      `${draft.title} concept diagram with labeled input, output, and motion arrows.`,
      `The ${draft.motion} motion path, with the main efficiency losses called out.`
    ),
    humorVisual: visual(
      draft.slug,
      "builder-moment.svg",
      `Original BrickLabClips builder reaction card for the ${draft.title}.`,
      draft.builderMoment
    ),
    steps: draft.steps.map((step, index) => ({
      ...step,
      visual: visual(
        draft.slug,
        `step-${String((index % 3) + 1).padStart(2, "0")}.svg`,
        `${draft.title}, step ${index + 1}: ${step.title.toLowerCase()}.`,
        `Reference view for ${step.title.toLowerCase()}.`
      )
    }))
  };
}
