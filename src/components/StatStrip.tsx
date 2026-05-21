type Stat = {
  label: string;
  value: string;
};

type StatStripProps = {
  stats: readonly Stat[];
  note?: string;
};

export function StatStrip({ stats, note }: StatStripProps) {
  return (
    <section className="stat-section" aria-label="BricklabClips audience and launch metrics">
      <div className="container">
        <div className="stat-strip">
          {stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        {note ? <p className="small-note">{note}</p> : null}
      </div>
    </section>
  );
}

