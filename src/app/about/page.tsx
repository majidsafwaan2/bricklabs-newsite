import type { Metadata } from "next";
import { FounderBackground } from "@/components/FounderBackground";

export const metadata: Metadata = {
  title: "About BrickLabClips - Safwaan's Builder Story",
  description:
    "Meet Safwaan and learn how competitive robotics and STEM advocacy shaped the BrickLabClips school materials project."
};

export default function AboutPage() {
  return <FounderBackground standalone />;
}
