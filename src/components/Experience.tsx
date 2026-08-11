import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, Code2 } from "lucide-react";
import { portfolioData } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#ec489901_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="glow-spot w-[300px] h-[300px] bg-pink-500/3 top-1/4 right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3" id="experience-header">
          <span className="font-mono text-xs font-semibold tracking-wider text-pink-400 bg-pink-950/20 border border-pink-500/25 px-3.5 py-1 rounded-full">
            Professional Footprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Work Experience
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto rounded-full" />
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto relative" id="experience-timeline">
          {/* Timeline Center-Left Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500/30 via-zinc-800 to-transparent transform -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500/30 via-zinc-800 to-transparent sm:hidden" />

          <div className="space-y-12">
            {portfolioData.experience.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                  id={`exp-node-${index}`}
                >
                  {/* Timeline Node Node */}
                  <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black border-2 border-pink-500 shadow-sm shadow-pink-500/20">
                      <Briefcase className="w-4 h-4 text-pink-500" />
                    </span>
                  </div>

                  {/* Spacer / Left-Right alignment helper */}
                  <div className="w-full sm:w-1/2 hidden sm:block" />

                  {/* Card Content Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full sm:w-[calc(50%-2rem)] pl-12 sm:pl-0 sm:mx-4"
                    id={`exp-card-container-${index}`}
                  >
                    <div className="bg-black p-6 sm:p-7 rounded-2xl border border-pink-500/20 shadow-sm hover:shadow-md hover:border-pink-500/40 transition-all duration-300 relative">
                      {/* Meta stats */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs text-pink-400 bg-pink-950/20 px-2.5 py-1 rounded-full border border-pink-500/35">
                          {exp.duration}
                        </span>
                        {exp.location && (
                          <span className="flex items-center space-x-1 text-xs text-slate-400">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{exp.location}</span>
                          </span>
                        )}
                      </div>

                      {/* Header info */}
                      <div className="space-y-1 mb-4">
                        <h3 className="font-display font-bold text-xl text-white">
                          {exp.role}
                        </h3>
                        <p className="font-sans font-medium text-sm text-slate-300">
                          {exp.company}
                        </p>
                      </div>

                      {/* Points */}
                      <ul className="space-y-2.5 mb-5 text-left">
                        {exp.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start space-x-2 text-sm text-slate-200 font-light leading-relaxed">
                            <span className="text-pink-500 mt-1.5 font-bold text-xs select-none">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack used */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-900">
                        <Code2 className="w-3.5 h-3.5 text-slate-400 mt-1 mr-1" />
                        {exp.techUsed.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[10px] text-slate-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
