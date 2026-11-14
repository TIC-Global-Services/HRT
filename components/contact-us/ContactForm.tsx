"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlurText from "@/reuseable/BlurText";

export interface ContactFormProps {
  inquiries?: string[];
  onSubmitSuccess?: () => void;
}

const defaultInquiries = ["Demo", "Sales", "Support", "Partnerships"];

export default function ContactForm({
  inquiries = defaultInquiries,
}: ContactFormProps) {
  const [activeInquiry, setActiveInquiry] = useState(inquiries[0] || "Demo");

  return (
    <form
      className="w-full max-w-xl mx-auto lg:max-w-none p-5 sm:p-7 md:p-[30px] rounded-[24px] border border-[#e9edef] bg-white shadow-[0_16px_50px_rgba(0,46,64,0.06)]"
      action="mailto:sales@claripa.com"
      method="post"
      encType="text/plain"
    >
      <input name="Inquiry" type="hidden" value={activeInquiry} />
      <div className="flex items-start justify-between gap-4 mb-[26px]">
        <div>
          <span className="flex items-center gap-2 m-0 text-[#f8780c] font-mono text-[11px] font-medium tracking-[0.02em] uppercase">
            BOOK A DEMO
          </span>
          <BlurText
            as="h2"
            text="Tell us a little about your team."
            trigger="load"
            delay={20}
            className="mt-2 text-[#254f5f] font-sora text-xl sm:text-2xl lg:text-[25px] font-medium tracking-[-0.04em]"
          />
        </div>
        {/* <span className="text-[#62737a] font-mono text-[11px]">01 / 01</span> */}
      </div>

      <fieldset className="flex flex-wrap gap-1.5 mb-5 p-0 border-0">
        <legend className="w-full mb-2 text-[#002e40] text-xs font-medium font-sora">
          I’m interested in*
        </legend>
        {inquiries.map((inquiry) => (
          <button
            aria-pressed={activeInquiry === inquiry}
            className={`px-3 py-2 border rounded-full text-xs font-sora cursor-pointer transition-colors ${
              activeInquiry === inquiry
                ? "border-[#254f5f] bg-[#254f5f] text-white"
                : "border-[#e9edef] bg-white text-[#62737a] hover:border-[#cbd6da]"
            }`}
            key={inquiry}
            onClick={() => setActiveInquiry(inquiry)}
            type="button"
          >
            {inquiry}
          </button>
        ))}
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3.5">
        <label className="flex flex-col gap-1.5 text-[#002e40] text-xs font-medium font-sora">
          First name*
          <input
            autoComplete="given-name"
            name="First name"
            placeholder="First name"
            required
            className="w-full min-h-[44px] px-3 py-2.5 border border-[#dbe1e3] rounded-[9px] bg-white text-[#002e40] text-[13px] font-sora focus:border-[#254f5f] focus:outline-2 focus:outline-[#254f5f]/15"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[#002e40] text-xs font-medium font-sora">
          Last name*
          <input
            autoComplete="family-name"
            name="Last name"
            placeholder="Last name"
            required
            className="w-full min-h-[44px] px-3 py-2.5 border border-[#dbe1e3] rounded-[9px] bg-white text-[#002e40] text-[13px] font-sora focus:border-[#254f5f] focus:outline-2 focus:outline-[#254f5f]/15"
          />
        </label>
        <label className="sm:col-span-2 flex flex-col gap-1.5 text-[#002e40] text-xs font-medium font-sora">
          Work email*
          <input
            autoComplete="email"
            name="Work email"
            placeholder="name@company.com"
            required
            type="email"
            className="w-full min-h-[44px] px-3 py-2.5 border border-[#dbe1e3] rounded-[9px] bg-white text-[#002e40] text-[13px] font-sora focus:border-[#254f5f] focus:outline-2 focus:outline-[#254f5f]/15"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[#002e40] text-xs font-medium font-sora">
          Phone*
          <input
            autoComplete="tel"
            name="Phone"
            placeholder="+91 00000 00000"
            required
            type="tel"
            className="w-full min-h-[44px] px-3 py-2.5 border border-[#dbe1e3] rounded-[9px] bg-white text-[#002e40] text-[13px] font-sora focus:border-[#254f5f] focus:outline-2 focus:outline-[#254f5f]/15"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[#002e40] text-xs font-medium font-sora">
          Company*
          <input
            autoComplete="organization"
            name="Company"
            placeholder="Company name"
            required
            className="w-full min-h-[44px] px-3 py-2.5 border border-[#dbe1e3] rounded-[9px] bg-white text-[#002e40] text-[13px] font-sora focus:border-[#254f5f] focus:outline-2 focus:outline-[#254f5f]/15"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[#002e40] text-xs font-medium font-sora">
          Company size*
          <select
            defaultValue=""
            name="Company size"
            required
            className="w-full min-h-[44px] px-3 py-2.5 border border-[#dbe1e3] rounded-[9px] bg-white text-[#002e40] text-[13px] font-sora focus:border-[#254f5f] focus:outline-2 focus:outline-[#254f5f]/15"
          >
            <option disabled value="">
              Select
            </option>
            <option>1–50</option>
            <option>51–250</option>
            <option>251–1,000</option>
            <option>1,001–5,000</option>
            <option>5,000+</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-[#002e40] text-xs font-medium font-sora">
          Country*
          <select
            defaultValue=""
            name="Country"
            required
            className="w-full min-h-[44px] px-3 py-2.5 border border-[#dbe1e3] rounded-[9px] bg-white text-[#002e40] text-[13px] font-sora focus:border-[#254f5f] focus:outline-2 focus:outline-[#254f5f]/15"
          >
            <option disabled value="">
              Select country
            </option>
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Other</option>
          </select>
        </label>
        <label className="sm:col-span-2 flex flex-col gap-1.5 text-[#002e40] text-xs font-medium font-sora">
          Message
          <textarea
            name="Message"
            placeholder="Tell us about your teams and what you’d like to explore."
            rows={4}
            className="w-full min-h-[88px] px-3 py-2.5 border border-[#dbe1e3] rounded-[9px] bg-white text-[#002e40] text-[13px] font-sora resize-y focus:border-[#254f5f] focus:outline-2 focus:outline-[#254f5f]/15"
          />
        </label>
      </div>

      <label className="flex items-start gap-2.5 my-4 text-[#62737a] text-xs leading-normal font-sora cursor-pointer">
        <input
          name="Privacy consent"
          required
          type="checkbox"
          className="mt-0.5 accent-[#254f5f]"
        />
        <span>
          I agree to the{" "}
          <Link href="/privacy-policy" className="text-[#254f5f] underline">
            Privacy Policy
          </Link>{" "}
          and to be contacted by Claripa.
        </span>
      </label>

      <button
        className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 rounded-full border border-[#002e40] bg-[#002e40] text-white font-mono text-[11px] font-medium tracking-[0.02em] uppercase hover:bg-[#174453] transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
        type="submit"
      >
        Request demo <ArrowUpRight aria-hidden="true" size={17} />
      </button>
      <p className="mt-3 text-[#62737a] font-mono text-[10px] text-center uppercase">
        We reply within one business day · No spam
      </p>
    </form>
  );
}
