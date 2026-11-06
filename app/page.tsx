import HeroSection from "@/components/home/hero";
import Tools from "@/components/home/Tools";
import Workforce from "@/components/home/WorkForce";
import BuildFor from "@/components/home/BuildFor";
import BetterPeople from "@/components/home/BetterPeople";
import TrustedByTeams from "@/components/home/TrustedByTeams";
import IntegrationsTrust from "@/components/home/IntegrationsTrust";
import Insights from "@/components/home/Insights";
import OneConnect from "@/components/home/OneConnect";

export const metadata = {
  title: "Claripa AI | The Future of People Decisions",
  description:
    "Claripa connects workforce data, performance signals and AI-powered intelligence to help HR leaders see what matters, understand what's next and act with confidence.",
};

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col bg-white">
      <HeroSection />
      <Workforce />
      <OneConnect />
      <BuildFor />
      <Tools />
      <BetterPeople />
      <TrustedByTeams />
      <IntegrationsTrust />
      <Insights />
    </main>
  );
}
