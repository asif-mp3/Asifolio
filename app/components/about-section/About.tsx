"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Syne } from "next/font/google"
import { useView } from "@/contexts/ViewContext"
import { useInView } from "react-intersection-observer"
import AnimatedBody from "../ui/AnimatedBody"
import AnimatedTitle from "../ui/AnimatedTitle"

const syne = Syne({ subsets: ["latin"] })

export default function About() {
  const { setSectionInView } = useView()

  const { ref, inView } = useInView({
    threshold: 0.2,
    rootMargin: "-100px 0px",
  })

  useEffect(() => {
    if (inView) setSectionInView("about")
  }, [inView, setSectionInView])

  return (
    <section ref={ref} className="pt-24 md:pt-[150px] pb-44" id="about">
      <AnimatedTitle
        wordSpace={"mr-[14px]"}
        charSpace={"mr-[0.001em]"}
        className={`uppercase ${syne.className} antialiased text-4xl md:text-5xl xl:text-6xl font-bold opacity-80`}
      >
        About Me & Expertise
      </AnimatedTitle>

      <div className="grid grid-cols-1 lg:grid-cols-[8.5fr_3.5fr] gap-8 mt-6">
        <div className="grid grid-cols-1 antialiased gap-6 text-white/80 text-xl md:text-2xl text-justify">
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            I&apos;m a Computer Science Engineering student at Vellore Institute of Technology, Chennai, with a passion
            for building intelligent systems that solve real-world problems. My expertise spans cloud computing, machine
            learning, and full-stack development, with hands-on experience in AWS services, serverless architectures,
            and deep learning applications.
          </AnimatedBody>
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            During my internship as an AWS Engineer at nStore Retech, I architected a serverless Cheque Processing
            System using AWS Textract, Lambda, S3, and RDS, significantly reducing manual processing time. I implemented
            real-time monitoring with CloudWatch and SNS, and explored CI/CD pipelines using Terraform and AWS
            CodePipeline to streamline deployment workflows.
          </AnimatedBody>
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            My flagship project, the Oil Spill Detection System, leverages CNN models trained on Sentinel-1 SAR imagery
            to achieve 97.3% accuracy in detecting marine oil spills. This work evolved into a Smart Buoy System design,
            for which I published a utility patent (Application No. 202541080926) under The Patents Act, 1970. I&apos;ve
            also built AWS-based KYC verification systems, NLP-powered resume parsers, and automated placement calendar
            tools.
          </AnimatedBody>
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            I&apos;m a Smart India Hackathon 2024 Finalist, ranking 38th out of 673 teams, and hold certifications
            including Microsoft Azure AI-900 (91.8%), supervised machine learning from DeepLearning.AI, and
            Google&apos;s cybersecurity foundations. I continuously push boundaries to deliver scalable, intelligent
            solutions that create meaningful impact.
          </AnimatedBody>
          <AnimatedBody className="inline leading-[34px] md:leading-[39px]">
            Want to know more about my journey and technical expertise? Here&apos;s <br className="hidden md:block" />
            <Link
              className="underline"
              href="https://drive.google.com/file/d/1vN0XDQvU8-07_lF5TNjol-noUiMkb8GD/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              My Résumé
            </Link>
            .
          </AnimatedBody>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <AnimatedTitle
              wordSpace={"mr-[0.5ch]"}
              charSpace={"mr-[0.001em]"}
              className="font-bold antialiased text-xl md:text-2xl mb-2"
            >
              Tech Stack
            </AnimatedTitle>
            <AnimatedBody className="text-white/60 text-base md:text-xl leading-8">
              C, C++, Java, Python, SQL, JavaScript, TypeScript, React.js, Next.js, Remix, Node.js, Flask, HTML, R,
              MongoDB, PostgreSQL, Firebase, DuckDB.
            </AnimatedBody>
          </div>
          <div>
            <AnimatedTitle
              wordSpace={"mr-[0.5ch]"}
              charSpace={"mr-[0.001em]"}
              className="font-bold antialiased text-xl md:text-2xl mb-2"
            >
              Cloud & DevOps
            </AnimatedTitle>
            <AnimatedBody className="text-white/60 text-base md:text-xl leading-8">
              AWS (Textract, Rekognition, S3, Lambda, DynamoDB, Bedrock, Lex, API Gateway, Step Functions), Azure,
              Terraform, CI/CD, Docker, Kubernetes, Linux.
            </AnimatedBody>
          </div>
          <div>
            <AnimatedTitle
              wordSpace={"mr-[0.5ch]"}
              charSpace={"mr-[0.001em]"}
              className="font-bold antialiased text-xl md:text-2xl mb-2"
            >
              UI/UX & Frontend
            </AnimatedTitle>
            <AnimatedBody className="text-white/60 text-base md:text-xl leading-8">
              Tailwind CSS, Material-UI, React Native, Framer Motion, Figma, Cypress, GitHub.
            </AnimatedBody>
          </div>
          <div>
            <AnimatedTitle
              wordSpace={"mr-[0.5ch]"}
              charSpace={"mr-[0.001em]"}
              className="font-bold antialiased text-xl md:text-2xl mb-2"
            >
              Data Science & AI/ML
            </AnimatedTitle>
            <AnimatedBody className="text-white/60 text-base md:text-xl leading-8">
              CNN, SpaCy, OpenCV, Scikit-learn, TensorFlow, NLP, Computer Vision, Tableau, Power BI, Sentinel-1 SAR, AIS
              Integration.
            </AnimatedBody>
          </div>
        </div>
      </div>
    </section>
  )
}
