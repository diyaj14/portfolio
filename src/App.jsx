import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SkillsOrbit from "./components/skillsOrbit";

export default function App(){
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className={`min-h-screen`}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6">
        <Hero />
      </main>
      <About />
      <SkillsOrbit /> 
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
