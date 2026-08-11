import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Mail, MapPin, Linkedin, Github, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { portfolioData } from "../data";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side Validation
    if (!formState.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formState.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email.trim())) {
      setErrorMessage("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }
    if (!formState.message.trim()) {
      setErrorMessage("Please write a message before sending.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          subject: formState.subject.trim(),
          message: formState.message.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data || data.success === false) {
        throw new Error(data?.message || "Unable to send your message. Please try again later.");
      }

      // Success: Reset form and show success notification
      setFormState({ name: "", email: "", subject: "", message: "" });
      setShowToast(true);

      // Hide toast after 6s
      setTimeout(() => setShowToast(false), 6000);
    } catch (err: any) {
      console.error("Contact Form Submission Error:", err);
      setErrorMessage(err?.message || "Unable to send your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black border-t border-zinc-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#ec489901_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="glow-spot w-[350px] h-[350px] bg-pink-500/3 bottom-1/4 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3" id="contact-header">
          <span className="font-mono text-xs font-semibold tracking-wider text-pink-400 bg-pink-950/20 border border-pink-500/25 px-3.5 py-1 rounded-full">
            Direct Channels
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Initiate Connection
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-content">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6" id="contact-left-col">
            <div className="bg-black p-6 sm:p-8 rounded-2xl border border-pink-500/20 shadow-sm space-y-6 text-left" id="contact-info-card">
              <h3 className="font-display font-bold text-xl text-white">
                Get In Touch
              </h3>
              <p className="text-slate-300 font-sans text-sm leading-relaxed font-light">
                Whether you want to discuss full-time software development roles, frontend internships, ML dataset analysis, or just say hello, my inbox is always open.
              </p>

              <div className="space-y-4 pt-4 border-t border-zinc-900">
                <a
                  href={`mailto:${portfolioData.socials.email}`}
                  className="flex items-center space-x-3.5 group cursor-pointer"
                  id="direct-mail"
                >
                  <div className="p-3 rounded-xl bg-pink-950/20 border border-pink-500/25 text-pink-400 group-hover:bg-pink-950/40 transition-all duration-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">Email Coordinates</span>
                    <span className="font-sans font-medium text-sm text-slate-300 group-hover:text-pink-400 transition-colors">
                      {portfolioData.socials.email}
                    </span>
                  </div>
                </a>

             

          
                   

                <div className="flex items-center space-x-3.5" id="direct-location">
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">Base Operations</span>
                    <span className="font-sans font-medium text-sm text-slate-300">
                      {portfolioData.socials.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profiles Box */}
              <div className="pt-6 border-t border-zinc-900 space-y-3">
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">Social Coordinates</span>
                <div className="flex gap-3">
                  <a
                    href={portfolioData.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-pink-500/30 hover:bg-pink-950/20 text-slate-400 hover:text-pink-400 transition-all duration-200 cursor-pointer text-sm font-semibold"
                    id="contact-linkedin"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={portfolioData.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-pink-500/30 hover:bg-pink-950/20 text-slate-400 hover:text-pink-400 transition-all duration-200 cursor-pointer text-sm font-semibold"
                    id="contact-github"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7" id="contact-right-col">
            <div className="bg-black p-6 sm:p-8 rounded-2xl border border-pink-500/20 shadow-sm text-left" id="contact-form-card">
              <h3 className="font-display font-bold text-xl text-white mb-6">
                Transmit Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5" id="form-contact">
                {/* Error Banner */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-sans flex items-start space-x-3"
                      id="contact-error-banner"
                    >
                      <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="font-bold block text-rose-200">Delivery Error</span>
                        <p className="leading-relaxed text-rose-300/90">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="space-y-1.5"
                  >
                    <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-slate-500 focus:bg-black focus:border-pink-500 focus:ring-2 focus:ring-pink-500/10 transition-all"
                      placeholder="e.g., Tanisha K."
                      disabled={isSubmitting}
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="space-y-1.5"
                  >
                    <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-slate-500 focus:bg-black focus:border-pink-500 focus:ring-2 focus:ring-pink-500/10 transition-all"
                      placeholder="e.g., mail@domain.com"
                      disabled={isSubmitting}
                    />
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="space-y-1.5"
                >
                  <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-slate-500 focus:bg-black focus:border-pink-500 focus:ring-2 focus:ring-pink-500/10 transition-all"
                    placeholder="How can I help you?"
                    disabled={isSubmitting}
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="space-y-1.5"
                >
                  <label className="text-xs text-slate-400 font-mono uppercase tracking-wider">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-slate-500 focus:bg-black focus:border-pink-500 focus:ring-2 focus:ring-pink-500/10 transition-all resize-none"
                    placeholder="Draft your message here..."
                    disabled={isSubmitting}
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex justify-end pt-2"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting || !formState.name || !formState.email || !formState.message}
                    className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-sans text-sm font-bold shadow-sm shadow-pink-500/10 hover:shadow-md hover:shadow-pink-500/15 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    id="btn-submit-contact"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Sending Email...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animated Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-black border border-emerald-500/40 bg-emerald-950/40 backdrop-blur-md shadow-2xl flex items-center space-x-3.5 max-w-sm text-left"
            id="contact-toast-success"
          >
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-sm text-white">
                Thank you!
              </h4>
              <p className="font-sans text-xs text-emerald-300 mt-0.5">
                Your message has been sent successfully.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
