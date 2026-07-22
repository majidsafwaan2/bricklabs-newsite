import Image from "next/image";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { GuideStep as GuideStepType } from "@/content/guides/types";

export function BuildStep({ step, number }: { step: GuideStepType; number: number }) {
  return (
    <li className="build-step" id={step.id}>
      <div className="build-step-copy">
        <p className="step-number">Step {number}</p>
        <h3>{step.title}</h3>
        {step.instructions.map((instruction) => <p key={instruction}>{instruction}</p>)}
        {step.checkpoint ? (
          <div className="step-note checkpoint">
            <CheckCircle2 size={20} aria-hidden="true" />
            <p><strong>Builder checkpoint:</strong> {step.checkpoint}</p>
          </div>
        ) : null}
        {step.commonMistake ? (
          <div className="step-note mistake">
            <AlertTriangle size={20} aria-hidden="true" />
            <p><strong>Watch for:</strong> {step.commonMistake}</p>
          </div>
        ) : null}
      </div>
      <figure>
        <Image src={step.visual.src} alt={step.visual.alt} width={960} height={640} />
        {step.visual.caption ? <figcaption>{step.visual.caption}</figcaption> : null}
      </figure>
    </li>
  );
}
