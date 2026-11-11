import BlurText from "@/reuseable/BlurText";

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
        className={`mb-4 flex items-center gap-2 font-mono text-base font-medium uppercase tracking-tight text-[#f8780c] ${
          centered ? "justify-center" : ""
        }`}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-[#f8780c]" />
        {eyebrow}
      </p>
      <h2
        className="m-0 text-3xl font-normal leading-[1.08] tracking-tight text-[#254f5f] sm:text-4xl lg:text-[46px]"
        id={id}
      >
        <BlurText delay={20} text={title} />
      </h2>
      {description ? (
        <BlurText
          as="p"
          delay={20}
          text={description}
          className="mb-0 mt-5 text-base leading-relaxed text-[#62737a] sm:text-lg"
        />
      ) : null}
    </div>
  );
}
