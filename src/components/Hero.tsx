import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowDown, Mail, Github, Linkedin, MapPin, Terminal, Cpu } from "lucide-react";
import { portfolioData } from "../data";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const titles = [
    "Full Stack Developer",
    "AI & Data Science Student",
    "Computer Science Undergraduate",
    "Problem Solver"
  ];
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (titles.length === 0) return;
    let timer: NodeJS.Timeout;
    const currentFullTitle = titles[titleIndex] || "";
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(prev => prev.slice(0, -1));
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentFullTitle.slice(0, typedText.length + 1));
      }, 70);
    }

    if (!isDeleting && typedText === currentFullTitle) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, titleIndex, titles]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Background Glow Spots */}
      <div className="glow-spot w-[400px] h-[400px] bg-pink-500/5 top-1/4 left-10" />
      <div className="glow-spot w-[500px] h-[500px] bg-pink-500/5 bottom-10 right-10" />

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ec489904_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Intro Column */}
        <div className="lg:col-span-7 space-y-6 text-left" id="hero-left-col">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-mono text-xs font-semibold"
            id="hero-badge"
          >
            <Cpu className="w-3.5 h-3.5 animate-pulse flex-shrink-0" />
            <span>Open for Internships / Jobs</span>
          </motion.div>

          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-300 font-mono font-medium tracking-wide text-sm sm:text-base"
              id="hero-greeting"
            >
              Hello, World! My name is
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-7xl font-display font-extrabold tracking-tight text-white"
              id="hero-name"
            >
              {portfolioData.name}
              <span className="text-pink-500">.</span>
            </motion.h1>

            {/* Simulated Typist Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-10 sm:h-12 flex items-center"
              id="hero-typewriter-container"
            >
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-white flex items-center">
                <span>{typedText}</span>
                <span className="w-1.5 h-6 sm:h-8 bg-pink-500 ml-1.5 animate-pulse" />
              </h2>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-200 max-w-xl font-sans text-base sm:text-lg leading-relaxed font-light"
            id="hero-bio"
          >
            Combining robust, responsive frontends with a technical data analytics background to craft intelligent applications.
          </motion.p>

          {/* Social Icons & Coordinates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 text-slate-300 font-mono text-sm py-2"
            id="hero-meta-section"
          >
            <span className="flex items-center space-x-1 bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-lg">
              <MapPin className="w-4 h-4 text-pink-500" />
              <span>{portfolioData.socials.location}</span>
            </span>
            <div className="flex space-x-3 items-center">
              <a
                href={`mailto:${portfolioData.socials.email}`}
                className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-pink-500/30 hover:text-pink-500 transition-colors cursor-pointer"
                title="Email"
                id="social-email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-pink-500/30 hover:text-pink-500 transition-colors cursor-pointer"
                title="GitHub"
                id="social-github"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-pink-500/30 hover:text-pink-500 transition-colors cursor-pointer"
                title="LinkedIn"
                id="social-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
            id="hero-actions"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-sans font-semibold shadow-lg shadow-pink-500/25 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              id="btn-hero-projects"
            >
              Explore My Demos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-sans border border-zinc-800 hover:border-zinc-700 font-semibold cursor-pointer transition-colors duration-200"
              id="btn-hero-contact"
            >
              Let's Connect
            </button>
          </motion.div>
        </div>

        {/* Right Code Visual Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 relative mt-8 lg:mt-0"
          id="hero-right-col"
        >
          {/* Subtle Decorative Floating Tech Elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-pink-500/5 rounded-full blur-xl animate-float" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-float" />

          {/* Core Interactive Terminal Card */}
          <div className="bg-black rounded-2xl overflow-hidden shadow-xl border border-pink-500/20 relative" id="hero-terminal">
            {/* Window bar */}
            <div className="bg-zinc-950 px-4 py-3 flex items-center justify-between border-b border-pink-500/10">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-pink-500" />
                <span className="font-mono text-xs text-slate-300 select-none">profile.json</span>
              </div>
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* Code Body */}
            <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm text-left leading-relaxed space-y-4 select-none bg-black">
              <div className="text-zinc-500">{"{"}</div>
              
              <div className="pl-4">
                <span className="text-pink-400 font-medium">"candidate"</span>
                <span className="text-zinc-500">: </span>
                <span className="text-white">"Tanisha"</span>,
              </div>

              <div className="pl-4">
                <span className="text-pink-400 font-medium">"university"</span>
                <span className="text-zinc-500">: </span>
                <span className="text-white">"DHA Suffa University"</span>,
              </div>

              <div className="pl-4">
                <span className="text-pink-400 font-medium">"degree"</span>
                <span className="text-zinc-500">: </span>
                <span className="text-white">"BS Computer Science"</span>,
              </div>

              <div className="pl-4">
                <span className="text-pink-400 font-medium">"academicRange"</span>
                <span className="text-zinc-500">: </span>
                <span className="text-white">"2023 - 2027"</span>,
              </div>

              <div className="pl-4">
                <span className="text-pink-400 font-medium">"coreStrengths"</span>
                <span className="text-zinc-500">: </span>
                <span className="text-zinc-500">{"["}</span>
                <div className="pl-4">
                  <span className="text-pink-300 font-medium bg-pink-950/30 px-1.5 py-0.5 rounded mr-1">"Full Stack Engineering"</span>,
                  <br />
                  <span className="text-pink-300 font-medium bg-pink-950/30 px-1.5 py-0.5 rounded mr-1">"Data Science & ML"</span>
                </div>
                <span className="text-zinc-500">{"],"}</span>
              </div>

              <div className="pl-4">
                <span className="text-pink-400 font-medium">"motivation"</span>
                <span className="text-zinc-500">: </span>
                <span className="text-white">"Build intelligent, elegant digital products that translate complex data into beautiful human interfaces"</span>
              </div>

              <div className="text-zinc-500">{"}"}</div>
            </div>

            {/* Clean metadata bar */}
            <div className="bg-zinc-950 border-t border-pink-500/10 py-2 px-4 flex items-center justify-between font-mono text-[10px] text-slate-400 select-none">
              <span>Lines: 15 | Col: 24</span>
              <span>UTF-8 | JSON</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow link */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center select-none cursor-pointer" onClick={() => scrollToSection("about")} id="hero-scroll-prompt">
        <span className="font-mono text-[10px] text-slate-400 mb-1 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-pink-500" />
        </motion.div>
      </div>
    </section>
  );
}
