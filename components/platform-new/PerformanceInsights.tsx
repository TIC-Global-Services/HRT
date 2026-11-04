import SectionHeading from "./SectionHeading";

export interface PerformanceInsightRow {
  name: string;
  status: string;
  value: string;
  barWidth: string;
  barColor: string;
  statusColor: string;
}

const defaultRows: PerformanceInsightRow[] = [
  {
    name: "Engineering",
    status: "High risk",
    value: "78%",
    barWidth: "w-4/5",
    barColor: "bg-[#f8780c]",
    statusColor: "text-[#c4321a]",
  },
  {
    name: "Customer Success",
    status: "Watch",
    value: "53%",
    barWidth: "w-1/2",
    barColor: "bg-[#f7a166]",
    statusColor: "text-[#a55b00]",
  },
  {
    name: "Finance",
    status: "Stable",
    value: "23%",
    barWidth: "w-1/4",
    barColor: "bg-[#254f5f]",
    statusColor: "text-[#28733d]",
  },
];

export interface PerformanceInsightsProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  rows?: PerformanceInsightRow[];
}

export default function PerformanceInsights({
  eyebrow = "ANALYTICS",
  title = "Make better decisions with performance insights.",
  description = "Claripa brings performance information into a structured view, helping leaders and HR teams understand goal progress, review performance, and identify areas that may require attention.",
  rows = defaultRows,
}: PerformanceInsightsProps) {
  return (
    <section
      aria-labelledby="performance-insights-title"
      className="bg-[#f7f6f3] px-5 py-16 sm:px-8 md:py-24"
      id="performance-insights"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            id="performance-insights-title"
            title={title}
            description={description}
          />
        </div>

        <div className="rounded-[26px] border border-[#e9e6e1] bg-white p-5 shadow-[0_24px_70px_rgba(37,79,95,0.12)] sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="m-0 font-mono text-[11px] uppercase tracking-wide text-[#62737a]">
              Leadership view · Q3
            </p>
            <span className="font-mono text-[11px] uppercase tracking-wide text-[#254f5f]">
              Overview ↗
            </span>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#f7f6f3] p-4">
              <p className="m-0 text-xs text-[#62737a]">People risk</p>
              <p className="mb-0 mt-1 text-2xl font-medium text-[#d94c0b]">
                Medium
              </p>
            </div>
            <div className="rounded-2xl bg-[#f7f6f3] p-4">
              <p className="m-0 text-xs text-[#62737a]">Goal alignment</p>
              <p className="mb-0 mt-1 text-2xl font-medium text-[#254f5f]">
                82%
              </p>
            </div>
            <div className="rounded-2xl bg-[#f7f6f3] p-4">
              <p className="m-0 text-xs text-[#62737a]">Bench strength</p>
              <p className="mb-0 mt-1 text-2xl font-medium text-[#254f5f]">
                67%
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {rows.map((row) => (
              <div key={row.name}>
                <div className="mb-1.5 flex items-center justify-between gap-4 text-sm">
                  <span className="text-[#27383d]">{row.name}</span>
                  <span className={`font-semibold ${row.statusColor}`}>
                    {row.status}
                  </span>
                </div>
                <div
                  aria-label={`${row.name}: ${row.value}`}
                  className="h-2 overflow-hidden rounded-full bg-[#edf1f1]"
                  role="img"
                >
                  <span
                    className={`block h-full rounded-full ${row.barWidth} ${row.barColor}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
