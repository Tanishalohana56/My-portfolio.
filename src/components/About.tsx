import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GraduationCap, Award, Calendar, MapPin, ChevronRight, CheckCircle } from "lucide-react";
import { portfolioData } from "../data";

export default function About() {
  const [selectedEducationIndex, setSelectedEducationIndex] = useState<number | null>(0);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black border-y border-zinc-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#ec489901_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="glow-spot w-[350px] h-[350px] bg-pink-500/3 top-1/3 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3" id="about-header">
          <span className="font-mono text-xs font-semibold tracking-wider text-pink-400 bg-pink-950/20 border border-pink-500/25 px-3.5 py-1 rounded-full">
            Journey & Foundations
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            About Me & Education
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="about-content">
          {/* Left Column: Summary and Core Pillars */}
          <div className="lg:col-span-5 space-y-6" id="about-left-col">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative border-pink-500/20 bg-black shadow-sm space-y-4" id="about-summary-card">
              <h3 className="font-display font-bold text-xl text-white">
                Who is Tanisha?
              </h3>
              <p className="text-slate-200 font-sans text-sm sm:text-base leading-relaxed font-light">
                I am a Computer Science student at DHA Suffa University passionate about web engineering, data science, and AI. I specialize in building responsive frontends and using data-driven insights to create elegant digital solutions.
              </p>
              <div className="pt-4 border-t border-zinc-900 space-y-2">
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-pink-500 flex-shrink-0" />
                  <span>Interactive Frontend Engineering Expert</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-pink-500 flex-shrink-0" />
                  <span>Data-Driven insights using Machine Learning</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <CheckCircle className="w-4 h-4 text-pink-500 flex-shrink-0" />
                  <span>Dedicated to rapid technology adaptation</span>
                </div>
              </div>
            </div>

            {/* Certifications Box */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative border-pink-500/20 bg-black shadow-sm space-y-6" id="about-certifications-card">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-pink-500" />
                <h3 className="font-display font-bold text-xl text-white">
                  Certifications
                </h3>
              </div>
              
              <div className="space-y-4">
                {portfolioData.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    className="group flex items-start space-x-3.5 p-3.5 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-pink-500/30 shadow-sm hover:shadow-md hover:bg-zinc-900/50 transition-all duration-200"
                    id={`cert-item-${index}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-pink-400 font-bold font-mono text-sm group-hover:bg-zinc-850 transition-colors">
                      {cert.year}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-sans font-semibold text-sm text-slate-100 group-hover:text-pink-500 transition-colors">
                        {cert.title}
                      </h4>
                      <p className="font-sans text-xs text-slate-400">
                        {cert.issuer}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Education Timeline */}
          <div className="lg:col-span-7 space-y-6" id="about-right-col">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl relative border-pink-500/20 bg-black shadow-sm" id="about-education-timeline">
              <div className="flex items-center space-x-3 mb-8">
                <GraduationCap className="w-5 h-5 text-pink-500" />
                <h3 className="font-display font-bold text-xl text-white">
                  Academic Timeline
                </h3>
              </div>

              {/* Education Tree */}
              <div className="relative border-l-2 border-zinc-800 pl-6 sm:pl-8 space-y-8" id="education-tree">
                {portfolioData.education.map((edu, index) => {
                  const isSelected = selectedEducationIndex === index;
                  return (
                    <div
                      key={index}
                      className="relative cursor-pointer group"
                      onClick={() => setSelectedEducationIndex(isSelected ? null : index)}
                      id={`edu-block-${index}`}
                    >
                      {/* Timeline Dot Indicator */}
                      <span className={`absolute -left-[35px] sm:-left-[43px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                        isSelected
                          ? "bg-pink-500 text-white scale-110 shadow-lg shadow-pink-500/20"
                          : "bg-black text-slate-400 border border-zinc-800 group-hover:border-pink-500 group-hover:text-pink-500 group-hover:scale-105"
                      }`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      </span>

                      {/* Timeline Card */}
                      <div className={`p-5 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-zinc-950/50 border-pink-500/30 shadow-sm"
                          : "bg-black border-zinc-850 hover:border-pink-500/30 shadow-sm hover:shadow-md"
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                          <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-pink-500 transition-colors">
                            {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                          </h4>
                          <span className="font-mono text-xs text-pink-400 bg-pink-950/20 px-2.5 py-1 rounded-full border border-pink-500/35 w-fit">
                            {edu.duration}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs text-slate-400 mb-3">
                          <span className="font-semibold text-slate-200">
                            {edu.institution}
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{edu.location}</span>
                          </span>
                        </div>

                        {/* Interactive Accordion Body */}
                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <p className="text-slate-200 font-sans text-sm leading-relaxed mt-3 pt-3 border-t border-zinc-900 font-light">
                                {edu.description || "Pursuing comprehensive academic curricula with exceptional dedication."}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Toggle Prompt */}
                        <div className="flex justify-end pt-1 mt-1 font-mono text-[10px] text-slate-400 select-none">
                          <span className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                            <span>{isSelected ? "Collapse Details" : "Expand Details"}</span>
                            <ChevronRight className={`w-3 h-3 transform transition-transform duration-200 ${isSelected ? "rotate-90" : ""}`} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
