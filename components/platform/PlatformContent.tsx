import PlatformHero from "./PlatformHero";
import WorkforceDashboardPreview from "./WorkforceDashboardPreview";
import AskClaripaAI from "./AskClaripaAI";
import PlatformIntegrations from "./PlatformIntegrations";
import SecurityAndTrust from "./SecurityAndTrust";
import PerformanceFlow from "./PerformanceFlow";
import PlatformFAQ from "./PlatformFAQ";
import ImpactCTA from "@/components/shared/ImpactCTA";

export default function PlatformContent() {
  return (
    <div className="bg-white text-[#002e40] font-sora min-h-screen">
      <section className="w-[min(1200px,calc(100%-48px))] mx-auto grid grid-cols-1 lg:grid-cols-[0.84fr_1.16fr] items-center gap-10 lg:gap-14 pt-14 lg:pt-[65px] pb-16 lg:pb-[84px]">
        <PlatformHero />
        <WorkforceDashboardPreview />
      </section>
      <AskClaripaAI />
      <PlatformIntegrations />
      <SecurityAndTrust />
      <PerformanceFlow />
      <PlatformFAQ />
      <div className="w-[min(1200px,calc(100%-48px))] mx-auto">
        <ImpactCTA />
      </div>
    </div>
  );
}
