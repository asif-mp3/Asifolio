export interface Project {
  id: string;
  title: string;
  gitLink: string;
  liveLink: string;
  about: string;
  stack: string[];
  img: string;
  showInfo?: boolean;
  infoMessage?: string;
}

export const projects: Project[] = [
  {
    id: "oil-spill",
    title: "Deep Learning–Based Oil Spill Detection System",
    gitLink: "https://github.com/asif-mp3/oil-spill-detection",
    liveLink: "https://www.youtube.com/watch?v=h8ATo3vHwoQ",
    about: `Developed a deep learning system that automatically detects oil spills using satellite images from Sentinel-1 and vessel data from AIS. A CNN model trained on real maritime data achieved 97.3% accuracy and reduced false detections by 85%. The system analyzes over 500 satellite images daily through a FastAPI backend and provides real-time visualization for marine safety monitoring.`,
    stack: ["FastAPI", "CNN", "Sentinel-1 SAR", "AIS"],
    img: "/oil2.png",
    showInfo: false,
  },
  {
    id: "ecommerce-recommender",
    title: "E-commerce Product Recommender",
    gitLink: "https://github.com/asif-mp3/smart-shop",
    liveLink: "https://smart-shop-steel.vercel.app",
    about: `A Next.js-based AI recommender that personalizes product suggestions for users using browsing behavior and preferences. Combines content-based and collaborative filtering methods with Google Gemini integration for AI-generated explanations. Features a dashboard-like interface with search, filters, and sorting for an intuitive online shopping experience.`,
    stack: ["Next.js", "Google Gemini API", "AI Recommender", "Tailwind CSS"],
    img: "/s8.png",
    showInfo: false,
  },
  {
    id: "placement-calendar",
    title: "Smart Placement Calendar Automation",
    gitLink: "https://github.com/asif-mp3/placement-calendar-automation",
    liveLink: "https://github.com/asif-mp3/placement-calendar-automation",
    about: `Automated the placement notification process using Google APIs to parse emails, check eligibility, and schedule calendar reminders. Reduces manual effort by 90% by reading placement emails, extracting Excel or PDF attachments, and automatically creating event reminders for eligible students.`,
    stack: ["Google Apps Script", "Gmail API", "Calendar API", "JavaScript"],
    img: "/calendar.png",
    showInfo: true,
    infoMessage: `This system ensures students never miss placement opportunities by automating eligibility verification and event scheduling directly from email data.`,
  },
  {
    id: "kyc-verification",
    title: "AWS – KYC Verification System",
    gitLink: "https://github.com/asif-mp3/kyc-automator-aws",
    liveLink: "https://main.d2oxvljh00najc.amplifyapp.com/",
    about: `Designed a serverless identity verification platform using AWS Textract for OCR and Rekognition for face matching. Step Functions orchestrate the workflow, while API Gateway enables secure integration. The system reduced manual verification efforts by 80% and improved document accuracy for KYC processes.`,
    stack: ["AWS Textract", "AWS Rekognition", "Lambda", "API Gateway"],
    img: "/kkyc.png",
    showInfo: false,
  },
  {
    id: "resume-parser",
    title: "Smart Resume Parser – NLP-based Analysis Tool",
    gitLink: "https://github.com/asif-mp3/Resume-Parser-and-Job-Recommendation-System",
    liveLink: "https://github.com/asif-mp3/Resume-Parser-and-Job-Recommendation-System",
    about: `Created a Python NLP system to extract structured data from resume PDFs using spaCy, regex, and PdfPlumber. It identifies skills, experience, and education, then uses a regex-based similarity model to recommend suitable jobs. Helps recruiters analyze resumes efficiently and match candidates to job openings automatically.`,
    stack: ["spaCy", "Regex", "PdfPlumber"],
    img: "/smart_resume.png",
    showInfo: false,
  },
  {
    id: "cheque-processing",
    title: "AWS – Cheque Processing System",
    gitLink: "https://github.com/asif-mp3/aws-web-based-cheque-processing",
    liveLink: "https://cheque-mate-doc.vercel.app/",
    about: `Developed a fully serverless cheque verification platform using AWS Textract, Lambda, RDS, and S3. Automates handwritten cheque reading, validation, and record management while ensuring secure data handling with AWS IAM and API Gateway. CloudWatch and SNS provide real-time alerts for failed transactions or anomalies.`,
    stack: ["AWS Textract", "Lambda", "RDS", "S3"],
    img: "/cheque_mate.png",
    showInfo: false,
  },
  {
    id: "medication-dispenser",
    title: "Smart Medication Dispenser",
    gitLink: "https://github.com/asif-mp3/Smart-Medication-Dispenser",
    liveLink: "https://github.com/asif-mp3/Smart-Medication-Dispenser",
    about: `An IoT and Arduino-based device designed to help patients take medicines on time. Controlled via Bluetooth, it dispenses tablets at scheduled times and notifies users with alerts. Useful for elderly or chronically ill patients to ensure adherence to prescriptions.`,
    stack: ["Arduino", "IoT", "Bluetooth"],
    img: "/medic_dispenser.png",
    showInfo: false,
  },
];
