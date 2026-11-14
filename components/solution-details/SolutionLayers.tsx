import Image from "next/image";
import BlurText from "@/reuseable/BlurText";

export interface SolutionLayersProps {
  eyebrow?: string;
  title?: string;
  layers?: {
    label: string;
    isPrimary?: boolean;
  }[];
}

const defaultLayers = [
  { label: "Core HR", isPrimary: true },
  { label: "Performance Management", isPrimary: false },
  { label: "Analytics", isPrimary: false },
  { label: "Engagement", isPrimary: false },
];
const defaultMobileLayers = [
  { label: "Core HR", isPrimary: false },
  { label: "Analytics", isPrimary: false },
  { label: "Performance Management", isPrimary: false },
  { label: "Engagement", isPrimary: false },
];

export default function SolutionLayers({
  eyebrow = "POWERED BY",
  title = "The layers behind this solution",
  layers = defaultLayers,
}: SolutionLayersProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F7F6F3]">
      <div className="px-[5%]">
        {/* Outer Banner Card: 1340px wide, rounded-[30px] */}
        <div className="relative rounded-[30px] overflow-hidden min-h-[500px] lg:h-[540px] flex items-end lg:items-center p-2.5 sm:p-3 bg-[#002E40]">
          {/* Background Image: High-res technology image from Figma */}
          <Image
            src="/solution-detail/layers-bg.jpg"
            alt="The layers behind this solution"
            fill
            className="object-cover object-right select-none pointer-events-none"
            priority
          />

          {/* Dark Overlay for depth */}
          <div className="absolute inset-0 bg-[#002E40]/20 pointer-events-none" />

          {/* Left Solid Overlay Card: w=515px, h=523px, rx=22px, fill=#254E5F */}
          <div className="relative z-10 w-full lg:w-[515px] h-full min-h-[200px] md:min-h-[250px] lg:min-h-[515px] rounded-[22px] bg-[#254E5F] border border-[#62737A]/50 p-8 sm:p-12 flex flex-col justify-end items-center lg:justify-between shadow-2xl">
            {/* Top Eyebrow & Title */}
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <span
                  aria-hidden="true"
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#F8780C] shadow-[0_0_8px_rgba(248,120,12,0.55)]"
                />
                <span className="font-mono text-xs lg:text-base font-medium text-[#F8780C] tracking-wider uppercase">
                  {eyebrow}
                </span>
              </div>

              <BlurText
                as="h2"
                text={title}
                delay={20}
                className="font-sora text-white text-xl sm:text-4xl lg:text-[46px] font-normal tracking-tight leading-[1.14] mt-4 lg:text-left text-center"
              />
            </div>

            {/* Bottom Layer Pills */}
            <div className="flex flex-wrap justify-center gap-2.5 pt-8 lg:block hidden">
              {defaultLayers.map((layer) => (
                <span
                  key={layer.label}
                  className={`inline-flex  items-center px-4 py-2 rounded-full font-mono text-xs lg:text-base font-medium tracking-tight shadow-sm transition-transform hover:scale-105 ${
                    layer.isPrimary
                      ? "bg-[#FFF4EC] text-[#B84D09] border border-[#FBD9C2]"
                      : "bg-white text-[#254F5F] border border-white/80"
                  }`}
                >
                  {layer.label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2.5 pt-8 lg:hidden">
              {defaultMobileLayers.map((layer) => (
                <span
                  key={layer.label}
                  className={`inline-flex  items-center px-4 py-2 rounded-full font-mono text-xs lg:text-base font-medium tracking-tight shadow-sm transition-transform hover:scale-105 ${
                    layer.isPrimary
                      ? "bg-[#FFF4EC] text-[#B84D09] border border-[#FBD9C2]"
                      : "bg-white text-[#254F5F] border border-white/80"
                  }`}
                >
                  {layer.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

