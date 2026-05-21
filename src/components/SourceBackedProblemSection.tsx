import { siteContent } from "@/data/siteContent";

export function SourceBackedProblemSection() {
  return (
    <section className="section section-white">
      <div className="container two-column">
        <div>
          <p className="eyebrow">Why materials matter</p>
          <h2>Watching is easier than building.</h2>
          <p className="lead">
            Students can find engineering videos anywhere. The harder part is getting parts, tools, and simple challenges into
            classrooms and clubs.
          </p>
          <p>
            BricklabClips turns attention around build videos into free guides and funded school material requests.
          </p>
        </div>
        <div className="source-list" aria-label="Source-backed access facts">
          {siteContent.problemSources.slice(0, 3).map((item) => (
            <article className="source-card" key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.fact}</p>
            </article>
          ))}
          <details className="source-sources">
            <summary>Sources</summary>
            <ul>
              {siteContent.problemSources.map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.source}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </section>
  );
}
