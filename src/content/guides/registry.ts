import { brickCompatibleGuides } from "./brick-compatible/guides";
import { cardboardGuides } from "./cardboard/guides";
import { classroomGuides } from "./classroom/guides";
import { codingGuides } from "./coding/guides";
import { householdGuides } from "./household/guides";
import { pilotGuides } from "./pilot";
import { roboticsGuides } from "./robotics/guides";
import { toGuideSummary } from "./types";

export const allGuides = [
  ...pilotGuides,
  ...brickCompatibleGuides,
  ...cardboardGuides,
  ...householdGuides,
  ...classroomGuides,
  ...roboticsGuides,
  ...codingGuides
].sort((a, b) => a.number - b.number);

export const guideSummaries = allGuides.map(toGuideSummary);

const guidesBySlug = new Map(allGuides.map((guide) => [guide.slug, guide]));

export function getGuideBySlug(slug: string) {
  return guidesBySlug.get(slug);
}

export function getRelatedGuides(slugs: readonly string[]) {
  return slugs.flatMap((slug) => {
    const guide = guidesBySlug.get(slug);
    return guide ? [toGuideSummary(guide)] : [];
  });
}

export const categoryCounts = guideSummaries.reduce<Record<string, number>>((counts, guide) => {
  counts[guide.category] = (counts[guide.category] ?? 0) + 1;
  return counts;
}, {});
