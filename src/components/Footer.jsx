import React from "react";
import { site } from "../data";

export default function Footer(){
  return (
    <footer className="py-8 text-center text-sm text-gray-400">
      <div className="max-w-5xl mx-auto px-6">
        <div>© {new Date().getFullYear()} {site.name}</div>
        <div className="mt-2"><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
      </div>
    </footer>
  );
}
