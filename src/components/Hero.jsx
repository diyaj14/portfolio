import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "../data";
import ThreeModel from "./ThreeModel";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // start of Hero to top of viewport
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -150]);

  return (
    <section
      ref={ref}
      id="home"
      className="h-screen flex flex-col md:flex-row items-center px-6 md:px-12 overflow-hidden gap-12 md:gap-24"
    >
      <motion.div
        style={{ opacity, y }}
        className="w-full md:w-2/5 text-center md:text-left"
      >
        <div className="pt-28">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            {site.name}
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">{site.intro}</p>

          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={site.linkedin}
              target="_blank"
              className="px-5 py-3 glass inline-block"
            >
              Connect on LinkedIn
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="px-5 py-3 glass inline-block"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity, y }}
        className="w-full md:w-3/5 flex justify-center md:justify-end mt-10 md:mt-0 overflow-visible"
      >
        <ThreeModel />
      </motion.div>
    </section>
  );
}
