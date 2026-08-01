import type { Metadata } from "next";
import { GuideLibrary } from "@/components/GuideLibrary";
import { SectionHeader } from "@/components/SectionHeader";
import { guideSummaries } from "@/content/guides/registry";
import { GUIDE_CATEGORIES, GUIDE_DIFFICULTIES } from "@/content/guides/types";

export const metadata: Metadata = {
  title: "Free Build Guides - BricklabClips",
  description:
    "Search 125 complete step-by-step build guides for cardboard, household engineering, brick-compatible mechanisms, robotics, coding, and classrooms."
};

export default function LibraryPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader title="Find your next project." eyebrow={`${guideSummaries.length} guides live`}>
          Search by material or concept, then filter by category and difficulty.
        </SectionHeader>
        <GuideLibrary guides={guideSummaries} categories={GUIDE_CATEGORIES} difficulties={GUIDE_DIFFICULTIES} />
      </div>
    </section>
  );
}
