import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import KeyboardShortcutsModal from "./components/KeyboardShortcutsModal";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when user is typing in form inputs, textareas, or contentEditable
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Do not trigger shortcuts if modifier keys (Ctrl, Meta, Alt) are active
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key.toUpperCase();

      if (e.key === "Escape") {
        setIsResumeOpen(false);
        setIsShortcutsOpen(false);
        return;
      }

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      if (key === "H") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (key === "A") {
        e.preventDefault();
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      } else if (key === "S") {
        e.preventDefault();
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      } else if (key === "E") {
        e.preventDefault();
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      } else if (key === "P") {
        e.preventDefault();
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      } else if (key === "C") {
        e.preventDefault();
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            const nameInput = document.querySelector<HTMLInputElement>("#form-contact input[type='text']");
            if (nameInput) nameInput.focus();
          }, 400);
        }
      } else if (key === "M") {
        e.preventDefault();
        const mobileToggleBtn = document.getElementById("btn-mobile-menu-toggle");
        if (mobileToggleBtn) {
          mobileToggleBtn.click();
        }
      } else if (key === "R" || key === "V") {
        e.preventDefault();
        setIsResumeOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen text-white bg-black selection:bg-pink-500/20 selection:text-pink-300" id="app-root">
      {/* Custom Circular Follower Cursor */}
      <CustomCursor />

      {/* Dynamic Ambient Background Vector Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ec489908_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none -z-20" />
      
      {/* Custom Global Background Color Halos */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-pink-950/15 via-transparent to-transparent -z-10 pointer-events-none" />

      {/* Floating Glass Navbar */}
      <Navbar
        onDownloadResume={() => setIsResumeOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
      />

      {/* Structured Sections Grid */}
      <main className="relative z-10">
        {/* Section 1: Hero Cover */}
        <Hero />

        {/* Section 2: Personal Journey and Credentials */}
        <About />

        {/* Section 3: Technical Skills Matrix */}
        <Skills />

        {/* Section 4: Work History Timeline */}
        <Experience />

        {/* Section 5: Dynamic Sandbox Projects */}
        <Projects />

        {/* Section 6: Connect with Me form */}
        <Contact />
      </main>

      {/* Corporate Professional Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <AnimatePresence>
        {isResumeOpen && (
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        )}
        {isShortcutsOpen && (
          <KeyboardShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
