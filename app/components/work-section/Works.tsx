"use client";

import { useEffect, useRef } from "react";
import { useView } from "@/contexts/ViewContext";
import { motion } from "framer-motion";
import Timeline from "./Timeline";
import BentoProjectGrid from "./BentoProjectGrid";
import { Syne } from "next/font/google";

// @ts-ignore
import "intersection-observer";
import { useInView } from "react-intersection-observer";

const syne = Syne({ subsets: ["latin"] });

export default function Works() {
  const { setSectionInView } = useView();
  const sectionRef = useRef<HTMLDivElement>(null);

  const works = [
    {
      title: "Voice Analytics Platform for Shopify Merchants",
      gitLink: "https://github.com/asif-mp3/voice-analytics-shopify",
      liveLink: "https://drive.google.com/file/d/1S3cNhyIm48LlofZiVq2RYnL8p8oxH_sa/view?usp=sharing",
      about: `Built a RAG-based NL-to-SQL engine using ChromaDB with text-embedding-3-small for schema retrieval and DuckDB for query execution. Deployed 2-pod microservices architecture on Kubernetes with rolling updates and health probes. Implemented Redis caching layer for sales analytics queries and built CI/CD pipeline with GitHub Actions for automated Docker builds and K8s deployments.`,
      stack: ["FastAPI", "Next.js", "Kubernetes", "Docker", "Redis", "RAG"],
      img: "/voice-analytics.png",
      showInfo: false,
    },
    {
      title: "Deep Learning–Based Oil Spill Detection System",
      gitLink: "https://github.com/asif-mp3/oil-spill-detection",
      liveLink: "https://www.youtube.com/watch?v=h8ATo3vHwoQ",
      about: `Developed a deep learning system that automatically detects oil spills using satellite images from Sentinel-1 and vessel data from AIS. A CNN model trained on real maritime data achieved 97.3% accuracy and reduced false detections by 85%. The system analyzes over 500 satellite images daily through a FastAPI backend and provides real-time visualization for marine safety monitoring.`,
      stack: ["FastAPI", "CNN", "Sentinel-1 SAR", "AIS"],
      img: "/oil2.png",
      showInfo: false,
    },
    {
      title: "E-commerce Product Recommender",
      gitLink: "https://github.com/asif-mp3/smart-shop",
      liveLink: "https://smart-shop-steel.vercel.app",
      about: `A Next.js-based AI recommender that personalizes product suggestions for users using browsing behavior and preferences. Combines content-based and collaborative filtering methods with Google Gemini integration for AI-generated explanations.`,
      stack: ["Next.js", "Google Gemini API", "AI Recommender", "Tailwind CSS"],
      img: "/s8.png",
      showInfo: false,
    },
    {
      title: "Smart Placement Calendar Automation",
      gitLink: "https://github.com/asif-mp3/placement-calendar-automation",
      liveLink: "https://github.com/asif-mp3/placement-calendar-automation",
      about: `Automated the placement notification process using Google APIs to parse emails, check eligibility, and schedule calendar reminders. Reduces manual effort by 90% by reading placement emails and automatically creating event reminders.`,
      stack: ["Google Apps Script", "Gmail API", "Calendar API", "JavaScript"],
      img: "/calendar.png",
      showInfo: true,
      infoMessage: `This system ensures students never miss placement opportunities by automating eligibility verification and event scheduling directly from email data.`,
    },
    {
      title: "AWS – KYC Verification System",
      gitLink: "https://github.com/asif-mp3/kyc-automator-aws",
      liveLink: "https://main.d2oxvljh00najc.amplifyapp.com/",
      about: `Designed a serverless identity verification platform using AWS Textract for OCR and Rekognition for face matching. Reduced manual verification efforts by 80%.`,
      stack: ["AWS Textract", "AWS Rekognition", "Lambda", "API Gateway"],
      img: "/kkyc.png",
      showInfo: false,
    },
    {
      title: "Smart Resume Parser – NLP Tool",
      gitLink: "https://github.com/asif-mp3/Resume-Parser-and-Job-Recommendation-System",
      liveLink: "https://github.com/asif-mp3/Resume-Parser-and-Job-Recommendation-System",
      about: `Python NLP system to extract structured data from resume PDFs using spaCy and regex. Recommends suitable jobs based on skills and experience.`,
      stack: ["spaCy", "Regex", "PdfPlumber"],
      img: "/smart-resume.png",
      showInfo: false,
    },
    {
      title: "AWS – Cheque Processing System",
      gitLink: "https://github.com/asif-mp3/aws-web-based-cheque-processing",
      liveLink: "https://cheque-mate-doc.vercel.app/",
      about: `Serverless cheque verification platform using AWS Textract, Lambda, RDS, and S3. Automates handwritten cheque reading and validation.`,
      stack: ["AWS Textract", "Lambda", "RDS", "S3"],
      img: "/cheque_mate.png",
      showInfo: false,
    },
    {
      title: "Smart Medication Dispenser",
      gitLink: "https://github.com/asif-mp3/Smart-Medication-Dispenser",
      liveLink: "https://github.com/asif-mp3/Smart-Medication-Dispenser",
      about: `An IoT and Arduino-based device designed to help patients take medicines on time. Controlled via Bluetooth, it dispenses tablets at scheduled times and notifies users with alerts. Useful for elderly or chronically ill patients to ensure adherence to prescriptions.`,
      stack: ["Arduino", "IoT", "Bluetooth"],
      img: "/medic_dispenser.png",
      showInfo: false,
    },
  ];

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  useEffect(() => {
    if (inView) setSectionInView("work");
  }, [inView, setSectionInView]);

  return (
    <section
      className="flex flex-col gap-6 md:gap-10 py-20 px-4 md:px-8 lg:px-12"
      ref={sectionRef}
      id="work"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className={`uppercase ${syne.className} text-4xl md:text-5xl xl:text-6xl font-bold`}>
          My Projects
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <div ref={ref}>
        <BentoProjectGrid projects={works} />
      </div>

      <Timeline />
    </section>
  );
}
