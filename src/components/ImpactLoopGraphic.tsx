import Image from "next/image";
import { siteContent } from "@/data/siteContent";

export function ImpactLoopGraphic({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "impact-loop compact" : "impact-loop"}>
      <div className="loop-canvas">
        <Image
          src="/images/build-loop-arrows.png"
          alt="Four circular arrows showing the BricklabClips build loop."
          width={1254}
          height={1254}
          sizes={compact ? "(max-width: 900px) 86vw, 430px" : "(max-width: 900px) 86vw, 540px"}
        />
      </div>
      <ol className="loop-steps" aria-label="BricklabClips four-step build loop">
        {siteContent.loopSteps.map((step, index) => (
          <li key={step.title}>
            <span>{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
