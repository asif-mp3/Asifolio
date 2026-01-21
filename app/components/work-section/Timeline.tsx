"use client";
import { Syne } from "next/font/google";
import Title from "../ui/Title";
import TimelineItem from "./TimelineItem";

const syne = Syne({ subsets: ["latin"] });

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
  {
    companyImg: "/tamil-mandram-logo.png",
    jobTitle: "Arignar Anna Tamil Mandram",
    company: "VIT Chennai",
    jobType: "Co-Lead",
    duration: "2023 - 2025",
    stuffIDid: [
      "Directed content strategy and organized successful cultural events including Pongal celebration.",
      "Delivered stage speeches and presentations to inspire and engage audiences at various cultural programs.",
    ],
  },
  {
    companyImg: "/icons8-codechef (1).svg",
    jobTitle: "CodeChef Student Chapter",
    company: "VIT Chennai",
    jobType: "Club Member",
    duration: "2024 - 2025",
    stuffIDid: [
      "Marketing club member coordinating campaigns and promoting coding events to increase student participation.",
      "Actively participated in competitive programming contests, improving algorithmic thinking and problem-solving skills.",
    ],
  },
];
export default function Timeline() {
  return (
    <div id="experience" className="mt-10 md:mt-[110px] scroll-mt-20">
      <Title> my experience</Title>

      {/* THE THING, AFTER WHICH I WOULD DETERMINE THE HEIGHT */}
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
    </div>
  );
}
