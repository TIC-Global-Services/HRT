import Image from "next/image";
import SectionHeading from "./SectionHeading";

export interface ConnectedModulesProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  modules?: string[];
}

const defaultModules = ["People", "Performance", "Task"];

export default function ConnectedModules({
  eyebrow = "HOW IT FITS TOGETHER",
  title = "Three connected modules. One clearer view of performance.",
  description = "Claripa brings people information, performance management, and task execution together in one platform. By connecting organizational goals with individual contributions and performance insights, Claripa helps leaders, HR teams, and managers work towards shared priorities.",
  modules = defaultModules,
}: ConnectedModulesProps) {
  return (
    <section
      aria-labelledby="connected-modules-title"
      className="overflow-hidden bg-white px-5 py-16 sm:px-8 md:py-24"
      id="connected-modules"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          centered
          description={description}
          eyebrow={eyebrow}
          id="connected-modules-title"
          title={title}
        />

        <div className="relative mx-auto mt-12 grid aspect-square w-full max-w-[500px] place-items-center sm:mt-16">
          <div
            aria-hidden="true"
            className="absolute inset-[8%] rounded-full border border-dashed border-[#cfd8da]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[19%] rounded-full border border-dashed border-[#dce2e3]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[23%] rounded-full bg-[radial-gradient(circle,rgba(248,120,12,0.28)_0%,rgba(248,120,12,0.12)_48%,transparent_74%)]"
          />
          <div className="relative z-10 grid size-24 place-items-center rounded-[28px] bg-[#141210] shadow-[0_12px_35px_rgba(248,120,12,0.25)] sm:size-28">
            <Image
              alt="Claripa"
              className="size-10 object-contain sm:size-12"
              height={64}
              src="/claripa-center-badge.png"
              width={64}
            />
          </div>

          {modules.slice(0, 3).map((module, index) => {
            const positions = [
              "left-0 top-1/2 -translate-y-1/2",
              "left-1/2 top-[9%] -translate-x-1/2",
              "bottom-[10%] left-1/2 -translate-x-1/2",
            ];
            return (
              <span
                className={`absolute z-20 rounded-full border border-[#eee9e4] bg-white px-5 py-3 font-mono text-sm text-[#141210] shadow-sm sm:px-6 ${positions[index]}`}
                key={module}
              >
                {module}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
