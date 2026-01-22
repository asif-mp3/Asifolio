"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useView } from "@/contexts/ViewContext";
import { useInView } from "react-intersection-observer";
import AnimatedBody from "../ui/AnimatedBody";
import AnimatedTitle from "../ui/AnimatedTitle";
import { motion } from "framer-motion";
import { Syne } from "next/font/google";
import { Highlighter } from "@/components/ui/highlighter";

const syne = Syne({ subsets: ["latin"] });

export default function About() {
  const { setSectionInView } = useView();

  const { ref, inView } = useInView({
    threshold: 0.2,
    rootMargin: "-100px 0px",
  });

  useEffect(() => {
    if (inView) setSectionInView("about");
  }, [inView, setSectionInView]);

  return (
    <section ref={ref} className="py-20 px-4 md:px-8 lg:px-12" id="about">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className={`uppercase ${syne.className} text-4xl md:text-5xl xl:text-6xl font-bold`}>
          About Me
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[8.5fr_3.5fr] gap-8 mt-6">
        <div className="grid grid-cols-1 antialiased gap-6 text-gray-300 text-lg md:text-xl text-justify">
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            I&apos;m a Computer Science Engineering student at Vellore Institute
            of Technology, Chennai, specializing in cloud-native development and
            DevOps engineering. As an{" "}
            <Highlighter action="highlight" color="#3b82f6" delay={200}>
              AWS Certified Solutions Architect
            </Highlighter>
            , I build scalable microservices architectures using Kubernetes, Docker, and
            CI/CD pipelines. My recent work includes a{" "}
            <Highlighter action="underline" color="#818cf8" delay={400}>
              Voice Analytics Platform
            </Highlighter>{" "}
            for Shopify merchants featuring a RAG-based NL-to-SQL engine,
            deployed on Kubernetes with Redis caching and automated GitHub
            Actions workflows.
          </AnimatedBody>
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            My passion for AI-driven solutions led me to develop an Oil Spill
            Detection System using CNN models trained on Sentinel-1 SAR imagery,
            achieving{" "}
            <Highlighter action="highlight" color="#22c55e" delay={300}>
              97.3% accuracy
            </Highlighter>
            . This project evolved into a Smart Buoy System design, for which I published a{" "}
            <Highlighter action="highlight" color="#3b82f6" delay={500}>
              utility patent
            </Highlighter>{" "}
            (Application No. 202541080926). I&apos;ve also architected serverless systems on
            AWS including KYC verification using Textract and Rekognition, and a
            Cheque Processing platform with Lambda, RDS, and S3.
          </AnimatedBody>
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            As a{" "}
            <Highlighter action="highlight" color="#818cf8" delay={200}>
              Smart India Hackathon 2024 Finalist
            </Highlighter>{" "}
            (38th/673 teams), I continuously push boundaries to deliver production-ready solutions.
            I hold certifications in AWS Solutions Architecture, Microsoft Azure
            AI-900, and Google Cybersecurity, with expertise spanning Python,
            Java, FastAPI, Next.js, and the modern DevOps toolchain.
          </AnimatedBody>
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            Want to know more about my journey and technical expertise?
            <br />
            Here&apos;s{" "}
            <Link
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 underline decoration-blue-400/50 hover:decoration-blue-400 transition-colors duration-300"
              href="https://drive.google.com/file/d/1gJDODsQz8T_-yhJrD1nqri3TW8jA07Pb/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              My Résumé
            </Link>
            .
          </AnimatedBody>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="p-4 rounded-xl bg-[#0a0118]/60 border border-blue-500/20 backdrop-blur-sm"
          >
            <AnimatedTitle
              wordSpace={"mr-[0.5ch]"}
              charSpace={"mr-[0.001em]"}
              className="font-bold antialiased text-lg md:text-xl mb-2 text-blue-400"
            >
              Cloud & DevOps
            </AnimatedTitle>
            <AnimatedBody className="text-gray-400 text-sm md:text-base leading-7">
              AWS (Textract, Rekognition, S3, Lambda, DynamoDB, Bedrock, Lex,
              API Gateway, Step Functions), Azure, Terraform, CI/CD, Docker,
              Kubernetes, Linux.
            </AnimatedBody>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-4 rounded-xl bg-[#0a0118]/60 border border-blue-500/20 backdrop-blur-sm"
          >
            <AnimatedTitle
              wordSpace={"mr-[0.5ch]"}
              charSpace={"mr-[0.001em]"}
              className="font-bold antialiased text-lg md:text-xl mb-2 text-indigo-400"
            >
              UI/UX & Frontend
            </AnimatedTitle>
            <AnimatedBody className="text-gray-400 text-sm md:text-base leading-7">
              Tailwind CSS, Material-UI, React Native, Framer Motion, Figma,
              Cypress, GitHub.
            </AnimatedBody>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="p-4 rounded-xl bg-[#0a0118]/60 border border-blue-500/20 backdrop-blur-sm"
          >
            <AnimatedTitle
              wordSpace={"mr-[0.5ch]"}
              charSpace={"mr-[0.001em]"}
              className="font-bold antialiased text-lg md:text-xl mb-2 text-blue-400"
            >
              Data Science & AI/ML
            </AnimatedTitle>
            <AnimatedBody className="text-gray-400 text-sm md:text-base leading-7">
              CNN, SpaCy, OpenCV, Scikit-learn, TensorFlow, NLP, Computer
              Vision, Tableau, Power BI, Sentinel-1 SAR, AIS Integration.
            </AnimatedBody>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
