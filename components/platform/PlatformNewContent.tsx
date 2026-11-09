import PlatformHero from "./PlatformHero";
import ConnectedModules from "./ConnectedModules";
import AskClaripa from "./AskClaripa";
import EmployeeExperience from "./EmployeeExperience";
import PerformanceInsights from "./PerformanceInsights";
import IntegrationsNetwork from "./IntegrationsNetwork";
import GettingStartedAndSecurity from "./GettingStartedAndSecurity";
import PlatformFaq from "./PlatformFaq";

export default function PlatformNewContent() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-sora text-[#002e40]">
      <PlatformHero />
      <ConnectedModules />
      <AskClaripa />
      <EmployeeExperience />
      <PerformanceInsights />
      <IntegrationsNetwork />
      <GettingStartedAndSecurity />
      <PlatformFaq />
    </div>
  );
}
