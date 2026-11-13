import { Objective } from "@/components/platform";
import AskClaripa from "@/components/platform/AskClaripa";
import ConnectedModules from "@/components/platform/ConnectedModules";
import EmployeeExperience from "@/components/platform/EmployeeExperience";
import GettingStartedAndSecurity from "@/components/platform/GettingStartedAndSecurity";
import IntegrationsNetwork from "@/components/platform/IntegrationsNetwork";
import PerformanceInsights from "@/components/platform/PerformanceInsights";
import PlatformFaq from "@/components/platform/PlatformFaq";
import PlatformHero from "@/components/platform/PlatformHero";


export const metadata = {
  title: "Claripa Platform | Connected Performance & Workforce Intelligence",
  description:
    "Claripa sits above your existing HR systems, connects people, performance, and task workflows, and turns workforce signals into clearer decisions.",
};

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sora text-[#002e40]">
      <PlatformHero />
      <ConnectedModules />
      <Objective/>
      <AskClaripa />
      <EmployeeExperience />
      <PerformanceInsights />
      <IntegrationsNetwork />
      <GettingStartedAndSecurity />
      <PlatformFaq />
    </div>
  );
}
