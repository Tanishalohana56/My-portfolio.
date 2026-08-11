import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, FileText, Send, User, Award, Code, Briefcase, Clock, Globe, Keyboard } from "lucide-react";

interface NavbarProps {
  onDownloadResume: () => void;
  onOpenShortcuts?: () => void;
}

export default function Navbar({ onDownloadResume, onOpenShortcuts }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState<string>("");
  const [timeZoneLabel, setTimeZoneLabel] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTimeString(formatted);

      try {
        const shortTz = new Intl.DateTimeFormat([], { timeZoneName: "short" })
          .formatToParts(now)
          .find((part) => part.type === "timeZoneName")?.value || "LOCAL";
        setTimeZoneLabel(shortTz);
      } catch {
        setTimeZoneLabel("LOCAL");
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: User },
    { id: "about", label: "About & Education", icon: Award },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "contact", label: "Contact", icon: Send },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background blur transition
      setIsScrolled(window.scrollY > 20);

      // Section tracking
      const scrollPosition = window.scrollY + 120;
      const ids = ["home", "about", "skills", "experience", "projects", "contact"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-black/95 backdrop-blur-md border-b border-pink-500/20 shadow-[0_4px_20px_rgba(236,72,153,0.15)]"
            : "py-5 bg-transparent"
        }`}
        id="navbar-root"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center space-x-2 group cursor-pointer"
              id="nav-logo"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center font-display font-bold text-white text-lg shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform duration-200">
                T
              </div>
              <span className="font-display font-semibold text-lg tracking-wider text-white group-hover:text-pink-500 transition-colors duration-200">
                TANISHA
              </span>
            </button>
 
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2" id="nav-desktop-menu">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`relative px-3 py-2 rounded-full font-sans text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center space-x-1.5 ${
                      isActive ? "text-pink-500" : "text-slate-300 hover:text-white"
                    }`}
                    id={`nav-item-${item.id}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-pink-500/10 rounded-full border border-pink-500/30 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
 
            {/* Action buttons */}
            <div className="hidden md:flex items-center space-x-3.5" id="nav-actions-wrapper">
              {/* Subtle Live Clock Pill */}
              {timeString && (
                <div 
                  className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-950/90 border border-zinc-800/80 font-mono text-xs text-slate-300 shadow-inner"
                  title="Live Local Time"
                  id="nav-live-clock"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Clock className="w-3.5 h-3.5 text-pink-400 ml-0.5" />
                  <span className="font-semibold tracking-wide text-zinc-200">{timeString}</span>
                  <span className="text-[10px] text-slate-400 font-sans uppercase bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                    {timeZoneLabel}
                  </span>
                </div>
              )}

              {/* Shortcuts button */}
              {onOpenShortcuts && (
                <button
                  onClick={onOpenShortcuts}
                  className="hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-slate-300 hover:text-white font-mono text-xs cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                  title="Keyboard Shortcuts (Press ?)"
                  id="btn-nav-shortcuts"
                >
                  <Keyboard className="w-3.5 h-3.5 text-pink-400" />
                  <span className="font-bold font-mono text-[10px] bg-zinc-950 px-1 py-0.5 rounded border border-zinc-800 text-pink-300">?</span>
                </button>
              )}

              <button
                onClick={onDownloadResume}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-sans text-sm font-semibold hover:opacity-95 shadow-md shadow-pink-500/25 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                id="btn-nav-resume"
              >
                <FileText className="w-4 h-4" />
                <span>View CV</span>
              </button>
            </div>
 
            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center shadow-sm" id="nav-mobile-trigger">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-zinc-900 focus:outline-none cursor-pointer"
                id="btn-mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
 
        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 border-b border-pink-500/20 backdrop-blur-lg overflow-hidden"
              id="mobile-nav-panel"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-sans text-base font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-pink-500/10 text-pink-500 border-l-4 border-pink-500 pl-3"
                          : "text-slate-300 hover:text-white hover:bg-zinc-900/50"
                      }`}
                      id={`nav-mobile-${item.id}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                <div className="pt-4 border-t border-pink-500/20 px-4 space-y-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onDownloadResume();
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-sans text-base font-semibold cursor-pointer shadow-lg shadow-pink-500/25"
                    id="btn-mobile-resume"
                  >
                    <FileText className="w-5 h-5" />
                    <span>View CV / Print Resume</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
