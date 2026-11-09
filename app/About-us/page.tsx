import AboutHero from "@/components/about-us/AboutHero";
import AboutImpact from "@/components/about-us/AboutImpact";
import DottedWorldMap from "@/components/about-us/DottedWorldMap";
import MeetTheTeam from "@/components/about-us/MeetTheTeam";
import MissionVision from "@/components/about-us/MissionVision";
import OurStoryTimeline from "@/components/about-us/OurStoryTimeline";
import WhereWeAre from "@/components/about-us/WhereWeAre";

export const metadata = {
  title: "About Us",
  description: "Learn about the mission, leadership, and team behind Claripa AI.",
};

export default function AboutUsPage() {
  return (
    <div className="w-full bg-[#F7F6F3] text-[#142938] font-sora min-h-screen">
      {/* 1. Hero with Photography & Meet the Team action (Image 1) */}
      <AboutHero />

      {/* 2. From an idea to a platform Timeline (Image 2) */}
      <OurStoryTimeline />

      {/* 3. What Drives Us: Overview, Mission, Vision & 4 Core Values (Image 3) */}
      <MissionVision />

      {/* 4. Real-world Impact Stats: 50+, 03+, 30+ (Image 4) */}
      <AboutImpact />

      {/* 5. Team Grid: Technology should make work more human (Image 5) */}
      <MeetTheTeam />

      {/* 6. Where We Are: Offices and Teams */}
      <WhereWeAre />
      <DottedWorldMap />
    </div>
  );
}
