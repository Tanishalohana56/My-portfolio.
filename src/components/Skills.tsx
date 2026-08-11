import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Laptop, Database, PenTool, LayoutGrid, Brain } from "lucide-react";
import { portfolioData } from "../data";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(portfolioData.skillGroups[0].category);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web Development":
        return Laptop;
      case "Programming Languages":
        return Terminal;
      case "Data Science & Analytics":
        return Database;
      case "Tools & Platforms":
        return LayoutGrid;
      default:
        return Brain;
    }
  };

  const currentSkills = portfolioData.skillGroups.find(
    (group) => group.category === activeCategory
  )?.skills || [];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black border-y border-zinc-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#ec489901_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="glow-spot w-[400px] h-[400px] bg-pink-500/3 bottom-1/4 left-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3" id="skills-header">
          <span className="font-mono text-xs font-semibold tracking-wider text-pink-400 bg-pink-950/20 border border-pink-500/25 px-3.5 py-1 rounded-full">
            Technical Arsenal
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Skills & Core Capabilities
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto rounded-full" />
        </div>

        {/* Categories Tab Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="skills-grid">
          {/* Category Selectors */}
          <div className="lg:col-span-4 space-y-2.5" id="skills-categories">
            {portfolioData.skillGroups.map((group, index) => {
              const Icon = getCategoryIcon(group.category);
              const isActive = group.category === activeCategory;
              return (
                <button
                  key={group.category}
                  onClick={() => setActiveCategory(group.category)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl font-sans font-medium text-sm transition-all duration-300 cursor-pointer text-left border ${
                    isActive
                      ? "bg-pink-950/20 border-pink-500/50 text-pink-400 shadow-sm shadow-pink-500/10"
                      : "bg-black border-zinc-800 text-slate-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-700"
                  }`}
                  id={`skill-cat-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      isActive ? "bg-pink-500/20 text-pink-400" : "bg-zinc-900 text-slate-400"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{group.category}</span>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full transition-transform ${
                    isActive ? "bg-pink-500 scale-125" : "bg-transparent"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Skill Items Visual Deck */}
          <div className="lg:col-span-8" id="skills-visualization-card">
            <div className="bg-black p-6 sm:p-8 rounded-2xl border border-pink-500/20 shadow-sm min-h-[380px]" id="skills-deck">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-6 flex items-center space-x-2">
                <span>{activeCategory}</span>
                <span className="text-slate-400 text-xs font-mono">({currentSkills.length} metrics)</span>
              </h3>

              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {currentSkills.map((skill, index) => (
                    <motion.div
                      key={`${activeCategory}-${skill.name}`}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.25, delay: index * 0.05 }}
                      className="space-y-2"
                      id={`skill-bar-${index}`}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-sans font-medium text-slate-100">{skill.name}</span>
                        <span className="font-mono text-xs text-pink-500 font-semibold">{skill.level}%</span>
                      </div>

                      {/* Animated Progress Meter */}
                      <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800 relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full relative"
                        >
                          {/* Inner glowing node */}
                          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white shadow-lg shadow-pink-500" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Extra technical flair */}
              <div className="pt-8 mt-8 border-t border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-slate-400 select-none">
                <p>⚡ High-fidelity framework integration & rapid technical adaptability</p>
                <div className="flex space-x-2">
                  <span className="bg-zinc-900 text-slate-300 px-2 py-0.5 rounded">CI/CD ready</span>
                  <span className="bg-zinc-900 text-slate-300 px-2 py-0.5 rounded">Agile workflow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
