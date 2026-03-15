"use client";

import { Suspense } from "react";
import { m as motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import MagneticButton from "./MagneticButton";
import { letterReveal, wordReveal, fadeInUp, reducedMotionFade } from "@/lib/animations";

const HeroParticles = dynamic(() => import("./HeroParticles"), { ssr: false });

const BANCO_LETTERS = "BANCO".split("");
const TAGLINE_WORDS = ["Designed", "for", "Safety...", "Built", "to", "Last."];

const Hero: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const v = prefersReduced ? reducedMotionFade : undefined;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg-dark)]"
    >
      {/* Three.js Background */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* Foreground Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* BANCO letters */}
        <h1 className="font-[family-name:var(--font-clash,_'Clash_Display')] font-black text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-none text-white" data-cursor="text">
          {BANCO_LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={v ?? letterReveal}
              initial="hidden"
              animate="visible"
              custom={i}
              style={{ perspective: 600 }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Water Tank subtitle */}
        <motion.p
          className="text-2xl sm:text-3xl font-semibold text-[var(--color-accent)] mt-2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        >
          Water Tank
        </motion.p>

        {/* Tagline */}
        <div className="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-1">
          {TAGLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="text-lg sm:text-xl text-[var(--color-text-dark)]"
              variants={v ?? wordReveal}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Sub text */}
        <motion.p
          className="text-gray-400 mt-4 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          FRP Panel Type Water Tanks — Est. 1965, Tanzania
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <MagneticButton
            href="#product-overview"
            className="px-8 py-3.5 min-h-[44px] rounded-full bg-[var(--color-primary)] text-white font-semibold text-base hover:shadow-xl hover:shadow-[var(--color-primary)]/30 transition-shadow"
          >
            Explore Products
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="px-8 py-3.5 min-h-[44px] rounded-full border-2 border-[var(--color-accent)] text-[var(--color-accent)] font-semibold text-base hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-dark)] transition-colors"
          >
            Get a Quote
          </MagneticButton>
        </motion.div>

        {/* Glowing line */}
        <motion.div
          className="mx-auto mt-8 h-0.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ delay: 2, duration: 0.8 }}
        />

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          <div className="w-5 h-9 rounded-full border-2 border-[var(--color-accent)]/50 relative">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] scroll-indicator-dot" />
          </div>
          <span className="text-xs text-gray-400 uppercase tracking-widest">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
