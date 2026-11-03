import type { Metadata } from "next";
import { Geist_Mono, Geist, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScroller from "@/reuseable/SmoothScroller";
import Navabar from "@/reuseable/Navabar";
import Footer from "@/reuseable/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: {
    default: "Claripa AI | The Future of People Decisions",
    template: "%s | Claripa AI",
  },
  description:
    "Claripa connects workforce data, performance signals and AI-powered intelligence to help HR leaders see what matters, understand what's next and act with confidence.",
  keywords: [
    "Claripa",
    "People Intelligence",
    "Workforce Analytics",
    "HR AI",
    "Employee Retention",
    "Performance Signals",
  ],
  authors: [{ name: "Claripa AI" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://claripa.ai"),
  openGraph: {
    title: "Claripa AI | The Future of People Decisions",
    description:
      "Claripa connects workforce data, performance signals and AI-powered intelligence to help HR leaders see what matters.",
    url: "https://claripa.ai",
    siteName: "Claripa AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claripa AI | The Future of People Decisions",
    description:
      "Claripa connects workforce data, performance signals and AI-powered intelligence to help HR leaders see what matters.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",    
        
      )}
    >
      <body className={`min-h-full ${geist.variable} ${geistMono.variable} ${sora.variable} flex flex-col font-sans bg-background text-foreground selection:bg-[#FED7AA] selection:text-[#9A3412]`}>
        <SmoothScroller>
          <Navabar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroller>
      </body>
    </html>
  );
}
