import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "./Navbar";
import { site } from "../data";

export default function Contact(){
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.2 });
  const [allowScroll, setAllowScroll] = useState(false);

  // Do not lock body scroll; allow user to reach the Footer normally
  useEffect(() => {
    // no-op: keep natural scroll behavior
  }, [inView]);

  const handleNavigate = (id) => {
    setAllowScroll(true);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    // restore default after navigation completes
    setTimeout(() => setAllowScroll(false), 1200);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in name, email, and message.");
      return;
    }
    const mailto = `mailto:diyarjoshy@gmail.com?subject=${encodeURIComponent(
      `Portfolio contact from ${form.name}`
    )}&body=${encodeURIComponent(`${form.message}\n\nReply to: ${form.email}`)}`;
    window.location.href = mailto;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 text-center pt-24"
    >
      {inView && <Navbar variant="overlay" onNavigate={handleNavigate} />}
      <div className="w-full max-w-6xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        Contact
      </motion.h2>
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="glass p-8 inline-block max-w-3xl w-full text-left"
      >
        <p className="mb-6 text-center">Fill out the form and it will open your email client to send a message to <span className="font-semibold">diyarjoshy@gmail.com</span>.</p>

        {error && (
          <div className="mb-4 text-red-400 text-sm">{error}</div>
        )}

        <label className="block mb-2 text-sm text-gray-300" htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          className="w-full mb-4 px-3 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Your name"
        />

        <label className="block mb-2 text-sm text-gray-300" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          className="w-full mb-4 px-3 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="your@email.com"
        />

        <label className="block mb-2 text-sm text-gray-300" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={form.message}
          onChange={onChange}
          className="w-full mb-6 px-3 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Write your message..."
        />

        <div className="flex items-center justify-between">
          <button type="submit" className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-sky-600 text-white rounded-md hover:from-cyan-600 hover:to-sky-700 transition-all">Send Email</button>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-sm text-gray-300 hover:underline">or Connect on LinkedIn</a>
        </div>
      </motion.form>
      </div>
    </section>
  );
}
