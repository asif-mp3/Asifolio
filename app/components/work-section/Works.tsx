import React, { useEffect, useState } from "react";
import FolioCard from "./FolioCard";
import Title from "../ui/Title";
import { useView } from "@/contexts/ViewContext";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// @ts-ignore
import "intersection-observer";
import { useInView } from "react-intersection-observer";
import Timeline from "./Timeline";

export default function Works() {
  const { setSectionInView } = useView();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const works = [
    {
      title: "Marine Oil Spill Detection",
      gitLink: "https://github.com/asif-mp3/oil-spill-detection",
      liveLink: "https://www.youtube.com/watch?v=h8ATo3vHwoQ",
      about:
      "OILERT uses AIS data and Sentinel-1 SAR imagery to track ships and detect oil spills via CNN, providing real-time alerts and spill spread estimation based on environmental factors...",
      stack: ["react native", "mysql", "websocket api", "cnn", "tailwindcss"],
      img: "/oil2.png",
    },
    {
      title: "AWS - KYC Automation",
      gitLink: "https://github.com/asif-mp3/kyc-automator-aws",
      liveLink: "https://main.d2oxvljh00najc.amplifyapp.com/",
      about:
        "Automated KYC verification system for e-commerce store registration using serverless architecture. Features document upload to S3, automated verification with AWS Textract and Rekognition, Lambda-triggered processing and admin portal...",
      stack: ["AWS Lambda", "S3", "Textract", "Rekognition", "DynamoDB", "CloudWatch"],
      img: "/kyc_auto.png",
    },
    {
      title: "AWS - Cheque Processing",
      gitLink: "https://github.com/asif-mp3/aws-web-based-cheque-processing",
      liveLink: "https://cheque-mate-doc.vercel.app/",
      about:
        "Cheque-Mate is a fully AWS-powered solution that automates cheque verification using Textract for OCR, S3 for storage and Lambda for seamless processing with real-time alerts and secure data management...",
      stack: ["React", "Textract", "Lambda", "RDS", "Other AWS Services"],
      img: "/cheque_mate.png",
    },
    {
      title: "Smart Medication Dispenser",
      gitLink: "https://github.com/asif-mp3/Smart-Medication-Dispenser",
      liveLink: "https://github.com/asif-mp3/Smart-Medication-Dispenser",
      about:
        "An embedded system project designed to solve medication non-adherence using automation and Bluetooth control. Features Arduino-based dispensing with mobile app integration for scheduling and real-time alerts...",
      stack: ["Arduino UNO", "L298N Motor Driver", "HC-05 Bluetooth", "C++"],
      img: "/medic_dispenser.png",
    },
    {
      title: "Smart Resume Parser",
      gitLink: "https://github.com/asif-mp3/Resume-Parser-and-Job-Recommendation-System",
      liveLink: "https://github.com/asif-mp3/Resume-Parser-and-Job-Recommendation-System",
      about:
        "An advanced NLP-based system that parses resumes from PDF format and extracts structured information like Name, Email, Skills, Experience and Degree. Uses spaCy NLP with custom regex for accurate data extraction...",
      stack: ["Python", "spaCy", "pdfplumber", "scikit-learn", "pandas", "NLP"],
      img: "/smart_resume.png",
    },
  ];

  // Calculate pagination
  const totalPages = Math.ceil(works.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = works.slice(startIndex, endIndex);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  useEffect(() => {
    if (inView) setSectionInView("work");
  }, [inView, setSectionInView]);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <section
      className="flex flex-col gap-6 md:gap-10 pt-[110px]"
      ref={ref}
      id="work"
    >
      <Title>Projects</Title>
      
      {/* Projects Display - Original Layout */}
      {currentProjects.map((work, index) => (
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

      {/* Pagination Controls - Same design as your image */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <motion.button
          type="button"
          onClick={handlePrevPage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === 1}
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out ${
            currentPage === 1
              ? "border-gray-300 dark:border-gray-600 opacity-50 cursor-not-allowed"
              : "border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white hover:border-blue-500"
          }`}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>

        <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
          <span>{currentPage}</span>
          <span className="text-gray-500">/</span>
          <span>{totalPages}</span>
        </div>

        <motion.button
          type="button"
          onClick={handleNextPage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === totalPages}
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out ${
            currentPage === totalPages
              ? "border-gray-300 dark:border-gray-600 opacity-50 cursor-not-allowed"
              : "border-gray-300 dark:border-gray-600 hover:bg-blue-500 hover:text-white hover:border-blue-500"
          }`}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      <Timeline />
    </section>
  );
}
