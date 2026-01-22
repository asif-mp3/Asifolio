export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

export const certificates: Certificate[] = [
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    issuer: "Amazon Web Services (AWS)",
    date: "2024-10-17",
    description:
      "Validated expertise in designing resilient, high-performing, secure, and cost-optimized architectures on AWS.",
    image: "/aws-cert.jpg",
    link: "https://www.credly.com/badges/82ec75b5-203c-47dc-b2e4-d540cdc78a1f/public_url",
  },
  {
    id: "google-cyber",
    title: "Google: Foundations of Cybersecurity",
    issuer: "Google",
    date: "2025-03-23",
    description:
      "Cybersecurity principles, INFOSEC, and NIST Cybersecurity Framework fundamentals.",
    image: "/cyberg.jpeg",
    link: "https://www.coursera.org/account/accomplishments/verify/YU2WUX3EDFWE",
  },
  {
    id: "azure-ai900",
    title: "Azure AI-900: Microsoft AI Fundamentals",
    issuer: "Microsoft",
    date: "2024-04-20",
    description:
      "Core AI concepts, Azure AI services, machine learning models, and responsible AI principles.",
    image: "/ai900img.png",
    link: "https://drive.google.com/file/d/1XiEKw013Na4a0UoEnRjyh_oy7KiniZxj/view?usp=sharing",
  },
  {
    id: "fullstack",
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2024-03-30",
    description:
      "Front-end and back-end development using React, Node.js, Express, and MongoDB.",
    image: "/full stack img.jpg",
    link: "https://www.udemy.com/certificate/UC-281fff44-5721-4581-9d81-96e1eea63333/",
  },
  {
    id: "ml-regression",
    title: "Adv. Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    date: "2025-03-05",
    description:
      "Supervised learning techniques: linear regression, logistic regression, and gradient descent.",
    image: "/macl.jpg",
    link: "https://coursera.org/share/3c450b82f786504df292321f778960e4",
  },
  {
    id: "sql-advanced",
    title: "Advanced SQL & Database Optimization",
    issuer: "Coursera Project Network",
    date: "2024-02-15",
    description:
      "Complex SQL queries, database performance optimization, and relational database techniques.",
    image: "/relnsqlimg.jpeg",
    link: "https://www.coursera.org/account/accomplishments/verify/NC9S2YNTJ5WE",
  },
  {
    id: "genai-prompt",
    title: "Generative AI: Prompt Engineering",
    issuer: "IBM (Coursera)",
    date: "2024-11-05",
    description:
      "AI prompt engineering fundamentals and prompt patterns. Grade: 93.75%.",
    image: "/prompt.png",
    link: "https://www.coursera.org/account/accomplishments/verify/T4GY61DH6ZWK",
  },
  {
    id: "algo-design",
    title: "Algorithm Design & Analysis Masterclass",
    issuer: "Udemy (Up Degree)",
    date: "2024-08-16",
    description:
      "Algorithm design, analysis, time complexity, sorting, and graph theory.",
    image: "/Daa img.png",
    link: "https://www.udemy.com/certificate/UC-c13adf8d-ac66-4560-9e8f-f28bbe758137/",
  },
];
