import {
  AskClaripa,
  ConnectedModules,
  EmployeeExperience,
  GettingStartedAndSecurity,
  IntegrationsNetwork,
  PerformanceInsights,
  PlatformFaq,
  PlatformHero,
} from "@/components/platform";

export const metadata = {
  title: "Platform",
  description: "Connect workforce data with real-time AI decision intelligence.",
};

export default function PlatformPage() {
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
