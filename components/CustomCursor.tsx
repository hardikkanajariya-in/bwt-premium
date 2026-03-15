"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

const CustomCursor: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [hoverType, setHoverType] = useState<"default" | "pointer" | "text">("default");
  const [isTouch, setIsTouch] = useState(true);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);
  const smoothX = useSpring(ringX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(ringY, { stiffness: 80, damping: 20 });
  const dotX = useRef(0);
  const dotY = useRef(0);

  const prefersReduced = useReducedMotion();
  const color = resolvedTheme === "dark" ? "#00B4D8" : "#0077B6";

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    setIsTouch(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!visible) setVisible(true);
      dotX.current = e.clientX;
      dotY.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      ringX.set(e.clientX - 18);
      ringY.set(e.clientY - 18);
    },
    [visible, ringX, ringY]
  );

  useEffect(() => {
    if (isTouch) return;
    document.documentElement.classList.add("cursor-hidden");
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouch, handleMouseMove]);

  useEffect(() => {
    if (isTouch) return;
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [data-cursor='pointer']")
      ) {
        setHoverType("pointer");
      } else if (target.closest("[data-cursor='text'], h1, h2, h3")) {
        setHoverType("text");
      } else {
        setHoverType("default");
      }
    };
    document.addEventListener("mouseover", handleOver);
    return () => document.removeEventListener("mouseover", handleOver);
  }, [isTouch]);

  if (isTouch || prefersReduced) return null;

  const ringSize = hoverType === "pointer" ? 56 : 36;
  const ringScaleX = hoverType === "text" ? 3 : 1;
  const ringScaleY = hoverType === "text" ? 0.3 : 1;
  const ringBg =
    hoverType === "pointer" ? `${color}33` : "transparent";

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            ref={dotRef}
            className="fixed top-0 left-0 z-[9999] pointer-events-none"
            style={{ width: 8, height: 8 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileTap={{ scale: 0.5 }}
          >
            <div
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                backgroundColor: color,
              }}
            />
          </motion.div>
          <motion.div
            className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
            style={{
              x: smoothX,
              y: smoothY,
              width: ringSize,
              height: ringSize,
            }}
            animate={{
              width: ringSize,
              height: ringSize,
              scaleX: ringScaleX,
              scaleY: ringScaleY,
              backgroundColor: ringBg,
              borderColor: color,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{ border: `1.5px solid ${color}` }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
