import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import DirectLines from "./DirectLines";
import OfficeLocations from "./OfficeLocations";
import ContactFAQ from "./ContactFAQ";

export default function ContactUsContent() {
  return (
    <div className="bg-[#F7F6F3] text-[#002e40] font-sora min-h-screen">
      <section className="bg-[#F7F6F3]">
        <div className="container mx-auto py-12 lg:py-[66px] pb-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start gap-10 lg:gap-[60px] px-[5%]">
          <ContactHero />
          <ContactForm />
        </div>
      </section>
      <DirectLines />
      <OfficeLocations />
      <ContactFAQ />
      {/* <div className="w-[min(1200px,calc(100%-48px))] mx-auto"> */}
        {/* <ImpactCTA /> */}
      {/* </div> */}
    </div>
  );
}
