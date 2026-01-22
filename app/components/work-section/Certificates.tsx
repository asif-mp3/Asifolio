"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useView } from "@/contexts/ViewContext";
import CertificateCarousel from "./CertificateCarousel";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"] });

const certificates = [
  {
    title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    issuer: "Amazon Web Services",
    date: "2024-10-17",
    description:
      "Validated expertise in designing resilient, high-performing, secure, and cost-optimized architectures on AWS.",
    image: "/aws-cert.jpg",
    link: "https://www.credly.com/badges/82ec75b5-203c-47dc-b2e4-d540cdc78a1f/public_url",
  },
  {
    title: "Google: Foundations of Cybersecurity",
    issuer: "Google",
    date: "2025-03-23",
    description:
      "Cybersecurity principles, INFOSEC, and NIST Cybersecurity Framework fundamentals.",
    image: "/cyberg.jpeg",
    link: "https://www.coursera.org/account/accomplishments/verify/YU2WUX3EDFWE",
  },
  {
    title: "Azure AI-900: Microsoft AI Fundamentals",
    issuer: "Microsoft",
    date: "2024-04-20",
    description:
      "Core AI concepts, Azure AI services, machine learning models, and responsible AI principles.",
    image: "/ai900img.png",
    link: "https://drive.google.com/file/d/1XiEKw013Na4a0UoEnRjyh_oy7KiniZxj/view?usp=sharing",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2024-03-30",
    description:
      "Front-end and back-end development using React, Node.js, Express, and MongoDB.",
    image: "/full stack img.jpg",
    link: "https://www.udemy.com/certificate/UC-281fff44-5721-4581-9d81-96e1eea63333/",
  },
  {
    title: "Adv. Machine Learning: Regression & Classification",
    issuer: "DeepLearning.AI",
    date: "2025-03-05",
    description:
      "Supervised learning techniques: linear regression, logistic regression, and gradient descent.",
    image: "/macl.jpg",
    link: "https://coursera.org/share/3c450b82f786504df292321f778960e4",
  },
  {
    title: "Advanced SQL & Database Optimization",
    issuer: "Coursera",
    date: "2024-02-15",
    description:
      "Complex SQL queries, database performance optimization, and relational database techniques.",
    image: "/relnsqlimg.jpeg",
    link: "https://www.coursera.org/account/accomplishments/verify/NC9S2YNTJ5WE",
  },
  {
    title: "Generative AI: Prompt Engineering",
    issuer: "IBM",
    date: "2024-11-05",
    description:
      "AI prompt engineering fundamentals and prompt patterns. Grade: 93.75%.",
    image: "/prompt.png",
    link: "https://www.coursera.org/account/accomplishments/verify/T4GY61DH6ZWK",
  },
  {
    title: "Algorithm Design & Analysis Masterclass",
    issuer: "Udemy",
    date: "2024-08-16",
    description:
      "Algorithm design, analysis, time complexity, sorting, and graph theory.",
    image: "/Daa img.png",
    link: "https://www.udemy.com/certificate/UC-c13adf8d-ac66-4560-9e8f-f28bbe758137/",
  },
];

const Certificates = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { setSectionInView } = useView();

  React.useEffect(() => {
    if (isInView) setSectionInView("certificates");
  }, [isInView, setSectionInView]);

  return (
    <section
      id="certificates"
      className="py-20 px-4 md:px-8 lg:px-12"
      ref={sectionRef}
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
          Certifications
        </h2>
      </motion.div>

      {/* Certificate Carousel */}
      <CertificateCarousel certificates={certificates} />
    </section>
  );
};

export default Certificates;
