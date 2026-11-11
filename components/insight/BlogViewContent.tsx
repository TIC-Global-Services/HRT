"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Copy,
  Check,
  Share2,
  Sparkles,
  ChevronRight,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import { BlogPost, getRelatedBlogs } from "@/data/blogs";
import BlurText from "@/reuseable/BlurText";

interface BlogViewContentProps {
  blog: BlogPost;
}

export default function BlogViewContent({ blog }: BlogViewContentProps) {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(
    blog.sections[0]?.id || "overview"
  );
  const relatedBlogs = getRelatedBlogs(blog.slug, 3);

  // Copy link handler
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Scrollspy for Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of blog.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog.sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#F7F6F3] text-[#002e40] font-sora min-h-screen pb-24 selection:bg-[#FED7AA] selection:text-[#9A3412]">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-[#E3E8EA]/60 bg-[#F7F6F3]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="w-[min(1240px,calc(100%-48px))] mx-auto py-3.5 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#62737A] overflow-hidden">
            <Link
              href="/insight"
              className="inline-flex items-center gap-1.5 hover:text-[#F06A25] transition-colors shrink-0 font-medium uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Insights</span>
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-[#F06A25] font-semibold uppercase shrink-0">
              {blog.category}
            </span>
            <span className="text-zinc-300">/</span>
            <span className="truncate max-w-[240px] sm:max-w-[400px] text-zinc-500 font-sans normal-case">
              {blog.title}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyLink}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:border-orange-300 hover:text-[#F06A25] transition-all text-[11px] font-mono cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>SHARE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="w-[min(1240px,calc(100%-48px))] mx-auto pt-10 sm:pt-14">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/70 border border-orange-200 text-[#F06A25] font-mono text-xs font-semibold uppercase tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F06A25]" />
            <span>{blog.category}</span>
            <span className="text-orange-300">•</span>
            <span>{blog.topic}</span>
          </div>

          {/* Title */}
          <BlurText
            as="h1"
            text={blog.title}
            trigger="load"
            delay={20}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium tracking-tight text-[#142938] leading-[1.16] mb-6"
          />

          {/* Subtitle / Excerpt */}
          {blog.subtitle && (
            <BlurText
              as="p"
              text={blog.subtitle}
              trigger="load"
              delay={20}
              className="font-sans text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed max-w-3xl mx-auto mb-8"
            />
          )}

          {/* Author & Metadata Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-5 border-t border-zinc-200/80 text-xs sm:text-sm font-sans text-zinc-600">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden relative border border-orange-200">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <span className="font-semibold text-[#142938] block leading-tight">
                  {blog.author.name}
                </span>
                <span className="text-zinc-500 text-[11px] block leading-tight">
                  {blog.author.role}
                </span>
              </div>
            </div>

            <span className="text-zinc-300 hidden sm:inline">•</span>

            {/* Date */}
            <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>{blog.date}</span>
            </div>

            <span className="text-zinc-300 hidden sm:inline">•</span>

            {/* Read Time */}
            <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Banner */}
        <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] rounded-[28px] overflow-hidden border border-zinc-200/80 shadow-md mb-12 sm:mb-16">
          <Image
            src={blog.image}
            alt={blog.coverImageAlt || blog.title}
            fill
            priority
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 2-Column Content Layout (Article Body + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Article Body (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Key Takeaways Callout Card */}
            {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
              <section className="bg-[#FFF8F3] border border-orange-200/90 rounded-[24px] p-6 sm:p-8 shadow-2xs">
                <div className="flex items-center gap-2 text-[#F06A25] font-mono text-xs font-bold tracking-wider uppercase mb-4">
                  <Sparkles className="w-4 h-4 text-[#F06A25]" />
                  <span>KEY TAKEAWAYS</span>
                </div>
                <ul className="space-y-3.5">
                  {blog.keyTakeaways.map((takeaway, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-zinc-800 font-sans text-sm sm:text-base leading-relaxed"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#F06A25] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Stat Highlight Banner if present */}
            {blog.statsHighlight && (
              <div className="bg-white border border-zinc-200 rounded-[24px] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 shadow-2xs">
                <div className="font-heading text-4xl sm:text-5xl font-bold text-[#F06A25] tracking-tight shrink-0">
                  {blog.statsHighlight.value}
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-zinc-200 pt-3 sm:pt-0 sm:pl-6">
                  <BlurText
                    as="p"
                    text={blog.statsHighlight.label}
                    delay={20}
                    className="font-sans text-sm sm:text-base text-zinc-700 leading-snug font-medium"
                  />
                </div>
              </div>
            )}

            {/* Dynamic Blog Sections */}
            {blog.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 flex flex-col gap-5 pt-2"
              >
                {/* Section Title */}
                {section.title && section.title !== "Overview" && (
                  <BlurText
                    as="h2"
                    text={section.title}
                    delay={20}
                    className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-[#142938] leading-snug mt-3"
                  />
                )}

                {/* Section Blocks */}
                <div className="flex flex-col gap-4 font-sans text-[17px] sm:text-[18px] text-[#243746] leading-[1.78]">
                  {section.blocks.map((block, bIdx) => {
                    if (block.type === "paragraph" && block.text) {
                      return (
                        <BlurText
                          key={bIdx}
                          as="p"
                          text={block.text}
                          delay={20}
                          className="m-0"
                        />
                      );
                    }

                    if (block.type === "bullet-list" && block.items) {
                      return (
                        <ul key={bIdx} className="my-2 space-y-2.5 pl-1">
                          {block.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#F06A25] mt-2.5 shrink-0" />
                              <span className="text-zinc-800">{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    if (block.type === "comparison-table" && block.table) {
                      return (
                        <div
                          key={bIdx}
                          className="my-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xs"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 bg-zinc-50 border-b border-zinc-200 text-xs font-mono font-semibold uppercase tracking-wider">
                            <div className="p-4 text-zinc-500 border-b md:border-b-0 md:border-r border-zinc-200">
                              {block.table.headers[0]}
                            </div>
                            <div className="p-4 text-[#F06A25] bg-orange-50/50">
                              {block.table.headers[1]}
                            </div>
                          </div>
                          <div className="divide-y divide-zinc-100">
                            {block.table.rows.map((row, rIdx) => (
                              <div
                                key={rIdx}
                                className="grid grid-cols-1 md:grid-cols-2 text-sm font-sans"
                              >
                                <div className="p-4 text-zinc-600 bg-zinc-50/30 md:border-r border-zinc-100 border-b md:border-b-0">
                                  {row[0]}
                                </div>
                                <div className="p-4 font-medium text-[#142938] bg-orange-50/15">
                                  {row[1]}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (block.type === "quote" && block.quote) {
                      return (
                        <blockquote
                          key={bIdx}
                          className="my-4 border-l-4 border-[#F06A25] bg-[#FFF8F3] rounded-r-2xl p-5 sm:p-6 italic text-[#142938] font-medium"
                        >
                          &ldquo;{block.quote.text}&rdquo;
                          {block.quote.author && (
                            <cite className="block not-italic text-xs font-mono font-normal text-zinc-500 mt-2">
                              — {block.quote.author}
                            </cite>
                          )}
                        </blockquote>
                      );
                    }

                    return null;
                  })}
                </div>
              </section>
            ))}

            {/* Bottom Claripa Platform Callout */}
            <div className="mt-8 rounded-[24px] bg-[#142938] text-white p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-lg">
              <div className="relative z-10 max-w-lg">
                <span className="text-[#F06A25] font-mono text-xs font-semibold uppercase tracking-wider block mb-2">
                  CONTINUOUS WORKFORCE INTELLIGENCE
                </span>
                <BlurText
                  as="h3"
                  text="Turn Early Signals Into Decisive Action"
                  delay={20}
                  className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2"
                />
                <BlurText
                  as="p"
                  text="Claripa connects performance, engagement, capability and behaviour signals to help leaders make confident people decisions."
                  delay={20}
                  className="font-sans text-sm text-zinc-300 leading-relaxed"
                />
              </div>

              <div className="relative z-10 flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link
                  href="/contact-us"
                  className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#F06A25] text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-md active:scale-95"
                >
                  REQUEST A DEMO
                </Link>
                <Link
                  href="/platform"
                  className="w-full sm:w-auto text-center px-6 py-3 rounded-full border border-white/20 text-white font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                  EXPLORE PLATFORM
                </Link>
              </div>

              {/* Decorative background glow */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#F06A25]/15 blur-3xl pointer-events-none" />
            </div>

            {/* Author Signature & Bio Card */}
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white/70 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden relative border border-orange-200 shrink-0">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <BlurText
                  as="h4"
                  text={`Written by the ${blog.author.name}`}
                  delay={20}
                  className="font-heading text-base font-semibold text-[#142938]"
                />
                <BlurText
                  as="p"
                  text={`Published on ${blog.date} • Categorized under ${blog.category} (${blog.topic})`}
                  delay={20}
                  className="font-sans text-xs sm:text-sm text-zinc-500"
                />
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar (4 Columns) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              <div className="bg-white rounded-[24px] border border-zinc-200 p-6 shadow-2xs">
                <div className="flex items-center gap-2 text-zinc-900 font-mono text-xs font-bold tracking-wider uppercase mb-4 pb-3 border-b border-zinc-100">
                  <Bookmark className="w-3.5 h-3.5 text-[#F06A25]" />
                  <span>ON THIS PAGE</span>
                </div>

                <nav className="flex flex-col space-y-1.5" aria-label="Table of contents">
                  {blog.sections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left text-xs sm:text-sm py-1.5 px-3 rounded-lg transition-all flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? "bg-orange-50 font-semibold text-[#F06A25]"
                            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                        }`}
                      >
                        <span className="truncate pr-2">{section.title}</span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isActive
                              ? "text-[#F06A25] translate-x-0.5"
                              : "text-zinc-300 opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Share Card */}
              <div className="bg-white rounded-[24px] border border-zinc-200 p-6 shadow-2xs">
                <div className="flex items-center gap-2 text-zinc-900 font-mono text-xs font-bold tracking-wider uppercase mb-3">
                  <Share2 className="w-3.5 h-3.5 text-[#F06A25]" />
                  <span>SHARE ARTICLE</span>
                </div>
                <p className="font-sans text-xs text-zinc-500 mb-4">
                  Found this valuable? Share it with fellow people and HR leaders.
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    type="button"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-zinc-200 text-xs font-mono font-medium hover:border-orange-300 hover:text-[#F06A25] transition-all cursor-pointer bg-zinc-50/50"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY LINK</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.href : ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-zinc-200 text-zinc-600 hover:border-blue-400 hover:text-blue-600 transition-all bg-zinc-50/50"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      blog.title
                    )}&url=${encodeURIComponent(
                      typeof window !== "undefined" ? window.location.href : ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-all bg-zinc-50/50"
                    aria-label="Share on X"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Consultation / Assessment CTA */}
              <div className="bg-gradient-to-br from-orange-500 to-[#F06A25] text-white rounded-[24px] p-6 shadow-md relative overflow-hidden">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full inline-block mb-3">
                  WORKFORCE INTELLIGENCE
                </span>
                <BlurText
                  as="h4"
                  text="See where your workforce stands today"
                  delay={20}
                  className="font-heading text-xl font-medium mb-2 leading-snug"
                />
                <BlurText
                  as="p"
                  text="Discover how Claripa unifies performance signals and predicts flight risk before it impacts your bottom line."
                  delay={20}
                  className="font-sans text-xs text-white/90 leading-relaxed mb-5"
                />
                <Link
                  href="/contact-us"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white text-[#F06A25] font-mono text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-orange-50 transition-colors"
                >
                  <span>BOOK A DISCOVERY CALL</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Insights Grid */}
        {relatedBlogs.length > 0 && (
          <section className="mt-20 sm:mt-28 pt-12 border-t border-zinc-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[#F06A25] font-mono text-xs font-semibold uppercase tracking-wider block mb-1">
                  MORE RESEARCH & ARTICLES
                </span>
                <BlurText
                  as="h3"
                  text="Related Insights"
                  delay={20}
                  className="font-heading text-2xl sm:text-3xl font-medium tracking-tight text-[#142938]"
                />
              </div>

              <Link
                href="/insight"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#62737A] hover:text-[#002e40] transition-colors"
              >
                <span>EXPLORE ALL INSIGHTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/insight/${rel.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] min-h-[380px] p-6 text-white no-underline shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 pointer-events-none" />

                  {/* Top: Date & Category */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="inline-flex items-center gap-2 text-white/90 font-mono text-[11px] tracking-wider uppercase font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      {rel.date}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-mono text-[10px] tracking-wider uppercase font-medium">
                      {rel.topic}
                    </span>
                  </div>

                  {/* Bottom: Title & CTA */}
                  <div className="relative z-10 flex flex-col items-start gap-3 mt-auto pt-6">
                    <BlurText
                      as="h4"
                      text={rel.title}
                      delay={20}
                      className="text-white font-sora text-xl font-medium leading-[1.25] tracking-tight group-hover:text-orange-200 transition-colors"
                    />
                    <span className="inline-flex items-center gap-2 text-white font-mono text-xs tracking-wider uppercase font-medium group-hover:text-[#F06A25] transition-colors">
                      <span>READ ARTICLE</span>
                      <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
