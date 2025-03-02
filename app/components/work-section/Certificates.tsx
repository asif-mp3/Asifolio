// "use client";

// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Award, ExternalLink, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
// import Title from "../ui/Title";
// import { format } from "date-fns";
// import { Button } from "../ui1/button";
// import { Badge } from "../ui1/badge";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui1/card";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui1/tooltip";

// const certificates = [
//   {
//     title: "Microsoft eTrain India: Azure AI-900",
//     issuer: "Microsoft",
//     date: "2024-04-20",
//     description: "Deep understanding of Azure AI services and workloads.",
//     skills: ["Azure", "AI Ethics", "Power BI"],
//     image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
//     link: "#",
//   },
//   {
//     title: "Advanced Relational Database and SQL",
//     issuer: "Coursera Project Network",
//     date: "2024-02-15",
//     description: "Mastered complex SQL queries and database optimization.",
//     skills: ["SQL", "Stored Procedures", "Query Optimization"],
//     image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
//     link: "#",
//   },
//   {
//     title: "Full Stack Web Development Bootcamp",
//     issuer: "Udemy (Angela Yu)",
//     date: "2024-03-30",
//     description: "Hands-on experience with React, Node.js, and REST APIs.",
//     skills: ["React.js", "Node.js", "MongoDB"],
//     image: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab",
//     link: "#",
//   },
//   {
//     title: "Generative AI: Prompt Engineering Basics",
//     issuer: "IBM (Coursera)",
//     date: "2024-11-05",
//     description: "Successfully completed with a 93.75% grade, covering AI prompt engineering fundamentals.",
//     skills: ["Artificial Intelligence (AI)", "Prompt Engineering", "ChatGPT", "Prompt Patterns", "Generative AI"],
//     image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507",
//     link: "#",
//   },
//   {
//     title: "The Design and Analysis of Algorithm Masterclass",
//     issuer: "Udemy (Up Degree)",
//     date: "2024-08-16",
//     description: "Completed 12.5 hours of video lectures on algorithm design and analysis.",
//     skills: ["Algorithm Analysis", "Time Complexity", "Sorting Algorithms", "Graph Theory"],
//     image: "https://images.unsplash.com/photo-1593642532400-2682810df593",
//     link: "#",
//   }
// ];


// const Certificates = () => {
//   const [currentPage, setCurrentPage] = React.useState(1);
//   const cardsPerPage = 3;
//   const totalPages = certificates.length > 0 ? Math.ceil(certificates.length / cardsPerPage) : 1;

//   // Simplified navigation functions
//   const handlePrevPage = () => {
//     setCurrentPage(prev => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   };

//   const paginatedCertificates = certificates.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

//   return (
//     <section className="min-h-screen bg-gradient-to-b py-20">
//       <Title>Certifications</Title>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         />

//         <div className="grid md:grid-cols-3 gap-8">
//           <AnimatePresence mode="wait">
//             {paginatedCertificates.map((certificate, index) => (
//               <motion.div
//                 key={certificate.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//               >
//                 <Card className="group h-[550px] flex flex-col overflow-hidden rounded-3xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_8px_40px_rgba(59,130,246,0.5)] transition-all duration-500">
//                   <CardHeader className="relative p-0">
//                     <div className="overflow-hidden rounded-t-3xl">
//                       <img
//                         src={certificate.image || "/placeholder.svg"}
//                         alt={certificate.title}
//                         className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-700"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     </div>
//                     <div className="absolute top-4 right-4">
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger asChild>
//                             <Badge className="px-4 py-2 bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-gray-200 backdrop-blur-md border-0 shadow-lg">
//                               <Award className="w-4 h-4 mr-2 text-blue-500" />
//                               {certificate.issuer}
//                             </Badge>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>Certification Issuer</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="flex-grow p-6">
//                     <CardTitle className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
//                       {certificate.title}
//                     </CardTitle>
//                     <CardDescription className="text-gray-600 dark:text-gray-300 mb-4 text-base leading-relaxed">
//                       {certificate.description}
//                     </CardDescription>
//                     <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
//                       <Calendar className="w-4 h-4" />
//                       <time dateTime={certificate.date} className="font-medium">
//                         {format(new Date(certificate.date), "MMMM d, yyyy")}
//                       </time>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       {certificate.skills.map((skill) => (
//                         <Badge
//                           key={skill}
//                           className="bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300 border-0 px-3 py-1 rounded-full transition-colors duration-300"
//                         >
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>
//                   </CardContent>
//                   <CardFooter className="p-6 pt-0 border-0">
//                     <Button
//                       asChild
//                       className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl py-5"
//                     >
//                       <a
//                         href={certificate.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center justify-center gap-2 text-lg"
//                       >
//                         <ExternalLink className="w-5 h-5" />
//                         View Certificate
//                       </a>
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
        
//         <div className="flex justify-center mt-12 gap-6">
//           <button
//             type="button"
//             onClick={handlePrevPage}
//             className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:scale-110"
//           >
//             <ChevronLeft className="h-7 w-7" />
//           </button>

//           <div className="flex items-center gap-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
//             <span>{currentPage}</span>
//             <span className="text-gray-500">/</span>
//             <span>{totalPages}</span>
//           </div>

//           <button
//             type="button"
//             onClick={handleNextPage}
//             className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:scale-110"
//           >
//             <ChevronRight className="h-7 w-7" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Certificates;