import ConnectedModules from "./ConnectedModules";
import EmployeeExperience from "./EmployeeExperience";
import GettingStartedAndSecurity from "./GettingStartedAndSecurity";
import IntegrationsNetwork from "./IntegrationsNetwork";
import ModuleShowcase from "./ModuleShowcase";
import PerformanceInsights from "./PerformanceInsights";

export default function PlatformNewContent() {
  return (
    <div className="min-h-screen bg-[#f7f6f3] font-sora text-[#002e40]">
      <PerformanceInsights />
      <ConnectedModules />
      <ModuleShowcase />
      <EmployeeExperience />
      <GettingStartedAndSecurity />
      <IntegrationsNetwork />
    </div>
  );
}
