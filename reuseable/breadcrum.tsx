"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  /** Mode: 'badge' (Hero pill), 'trail' (hierarchical trail), or 'announcement' (top banner) */
  variant?: "badge" | "trail" | "announcement";
  /** For 'badge' variant: uppercase pill tag */
  text?: string;
  /** For 'badge' variant: optional leading dot color */
  dot?: boolean;
  dotColor?: string;
  /** For 'trail' variant: custom breadcrumb items */
  items?: BreadcrumbItem[];
  /** For 'trail' variant: auto generate from URL pathname if items not passed */
  autoTrail?: boolean;
  /** For 'announcement' variant */
  badgeText?: string;
  badgeColor?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * 1. Badge Breadcrumb Pill (e.g. Hero top badge: "● THE FUTURE OF PEOPLE DECISIONS")
 */
export const BreadcrumbBadge: React.FC<{
  label: string;
  dot?: boolean;
  dotColor?: string;
  href?: string;
  className?: string;
}> = ({ label, dot = true, dotColor = "#F06A25", href, className = "" }) => {
  const content = (
    <div
      className={`inline-flex items-center  gap-2 px-3.5 py-1.5 rounded-full  ${className}`}
    >
      {dot && (
        <span
          className="w-2 h-2 rounded-full shrink-0 shadow-xs animate-pulse-subtle"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}
      <span className="text-xs font-geist-mono sm:text-base font-medium tracking-tight uppercase text-[#254F5F]">{label}</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block transition-transform hover:scale-[1.02]">
        {content}
      </Link>
    );
  }

  return content;
};

/**
 * 2. Top Announcement Bar (e.g. "New | Claripa AI: The future of people decisions is here ↗")
 */
export const AnnouncementBar: React.FC<{
  badgeText?: string;
  text: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}> = ({
  badgeText = "New",
  text = "Claripa AI: The future of people decisions is here",
  href = "/platform",
  className = "",
  onClick,
}) => {
  const inner = (
    <div
      className={`group flex items-center justify-center gap-2 text-xs md:text-[13px] font-medium text-slate-700 hover:text-slate-900 transition-colors py-2 px-4 ${className}`}
      onClick={onClick}
    >
      {badgeText && (
        <span className="bg-[#F06A25] hover:bg-[#E05914] text-white text-[10px] md:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs transition-colors">
          {badgeText}
        </span>
      )}
      <span className="tracking-tight">{text}</span>
      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full">
        {inner}
      </Link>
    );
  }

  return inner;
};

/**
 * 3. Traditional Path Navigation Trail (e.g. Home / Solutions / Workforce Intelligence)
 */
export const BreadcrumbNav: React.FC<{
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}> = ({ items = [], separator, className = "" }) => {
  const pathname = usePathname();

  const pathItems = React.useMemo(() => {
    if (items && items.length > 0) return items;
    // Auto-generate from pathname
    if (!pathname || pathname === "/") return [{ label: "Home", href: "/" }];

    const segments = pathname.split("/").filter(Boolean);
    const generated: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentHref = "";
    segments.forEach((seg, idx) => {
      currentHref += `/${seg}`;
      const isLast = idx === segments.length - 1;
      const formattedLabel = seg
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      generated.push({
        label: formattedLabel,
        href: isLast ? undefined : currentHref,
      });
    });

    return generated;
  }, [items, pathname]);

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs md:text-sm text-slate-500 ${className}`}
    >
      <ol className="inline-flex items-center gap-1.5 flex-wrap">
        {pathItems.map((item, index) => {
          const isLast = index === pathItems.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-slate-400 select-none">
                  {separator ?? <ChevronRight className="w-3.5 h-3.5" />}
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? "text-slate-900 font-semibold"
                      : "text-slate-600 font-medium"
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

/**
 * Universal Breadcrumb component that supports all styles
 */
const Breadcrumb: React.FC<BreadcrumbProps> = ({
  variant = "badge",
  text = "THE FUTURE OF PEOPLE DECISIONS",
  dot = true,
  dotColor = "#F06A25",
  items,
  badgeText = "New",
  href,
  className = "",
  children,
}) => {
  if (children) {
    return <div className={className}>{children}</div>;
  }

  if (variant === "announcement") {
    return (
      <AnnouncementBar
        badgeText={badgeText}
        text={text}
        href={href}
        className={className}
      />
    );
  }

  if (variant === "trail") {
    return <BreadcrumbNav items={items} className={className} />;
  }

  // Default 'badge' mode
  return (
    <BreadcrumbBadge
      label={text}
      dot={dot}
      dotColor={dotColor}
      href={href}
      className={className}
    />
  );
};

export default Breadcrumb;
