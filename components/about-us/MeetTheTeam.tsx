import Image from "next/image";
import Link from "next/link";
import BlurText from "@/reuseable/BlurText";

export interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  linkedinUrl?: string;
}

export interface MeetTheTeamProps {
  eyebrow?: string;
  title?: string;
  members?: TeamMember[];
}

const defaultTeamMembers: TeamMember[] = [
  {
    name: "Anil Kumar",
    role: "CPTO, Founder",
    imageSrc: "/founding_members/Anil_Kumar.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Poonam Dhanvani",
    role: "CEO, Founder",
    imageSrc: "/founding_members/Poonam_Dhanavati.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Kalyanee Khole",
    role: "Senior Human Resource Consultant",
    imageSrc: "/founding_members/Kalyanee_Khele.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Namrata Singh",
    role: "Product Analyst",
    imageSrc: "/founding_members/Namrata_Singh.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Pranav Nalawade",
    role: "Artificial Intelligence Engineer",
    imageSrc: "/founding_members/Pranav_Nalawade.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Tanvi Ingale",
    role: "Senior Talent Acquisition Specialist",
    imageSrc: "/founding_members/Tanvi_Ingale.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Hardik Parikh",
    role: "Full Stack Engineer",
    imageSrc: "/founding_members/Hardik_Parikh.png",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Aakash Saxena",
    role: "Test Engineer",
    imageSrc: "/founding_members/Aakash_Saxena.png",
    linkedinUrl: "https://linkedin.com",
  },
];

export default function MeetTheTeam({
  eyebrow = "WHAT DRIVES US",
  title = "Technology should make\nwork more human.",
  members = defaultTeamMembers,
}: MeetTheTeamProps) {
  return (
    <section
      id="team"
      aria-label="Meet The Team"
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
      </div>

      {/* Team Cards Grid (3 cards per row, bottom row centered) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-6xl mx-auto">
        {members.map((member, index) => {
          // Centering the last row of 2 items on 3-column layout
          const isSecondLast = index === 6;
          const isLast = index === 7;
          let centeringClass = "";
          if (isSecondLast) {
            centeringClass = "lg:col-start-1 lg:translate-x-1/2";
          } else if (isLast) {
            centeringClass = "lg:col-start-2 lg:translate-x-1/2";
          }

          return (
            <article
              key={member.name}
              className={`rounded-[24px] sm:rounded-[28px] bg-white border border-[#E9ECEF] p-3 sm:p-3.5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${centeringClass}`}
            >
              {/* Photo Box */}
              <div className="relative aspect-square w-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-slate-100 mb-3.5">
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  fill
                  className="object-cover"
                  style={{objectPosition:"50% 5%"}}
                  // sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                />
              </div>

              {/* Card Footer: Name, Role & LinkedIn */}
              <div className="flex items-center justify-between px-2 pb-1.5 pt-0.5 gap-2">
                <div className="min-w-0">
                  <h3 className="font-sora text-sm sm:text-[15px] font-semibold text-[#142938] leading-tight truncate">
                    {member.name}
                  </h3>
                  <p className="font-sora text-[11px] sm:text-xs text-[#71838a] leading-tight mt-0.5 truncate">
                    {member.role}
                  </p>
                </div>
                {member.linkedinUrl && (
                  <Link
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
    </section>
  );
}
