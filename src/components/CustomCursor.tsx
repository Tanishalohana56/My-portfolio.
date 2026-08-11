import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 400, damping: 28 });

  const dotX = useSpring(0, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(0, { stiffness: 1000, damping: 50 });

  useEffect(() => {
    // Only enable custom cursor on devices supporting fine pointer (mouse/trackpad)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, input, textarea, select, [role='button'], .cursor-pointer");
      setIsHovered(!!interactive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Follower Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? "rgba(236, 72, 153, 0.8)" : "rgba(236, 72, 153, 0.35)",
          backgroundColor: isHovered ? "rgba(236, 72, 153, 0.15)" : "rgba(236, 72, 153, 0.03)",
          boxShadow: isHovered ? "0 0 25px 4px rgba(236, 72, 153, 0.4)" : "0 0 10px 1px rgba(236, 72, 153, 0.1)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="w-9 h-9 rounded-full border border-pink-500/40 backdrop-blur-[1px]"
      />

      {/* Center Precise Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          backgroundColor: isHovered ? "#ec4899" : "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-2 h-2 rounded-full shadow-sm"
      />
    </div>
  );
}
