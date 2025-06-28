import React, { useEffect } from "react";
import Link from "next/link";
import { Syne } from "next/font/google";
import { useView } from "@/contexts/ViewContext";
import { useInView } from "react-intersection-observer";
import AnimatedBody from "../ui/AnimatedBody";
import AnimatedTitle from "../ui/AnimatedTitle";
<section> </section>
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
            I specialize in AI-powered solutions and scalable full-stack applications, blending my expertise in Python, SQL, and React.js. With a solid background in data science and machine learning, I utilize advanced technologies to build digital experiences that have a great impact.
          </AnimatedBody>
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            My expertise spans across AWS cloud infrastructure and DevOps practices, where I architect scalable solutions using services like EC2, Lambda, S3, and RDS. I excel in building ML pipelines with SageMaker, implementing CI/CD workflows, and deploying containerized applications using Docker and Kubernetes for optimal performance and reliability.
          </AnimatedBody>
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            From developing OILERT for real-time marine oil spill tracking, which later scaled to design a systematic approach smart buoy system using SAR imagery and deep learning algorithms, and publishing a Utility Patent for that, to implementing machine learning models for predictive analytics.
          </AnimatedBody>
          <AnimatedBody className="leading-[34px] md:leading-[39px]">
            My experience extends to MLOps, automated deployment pipelines, and advanced system integration using cloud-native technologies and focusing on building intelligent, real-time, and optimized solutions. .
          </AnimatedBody>
          <AnimatedBody className="inline leading-[34px] md:leading-[39px]">
            With each project, I push boundaries, ensuring impactful solutions that align with business goals. Want to know more? Here&apos;s{" "}
            <br className="hidden md:block" />
            <Link className="underline" href="https://drive.google.com/file/d/1c8cdQWQV0r8i8O3NViSCGwCXbWB9iCTm/view?usp=sharing">
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
              MERN, Python, SQL, AWS, JavaScript (ES6+), Flutter, TypeScript, React, Next.js,
              Git/GitHub.
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
              AWS (EC2, Lambda, S3, RDS, SageMaker), Docker, Kubernetes, CI/CD, 
              Terraform, CloudFormation, Jenkins, GitHub Actions.
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
              Tailwind CSS, Material-UI, ShadCN, Figma, Framer Motion,
              Styled Components, CSS3/SCSS/SASS.
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
              Pandas, NumPy, Scikit-learn, Spacy, TensorFlow, OpenCV, MLOps,
              SageMaker, Data Engineering, Model Deployment.
            </AnimatedBody>
          </div>
        </div>
      </div>
    </section>
  );
}
