"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const toggle = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const el = btnRef.current;
    if (el && "startViewTransition" in document) {
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      const doc = document as Document & {
        startViewTransition: (cb: () => void) => { ready: Promise<void> };
      };
      const transition = doc.startViewTransition(() => {
        setTheme(next);
      });
      transition.ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
          { duration: 500, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
        );
      });
    } else {
      setTheme(next);
    }
  }, [resolvedTheme, setTheme]);

  if (!mounted) return <div className="w-14 h-8" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex items-center w-14 h-8 rounded-full p-1 transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#1e293b" : "#fef3c7" }}
    >
      <motion.div
        className="absolute w-6 h-6 rounded-full flex items-center justify-center shadow-md"
        style={{ backgroundColor: isDark ? "#0f172a" : "#fbbf24" }}
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Moon size={14} className="text-cyan-400" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Sun size={14} className="text-amber-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
