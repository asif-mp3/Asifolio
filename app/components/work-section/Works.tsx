"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import FolioCard from "./FolioCard"
import Title from "../ui/Title"
import { useView } from "@/contexts/ViewContext"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react"

// @ts-ignore
import "intersection-observer"
import { useInView } from "react-intersection-observer"
import Timeline from "./Timeline"

const AnimatedCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Works() {
  const { setSectionInView } = useView()
  const [currentPage, setCurrentPage] = useState(1)
  const [showPopup, setShowPopup] = useState(false)
  const projectsPerPage = 3
  const sectionRef = useRef<HTMLDivElement>(null)

  const works = [
    {
      title: "Marine Oil Spill Detection System",
      gitLink: "https://github.com/asif-mp3/oil-spill-detection",
      liveLink: "https://www.youtube.com/watch?v=h8ATo3vHwoQ",
      about:
        "Integrated AIS and Sentinel-1 APIs to process 500+ satellite images daily for real-time maritime monitoring. Trained CNN achieving 97.3% accuracy, reducing false positives by 85% with real-time visualization and analytical reporting.",
      img: "/oil2.png",
      showInfo: false,
    },
    {
      title: "E-commerce Product Recommender",
      gitLink:"https://github.com/asif-mp3/smart-shop",
      liveLink: "https://smart-shop-steel.vercel.app",
      about: "Elegant Next.js app that delivers personalized AI-driven product recommendations. It leverages user behavior, onboarding preferences, and product catalog data, applying content-based, collaborative, and profile-driven filtering. Recommendations come with AI-generated explanations via Google Gemini, offering a dashboard-like browsing experience with search, filters, and sorting for seamless product discovery.",
      img: "/smartshop.png",
      showInfo: false,
    },
    {
      title: "Smart Placement Calendar Automation",
      gitLink: "https://github.com/asif-mp3/placement-calendar-automation",
      liveLink: "https://github.com/asif-mp3/placement-calendar-automation",
      about:
        "Automated placement email parsing to verify eligibility and create calendar events with reminders, reducing manual effort by 90%. Ensures accurate event creation by parsing Excel/PDF attachments and email content using regex and Drive API.",
      img: "/calendar.png",
      showInfo: true,
      infoMessage:
        "🎯 Crucial Problem Solving: This project helps numerous students avoid missing important placement opportunities and deadlines. It automatically monitors placement emails, verifies eligibility criteria, and creates calendar reminders - ensuring no student misses out on career opportunities due to overlooked emails.",
    },
    {
      title: "AWS - KYC Verification System",
      gitLink: "https://github.com/asif-mp3/kyc-automator-aws",
      liveLink: "https://main.d2oxvljh00najc.amplifyapp.com/",
      about:
        "Serverless KYC solution that streamlines data extraction and face matching, reducing manual effort by 80%. Leverages AWS Textract for OCR and Rekognition for identity validation, orchestrated via Step Functions with robust API endpoints.",
      img: "/kyc-img.jpg",
      showInfo: false,
    },
    {
      title: "Smart Resume Parser",
      gitLink: "https://github.com/asif-mp3/Resume-Parser-and-Job-Recommendation-System",
      liveLink: "https://github.com/asif-mp3/Resume-Parser-and-Job-Recommendation-System",
      about:
        "Python-based NLP tool transforming unstructured resume PDFs into structured datasets using spaCy, regex, and PdfPlumber. Extracted key candidate metrics and developed regex similarity model to recommend job matches with scalable talent analysis.",
      img: "/smart_resume.png",
      showInfo: false,
    },
    {
      title: "AWS - Cheque Processing System",
      gitLink: "https://github.com/asif-mp3/aws-web-based-cheque-processing",
      liveLink: "https://cheque-mate-doc.vercel.app/",
      about:
        "Fully AWS-powered serverless solution automating cheque verification using Textract for OCR, S3 for storage, Lambda for processing logic, RDS for data management, and CloudWatch with SNS for real-time monitoring and alerts.",
      img: "/cheque_mate.png",
      showInfo: false,
    },
    {
      title: "Smart Medication Dispenser",
      gitLink: "https://github.com/asif-mp3/Smart-Medication-Dispenser",
      liveLink: "https://github.com/asif-mp3/Smart-Medication-Dispenser",
      about:
        "Embedded system project designed to solve medication non-adherence using automation and Bluetooth control. Features Arduino-based dispensing with mobile app integration for scheduling and real-time alerts to improve patient compliance.",
      img: "/medic_dispenser.png",
      showInfo: false,
    },
  ]

  const totalPages = Math.ceil(works.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = works.slice(startIndex, endIndex)

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "-100px 0px",
  })

  useEffect(() => {
    if (inView) setSectionInView("work")
  }, [inView, setSectionInView])

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

  const handleInfoClick = (work: any) => {
    if (work.showInfo) {
      setShowPopup(true)
    }
  }

  return (
    <section className="flex flex-col gap-6 md:gap-10 pt-32 md:pt-20" ref={sectionRef} id="work">
      <Title>Projects</Title>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-6 md:gap-10"
        >
          {currentProjects.map((work, index) => (
            <AnimatedCard key={`${currentPage}-${index}`} index={index}>
              <div className="relative">
                <FolioCard img={work.img} title={work.title} gitLink={work.gitLink} liveLink={work.liveLink} about={work.about} stack={[]} />
                {work.showInfo && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + index * 0.15,
                    }}
                    className="absolute top-[-16px] right-4 z-[5]"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleInfoClick(work)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer border border-red-700"
                      aria-label="Show project info"
                    >
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </motion.div>
                      <span className="whitespace-nowrap">Students Pick</span>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </AnimatedCard>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Info Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl max-w-lg w-full p-6 relative border border-white/20"
            >
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Smart Placement Calendar Automation
              </h3>

              <div className="text-gray-700 dark:text-gray-300 text-justify leading-relaxed">
                <p className="mb-3">
                  <span className="font-semibold text-red-500">🎯 Crucial Problem Solving:</span>
                </p>
                <p>
                  This project helps numerous students avoid missing important placement opportunities and deadlines. It
                  automatically monitors placement emails, verifies eligibility criteria, and creates calendar reminders
                  - ensuring no student misses out on career opportunities due to overlooked emails.
                </p>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 md:gap-8 mt-8">
        <motion.button
          type="button"
          onClick={handlePrevPage}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === 1}
          className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed bg-white/5 border border-white/10"
              : "bg-gradient-to-br from-purple-600 to-purple-500 border border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/50 text-white"
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
                  currentPage === i + 1 ? "w-8 bg-purple-500" : "w-2 bg-white/30 hover:bg-white/50 cursor-pointer"
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
              : "bg-gradient-to-br from-purple-600 to-purple-500 border border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/50 text-white"
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>

      <Timeline />
    </section>
  )
}
