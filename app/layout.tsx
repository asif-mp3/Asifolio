import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "./components/header-section/Header";
import { ViewProvider } from "@/contexts/ViewContext";
import StarsCanvas from "./components/main/StarsCanvas";

const kumbhSans = Kumbh_Sans({ subsets: ["latin"] });

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
    url: "https://www.asif.me",
    siteName: "www.asif.me",
    images: [
      {
        url: "https://i.ibb.co/FKMqc28/asif-profile.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Asif — Frontend Software Engineer",
      },
      {
        url: "https://i.ibb.co/Y8hBTR4/asif-800.png",
        width: 800,
        height: 800,
        alt: "Mohamed Asif — Frontend Software Engineer",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Asif — Data Science Enthusiast",
    description:
      "Frontend Engineer passionate about crafting next-gen software. I drive growth by crafting user experiences that blend aesthetics with functionality through my design and development skills. I thrive on turning ideas into seamless digital solutions.",
    creator: "@Asif.mp3",
    images: ["https://i.ibb.co/FKMqc28/asif-profile.png"],
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
        className={`${kumbhSans.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
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
