import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Program = {
  title: string;
  description: string;
  href: string;
};

export function ProgramCards({ programs }: { programs: readonly Program[] }) {
  return (
    <div className="card-grid three">
      {programs.map((program) => (
        <Link href={program.href} className="program-card card" key={program.title}>
          <h3>{program.title}</h3>
          <p>{program.description}</p>
          <span>
            Learn more <ArrowRight size={17} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}

