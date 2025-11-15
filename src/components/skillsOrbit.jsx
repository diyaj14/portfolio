import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimationFrame, useScroll } from "framer-motion";

const skills = [
  { name: "HTML", circle: 0, angle: 0 },
  { name: "CSS", circle: 0, angle: 120 },
  { name: "JavaScript", circle: 0, angle: 240 },
  { name: "React", circle: 1, angle: 20 },
  { name: "Tailwind", circle: 1, angle: 140 },
  { name: "Bootstrap", circle: 1, angle: 260 },
  { name: "Python", circle: 2, angle: 10 },
  { name: "Flask", circle: 2, angle: 100 },
  { name: "C", circle: 2, angle: 190 },
  { name: "Git", circle: 2, angle: 280 },
  { name: "MySQL", circle: 3, angle: 30 },
  { name: "MongoDB", circle: 3, angle: 150 },
  { name: "SQLite", circle: 3, angle: 270 },
];

export default function SkillsOrbit() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.01 });
  const [rotations, setRotations] = useState([0, 0, 0, 0]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [visibleCount, setVisibleCount] = useState(0);

  const ellipseRadii = [
    { rx: 120, ry: 80 },
    { rx: 220, ry: 150 },
    { rx: 320, ry: 220 },
    { rx: 420, ry: 290 },
  ];

  // 💫 Alternate rotation directions for calm complexity
  const speeds = [0.09, -0.07, 0.05, -0.04];

  useAnimationFrame(() => {
    if (isInView) {
      setRotations((prev) =>
        prev.map((rotation, index) => (rotation + speeds[index]) % 360)
      );
    }
  });

  // Reveal more ellipses as the section scrolls: 0 -> 1 -> 2 -> 3 -> 4
  // Use an earlier threshold for the first ring so it appears sooner.
  useEffect(() => {
    const total = ellipseRadii.length;
    const start = 0.0; // reveal immediately when section enters
    const step = (1 - start) / total;
    const unsub = scrollYProgress.on("change", (v) => {
      let count = 0;
      for (let i = 0; i < total; i++) {
        const threshold = start + i * step;
        if (v >= threshold) count++;
      }
      setVisibleCount(Math.min(total, count));
    });
    return () => { if (unsub) unsub(); };
  }, [scrollYProgress]);

  const getSkillPosition = (circle, angle) => {
    const { rx, ry } = ellipseRadii[circle];
    const totalAngle = angle + rotations[circle];
    const radians = (totalAngle * Math.PI) / 180;
    const x = Math.cos(radians) * rx;
    const y = Math.sin(radians) * ry;
    return { x, y };
  };

  return (
    <div
      ref={ref}
      className="min-h-[300vh] px-4"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
        {/* 🌈 Gradient Orbits */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="-500 -350 1000 700"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="gradientStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {ellipseRadii.map((radii, index) => (
            <motion.ellipse
              key={index}
              cx="0"
              cy="0"
              rx={radii.rx}
              ry={radii.ry}
              fill="none"
              stroke="url(#gradientStroke)"
              strokeWidth="1.2"
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? { opacity: index < visibleCount ? 1 : 0 }
                  : { opacity: 0 }
              }
              transition={{ opacity: { duration: 0.6 } }}
            />
          ))}
        </svg>

        {/* 🎯 Center “Skills” Badge (enlarged initially, settles when first ring appears) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <motion.div
            className="pointer-events-auto"
            initial={{ opacity: 1, scale: 1.15 }}
            animate={ visibleCount >= 1 ? { opacity: 1, scale: 1 } : { opacity: 1, scale: [1.15, 1.12, 1.15] } }
            transition={ visibleCount >= 1
              ? { duration: 0.5, ease: "easeOut" }
              : { duration: 3, ease: "easeInOut", repeat: Infinity } }
          >
            <div className="glass text-center px-8 py-4 rounded-full shadow-lg border border-white/10 backdrop-blur-md bg-white/10 transition duration-500">
              <span className="text-base font-semibold tracking-wide text-white">
                Skills
              </span>
            </div>
          </motion.div>
        </div>

        {/* 💡 Animated Skill Badges (reveal ring-by-ring) */}
        {skills.filter((s) => s.circle < visibleCount).map((skill, index) => {
          const { x, y } = getSkillPosition(skill.circle, skill.angle);

          return (
            <motion.div
              key={skill.name}
              className="absolute z-20"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                opacity: { duration: 0.25 },
              }}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="group relative glass px-4 py-2 rounded-full whitespace-nowrap cursor-default transition-all duration-500 hover:scale-110 hover:bg-gradient-to-r from-cyan-500/20 to-sky-500/20 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                <span className="text-sm font-medium text-white tracking-wide transition-colors">
                  {skill.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
  );
}
