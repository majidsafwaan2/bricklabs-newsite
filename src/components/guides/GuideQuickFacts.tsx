import { Clock3, DollarSign, Gauge, GraduationCap, UsersRound } from "lucide-react";
import type { GuideArticle } from "@/content/guides/types";

const factIcons = [Gauge, Clock3, DollarSign, UsersRound, GraduationCap];

export function GuideQuickFacts({ guide }: { guide: GuideArticle }) {
  const facts = [
    ["Difficulty", guide.difficulty],
    ["Build time", guide.estimatedTime],
    ["Estimated cost", guide.estimatedCost],
    ["Age range", guide.ageRange],
    ["Workspace", guide.workspace]
  ] as const;

  return (
    <dl className="guide-quick-facts" aria-label="Guide quick facts">
      {facts.map(([label, value], index) => {
        const Icon = factIcons[index];
        return (
          <div key={label}>
            <Icon size={22} aria-hidden="true" />
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        );
      })}
    </dl>
  );
}
