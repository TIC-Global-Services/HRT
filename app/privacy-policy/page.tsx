import { Metadata } from "next";
import Link from "next/link";
import BlurText from "@/reuseable/BlurText";

export const metadata: Metadata = {
  title: "Privacy Policy | Claripa AI",
  description:
    "Learn how Claripa AI collects, uses, and protects your information, and how we handle cookies and analytics.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#F7F6F3] text-[#142938] font-sora min-h-screen py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12 text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-[#F06A25] font-semibold mb-3">
            LEGAL & COMPLIANCE
          </p>
          <BlurText
            as="h1"
            text="Privacy Policy"
            delay={20}
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#002E40] mb-4"
          />
          <p className="text-sm text-zinc-500 font-mono">
            Last updated: March 2026
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[24px] border border-[#ECE8E2] p-8 sm:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.03)] space-y-8 text-sm sm:text-base leading-relaxed text-[#4A5D66]">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#002E40]">1. Introduction</h2>
            <p>
              Claripa AI (&quot;Claripa&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and protect your personal information when you visit our website or interact with our workforce intelligence platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#002E40]">2. How We Use Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, understand user engagement, and support the security of our platform.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#4A5D66]">
              <li>
                <strong className="text-[#002E40]">Essential Cookies:</strong> Required for the fundamental functionality and navigation of our website.
              </li>
              <li>
                <strong className="text-[#002E40]">Analytics Cookies:</strong> Help us measure anonymous usage trends, page interaction patterns, and performance to improve our digital experience.
              </li>
              <li>
                <strong className="text-[#002E40]">Preference Cookies:</strong> Remember your settings, consent choices, and interface preferences.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#002E40]">3. Your Choices & Consent</h2>
            <p>
              When you first visit our site, you can choose to <strong className="text-[#002E40]">Accept</strong> or <strong className="text-[#002E40]">Decline</strong> non-essential cookies via our consent banner. You may change or withdraw your consent at any time by clearing your browser cookies or clicking the cookie settings options on our site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#002E40]">4. Information We Collect</h2>
            <p>
              When you submit a contact or demo request, we collect the details you provide (such as your name, corporate email address, organization name, and message) strictly for the purpose of communicating with you and delivering our enterprise intelligence services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#002E40]">5. Data Security</h2>
            <p>
              We implement enterprise-grade security protocols, encryption in transit and at rest, and strict access controls to safeguard all data collected across our web properties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-[#002E40]">6. Contact Us</h2>
            <p>
              If you have any questions or inquiries about this Privacy Policy or our data practices, please reach out through our{" "}
              <Link href="/contact-us" className="text-[#F06A25] font-semibold underline underline-offset-4 hover:text-orange-600 transition-colors">
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
