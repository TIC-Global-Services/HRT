import PageIntro from "@/components/shared/PageIntro";
import Image from "next/image";
import { MessageSquare, Tag, ThumbsUp } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

const companyLogos = [
  { src: "/company_logo/ani.png", name: "ani" },
  { src: "/company_logo/charcoal.png", name: "charcoal" },
  { src: "/company_logo/cozentus.png", name: "cozentus" },
  { src: "/company_logo/firstrand.png", name: "firstrand" },
  { src: "/company_logo/h-56.png", name: "h-56" },
  { src: "/company_logo/htpc.png", name: "htpc" },
  { src: "/company_logo/ivalue.png", name: "ivalue" },
  { src: "/company_logo/mobiledrive.png", name: "mobiledrive" },
  { src: "/company_logo/pria.png", name: "pria" },
  { src: "/company_logo/tianu.png", name: "tianu" },
  { src: "/company_logo/vaysd.png", name: "vaysd" },
];

export interface ContactHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  promiseKicker?: string;
  promiseTitle?: string;
  promiseSubtitle?: string;
}

export default function ContactHero({
  eyebrow = "CONTACT US",
  title = "Let’s talk",
  description = "Tell us what you need and the right person will get back to you within one business day.",
  promiseKicker = "Personalised demo",
  promiseTitle = "See Claripa set up around your teams and the signals that matter to you.",
  promiseSubtitle = "Name, Role · Company",
}: ContactHeroProps) {
  const benefits = [
    {
      icon: MessageSquare,
      title: promiseKicker,
      description: promiseTitle,
    },
    {
      icon: ThumbsUp,
      title: "Expert consultation",
      description:
        "Talk to a people-intelligence specialist about the challenge you’re facing.",
    },
    {
      icon: Tag,
      title: "Transparent pricing",
      description: "Get a plan that fits your size and scope.",
    },
  ];

  return (
    <div className="flex flex-col min-w-0">
      <PageIntro eyebrow={eyebrow} title={title} description={description} />
      <ul className="flex flex-col gap-4 mt-8 m-0 p-0 list-none">
        {benefits.map(
          ({ icon: Icon, title: benefitTitle, description: benefitDescription }) => (
            <li
              className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-3.5"
              key={benefitTitle}
            >
              <span className="grid w-10 h-10 place-items-center border border-[#e9e5df] rounded-[11px] bg-white text-[#254f5f]">
                <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
              </span>
              <span className="flex flex-col gap-0.5">
                <strong className="text-[#002e40] font-sora text-base font-semibold leading-tight">
                  <BlurText as="span" text={benefitTitle} trigger="load" delay={20} />
                </strong>
                <BlurText
                  as="span"
                  text={benefitDescription}
                  trigger="load"
                  delay={20}
                  className="text-[#62737a] font-sora text-sm leading-relaxed"
                />
              </span>
            </li>
          )
        )}
      </ul>
      <figure className="mt-12 sm:mt-16 p-6 sm:p-7 border border-[#ece9e3] rounded-[26px] bg-white text-center">
        <blockquote className="m-0 text-[#62737a] font-sora text-lg sm:text-[24px] font-semibold tracking-[-0.025em] leading-snug">
          “Short testimonial quote that builds trust at the point of conversion.”
        </blockquote>
        <figcaption className="mt-3.5 text-[#62737a] font-sora text-[14px]">
          {promiseSubtitle}
        </figcaption>
      </figure>
      <div
        className="overflow-hidden min-w-0 w-full mt-6 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
        role="group"
        aria-label="Trusted by teams at"
      >
        <div className="flex items-center w-max animate-marquee hover:[animation-play-state:paused]">
          {[false, true].map((isDuplicate) => (
            <ul
              aria-hidden={isDuplicate || undefined}
              className="flex items-center flex-none gap-9 pr-9 m-0 p-0 list-none"
              key={String(isDuplicate)}
            >
              {companyLogos.map(({ src, name }) => (
                <li
                  className="flex min-w-0 items-center justify-center"
                  key={name}
                >
                  <Image
                    src={src}
                    alt={isDuplicate ? "" : name}
                    width={120}
                    height={20}
                    className="w-auto max-w-full h-8 object-contain opacity-80"
                    // className="w-auto max-w-full h-6 object-contain opacity-80"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
