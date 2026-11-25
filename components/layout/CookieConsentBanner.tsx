"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "claripa_cookie_consent";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  // loadAnalytics() function left empty as requested
  const loadAnalytics = () => {
    // add GA here later
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (consent === "accepted") {
        loadAnalytics();
      } else if (!consent) {
        // Delay slightly for smooth entrance
        timer = setTimeout(() => {
          setIsVisible(true);
        }, 400);
      }
    } catch {
      // If localStorage is blocked (e.g. private browsing), default to visible
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 400);
    }

    // Optional event listener to allow users to reopen banner from Footer "Cookie Settings"
    const handleReopen = () => setIsVisible(true);
    window.addEventListener("open-cookie-banner", handleReopen);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-cookie-banner", handleReopen);
    };
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch {
      // Ignore storage errors
    }
    loadAnalytics();
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    } catch {
      // Ignore storage errors
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      role="region"
      className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-[9999] bg-[#0E2433]/95 backdrop-blur-md text-white rounded-2xl border border-white/15 px-5 py-4 sm:px-6 sm:py-4.5 shadow-[0_16px_50px_rgba(0,18,32,0.45)] transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
        {/* Consent description */}
        <p className="font-sora text-xs sm:text-[13.5px] leading-relaxed text-white/90 m-0">
          We use cookies to enhance your experience on our website. By continuing to use this website, you consent to the use of cookies.{" "}
          <Link
            href="/privacy-policy"
            className="text-white underline underline-offset-4 decoration-white/60 hover:text-[#F06A25] hover:decoration-[#F06A25] transition-colors font-medium whitespace-nowrap"
          >
            Privacy Policy
          </Link>
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 rounded-xl bg-[#F06A25] hover:bg-[#D95B1A] text-white font-geist-mono text-xs font-bold tracking-wider uppercase transition-all shadow-sm active:scale-95 cursor-pointer text-center"
          >
            ACCEPT
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="flex-1 sm:flex-initial px-5 sm:px-6 py-2.5 rounded-xl border border-white/25 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white font-geist-mono text-xs font-bold tracking-wider uppercase transition-all active:scale-95 cursor-pointer text-center"
          >
            DECLINE
          </button>
        </div>
      </div>
    </aside>
  );
}
