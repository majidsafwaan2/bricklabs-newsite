import type { Metadata } from "next";
import { GuideLibrary } from "@/components/GuideLibrary";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Free Build Guides - BricklabClips",
  description:
    "Search free starter build guide templates for cardboard, household materials, brick-compatible mechanisms, robotics, coding, and classroom challenges."
};

export default function LibraryPage() {
  return (
    <>
      <Hero
        eyebrow="Free Build Library"
        title="Ideas you can build."
        description="Start with cardboard, code, household materials, brick-compatible parts, or robotics kits."
      />
      <section className="section">
        <div className="container">
          <SectionHeader title="Browse starter guides." eyebrow="Library">
            Draft cards are clearly marked until full BricklabClips demos are linked.
          </SectionHeader>
          <GuideLibrary
            guides={siteContent.library.guides}
            categories={siteContent.library.categories}
            difficulties={siteContent.library.difficulties}
          />
        </div>
      </section>
    </>
  );
}
