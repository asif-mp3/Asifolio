"use client";

import Hero from "./components/hero-section/Hero";
import Works from "./components/work-section/Works";
import Certificates from "./components/work-section/Certificates";
import About from "./components/about-section/About";
import Contact from "./components/contact+footer/Contact";
import Footer from "./components/contact+footer/Footer";
import Skills from "./components/main/Skills";
import Encryption from "./components/main/Encryption";
import { initialBlobityOptions } from "@/utils/blobity.config";
import useBlobity from "blobity/lib/react/useBlobity";

export default function Home() {
  useBlobity(initialBlobityOptions);

  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <Works />
      <Certificates />
      <Encryption />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
