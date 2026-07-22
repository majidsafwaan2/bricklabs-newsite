import type { Metadata } from "next";
import { GuideLibrary } from "@/components/GuideLibrary";
import { Hero } from "@/components/Hero";
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
    <>
      <Hero
        eyebrow="Free Build Library"
        title="Pick a build. Make it move."
        description={`${guideSummaries.length} complete projects with materials, diagrams, testing, troubleshooting, and the engineering behind every build.`}
      />
      <section className="section">
        <div className="container">
          <SectionHeader title="Find your next project." eyebrow={`${guideSummaries.length} guides live`}>
            Search by material or concept, then filter by category and difficulty.
          </SectionHeader>
          <GuideLibrary
            guides={guideSummaries}
            categories={GUIDE_CATEGORIES}
            difficulties={GUIDE_DIFFICULTIES}
          />
        </div>
      </section>
    </>
  );
}
