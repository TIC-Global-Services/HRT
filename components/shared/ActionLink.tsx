import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export interface ActionLinkProps {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}

export default function ActionLink({
  href,
  children,
  secondary = false,
  className = "",
}: ActionLinkProps) {
  const baseClasses =
    "inline-flex min-h-[48px] items-center justify-center gap-2.5 px-[22px] rounded-full font-geist-mono text-xs sm:text-sm font-medium tracking-tight uppercase transition-all duration-150 hover:-translate-y-0.5 cursor-pointer";
  const variantClasses = secondary
    ? "border border-[#e9edef] bg-surface-cream text-brand-teal hover:border-[#cbd6da] hover:bg-[#f3f1ec] hover:text-brand-navy"
    : "border border-brand-teal bg-brand-teal text-white hover:bg-brand-teal-hover";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses} ${className}`.trim()}
    >
      {children}
      <ArrowUpRight aria-hidden="true" size={16} />
    </Link>
  );
}
