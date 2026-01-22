"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Skill rows in reverse pyramid layout (8 → 6 → 4)
const skillRows = [
  // Row 1 - Frontend & Languages (8 icons)
  [
    { src: "/skills/html.png", name: "HTML", width: 80, height: 80 },
    { src: "/skills/css.png", name: "CSS", width: 80, height: 80 },
    { src: "/skills/js.png", name: "JavaScript", width: 65, height: 65 },
    { src: "/skills/ts.png", name: "TypeScript", width: 80, height: 80 },
    { src: "/skills/react.png", name: "React", width: 80, height: 80 },
    { src: "/skills/next.png", name: "Next.js", width: 80, height: 80 },
    { src: "/skills/tailwind.png", name: "Tailwind", width: 80, height: 80 },
    { src: "/skills/python.png", name: "Python", width: 80, height: 80 },
  ],
  // Row 2 - Backend & Databases (6 icons)
  [
    { src: "/skills/node.png", name: "Node.js", width: 80, height: 80 },
    { src: "/skills/java.png", name: "Java", width: 80, height: 80 },
    { src: "/skills/mongodb.png", name: "MongoDB", width: 80, height: 80 },
    { src: "/skills/postgresql.png", name: "PostgreSQL", width: 80, height: 80 },
    { src: "/skills/redis.png", name: "Redis", width: 80, height: 80 },
    { src: "/skills/github.png", name: "GitHub", width: 80, height: 80 },
  ],
  // Row 3 - DevOps & Cloud (4 icons)
  [
    { src: "/skills/docker.png", name: "Docker", width: 80, height: 80 },
    { src: "/skills/aws.png", name: "AWS", width: 80, height: 80 },
    { src: "/skills/kubernetes.png", name: "Kubernetes", width: 80, height: 80 },
    { src: "/skills/linux.png", name: "Linux", width: 80, height: 80 },
  ],
];

// Animation variants
const fadeIn = (direction: "left" | "right" | "up" | "down", delay: number) => ({
  hidden: {
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    opacity: 0,
  },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 1.2,
      delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center py-20 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-30"
      >
        <source src="/videos/skills-bg.webm" type="video/webm" />
      </video>

      {/* Header Text */}
      <motion.p
        variants={fadeIn("down", 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-gray-300 text-lg md:text-xl italic mb-12 text-center font-light"
        style={{ fontFamily: "cursive" }}
      >
        Never miss a task, deadline or idea
      </motion.p>

      {/* Skills Grid */}
      <div className="flex flex-col items-center gap-8 w-full max-w-6xl px-4">
        {/* Row 1 */}
        <motion.div
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-5 md:gap-10"
        >
          {skillRows[0].map((skill, index) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group cursor-pointer"
            >
              <Image
                src={skill.src}
                alt={skill.name}
                width={skill.width}
                height={skill.height}
                className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
              />
              {/* Tooltip */}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div
          variants={fadeIn("left", 0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-5 md:gap-10"
        >
          {skillRows[1].map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group cursor-pointer"
            >
              <Image
                src={skill.src}
                alt={skill.name}
                width={skill.width}
                height={skill.height}
                className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div
          variants={fadeIn("right", 0.7)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-5 md:gap-10"
        >
          {skillRows[2].map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group cursor-pointer"
            >
              <Image
                src={skill.src}
                alt={skill.name}
                width={skill.width}
                height={skill.height}
                className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Section Title */}
      <motion.div
        variants={fadeIn("up", 0.9)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-16 flex flex-col items-center"
      >
        <h3 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 tracking-wide">
          My Tech Stack
        </h3>
        <p className="text-gray-400 text-sm mt-2">
          Building with modern technologies
        </p>
      </motion.div>
    </section>
  );
}
