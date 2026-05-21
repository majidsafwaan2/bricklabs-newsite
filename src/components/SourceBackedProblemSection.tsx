import { siteContent } from "@/data/siteContent";

export function SourceBackedProblemSection() {
  return (
    <section className="section section-white">
      <div className="container two-column">
        <div>
          <p className="eyebrow">The problem</p>
          <h2>Watching is easier than building.</h2>
          <p className="lead">
            Students can watch engineering projects from anywhere. The harder part is getting parts, tools, and buildable
            challenges into classrooms, clubs, and teams.
          </p>
          <p>
            The goal is simple: connect online build energy to free project guides and school material requests, so more
            students can move from watching projects to making their own.
          </p>
        </div>
        <div className="source-list" aria-label="Source-backed access facts">
          {siteContent.problemSources.map((item) => (
            <article className="source-card" key={item.label}>
              <strong>{item.label}</strong>
              <h3>{item.title}</h3>
              <p>
                {item.fact}{" "}
                <a className="text-citation" href={item.href} target="_blank" rel="noreferrer">
                  {item.source}
                </a>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
