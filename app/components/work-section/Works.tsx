import React, { useEffect } from "react";
import FolioCard from "./FolioCard";
import Title from "../ui/Title";
import { useView } from "@/contexts/ViewContext";

// @ts-ignore
import "intersection-observer";
import { useInView } from "react-intersection-observer";
import Timeline from "./Timeline";

export default function Works() {
  const { setSectionInView } = useView();

  const works = [
    {
      title: "Marine Oil Spill Detection",
      gitLink: "https://github.com/asif-mp3/oil-spill-detection",
      liveLink: "https://www.youtube.com/watch?v=h8ATo3vHwoQ",
      about:
        "OILERT uses AIS data and Sentinel-1 SAR imagery to track ships and detect oil spills via a Convolutional Neural Network (CNN), providing real-time alerts and spill spread estimation based on environmental factors like wind and ocean currents.",
      stack: ["react native", "mysql", "websocket api", "cnn", "tailwindcss"],
      img: "/oil.png",
    },
    {
      title: "AWS - Cheque Processing",
      gitLink: "https://github.com/asif-mp3/aws-web-based-cheque-processing",
      liveLink: "https://cheque-mate-doc.vercel.app/",
      about:
      "Cheque-Mate is a fully AWS-powered solution that automates cheque verification using Textract for OCR, S3 for storage, and Lambda for seamless processing. With SNS for real-time alerts and RDS for secure data management, it delivers a highly scalable, efficient, and secure cheque processing system for financial institutions.",  
      stack: ["React", "Textract", "Lambda", "RDS", "Other AWS Services"],
      img: "/VALIDN CREDENTIALS VIEW DASHBOARD.png",
    },
    {
      "title": "ASIFOLIO",
      "gitLink": "https://github.com/asif-mp3/Asifolio.git",
      "liveLink": "https://asifolio.vercel.app/",
      "about": 
      "Asifolio is Asif's portfolio website showcasing projects, skills, and achievements. Built with Next.js for optimized performance, Tailwind CSS for styling, and Framer Motion for smooth animations, it delivers an interactive and responsive user experience. The portfolio is deployed on Vercel, ensuring fast load times and seamless navigation.",
      "stack": ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      "img": "/asifp1.png"
    },
    {
      title: "Financial Fraud Detection",
      gitLink: "https://github.com/asif-mp3/Fraud-Scout",
      liveLink: "https://github.com/asif-mp3/Fraud-Scout",
      about:
        "FraudScout is an AI-driven fraud detection system that identifies anomalies in financial transactions using machine learning. It features real-time monitoring, risk assessment, and an interactive dashboard for data visualization.",
      stack: ["next.js", "typescript", "framer motion", "tailwindcss"],
      img: "/frr.png",
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
      className="flex flex-col gap-6 md:gap-10 pt-[110px]"
      ref={ref}
      id="work"
    >
      <Title>Projects</Title>
      {works.map((work, index) => (
        <FolioCard
          key={index}
          img={work.img}
          title={work.title}
          gitLink={work.gitLink}
          liveLink={work.liveLink}
          about={work.about}
          stack={work.stack}
        />
      ))}

      <Timeline />
    </section>
  );
}
