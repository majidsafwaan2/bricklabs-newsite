import { siteContent } from "@/data/siteContent";

export function ImpactLoopGraphic({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "impact-loop compact" : "impact-loop"}>
      <div className="loop-diagram" aria-label="BricklabClips build loop">
        <svg className="loop-arrows" viewBox="0 0 680 520" aria-hidden="true" focusable="false">
          <defs>
            <marker
              id="bubbleArrow"
              viewBox="0 0 16 16"
              refX="14"
              refY="8"
              markerWidth="16"
              markerHeight="16"
              markerUnits="userSpaceOnUse"
              orient="auto"
            >
              <path d="M2 2L14 8L2 14Z" fill="#111111" />
            </marker>
          </defs>
          <path d="M338 116C432 118 502 174 522 252" />
          <path d="M512 296C486 386 408 432 323 422" />
          <path d="M274 409C188 378 146 308 158 224" />
          <path d="M177 181C220 114 284 91 351 111" />
        </svg>

        <div className="loop-center">
          <span>BricklabClips</span>
          <strong>build loop</strong>
        </div>

        {siteContent.loopSteps.map((step, index) => (
          <article className={`loop-bubble loop-bubble-${index + 1}`} key={step.title}>
            <span>{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
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
