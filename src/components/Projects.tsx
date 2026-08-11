import React from "react";
import { motion } from "motion/react";
import { Terminal, Leaf, ExternalLink, Atom, Paintbrush, Activity, Network, BarChart3 } from "lucide-react";
import { portfolioData } from "../data";

const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "React.js": Atom,
  "Tailwind CSS": Paintbrush,
  "Motion": Activity,
  "Computer Networks": Network,
  "Environmental Analytics": BarChart3,
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black border-y border-zinc-900">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#ec489901_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="glow-spot w-[500px] h-[500px] bg-pink-500/3 top-1/4 left-1/4" />
      <div className="glow-spot w-[400px] h-[400px] bg-pink-500/3 bottom-1/4 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3" id="projects-header">
          <span className="font-mono text-xs font-semibold tracking-wider text-pink-400 bg-pink-950/20 border border-pink-500/25 px-3.5 py-1 rounded-full">
            Featured Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            My Creative Work
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto rounded-full" />
        </div>

        {/* Minimal Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" id="projects-minimal-grid">
          {portfolioData.projects.map((proj, idx) => (
            <motion.div 
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
                borderColor: "rgba(236, 72, 153, 0.35)",
                boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.15)"
              }}
              transition={{ 
                opacity: { duration: 0.5, delay: idx * 0.1 },
                y: { duration: 0.5, delay: idx * 0.1 },
                scale: { type: "spring", stiffness: 300, damping: 20 },
                borderColor: { duration: 0.2 },
                boxShadow: { duration: 0.2 }
              }}
              className="bg-black p-8 rounded-2xl border border-pink-500/10 shadow-sm flex flex-col justify-between group" 
              id={`project-card-${proj.id}`}
            >
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-pink-950/20 border border-pink-500/20 text-pink-500">
                    {proj.id === "chat-network" ? <Terminal className="w-5 h-5" /> : <Leaf className="w-5 h-5" />}
                  </div>
                  
                  {/* Monochrome Tech Stack Icons row */}
                  <div className="flex items-center space-x-2 text-zinc-600">
                    {proj.techUsed.map((tech) => {
                      const IconComponent = techIconMap[tech];
                      return IconComponent ? (
                        <div 
                          key={tech} 
                          className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-900/60 hover:border-zinc-800 hover:text-zinc-400 transition-all" 
                          title={tech}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-pink-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-slate-300 font-sans text-sm leading-relaxed font-light">
                  {proj.description}
                </p>
                
                {/* Tech Badges with Monochrome Icons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.techUsed.map((tech) => {
                    const IconComponent = techIconMap[tech];
                    return (
                      <span 
                        key={tech} 
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium bg-zinc-900 border border-zinc-800 text-slate-400 group-hover:border-zinc-800/80 group-hover:text-slate-300 transition-colors"
                      >
                        {IconComponent && <IconComponent className="w-3 h-3 text-zinc-600" />}
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
              
              <div className="pt-8">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-sans font-bold text-xs shadow-sm hover:shadow-md shadow-pink-500/10 hover:shadow-pink-500/20 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    <span>Visit Live Production</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
