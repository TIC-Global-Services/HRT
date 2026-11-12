"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import MakeYourNextMove from "@/components/MakeYourNextMove";
import FlutedGlassBackground from "@/reuseable/HeroBg";
import BlurText from "@/reuseable/BlurText";
import { defaultSolution, getSolutionBySlug } from "@/data/solutions";

export { MakeYourNextMove };

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isPlatform = pathname === "/platform";
  const matchedSolution =
    pathname === "/solution-details"
      ? defaultSolution
      : pathname?.startsWith("/solution-details/")
        ? getSolutionBySlug(pathname.replace("/solution-details/", "").split("/")[0])
        : undefined;

  return (
    <footer
      className={`relative w-full overflow-hidden text-slate-100 mt-auto transition-colors duration-200 ${
        isHome ? "bg-white" : "bg-[#F7F6F3]"
      }`}
    >
      {/* 1. "Make Your Next Move" CTA Section */}
      <div className="relative z-30">
        {isPlatform ? (
          <MakeYourNextMove
            eyebrow="SEE CLARIPA IN ACTION"
            title="Bring Greater Clarity to Performance Management."
            subtitle="Discover how Claripa connects goals, tasks, performance reviews, and workforce insights to support better-aligned teams and more meaningful performance conversations."
            buttonText="BOOK A DEMO"
            buttonHref="/contact-us"
          />
        ) : matchedSolution ? (
          <MakeYourNextMove
            eyebrow={matchedSolution.finalCta.eyebrow}
            title={matchedSolution.finalCta.title}
            subtitle={matchedSolution.finalCta.subtitle}
            buttonText={matchedSolution.finalCta.buttonText}
            buttonHref={matchedSolution.finalCta.buttonHref}
          />
        ) : (
          <MakeYourNextMove />
        )}
      </div>

      {/* 2. Floating Frosted Glass Footer Section Container */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-[5%] mt-2 sm:mt-30 mb-8 sm:mb-12">
        {/* Interactive Fluted Glass Background (HeroBg) (Layer z-0, behind the card) */}
        <div
          className="absolute -top-36 sm:-top-44 md:-top-48 lg:-top-62 left-1/2 -translate-x-1/2 w-[900px] sm:w-[1250px] md:w-[1450px] lg:w-[1680px] aspect-[2031/1131] pointer-events-none select-none z-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 16%, black 88%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 16%, black 88%, transparent 100%)",
          }}
          aria-hidden="true"
        >
          <FlutedGlassBackground
            colorA="#FFA812"
            colorB="#FF4D0A"
            background={isHome ? "#FFFFFF" : "#F7F6F3"}
            mouseStrength={1}
          />
        </div>

        {/* Ambient warm glow behind blinds crest */}
        <div
          className="absolute -top-28 sm:-top-36 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(240,106,37,0.18)_0%,rgba(255,160,80,0.08)_50%,transparent_75%)] pointer-events-none -z-10 blur-2xl"
          aria-hidden="true"
        />
       

        {/* 3D Carved Wooden Chess Queen Piece (Layer z-10, behind the card) */}
        {/* Crown sticks out above the card, body blurs behind the frosted glass, and base peeks out below */}
        <div
          className="absolute -top-28 sm:-top-32 md:-top-36 lg:-top-50 -bottom-6 sm:-bottom-8 left-[6%] sm:left-[10%] md:left-[12%] lg:left-[14%] w-[240px] sm:w-[320px] md:w-[380px] lg:w-[540px] h-[800px] pointer-events-none select-none z-10"
          aria-hidden="true"
        >
          <div className="relative w-full h-full ">
            <Image
              src="/chess_queen.png"
              alt=""
              fill
              priority
              // sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 430px"
              className="object-contain object-top drop-shadow-2xl -rotate-10"
            />
          </div>
        </div>

        {/* Frosted Glass Floating Card (Layer z-20) */}
        <div
          className="relative z-20 rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-7 sm:p-10 lg:p-12 border border-white/30 backdrop-blur-3xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(125, 152, 163, 0.76) 0%, rgba(85, 115, 126, 0.84) 55%, rgba(60, 88, 98, 0.90) 100%)",
            WebkitBackdropFilter: "blur(36px) saturate(140%)",
            backdropFilter: "blur(36px) saturate(140%)",
            boxShadow:
              "0 30px 60px -15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
            {/* Left Brand & Contact Column */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div className="space-y-3.5">
                {/* Claripa Logo with White Letters & Vivid Orange Crown */}
                <Link
                  href="/"
                  className="inline-block transition-opacity hover:opacity-90"
                  aria-label="Claripa Home"
                >
                  <div className="relative h-7 sm:h-8 w-36 aspect-[1570/440]">
                    <Image
                      src="/claripa_logo.png"
                      alt="Claripa"
                      fill
                      priority
                      className="object-cover object-left"
                    />
                  </div>
                </Link>

                {/* Tagline */}
                <BlurText
                  as="p"
                  delay={20}
                  text="Claripa by HRT Consulting brings together human resources, technology, and strategic consulting for better people decisions."
                  className="text-xs sm:text-base text-slate-200/95 leading-relaxed max-w-[270px] font-normal"
                />
              </div>

              {/* Contact Info Meta */}
              <div className="space-y-1.5 text-[11px] sm:text-base font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] sm:text-[11px]">
                    LOCATION
                  </span>
                  <span className="text-slate-200 uppercase">
                    BENGALURU, KARNATAKA
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] sm:text-[11px]">
                    EMAIL
                  </span>
                  <a
                    href="mailto:info@hrtconsulting.co.in"
                    className="text-slate-200 hover:text-white transition-colors"
                  >
                    info@hrtconsulting.co.in
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-semibold tracking-wider uppercase text-[10px] sm:text-[11px]">
                    PHONE
                  </span>
                  <a
                    href="tel:+919811208080"
                    className="text-slate-200 hover:text-white transition-colors"
                  >
                    +91 9811208080
                  </a>
                </div>
              </div>

              {/* Get In Touch Pill Button */}
              <div className="pt-1">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-1.5 px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#1D313C] font-semibold text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Right Navigation Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
              {/* SOLUTIONS */}
              <div>
                <h3 className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider text-[#B2C6D0] font-mono mb-3.5">
                  SOLUTIONS
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm font-geist">
                  <li>
                    <Link
                      href="/solution-hub"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Retain Key Talent
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/solution-hub"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Onboard & Ramp Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/solution-hub"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Continuous Performance
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/solution-hub"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Empower Managers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/solution-hub"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Grow & Plan Succession
                    </Link>
                  </li>
                  <li className="pt-0.5">
                    <Link
                      href="/solution-hub"
                      className="inline-flex items-center gap-1 text-[#F29350] hover:text-[#FFA76D] font-medium transition-colors"
                    >
                      <span>All Solutions</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* PLATFORM */}
              <div>
                <h3 className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider text-[#B2C6D0] font-mono mb-3.5">
                  PLATFORM
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm font-geist">
                  <li>
                    <Link
                      href="/platform"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Performance Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/platform"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Performance Intelligence
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/platform"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Manager Intelligence
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/platform"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Talent & Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/platform"
                      className="text-[#F29350] hover:text-[#FFA76D] font-medium transition-colors"
                    >
                      Ask Claripa
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/platform"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/platform"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Security & Trust
                    </Link>
                  </li>
                </ul>
              </div>

              {/* INSIGHTS */}
              <div>
                <h3 className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider text-[#B2C6D0] font-mono mb-3.5">
                  INSIGHTS
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link
                      href="/insight"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/insight"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/insight"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Reports & Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/insight"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Webinars
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/insight"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      News
                    </Link>
                  </li>
                </ul>
              </div>

              {/* COMPANY */}
              <div>
                <h3 className="text-[11px] sm:text-sm font-semibold uppercase tracking-wider text-[#B2C6D0] font-mono mb-3.5">
                  COMPANY
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link
                      href="/about-us"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="text-slate-200/90 hover:text-white transition-colors"
                    >
                      Book a Demo
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar inside the Card (No horizontal divider line, flowing with breathing room) */}
          <div className="mt-12 sm:mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] sm:text-sm font-mono text-slate-300/85">
            <p>© 2026 Claripa by HRT. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <Link
                href="/contact-us"
                className="hover:text-white transition-colors underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact-us"
                className="hover:text-white transition-colors underline underline-offset-4"
              >
                Terms of Use
              </Link>
              <Link
                href="/contact-us"
                className="hover:text-white transition-colors underline underline-offset-4"
              >
                Cookie Settings
              </Link>
            </div>

            <p className="text-slate-300/80">
              Designed & Developed by{" "}
              <span className="text-slate-200">TIC Global Services</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
