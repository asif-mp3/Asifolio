"use client";

import { Syne } from "next/font/google";
import { motion } from "framer-motion";
import Title from "../ui/Title";
import TimelineItem from "./TimelineItem";
import FolioCard from "./FolioCard";

const syne = Syne({ subsets: ["latin"] });

// =================== DATA ===================

const TimelineData = [
  {
    companyImg: "/VITLOGO.png",
    jobTitle: "B.Tech CSE Student",
    company: "VIT Chennai",
    jobType: "Education",
    duration: "2022 - 2026",
    stuffIDid: [
      "Pursuing Computer Science and Engineering with focus on Cloud Architecture, Machine Learning, and Full-Stack Development.",
      "Delivered 7+ projects integrating AWS cloud services and machine learning into real-world applications.",
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
      "Architected serverless Cheque Processing System using AWS Textract, Lambda, S3, RDS, and API Gateway.",
      "Designed KYC verification system leveraging Textract OCR and Rekognition face matching — 80% manual effort reduction.",
      "Implemented CloudWatch + SNS for anomaly alerts; explored CI/CD with Terraform and CodePipeline.",
    ],
  },
  {
    companyImg: "/SIH-logo.png",
    jobTitle: "Smart India Hackathon 2024",
    company: "Ministry of Education",
    jobType: "Hackathon",
    duration: "Dec 2024",
    stuffIDid: [
      "Developed oil spill detection system using CNN with 97.3% accuracy via AIS and Sentinel-1 SAR data integration.",
      "Built React Native frontend with real-time visualization processing 500+ satellite images/day.",
      "Filed utility patent (App No. 202541080926) for Smart Buoy System with automated oil spill detection.",
    ],
  },
];

// Clubs displayed using FolioCard
const ClubsData = [
  {
    img: "/tamil-mandram-logo.png",
    title: "Arignar Anna Tamil Mandram",
    liveLink: "#",
    about: (
      <div className="flex flex-col gap-2 text-white/80 text-sm sm:text-base">
        <p className="font-semibold text-white/90">Co-Lead | VIT Chennai</p>
        <p className="italic text-white/60">2023 - 2025</p>
        <p>• Directed content strategy and organized successful cultural events including Pongal celebration.</p>
        <p>• Delivered stage speeches and presentations to inspire and engage audiences at various cultural programs.</p>
      </div>
    ),
    stack: ["Leadership", "Cultural", "Public Speaking"],
  },
  {
    img: "/icons8-codechef (1).svg",
    title: "CodeChef Student Chapter",
    liveLink: "#",
    about: (
      <div className="flex flex-col gap-2 text-white/80 text-sm sm:text-base">
        <p className="font-semibold text-white/90">Club Member | VIT Chennai</p>
        <p className="italic text-white/60">2024 - 2025</p>
        <p>• Coordinated marketing campaigns and promoted coding events to boost student participation.</p>
        <p>• Participated in competitive programming contests, improving algorithmic and problem-solving skills.</p>
      </div>
    ),
    stack: ["Competitive Programming", "Marketing", "Community"],
  },
];

// =================== COMPONENT ===================

export default function Timeline() {
  return (
    <section className="relative w-full py-20 px-6 sm:px-12 md:px-24 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Experience + Education */}
        <Title>my experience</Title>

        <div className="flex mt-6 gap-4 pl-3">
          <div className="w-3 h-auto bg-linear-to-b from-white to-transparent" />

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

        {/* Clubs Section */}
        <motion.div
          className="mt-24 flex flex-col gap-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Title>Club Involvement</Title>

          {ClubsData.map((club, index) => (
            <FolioCard
              key={index}
              img={club.img}
              title={club.title}
              liveLink={club.liveLink}
              about={club.about}
              stack={club.stack}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
