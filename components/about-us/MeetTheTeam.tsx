"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  linkedinUrl?: string;
  bio?: string;
}

export interface MeetTheTeamProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  members?: TeamMember[];
}

const defaultTeamMembers: TeamMember[] = [
  {
    name: "Anil Kumar",
    role: "CEO / Founder",
    imageSrc: "/founding_members/Anil_Kumar.png",
    linkedinUrl: "https://www.linkedin.com/in/anil-kumar-55b2463b/",
    bio: "Empowering Growth, Enabling Transformation emphasizes fostering continuous growth, driving innovation, and enabling meaningful transformation for individuals and organizations.",
  },
  {
    name: "Debashis Mukherjee",
    role: "Technical Advisor",
    imageSrc: "/founding_members/Debashis-Mukherjee.png",
    linkedinUrl: "https://www.linkedin.com/in/debashis-mukherjee",
    bio: "Specializing in embedded software development, with expertise in Automotive Infotainment and Telematics. As a Senior Software Developer, he brings technical knowledge and development experience to support technology direction, engineering excellence, and product innovation",
  },
  {
    name: "Dr. Partha Datta",
    role: "Business Strategy Advisor",
    imageSrc: "/founding_members/Partha-Datta.png",
    linkedinUrl: "https://www.linkedin.com/in/parthadatta",
    bio: "Provides strategic guidance on business direction, organizational growth, and long-term value creation. His advisory role supports strategic planning, business alignment, and translating organizational priorities into actionable initiatives.",
  },
  {
    name: "Poonam Dhanavati",
    role: "Co-Founder",
    imageSrc: "/founding_members/Poonam_Dhanavati.png",
    linkedinUrl: "https://www.linkedin.com/in/poonam-dhanavati-3591755/",
    bio: "Responsible for driving business growth, managing client relationships, and leading the firm's overall strategic direction to achieve organizational goals.",
  },
  {
    name: "Kalyanee Khele",
    role: "Senior Human Resource Consultant",
    imageSrc: "/founding_members/Kalyanee_Khele.png",
    linkedinUrl: "https://www.linkedin.com/in/kalyani-khele-00aa1b56/",
    bio: "Provides strategic HR guidance, supports talent management and organizational development, and advises on HR policies and practices to improve employee performance, strengthen workforce effectiveness, and align people strategies with business goals.",
  },
  {
    name: "Namrata Singh",
    role: "Product Analyst",
    imageSrc: "/founding_members/Namrata_Singh.png",
    linkedinUrl: "https://www.linkedin.com/in/-namratasingh",
    bio: "Drives product discovery and improvement by analyzing user needs, defining requirements, and evaluating product performance. Contributes to the development of Claripa, an AI-powered performance management platform, to strengthen goal alignment, workforce insights, and organizational performance.",
  },
  {
    name: "Pranav Nalawade",
    role: "Artificial Intelligence Engineer",
    imageSrc: "/founding_members/Pranav_Nalawade.png",
    linkedinUrl: "https://www.linkedin.com/in/pranav-nalawade",
    bio: "Responsible for developing, training, testing, and deploying AI/ML models, preparing and processing datasets, and improving model accuracy. Contributes to integrating AI solutions into applications and enhancing product capabilities through intelligent automation and data-driven insights.",
  },
  {
    name: "Tanvi Ingale",
    role: "Senior Talent Acquisition Specialist",
    imageSrc: "/founding_members/Tanvi_Ingale.png",
    linkedinUrl: "https://www.linkedin.com/in/tanvi-ingale-9a2ab326a/",
    bio: "Leads end-to-end recruitment, develops talent acquisition strategies, and manages candidate and stakeholder relationships to attract top talent. Focuses on aligning hiring practices with organizational goals and ensuring an efficient recruitment process.",
  },
  {
    name: "Hardik Parikh",
    role: "Full Stack Engineer",
    imageSrc: "/founding_members/Hardik_Parikh.png",
    linkedinUrl: "https://www.linkedin.com/in/hardik-parikh-784112249",
    bio: "Responsible for designing, developing, testing, and maintaining end-to-end web applications. Works across frontend and backend systems, develops REST APIs, manages databases, integrates third-party services, and deploys applications.",
  },
  {
    name: "Aakash Saxena",
    role: "Test Engineer",
    imageSrc: "/founding_members/Aakash_Saxena.png",
    linkedinUrl: "https://www.linkedin.com/in/akash-saxena-qa",
    bio: "Responsible for performing manual and automated testing to ensure software quality, identify defects, validate functionality, and improve reliability. Focuses on quality assurance to ensure the delivery of high-quality, reliable products that meet customer expectations.",
  },
];

export default function MeetTheTeam({
  eyebrow = "OUR PEOPLE AND CULTURE",
  title = "Technology should make\nwork more human.",
  subtitle = "Bringing together Claripa’s product and AI builders with HRT Consulting’s strategic HR specialists.",
  members = defaultTeamMembers,
}: MeetTheTeamProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (!selectedMember) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMember(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember]);

  return (
    <section
      id="team"
      aria-label="Our People and Culture"
      className="py-12 sm:py-16 lg:py-20 px-[5%]"
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center px-4 max-w-3xl mx-auto mb-10 sm:mb-12">
        <p className="inline-flex items-center gap-2 text-[#E26D35] font-mono text-xs font-semibold tracking-wider uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E26D35] shadow-[0_0_8px_rgba(226,109,53,0.55)]" />
          {eyebrow}
        </p>
        <BlurText
          as="h2"
          delay={20}
          text={title}
          className="text-[#142938] font-sora text-3xl sm:text-4xl md:text-[46px] font-normal tracking-tight leading-[1.1]"
        />
        {subtitle && (
          <p className="font-sora text-sm sm:text-base text-[#62737A] leading-relaxed mt-3.5 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Team Cards Grid (3 cards per row, bottom row centered) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
        {members.map((member, index) => {
          // Centering bottom row on 3-column layout
          const remainder = members.length % 3;
          const isLast = index === members.length - 1;
          const isSecondLast = index === members.length - 2;

          let centeringClass = "";
          if (remainder === 1 && isLast) {
            // When 1 card is left on the bottom row, center it in the middle column
            centeringClass = "lg:col-start-2";
          } else if (remainder === 2) {
            // When 2 cards are left on the bottom row, shift both by half column + half gap
            if (isSecondLast) {
              centeringClass = "lg:col-start-1 lg:translate-x-[calc(50%+14px)]";
            } else if (isLast) {
              centeringClass = "lg:col-start-2 lg:translate-x-[calc(50%+14px)]";
            }
          }

          return (
            <article
              key={member.name}
              role="button"
              tabIndex={0}
              aria-label={`View profile details for ${member.name}, ${member.role}`}
              onClick={() => setSelectedMember(member)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedMember(member);
                }
              }}
              className={`group cursor-pointer rounded-[24px] sm:rounded-[28px] bg-white border border-[#E9ECEF] hover:border-[#E56A1E]/45 p-3 sm:p-3.5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E56A1E] flex flex-col justify-between ${centeringClass}`}
            >
              {/* Photo Box */}
              <div className="relative aspect-square w-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-slate-100 mb-3.5">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ objectPosition: "50% 5%" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                />
                {member.bio && (
                  <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#002E40]/80 backdrop-blur-xs text-white font-mono text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Read Bio
                  </span>
                )}
              </div>

              {/* Card Footer: Name, Role & LinkedIn */}
              <div className="flex items-center justify-between px-2 pb-1.5 pt-0.5 gap-2">
                <div className="min-w-0">
                  <h3
                    title={member.name}
                    className="font-sora text-sm sm:text-[15px] font-semibold text-[#142938] leading-tight truncate"
                  >
                    {member.name}
                  </h3>
                  <p
                    title={member.role}
                    className="font-sora text-[11px] sm:text-xs text-[#71838a] leading-tight mt-0.5 truncate"
                  >
                    {member.role}
                  </p>
                </div>
                {member.linkedinUrl && (
                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${member.name} on LinkedIn`}
                    className="w-6 h-6 rounded-md bg-[#0077b5]/10 hover:bg-[#0077b5] text-[#0077b5] hover:text-white flex items-center justify-center transition-colors shrink-0"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0 0 3.32 1.66 1.66 0 0 0 0-3.32Z" />
                    </svg>
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Team Member Description Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#001A24]/70 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setSelectedMember(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-name"
        >
          <div
            className="relative w-full max-w-3xl rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white shadow-2xl border border-white/15 grid grid-cols-1 md:grid-cols-[0.9fr_1.35fr] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Photo Column */}
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px] bg-[#E9ECEF]">
              <Image
                src={selectedMember.imageSrc}
                alt={selectedMember.name}
                fill
                className="object-cover"
                style={{ objectPosition: "50% 8%" }}
                sizes="(max-width: 768px) 100vw, 340px"
              />
            </div>

            {/* Right Bio Panel */}
            <div className="relative bg-gradient-to-br from-[#063244] via-[#0F4960] to-[#1A627B] text-white p-6 sm:p-8 md:p-9 flex flex-col justify-between">
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                aria-label="Close profile"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <h3
                  id="team-modal-name"
                  className="font-sora text-xl sm:text-2xl font-bold uppercase tracking-wide text-white pr-8 leading-tight"
                >
                  {selectedMember.name}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#FFB076] mt-1 tracking-tight">
                  {selectedMember.role}
                </p>

                <div className="h-px w-full bg-white/30 my-4 sm:my-5" />

                <p className="font-sora text-sm sm:text-[15px] leading-[1.65] text-white/90 font-normal">
                  {selectedMember.bio ||
                    "Part of the Claripa and HRT Consulting team advancing connected workforce intelligence."}
                </p>
              </div>

              {selectedMember.linkedinUrl && (
                <div className="mt-6 pt-2">
                  <Link
                    href={selectedMember.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/12 hover:bg-white/22 border border-white/25 text-white font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
