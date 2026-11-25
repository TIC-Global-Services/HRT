import BlurText from "@/components/ui/BlurText";

export interface SectionHeadingProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : "max-w-2xl"}>
      <p
        className={`mb-4 flex items-center gap-2 font-geist-mono text-xs sm:text-sm font-semibold uppercase tracking-tight text-brand-orange ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-orange" />
        {eyebrow}
      </p>
      <h2
        className="m-0 font-sora text-[28px] sm:text-4xl lg:text-[46px] font-normal leading-[1.12] tracking-[-0.035em] text-brand-teal"
        id={id}
      >
        <BlurText delay={20} text={title} />
      </h2>
      {description ? (
        <BlurText
          as="p"
          delay={20}
          text={description}
          className="mb-0 mt-5 font-sora text-sm sm:text-base md:text-lg leading-[1.3] text-text-muted"
        />
      ) : null}
    </div>
  );
}
