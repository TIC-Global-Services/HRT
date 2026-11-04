import ActionLink from "./ActionLink";
import SectionEyebrow from "./SectionEyebrow";

export interface ImpactCTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function ImpactCTA({
  eyebrow = "SEE CLARIPA IN ACTION",
  title = "Make Your Next Move.",
  description = "Book a personalised walkthrough and see what Claripa sees in your organisation.",
  buttonText = "Book a Demo",
  buttonHref = "/contact-us",
}: ImpactCTAProps) {
  return (
    <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 my-9 md:my-14 p-7 md:p-11 rounded-[22px] bg-[#fbf9f5]">
      <div>
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 className="my-2.5 text-[#254f5f] font-sora text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-[-0.05em]">
          {title}
        </h2>
        <p className="m-0 text-[#62737a] font-sora text-sm">{description}</p>
      </div>
      <ActionLink href={buttonHref}>{buttonText}</ActionLink>
    </section>
  );
}
