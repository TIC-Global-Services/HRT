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
    "inline-flex min-h-[48px] items-center justify-center gap-2.5 px-[22px] rounded-full font-mono text-[11px] font-medium tracking-[0.02em] uppercase transition-all duration-150 hover:-translate-y-0.5 cursor-pointer";
  const variantClasses = secondary
    ? "border border-[#e9edef] bg-[#fbf9f5] text-[#254f5f] hover:border-[#cbd6da] hover:bg-[#f3f1ec] hover:text-[#002e40]"
    : "border border-[#002e40] bg-[#002e40] text-white hover:bg-[#174453]";

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
