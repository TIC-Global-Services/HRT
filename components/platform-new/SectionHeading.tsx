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
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p
        className={`mb-4 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wide text-[#f8780c] ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-[#f8780c]" />
        {eyebrow}
      </p>
      <h2
        className="m-0 text-3xl font-normal leading-[1.08] tracking-[-0.045em] text-[#254f5f] sm:text-4xl lg:text-[48px]"
        id={id}
      >
        {title}
      </h2>
      {description ? (
        <p className="mb-0 mt-5 text-base leading-relaxed text-[#62737a] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
