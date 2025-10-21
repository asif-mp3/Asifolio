"use client";

import React, { useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Award, ExternalLink, Calendar, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import Title from "../ui/Title"
import { format } from "date-fns"
import { useView } from "@/contexts/ViewContext"

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
const CertificateCard = ({ certificate, index }: { certificate: (typeof certificates)[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="flex flex-col"
    >
      <div className="group h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-white/20">
        <div className="relative p-0 overflow-hidden">
          <div className="overflow-hidden rounded-t-2xl h-48">
            <img
              src={certificate.image || "/placeholder.svg"}
              alt={certificate.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="absolute top-4 right-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg rounded-full flex items-center gap-2 text-xs font-semibold"
            >
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>{certificate.issuer}</span>
            </motion.div>
          </div>
        </div>

        <div className="flex-grow p-5 flex flex-col">
          <h3 className="text-lg font-bold mb-2 text-white line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
            {certificate.title}
          </h3>

          <div className="flex flex-col gap-2 mb-4">
            <div className="text-gray-300 text-sm leading-relaxed">
              {isExpanded ? (
                <p>{certificate.description}</p>
              ) : (
                <p className="inline">
                  {certificate.description}
                  {certificate.description.length > 0 && (
                    <motion.button
                      onClick={() => setIsExpanded(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="ml-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold inline-flex items-center gap-1"
                    >
                      <span>See More</span>
                      <motion.div animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-3 h-3" />
                      </motion.div>
                    </motion.button>
                  )}
                </p>
              )}
              {isExpanded && (
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold inline-flex items-center gap-1"
                >
                  <span>See Less</span>
                  <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-3 h-3" />
                  </motion.div>
                </motion.button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={certificate.date} className="font-medium">
              {format(new Date(certificate.date), "MMM d, yyyy")}
            </time>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {certificate.skills.map((skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full transition-all duration-300 text-xs font-medium"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-5 pt-0">
          <motion.a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm font-semibold"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Certificate</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

const Certificates = () => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const cardsPerPage = 3
  const totalPages = certificates.length > 0 ? Math.ceil(certificates.length / cardsPerPage) : 1
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const { setSectionInView } = useView()

  React.useEffect(() => {
    if (isInView) setSectionInView("certificates")
  }, [isInView, setSectionInView])

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  const paginatedCertificates = certificates.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

  return (
    <section id="certificates" className="min-h-screen py-20 pt-32 md:pt-20" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Title>Certifications</Title>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="wait">
            {paginatedCertificates.map((certificate, index) => (
              <CertificateCard key={certificate.title} certificate={certificate} index={index} />
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-8 mt-12">
          <motion.button
            type="button"
            onClick={handlePrevPage}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentPage === 1}
            className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed bg-white/5 border border-white/10"
                : "bg-gradient-to-br from-blue-500 to-blue-600 border border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/50 text-white"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: currentPage === i + 1 ? 1.2 : 1,
                    opacity: currentPage === i + 1 ? 1 : 0.4,
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentPage === i + 1 ? "w-8 bg-blue-500" : "w-2 bg-white/30 hover:bg-white/50 cursor-pointer"
                  }`}
                  onClick={() => {
                    setCurrentPage(i + 1)
                    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-300 ml-2 whitespace-nowrap">
              {currentPage} / {totalPages}
            </span>
          </div>

          <motion.button
            type="button"
            onClick={handleNextPage}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            disabled={currentPage === totalPages}
            className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed bg-white/5 border border-white/10"
                : "bg-gradient-to-br from-blue-500 to-blue-600 border border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/50 text-white"
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default Certificates
