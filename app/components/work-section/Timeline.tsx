"use client";

import { Syne } from "next/font/google";
import Title from "../ui/Title";
import TimelineItem from "./TimelineItem";
import FolioCard from "./FolioCard"; // adjust import path as needed

const syne = Syne({ subsets: ["latin"] });

// ---------------- MAIN TIMELINE DATA ----------------
const TimelineData = [
  {
    companyImg: "/VITLOGO.png",
    jobTitle: "B.Tech CSE Student",
    company: "VIT Chennai",
    jobType: "Education",
    duration: "2022 - 2026",
    stuffIDid: [
      "Pursuing Computer Science and Engineering with focus on Cloud Architecture, Machine Learning, and Full-Stack Development.",
      "Successfully delivered 7+ innovative projects integrating AWS cloud services and machine learning into real-world applications.",
      "Secured 38th rank among 673 teams in VITISH hackathon and represented VIT at Smart India Hackathon 2024 nationals.",
    ],
  },
  {
    companyImg: "/nstore_logo.png",
    jobTitle: "AWS Engineer Intern",
    company: "nStore Retech Pvt. Ltd.",
    jobType: "Internship",
    duration: "May 2025 – July 2025",
    stuffIDid: [
      "Architected serverless Cheque Processing System using AWS Textract, Lambda, S3, RDS, and API Gateway, reducing manual processing time significantly.",
      "Designed serverless KYC verification system leveraging Textract for OCR and Rekognition for face matching, reducing manual effort by 80%.",
      "Built real-time monitoring with CloudWatch and SNS for instant anomaly alerts, and explored CI/CD pipelines using Terraform and AWS CodePipeline.",
    ],
  },
  {
    companyImg: "/SIH-logo.png",
    jobTitle: "Smart India Hackathon 2024",
    company: "Ministry of Education",
    jobType: "Hackathon",
    duration: "Dec 2024",
    stuffIDid: [
      "Developed oil spill detection system using CNN achieving 97.3% accuracy, reducing false positives by 85% through AIS and Sentinel-1 SAR data integration.",
      "Built React Native frontend with real-time visualization processing 500+ satellite images daily for maritime monitoring.",
      "Published utility patent (Application No. 202541080926) for Smart Buoy System with automated oil spill detection and response capabilities.",
    ],
  },
];

// ---------------- CLUB DATA ----------------
const ClubData = [
  {
    companyImg: "/tamil-mandram-logo.png",
    title: "Arignar Anna Tamil Mandram",
    role: "Co-Lead",
    duration: "2023 - 2025",
    description: [
      "Directed content strategy and organized successful cultural events including Pongal celebration.",
      "Delivered stage speeches and presentations to inspire and engage audiences at various cultural programs.",
    ],
  },
  {
    companyImg: "/icons8-codechef (1).svg",
    title: "CodeChef Student Chapter",
    role: "Club Member",
    duration: "2024 - 2025",
    description: [
      "Marketing club member coordinating campaigns and promoting coding events to increase student participation.",
      "Actively participated in competitive programming contests, improving algorithmic thinking and problem-solving skills.",
    ],
  },
];

// ---------------- COMPONENT ----------------
export default function Timeline() {
  return (
    <div className="mt-10 md:mt-[110px]">
      {/* MAIN EXPERIENCE SECTION */}
      <Title>my experience</Title>

      <div className="flex mt-6 gap-4 pl-3">
        {/* Vertical line indicator */}
        <div className="w-[3px] bg-gradient-to-b from-white to-transparent rounded-full" />

        {/* Timeline items */}
        <div className="flex flex-col gap-10">
          {TimelineData.map((item, index) => (
            <TimelineItem
              key={index}
              companyImg={item.companyImg}
              jobTitle={item.jobTitle}
              company={item.company}
              jobType={item.jobType}
              duration={item.duration}
              stuffIDid={item.stuffIDid}
            />
          ))}
        </div>
      </div>

      {/* CLUBS & ACTIVITIES SECTION */}
      <div className="mt-20">
        <Title>Clubs & Activities</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {ClubData.map((club, index) => (
            <FolioCard
              key={index}
              image={club.companyImg}
              title={club.title}
              role={club.role}
              duration={club.duration}
              description={club.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
