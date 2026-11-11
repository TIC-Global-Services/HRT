import HeroSection from "@/components/home/hero";
import Workforce from "@/components/home/WorkForce";
import BuildFor from "@/components/home/BuildFor";
import BetterPeople from "@/components/home/BetterPeople";
import IntegrationsTrust from "@/components/home/IntegrationsTrust";
import Insights from "@/components/home/Insights";
import OneConnect from "@/components/home/OneConnect";

export const metadata = {
  title: "Claripa AI | The Future of People Decisions",
  description:
    "Claripa is an AI-powered workforce intelligence platform that transforms people data into actionable insights, helping organisations improve performance and make better people decisions.",
};

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col bg-white">
      <HeroSection />
      <Workforce />
      <OneConnect />
      <BuildFor />
      {/* <Tools /> */}
      <BetterPeople />
      {/* <TrustedByTeams /> */}
      <IntegrationsTrust />
      <Insights />
    </main>
  );
}
