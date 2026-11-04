export interface WorkforceDashboardPreviewProps {
  id?: string;
}

export default function WorkforceDashboardPreview({
  id = "product-tour",
}: WorkforceDashboardPreviewProps) {
  return (
    <div
      className="p-4 sm:p-5 border border-[#dfe6e7] rounded-[24px] bg-white shadow-[0_24px_64px_rgba(0,46,64,0.11)] max-w-[760px] w-full mx-auto"
      id={id}
    >
      <div className="flex items-center justify-between pb-3.5 border-b border-[#e9edef] text-xs font-mono text-[#62737a]">
        <span className="mr-auto text-[#002e40] font-sora text-base sm:text-[17px] font-semibold">
          claripa<span className="text-[#f8780c]">•</span>
        </span>
        <span className="hidden sm:inline">Workforce signals</span>
        <span className="px-2.5 py-1 border border-[#e9edef] rounded-md text-[11px]">
          Last 30 days
        </span>
      </div>

      <div className="flex items-center justify-between py-4">
        <div>
          <p className="m-0 text-[#f8780c] font-mono text-[10px] font-medium tracking-wider uppercase">
            WORKFORCE OVERVIEW
          </p>
          <h2 className="m-0 text-[#002e40] font-sora text-base sm:text-lg font-medium">
            People signals, in context.
          </h2>
        </div>
        <span className="px-2 py-1 rounded-full bg-[#e7f7ed] text-[#258451] font-mono text-[9px] uppercase tracking-wider font-semibold">
          UPDATED TODAY
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div className="grid grid-cols-[1fr_auto] gap-1.5 p-3 border border-[#e9edef] rounded-[10px]">
          <span className="text-[#62737a] text-[10px] font-sora">Workforce health</span>
          <strong className="col-span-1 font-mono text-lg sm:text-xl font-medium text-[#002e40]">
            78%
          </strong>
          <small className="self-end text-[#28915b] text-[10px] font-mono">
            ↑ 6%
          </small>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-1.5 p-3 border border-[#e9edef] rounded-[10px]">
          <span className="text-[#62737a] text-[10px] font-sora">At flight risk</span>
          <strong className="col-span-1 font-mono text-lg sm:text-xl font-medium text-[#002e40]">
            24
          </strong>
          <small className="self-end text-[#28915b] text-[10px] font-mono">
            ↑ 5 new
          </small>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-1.5 p-3 border border-[#e9edef] rounded-[10px]">
          <span className="text-[#62737a] text-[10px] font-sora">Goals on track</span>
          <strong className="col-span-1 font-mono text-lg sm:text-xl font-medium text-[#002e40]">
            71%
          </strong>
          <small className="self-end text-[#d45218] text-[9px] font-mono">
            3 teams slipping
          </small>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.85fr] gap-2.5 mt-2.5">
        <div className="min-w-0 p-3 border border-[#e9edef] rounded-[10px]">
          <div className="flex items-center justify-between text-[10px] font-sora mb-2">
            <strong className="font-semibold text-[#002e40]">Workforce health</strong>
            <span className="text-[#62737a]">Last 6 weeks</span>
          </div>
          <div className="h-[128px] mt-2 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_30px,#eef1f1_31px)]">
            <svg
              aria-label="Workforce health trend"
              role="img"
              viewBox="0 0 420 150"
              className="w-full h-full overflow-visible"
            >
              <path
                d="M5 118 C45 104 60 112 90 82 S145 93 178 65 S236 87 266 46 S317 70 345 38 S390 45 415 15"
                fill="none"
                stroke="#f8780c"
                strokeWidth="4"
              />
              <path
                d="M5 118 C45 104 60 112 90 82 S145 93 178 65 S236 87 266 46 S317 70 345 38 S390 45 415 15 V150 H5Z"
                fill="url(#chart-fill)"
                opacity=".15"
              />
              <defs>
                <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#f8780c" />
                  <stop offset="1" stopColor="#f8780c" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="min-w-0 p-3 border border-[#e9edef] rounded-[10px] flex flex-col justify-between">
          <strong className="text-xs font-semibold text-[#002e40] font-sora mb-2 block">
            Top priorities
          </strong>
          <div className="flex flex-col gap-2 text-xs font-sora text-[#62737a]">
            <p className="flex items-center justify-between m-0">
              <span className="flex items-center gap-1.5">
                <span className="text-[#f8780c] font-bold">!</span> Review at-risk
              </span>
              <b className="text-[#002e40] font-mono">18</b>
            </p>
            <p className="flex items-center justify-between m-0">
              <span className="flex items-center gap-1.5">
                <span className="text-[#258451] font-bold">↗</span> Check-ins due
              </span>
              <b className="text-[#002e40] font-mono">6</b>
            </p>
            <p className="flex items-center justify-between m-0">
              <span className="flex items-center gap-1.5">
                <span className="text-[#f8780c] font-bold">✦</span> Opportunities
              </span>
              <b className="text-[#002e40] font-mono">12</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
