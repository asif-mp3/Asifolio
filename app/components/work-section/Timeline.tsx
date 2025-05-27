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
      "Specializing in AWS Cloud Architecture, Data Science and Full-Stack Development with 2+ years hands-on experience.",
      // "Working on a Startup at V-NEST, focusing on innovative solutions.",
      "Successfully delivered 7+ innovative projects integrating cloud solutions and effective algorithms into real-world applications.",
      "Actively involved in coding challenges, hackathons, and leadership roles in technical and cultural events.",
    ],
  },
  {
    companyImg: "/nstore_logo.png",
    jobTitle: "AWS DevOps Intern",
    company: "nStore Retech Pvt. Ltd.",
    jobType: "Internship",
    duration: "May 2025 – July 2025",
    stuffIDid: [
      "Engineered KYC automation system for their store registration platform utilizing 12 AWS services, reducing manual verification time by 80%",
      "Implemented CI/CD pipelines and infrastructure-as-code practices, achieving 95% deployment success rate",
      "Applied PDLC and SDLC methodologies while designing cloud architecture solutions that improved system scalability by 3x",
    ],
  },
  {
  companyImg: "/SIH-logo.png",
  jobTitle: "Smart India Hackathon-2024",
  company: "Ministry of Education",
  jobType: "Hackathon",
  duration: "Dec 2024",
  stuffIDid: [
    "Developed AI-driven oil spill detection solution using AIS and Satellite datasets, achieving 99.31% accuracy with CNN model.",
    "Engineered React Native front-end with Material UI, integrating AIS and Sentinel-1 SAR APIs for real-time geospatial analysis.",
    "Published Utility Patent for Smart Buoy Oil Spill Detection System with SAR Imagery and Deep Learning Algorithm.",
  ],
},

  {
    companyImg: "/icons8-codechef (1).svg",
    jobTitle: "Coding Club Member",
    company: "CodeChef VIT Chennai",
    jobType: "Club Member",
    duration: "2023 - 2025",
    stuffIDid: [
      "Actively participated in coding contests, improving problem-solving and algorithmic thinking skills.",
      "Guided juniors in data structures, algorithms, and competitive programming strategies.",
      "Helped organize technical workshops and coding events to foster a competitive programming culture.",
    ],
  },
];

export default function Timeline() {
  return (
    <div className="mt-10 md:mt-[110px]">
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
