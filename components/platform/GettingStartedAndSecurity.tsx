import {
  Activity,
  Database,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import BlurText from "@/reuseable/BlurText";

export interface GettingStartedStep {
  title: string;
  description: string;
}

export interface PlatformSecurityPillar {
  title: string;
  description: string;
  icon: "protection" | "availability" | "hosting" | "access";
}

export interface GettingStartedAndSecurityProps {
  steps?: GettingStartedStep[];
  pillars?: PlatformSecurityPillar[];
}

const defaultSteps: GettingStartedStep[] = [
  {
    title: "Discover",
    description:
      "Discover \nDescription: Understand the organization's performance management process, strategic priorities, reporting structure, and current workflows",
  },
  {
    title: "Configure",
    description:
      "Configure relevant performance assessment cycles, OKR \nworkflows, weightages, and \nsettings based on agreed \nbusiness requirements.",
  },
  {
    title: "Prepare and Validate Data",
    description:
      "Prepare employee and \norganizational data in the \nrequired format, validate the \ninformation, and support the \nagreed data-loading process.",
  },
  {
    title: "Go Live and Support",
    description:
      "Validate the configured \nworkflows, support user \nonboarding, and help the \norganization begin using Claripa.",
  },
];

const defaultPillars: PlatformSecurityPillar[] = [
  {
    title: "Data Protection",
    description: "Protect information through security measures implemented within Claripa.",
    icon: "protection",
  },
  {
    title: "Service Availability",
    description: "Understand the service availability commitments for your Claripa deployment.",
    icon: "availability",
  },
  {
    title: "Data Hosting and Residency",
    description: "Understand where your data is hosted and how its storage is managed securely.",
    icon: "hosting",
  },
  {
    title: "Role-Based Access",
    description: "Manage user permissions through role-based access across teams and workflows.",
    icon: "access",
  },
];

const pillarIcons = {
  protection: ShieldCheck,
  availability: Activity,
  hosting: Database,
  access: LockKeyhole,
};

export default function GettingStartedAndSecurity({
  steps = defaultSteps,
  pillars = defaultPillars,
}: GettingStartedAndSecurityProps) {
  return (
    <>
      <section className="bg-[#F7F6F3] px-[5%] py-16 sm:px-8 md:py-24" id="getting-started">
        <div className="">
          <SectionHeading
            centered
            eyebrow="GETTING STARTED"
            title="A structured path from setup to adoption."
          />
          <ol className="mb-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <li
                className={`min-h-[235px] rounded-[22px] border p-6 ${
                  index === steps.length - 1
                    ? "border-[#f8780c] bg-[#fff4ec]"
                    : "border-[#ebe8e3] bg-white"
                }`}
                key={step.title}
              >
                <span
                  className={`inline-flex size-8 items-center justify-center rounded-lg font-mono text-xs ${
                    index === steps.length - 1
                      ? "bg-white text-[#f8780c]"
                      : "bg-[#F7F6F3] text-[#f8780c]"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`mb-0 mt-5 text-base font-semibold ${
                    index === steps.length - 1 ? "text-[#d95e0b]" : "text-[#002E40]"
                  }`}
                >
                  <BlurText delay={20} text={step.title} />
                </h3>
                <BlurText
                  as="p"
                  delay={20}
                  text={step.description}
                  className="mb-0 mt-2 text-base leading-[1.2] tracking-tight text-[#62737A]"
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#F7F6F3] px-[5%] pb-16 sm:px-8 md:pb-24" id="security-and-trust">
        <div className="rounded-[28px] border border-[#ebe8e3] bg-white p-6 sm:p-9 lg:p-10">
          <SectionHeading
            eyebrow="SECURITY & TRUST"
            title="People data deserves responsible protection."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillarIcons[pillar.icon];
              return (
                <article
                  className="min-h-[165px] rounded-[20px] border border-[#eeeae5] bg-[#F7F6F3] p-5"
                  key={pillar.title}
                >
                  <span className="mb-3 grid size-10 place-items-center rounded-xl border border-[#f8d8c3] bg-[#fff7f1] text-[#f8780c]">
                    <Icon aria-hidden="true" size={19} />
                  </span>
                  <h3 className="m-0 text-base font-semibold text-[#173c49]">
                    <BlurText delay={20} text={pillar.title} />
                  </h3>
                  <BlurText
                    as="p"
                    delay={20}
                    text={pillar.description}
                    className="mb-0 mt-1.5 text-base leading-[1.2] text-[#718087]"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
