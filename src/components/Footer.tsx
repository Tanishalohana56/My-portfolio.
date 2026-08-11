import React, { useState, useEffect } from "react";
import { ArrowUp, Clock, Globe, MapPin } from "lucide-react";

export default function Footer() {
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

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black py-12 border-t border-zinc-900 relative" id="footer-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-left">
        {/* Name and title */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center font-display font-extrabold text-white text-xs select-none">
              T
            </span>
            <span className="font-display font-bold text-base text-white tracking-wider">
              TANISHA
            </span>
          </div>
          <p className="text-xs font-sans text-slate-400 leading-relaxed font-light">
            BS Computer Science Student | Full-Stack Developer & Data Analyst.
          </p>
        </div>

        {/* Real-time Clock Badge */}
        {timeString && (
          <div className="flex flex-col items-center justify-center space-y-1 py-1 px-4 rounded-xl bg-zinc-950 border border-zinc-800/80 shadow-sm" id="footer-live-clock">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Clock className="w-3.5 h-3.5 text-pink-400" />
              <span className="font-bold text-white tracking-wider">{timeString}</span>
              <span className="text-[10px] text-pink-400 font-sans uppercase bg-pink-950/40 border border-pink-500/20 px-1.5 py-0.2 rounded">
                {timeZoneLabel}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[11px] font-sans text-slate-400">
              <MapPin className="w-3 h-3 text-pink-500" />
              <span>Karachi, Pakistan</span>
            </div>
          </div>
        )}

        {/* Links & credit */}
        <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right font-mono text-[11px] text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Tanisha. All rights reserved.
          </p>
        </div>

        {/* Scroll up floating action */}
        <button
          onClick={scrollUp}
          className="p-3 rounded-full bg-zinc-950 border border-zinc-800 hover:border-pink-500/20 hover:text-pink-400 transition-colors cursor-pointer text-slate-400 flex items-center justify-center"
          title="Scroll to Top"
          id="btn-footer-up"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
