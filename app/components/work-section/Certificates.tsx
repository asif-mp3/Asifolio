"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Title from "../ui/Title";
import { format } from "date-fns";

const certificates = [
  {
    title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    issuer: "Amazon Web Services (AWS)",
    date: "2024-10-17",
    description:
      "Validated expertise in designing resilient, high-performing, secure, and cost-optimized architectures on AWS.",
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "VPC", "RDS", "CloudFormation", "Solution Design"],
    image: "/aws-cert.jpg",
    link: "https://www.credly.com/badges/82ec75b5-203c-47dc-b2e4-d540cdc78a1f/public_url"
  },
  {
    title: "Google: Foundations of Cybersecurity",
    issuer: "Google",
    date: "2025-03-23",
    description: "Cybersecurity principles, INFOSEC, and NIST Cybersecurity Framework fundamentals.",
    skills: ["Cybersecurity", "INFOSEC", "CSF", "Risk Management"],
    image: "/cyberg.jpeg",
    link: "https://www.coursera.org/account/accomplishments/verify/YU2WUX3EDFWE",
  },
  {
    title: "Azure AI-900: Microsoft AI Fundamentals",
    issuer: "Microsoft",
    date: "2024-04-20",
    description: "Core AI concepts, Azure AI services, machine learning models, and responsible AI principles.",
    skills: ["Azure", "AI Ethics", "Power BI"],
    image: "/ai900img.png",
    link: "https://drive.google.com/file/d/1XiEKw013Na4a0UoEnRjyh_oy7KiniZxj/view?usp=sharing",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2024-03-30",
    description: "Front-end and back-end development using React, Node.js, Express, and MongoDB.",
    skills: ["React.js", "Node.js", "MongoDB"],
    image: "/full stack img.jpg",
    link: "https://www.udemy.com/certificate/UC-281fff44-5721-4581-9d81-96e1eea63333/",
  },
  {
    title: "Adv. Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    date: "2025-03-05",
    description: "Supervised learning techniques: linear regression, logistic regression, and gradient descent.",
    skills: ["Linear Regression", "Logistic Regression", "Gradient Descent"],
    image: "/macl.jpg",
    link: "https://coursera.org/share/3c450b82f786504df292321f778960e4",
  },
  {
    title: "Advanced SQL & Database Optimization",
    issuer: "Coursera Project Network",
    date: "2024-02-15",
    description: "Complex SQL queries, database performance optimization, and relational database techniques.",
    skills: ["SQL", "Stored Procedures", "Query Optimization"],
    image: "/relnsqlimg.jpeg",
    link: "https://www.coursera.org/account/accomplishments/verify/NC9S2YNTJ5WE",
  },
  {
    title: "Generative AI: Prompt Engineering",
    issuer: "IBM (Coursera)",
    date: "2024-11-05",
    description: "AI prompt engineering fundamentals and prompt patterns. Grade: 93.75%.",
    skills: ["Artificial Intelligence (AI)", "Prompt Engineering", "ChatGPT", "Prompt Patterns", "Generative AI"],
    image: "/prompt.png",
    link: "https://www.coursera.org/account/accomplishments/verify/T4GY61DH6ZWK",
  },
  {
    title: "Algorithm Design & Analysis Masterclass",
    issuer: "Udemy (Up Degree)",
    date: "2024-08-16",
    description: "Algorithm design, analysis, time complexity, sorting, and graph theory.",
    skills: ["Algorithm Analysis", "Time Complexity", "Sorting Algorithms", "Graph Theory"],
    image: "/Daa img.png",
    link: "https://www.udemy.com/certificate/UC-c13adf8d-ac66-4560-9e8f-f28bbe758137/",
  },
];

const Certificates = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const cardsPerPage = 3;
  const totalPages = certificates.length > 0 ? Math.ceil(certificates.length / cardsPerPage) : 1;

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const paginatedCertificates = certificates.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  return (
    <section id="certificates" className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Added spacing above the title */}
        <div className="mt-16 mb-12">
          <Title>Certifications</Title>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {paginatedCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col"
              >
                <div className="group h-full flex flex-col overflow-hidden rounded-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">
                  <div className="relative p-0">
                    <div className="overflow-hidden rounded-t-2xl">
                      <img
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.title}
                        className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="px-4 py-2 bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-gray-200 backdrop-blur-md border-0 shadow-lg rounded-full flex items-center gap-2">
                        <Award className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{certificate.issuer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow p-5">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                      {certificate.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm leading-relaxed line-clamp-3">
                      {certificate.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={certificate.date} className="font-medium">
                        {format(new Date(certificate.date), "MMMM d, yyyy")}
                      </time>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill) => (
                        <div
                          key={skill}
                          className="bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300 border-0 px-3 py-1 rounded-full transition-colors duration-300 text-xs"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 pt-0 border-0">
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-2 flex items-center justify-center gap-2 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Certificate</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-12 gap-6">
          <motion.button
            type="button"
            onClick={handlePrevPage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:border-blue-500"
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
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:border-blue-500"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
