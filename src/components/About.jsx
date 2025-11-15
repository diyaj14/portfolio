import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
  {
    id: 1,
    title: "Completed CS50",
    description:
      "Introduction to Computer Science by Harvard — built a strong foundation in algorithms and problem-solving.",
  },
  {
    id: 2,
    title: "Developed Employee Tracker",
    description:
      "Created a performance analytics web app that tracks employee records and workplace efficiency.",
  },
  {
    id: 3,
    title: "NASA Space Apps Global Nominee",
    description:
      "Represented the team at NASA Space Apps Challenge for an innovative project tackling real-world problems.",
  },
  {
    id: 4,
    title: "IEEE MACE .hack(); Finalist",
    description:
      "Ranked among Top 12 for developing impactful digital solutions.",
  },
  {
    id: 5,
    title: "Exploring AI and Open Source",
    description:
      "Currently diving into AI, full-stack development, and contributing to open-source projects.",
  },
];

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      id="about"
      className="min-h-[400vh]"
    >
      {/* Sticky Timeline Container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="max-w-7xl w-full mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-white"
          >
            About Me
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Scroll down to reveal my journey
          </motion.p>
        </div>

        <div className="relative w-full max-w-6xl">
          {/* Horizontal Progress Line */}
          <div className="relative h-[2px] w-full bg-gray-800 rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full bg-white shadow-[0_0_25px_#ffffff]"
              style={{
                width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              }}
            />
          </div>

          {/* Timeline Events */}
          <div className="relative flex justify-between items-start py-12">
            {timelineEvents.map((event, index) => {
              const startProgress = index / timelineEvents.length;
              const endProgress = (index + 1) / timelineEvents.length;

              return (
                <TimelineCard
                  key={event.id}
                  event={event}
                  scrollYProgress={scrollYProgress}
                  startProgress={startProgress}
                  endProgress={endProgress}
                  isFirst={index === 0}
                  align={index % 2 === 0 ? "top" : "bottom"}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineCard = ({
  event,
  scrollYProgress,
  startProgress,
  endProgress,
  isFirst,
  align,
}) => {
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, startProgress - 0.1),
      startProgress + 0.05,
      endProgress - 0.05,
      Math.min(1, endProgress + 0.1),
    ],
    isFirst ? [1, 1, 1, 0] : [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, startProgress - 0.1),
      startProgress + 0.05,
      endProgress - 0.05,
      Math.min(1, endProgress + 0.1),
    ],
    [0.85, 1, 1, 0.85]
  );

  const y = useTransform(
    scrollYProgress,
    [
      Math.max(0, startProgress - 0.1),
      startProgress + 0.05,
      endProgress - 0.05,
      Math.min(1, endProgress + 0.1),
    ],
    [30, 0, 0, 30]
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className={`relative flex flex-col items-center flex-1 max-w-[220px] ${
        align === "top" ? "-translate-y-32" : "translate-y-32"
      }`}
    >
      {/* Glow Dot */}
      <div className="absolute -top-[52px] left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="w-5 h-5 rounded-full bg-white shadow-[0_0_30px_#ffffff]"
          style={{
            boxShadow: useTransform(
              scrollYProgress,
              [startProgress, endProgress],
              ["0 0 15px rgba(255,255,255,0.6)", "0 0 35px rgba(255,255,255,0.8)"]
            ),
          }}
        />
        <div className="absolute inset-0 w-5 h-5 rounded-full bg-white animate-ping opacity-20" />
      </div>

      {/* Event Card */}
      <div className="glass p-4 rounded-2xl w-full text-center">
        <h3 className="text-white font-semibold text-base mb-2">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
};

export default About;
// //import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// interface Skill {
//   name: string;
//   ring: number; // 1 = innermost, 3 = outermost
//   angle: number; // position on ring in degrees
// }

// const skills: Skill[] = [
//   // Ring 1 (innermost) - Core languages
//   { name: "Python", ring: 1, angle: 0 },
//   { name: "JavaScript", ring: 1, angle: 120 },
//   { name: "C", ring: 1, angle: 240 },
  
//   // Ring 2 (middle) - Web fundamentals & frameworks
//   { name: "HTML", ring: 2, angle: 30 },
//   { name: "CSS", ring: 2, angle: 100 },
//   { name: "React", ring: 2, angle: 170 },
//   { name: "Flask", ring: 2, angle: 240 },
//   { name: "Tailwind", ring: 2, angle: 310 },
  
//   // Ring 3 (outermost) - Tools & databases
//   { name: "Git", ring: 3, angle: 45 },
//   { name: "SQLite", ring: 3, angle: 165 },
// ];

// const Index = () => {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // Calculate position on orbital ring
//   const getPosition = (ring: number, angle: number) => {
//     const radius = ring === 1 ? 200 : ring === 2 ? 320 : 450;
//     const radian = (angle * Math.PI) / 180;
//     return {
//       x: Math.cos(radian) * radius,
//       y: Math.sin(radian) * radius,
//     };
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//       className="relative min-h-screen overflow-hidden flex items-center justify-center p-4 bg-background"
//     >

//       <div className="relative z-10 w-full max-w-6xl mx-auto">
//         {/* Title */}
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-4">
//             SKILLS
//           </h1>
//           <motion.div
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//             className="h-1 w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"
//           />
//         </motion.div>

//         {/* Orbital System */}
//         <div className="relative flex items-center justify-center" style={{ height: "100vh", maxHeight: "1000px" }}>
//           {/* Center core */}
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//             className="absolute z-20"
//           >
//             <div className="glass w-32 h-32 rounded-full flex items-center justify-center">
//               <span className="text-2xl font-bold">Skills</span>
//             </div>
//           </motion.div>

//           {/* Orbital rings */}
//           {[1, 2, 3].map((ring) => (
//             <motion.div
//               key={ring}
//               initial={{ scale: 0, opacity: 0, rotate: 0 }}
//               animate={{ 
//                 scale: 1, 
//                 opacity: 1,
//                 rotate: 360 
//               }}
//               transition={{ 
//                 scale: { duration: 1, delay: ring * 0.2 },
//                 opacity: { duration: 1, delay: ring * 0.2 },
//                 rotate: { 
//                   duration: 40 + ring * 10, 
//                   repeat: Infinity, 
//                   ease: "linear" 
//                 }
//               }}
//               className="orbital-ring"
//               style={{
//                 width: ring === 1 ? "400px" : ring === 2 ? "640px" : "900px",
//                 height: ring === 1 ? "400px" : ring === 2 ? "640px" : "900px",
//               }}
//             />
//           ))}

//           {/* Skill badges */}
//           {mounted &&
//             skills.map((skill, index) => {
//               const pos = getPosition(skill.ring, skill.angle);
//               return (
//                 <motion.div
//                   key={skill.name}
//                   initial={{ scale: 0, opacity: 0 }}
//                   animate={{
//                     scale: 1,
//                     opacity: 1,
//                     x: pos.x,
//                     y: pos.y,
//                   }}
//                   transition={{
//                     duration: 0.6,
//                     delay: 0.8 + index * 0.1,
//                     type: "spring",
//                     stiffness: 100,
//                   }}
//                   whileHover={{
//                     scale: 1.15,
//                     zIndex: 50,
//                   }}
//                   className="absolute skill-badge cursor-pointer"
//                   style={{
//                     left: "50%",
//                     top: "50%",
//                     transform: `translate(-50%, -50%)`,
//                   }}
//                 >
//                   <motion.div
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                       delay: index * 0.2,
//                       ease: "easeInOut",
//                     }}
//                   >
//                     {skill.name}
//                   </motion.div>
//                 </motion.div>
//               );
//             })}
//         </div>

//         {/* Bottom text */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 2 }}
//           className="text-center text-muted-foreground mt-16 text-sm"
//         >
//           Hover over skills to interact
//         </motion.p>
//       </div>
//     </motion.div>
//   );
// };

// export default Index;
