import { motion } from "motion/react";
import { X, Command, Keyboard } from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: "H", label: "Jump to Home", category: "Navigation" },
    { key: "A", label: "Jump to About Section", category: "Navigation" },
    { key: "S", label: "Jump to Skills Matrix", category: "Navigation" },
    { key: "E", label: "Jump to Experience", category: "Navigation" },
    { key: "P", label: "Jump to Projects", category: "Navigation" },
    { key: "C", label: "Jump to Contact Form", category: "Navigation" },
    { key: "R / V", label: "Open Resume / CV", category: "Actions" },
    { key: "?", label: "Toggle Shortcuts Helper", category: "System" },
    { key: "Esc", label: "Close Active Modal", category: "System" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="keyboard-shortcuts-modal">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 12 }}
        className="relative bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl z-10"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-white">Keyboard Shortcuts</h3>
              <p className="text-slate-400 text-xs font-sans">Quick navigation commands across the portfolio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-2.5">
            {shortcuts.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <span className="text-xs font-sans text-slate-300 font-medium">
                  {item.label}
                </span>
                <kbd className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-pink-400 font-mono text-xs font-bold shadow-inner">
                  {item.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-900/30 border-t border-zinc-800/60 flex items-center justify-between text-slate-500 text-[11px] font-mono">
          <span className="flex items-center space-x-1">
            <Command className="w-3 h-3 text-slate-400" />
            <span>Press Esc to dismiss</span>
          </span>
          <span className="text-pink-400/80">Active</span>
        </div>
      </motion.div>
    </div>
  );
}
