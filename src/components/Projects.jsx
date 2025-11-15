// ProjectsSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

const projects = [
  {
    id: 0,
    title: "Employee Tracker",
    subtitle: "Full-stack performance analytics",
    desc: "Auth, dashboards, daily logs, analytics. Flask + SQLite + Tailwind.",
    tech: ["Flask", "SQLite", "Tailwind"],
    image: "https://via.placeholder.com/200x200/4F46E5/FFFFFF?text=Employee+Tracker",
  },
  {
    id: 1,
    title: "N-Body Simulator",
    subtitle: "Physics visualisation with RK4",
    desc: "N-body gravitation, vectorized with NumPy, animated in canvas.",
    tech: ["Python", "NumPy", "matplotlib"],
    image: "https://via.placeholder.com/200x200/059669/FFFFFF?text=N-Body+Sim",
  },
  {
    id: 2,
    title: "Portfolio Website",
    subtitle: "Interactive UI & 3D hero",
    desc: "Dark themed portfolio with scroll animations and 3D model.",
    tech: ["React", "Framer Motion", "Spline"],
    image: "https://via.placeholder.com/200x200/7C3AED/FFFFFF?text=Portfolio",
  },
];

function AnimatedCounter({ to, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(isInView ? to : 0, {
    mass: 0.8,
    stiffness: 100,
    damping: 15,
  });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(to);
    }
  }, [isInView, to, spring]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0);
  const projectRefs = useRef([]);
  const headerRef = useRef(null);
  const [cardVisible, setCardVisible] = useState(projects.map(() => true));
  const [headerSpace, setHeaderSpace] = useState(0);
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { amount: 0.25 });

  useEffect(() => {
    const observers = [];
    projectRefs.current.forEach((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveProject(index);
          }
        },
        { threshold: 0.5 } // Trigger when 50% of the project is visible
      );

      if (ref) {
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Compute header space and set fade trigger based on actual header height + offset
  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;
    const computedTop = getComputedStyle(headerEl).top;
    const topPx = Number.isNaN(parseInt(computedTop, 10)) ? 0 : parseInt(computedTop, 10);
    const heightPx = headerEl.offsetHeight || 0;
    const totalTop = topPx + heightPx;
    setHeaderSpace(totalTop + 12); // small buffer

    const observers = [];
    projectRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          setCardVisible(prev => {
            const next = [...prev];
            next[index] = entry.isIntersecting;
            return next;
          });
        },
        {
          threshold: 0,
          rootMargin: `-${totalTop}px 0px 0px 0px`,
        }
      );
      obs.observe(ref);
      observers.push(obs);
    });

    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, [sectionInView]);

  return (
    <section ref={sectionRef} id="projects" className="py-0 px-6 md:px-12 text-white scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Sticky Header - positioned below navbar */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${sectionInView ? "sticky top-16 z-30" : "relative z-auto"} bg-transparent py-6 text-left`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Showcasing my latest work and creative solutions
          </p>
        </motion.div>

        {/* Content with proper spacing */}
        <div className="pt-24"> {/* Extra padding to prevent any overlap with navbar/header */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* LEFT: Fixed Project Counter */}
            <div className="sticky top-64 flex flex-col items-center justify-center space-y-8">
              <div className="text-center">
                <AnimatedCounter to={activeProject + 1} className="text-8xl font-bold text-white mb-4" />
                <motion.div
                  key={`title-${activeProject}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-xl text-gray-300"
                >
                  {projects[activeProject].title}
                </motion.div>
              </div>
            </div>

            {/* RIGHT: Scrollable Project Badges */}
            <div className="space-y-32" style={{ paddingTop: headerSpace }}>
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  ref={el => projectRefs.current[index] = el}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  animate={{ opacity: cardVisible[index] ? 1 : 0 }}
                  className="glass rounded-2xl p-8 text-center min-h-[60vh] flex flex-col justify-center"
                >
                {/* Project Image */}
                <div className="w-full h-48 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/20" />
                  <span className="text-6xl font-bold text-white/80">{index + 1}</span>
                </div>

                {/* Project Details */}
                <h4 className="text-2xl font-bold text-white mb-4">{project.title}</h4>
                <p className="text-gray-300 mb-6">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 justify-center">
                  <button className="px-6 py-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-lg hover:from-violet-600 hover:to-indigo-600 transition-all duration-300">
                    Live Demo
                  </button>
                  <button className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
                    View Code
                  </button>
                </div>
              </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
