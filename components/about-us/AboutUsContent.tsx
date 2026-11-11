import AboutHero from "./AboutHero";
import OurStoryTimeline from "./OurStoryTimeline";
import MissionVision from "./MissionVision";
import AboutImpact from "./AboutImpact";
import MeetTheTeam from "./MeetTheTeam";
import WhereWeAre from "./WhereWeAre";
import DottedWorldMap from "./DottedWorldMap";

export default function AboutUsContent() {
  return (
    <div className="w-full bg-[#F7F6F3] text-[#142938] font-sora min-h-screen">
      {/* 1. Hero with Photography & Meet the Team action (Image 1) */}
      <AboutHero />

      {/* 2. From an idea to a platform Timeline (Image 2) */}
      <OurStoryTimeline />

      {/* 3. What Drives Us: Overview, Mission, Vision & 4 Core Values (Image 3) */}
      <MissionVision />

      {/* 4. Real-world Impact Stats: 50+, 3+, 30+ (Image 4) */}
      <AboutImpact />

      {/* 5. Our People and Culture Team Grid (Image 5) */}
      <MeetTheTeam />

      {/* 6. Where We Are: Offices and Teams */}
      <WhereWeAre />
      <DottedWorldMap/>
    </div>
  );
}
