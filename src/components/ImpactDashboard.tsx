type ImpactMetric = {
  label: string;
  value: string;
};

export function ImpactDashboard({ metrics }: { metrics: readonly ImpactMetric[] }) {
  return (
    <div className="impact-dashboard">
      {metrics.map((metric) => (
        <div className="metric-card" key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  );
}

