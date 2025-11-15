import React from "react";
import { motion } from "framer-motion";

const items = ["Home","About","Projects","Contact"];
export default function Navbar({ variant = "global", onNavigate }){
  const scrollTo = id => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:"smooth", block:"start"});
  };
  const isOverlay = variant === "overlay";
  const zClass = isOverlay ? "z-[1100]" : "z-40 global-navbar";
  const navigate = onNavigate || scrollTo;
  return (
    <motion.header
      initial={{ y:-50, opacity:0 }}
      animate={{ y:0, opacity:1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-4 left-0 right-0 mx-auto max-w-5xl px-6 flex items-center justify-between py-3 ${zClass} nav-blur glass`}
    >
      <div className="text-lg font-semibold">{/* logo area */}Diya Joshy</div>
      <nav className="space-x-4 hidden md:block">
        {items.map(it=>(
          <button key={it} onClick={()=>navigate(it.toLowerCase())} className="text-sm hover:underline">
            {it}
          </button>
        ))}
      </nav>
      <div className="md:hidden">
        {/* Mobile: simple nav — scroll to sections */}
        <select onChange={(e)=>navigate(e.target.value)} className="bg-transparent">
          <option value="home">Menu</option>
          {items.map(it=> <option key={it} value={it.toLowerCase()}>{it}</option>)}
        </select>
      </div>
    </motion.header>
  );
}
