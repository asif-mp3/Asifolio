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
      "Specializing in Full-Stack Development, Data Science, and AWS.",
      "Working on a Startup at V-NEST, focusing on innovative solutions.",
      "Developed AI-driven projects, including fraud detection and real-time ship tracking using AIS data.",
      "Actively involved in coding challenges, hackathons, and leadership roles in technical and cultural events.",
    ],
  },
  
  {
    companyImg: "/SIH-logo.png",
    jobTitle: "Smart India Hackathon-2024",
    company: "Ministry of Education",
    jobType: "Hackathon",
    duration: "Dec 2024",
    stuffIDid: [
      "Developed 'Detecting Oil Spills in Marine Environments Using AIS and Satellite Datasets,' a cutting-edge AI-driven solution.",
      "Engineered a React Native front-end with Material UI, seamlessly integrating AIS and Sentinel-1 SAR APIs for real-time geospatial analysis.",
      "Achieved 99.31% accuracy in oil spill detection using a CNN model, ranking in the Top 45 of 692 teams and advancing to SIH 3rd round.",
    ],
  },
  {
    companyImg: "/Microsoft_Logo.svg",
    jobTitle: "Microsoft Azure AI-900 Certified",
    company: "Microsoft eTrain India",
    jobType: "Certification",
    duration: "Sept 2023",
    stuffIDid: [
      "Achieved a score of 918/1000, mastering AI concepts like Machine Learning, NLP, and Computer Vision.",
      "Gained hands-on experience in deploying AI models using Azure cloud services.",
      "Learned AI workloads, responsible AI practices, and automation in cloud computing.",
    ],
  },  
  {
    companyImg: "/icons8-codechef (1).svg",
    jobTitle: "Coding Club Member",
    company: "CodeChef VIT Chennai",
    jobType: "Club Member",
    duration: "2023 - Present",
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
