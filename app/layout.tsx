import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "./components/header-section/Header";
import { ViewProvider } from "@/contexts/ViewContext";
import StarsCanvas from "./components/main/StarsCanvas";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asif-Folio",
  description:
    "A Frontend Engineer passionate about crafting next-gen software. I drive growth by crafting user experiences that blend aesthetics with functionality through my design and development skills. I thrive on turning ideas into seamless digital solutions.",
  keywords: [
    "frontend",
    "react",
    "tech",
    "creative developer",
    "UI development",
    "frontend engineer",
    "developer portfolio",
    "creative development",
    "nigeria",
    "software",
    "software developer",
    "software engineer",
    "portfolio",
  ],
  openGraph: {
    title: "Asif-Folio",
    description:
      "Frontend Engineer passionate about crafting next-gen software and creative websites. I drive growth by crafting user experiences that blend aesthetics with functionality through my design and development skills. I thrive on turning ideas into seamless digital solutions.",
    url: "https://asifolio.vercel.app",
    siteName: "asifolio.vercel.app",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Asif — Frontend Software Engineer",
    description:
      "Frontend Engineer passionate about crafting next-gen software. I drive growth by crafting user experiences that blend aesthetics with functionality through my design and development skills. I thrive on turning ideas into seamless digital solutions.",
    creator: "@asifitee",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      "max-image-preview": "large",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <StarsCanvas />
        <ViewProvider>
          <Header />
          <main className="relative z-10 max-w-[90%] xl:max-w-[1223px] w-full mx-auto">
            {children}
          </main>
        </ViewProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
