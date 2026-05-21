import Image from "next/image";
import { siteContent } from "@/data/siteContent";

export function ImpactLoopGraphic({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "impact-loop compact" : "impact-loop"}>
      <div className="loop-canvas">
        <Image
          src="/images/build-loop-bubbles.png"
          alt="BricklabClips build loop showing watch builds, fund materials, ship parts, and students build."
          width={1672}
          height={941}
          sizes={compact ? "(max-width: 900px) 92vw, 900px" : "(max-width: 900px) 92vw, 1080px"}
        />
      </div>
      <ol className="sr-only" aria-label="BricklabClips four-step build loop">
        {siteContent.loopSteps.map((step, index) => (
          <li key={step.title}>
            {index + 1}. {step.title}: {step.description}
          </li>
        ))}
      </ol>
    </div>
  );
}
