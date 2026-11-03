"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight, Sparkles, Shield, Cpu, BarChart3, Users, LineChart, FileText } from "lucide-react";
import { AnnouncementBar } from "./breadcrum";

interface NavDropdownItem {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavDropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: "Solutions",
    href: "/solution-hub",
    children: [
      {
        title: "Solution Hub",
        description: "Explore all people intelligence and decision solutions",
        href: "/solution-hub",
        icon: <Users className="w-4 h-4 text-[#F06A25]" />,
      },
      {
        title: "Solution Details",
        description: "Deep dive into capabilities, workflows and impact",
        href: "/solution-details",
        icon: <BarChart3 className="w-4 h-4 text-[#1C4E5B]" />,
      },
      {
        title: "Talent Retention & Risk",
        description: "Spot disengagement signals early and prevent unwanted turnover",
        href: "/solution-hub",
        icon: <LineChart className="w-4 h-4 text-[#F06A25]" />,
      },
    ],
  },
  {
    label: "Platform",
    href: "/platform",
    children: [
      {
        title: "Platform Overview",
        description: "Connect workforce data with real-time decision intelligence",
        href: "/platform",
        icon: <Cpu className="w-4 h-4 text-[#1C4E5B]" />,
      },
      {
        title: "AI Signal Engine",
        description: "Machine learning models designed specifically for HR analytics",
        href: "/platform",
        icon: <Sparkles className="w-4 h-4 text-[#F06A25]" />,
      },
      {
        title: "Enterprise Security",
        description: "SOC 2 Type II certified, GDPR compliant, enterprise grade",
        href: "/platform",
        icon: <Shield className="w-4 h-4 text-[#1C4E5B]" />,
      },
    ],
  },
  {
    label: "Insights",
    href: "/insight",
    children: [
      {
        title: "Insights & Research",
        description: "Articles, benchmarks and methodologies for people leaders",
        href: "/insight",
        icon: <FileText className="w-4 h-4 text-[#1C4E5B]" />,
      },
      {
        title: "Workforce Trends 2026",
        description: "Key findings from over 500,000 workforce performance points",
        href: "/insight",
        icon: <BarChart3 className="w-4 h-4 text-[#F06A25]" />,
      },
    ],
  },
  {
    label: "About Us",
    href: "/About-us",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

const Navabar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header className="top-0 z-50 w-full transition-all duration-300">
      {/* 1. Top Announcement Bar matching Image 1 */}
      <div className="w-full bg-[#FBF9F5] backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <AnnouncementBar
            badgeText="New"
            text="Claripa AI: The future of people decisions is here"
            href="/platform"
          />
        </div>
      </div>

      {/* 2. Main Navigation Bar matching Image 1 */}
      <nav
        className={`w-full transition-all duration-200 bg-white/98 backdrop-blur-md border-b border-slate-200/40 py-3.5`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-95 shrink-0"
            aria-label="Claripa - Home"
          >
            <div className="relative h-7 sm:h-8 w-auto aspect-[3.57/1]">
              <Image
                src="/claripa_logo.png"
                alt="Claripa Logo"
                fill
                priority
                sizes="(max-width: 768px) 130px, 160px"
                className="object-cover"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isDropdownOpen = activeDropdown === item.label;

              if (!hasChildren) {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href || "/"}
                    className={`text-[14px] font-medium tracking-tight transition-colors duration-150 ${
                      isActive
                        ? "text-slate-950 font-semibold"
                        : "text-slate-700 hover:text-slate-950"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isDropdownOpen ? null : item.label)}
                    className={`inline-flex items-center gap-1 text-[14px] font-medium tracking-tight transition-colors duration-150 py-1.5 ${
                      isDropdownOpen
                        ? "text-slate-950 font-semibold"
                        : "text-slate-700 hover:text-slate-950"
                    }`}
                    aria-expanded={isDropdownOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180 text-slate-900" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-xl p-3 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
                      role="menu"
                    >
                      <div className="space-y-1">
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            role="menuitem"
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                          >
                            <div className="p-2 rounded-lg bg-slate-100 group-hover/item:bg-white group-hover/item:shadow-xs transition-all shrink-0 mt-0.5">
                              {sub.icon}
                            </div>
                            <div>
                              <div className="text-[13px] font-semibold text-slate-900 group-hover/item:text-[#1C4E5B] transition-colors flex items-center gap-1">
                                {sub.title}
                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                              </div>
                              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                                {sub.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action Items matching Image 1 */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/contact-us"
              className="text-xs md:text-sm font-semibold tracking-wider text-slate-700 hover:text-slate-950 uppercase transition-colors px-2 py-1"
            >
              LOGIN
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center bg-[#1C4E5B] hover:bg-[#143B45] text-white text-xs md:text-sm font-semibold tracking-wider uppercase px-6 py-2.5 rounded-full transition-all duration-200 shadow-xs hover:shadow active:scale-95"
            >
              BOOK A DEMO
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/contact-us"
              className="bg-[#1C4E5B] text-white text-[11px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full"
            >
              BOOK A DEMO
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-5 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-xl">
            <div className="space-y-2">
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedMobileSection === item.label;

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href || "/"}
                      className="block py-2.5 text-base font-medium text-slate-800 hover:text-[#1C4E5B]"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.label} className="border-b border-slate-100 pb-2">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobileSection(isExpanded ? null : item.label)
                      }
                      className="flex items-center justify-between w-full py-2 text-base font-medium text-slate-800"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="pl-3 mt-1 space-y-2">
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            className="block py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
              <Link
                href="/contact-us"
                className="w-full text-center py-2.5 text-sm font-semibold uppercase tracking-wider text-slate-700 hover:text-slate-950 border border-slate-200 rounded-full"
              >
                LOGIN
              </Link>
              <Link
                href="/contact-us"
                className="w-full text-center py-3 bg-[#1C4E5B] text-white text-sm font-semibold uppercase tracking-wider rounded-full shadow-sm"
              >
                BOOK A DEMO
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navabar;
