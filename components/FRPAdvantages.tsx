"use client";

import { useRef } from "react";
import { m as motion, useInView, useReducedMotion } from "framer-motion";
import { FRP_ADVANTAGES, TRADITIONAL_DISADVANTAGES } from "@/lib/constants";
import { slideInLeft, slideInRight, scaleIn, reducedMotionFade } from "@/lib/animations";

const CheckSVG: React.FC<{ delay: number }> = ({ delay }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" className="shrink-0">
    <motion.path
      d="M4 10 L8 14 L16 6"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    />
  </svg>
);

const XSvg: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    className="shrink-0"
    initial={{ rotate: -90, opacity: 0 }}
    whileInView={{ rotate: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
  >
    <line x1="5" y1="5" x2="15" y2="15" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="15" y1="5" x2="5" y2="15" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
  </motion.svg>
);

const FRPAdvantages: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20%" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="frp-advantages"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold text-center mb-6"
          data-cursor="text"
          variants={prefersReduced ? reducedMotionFade : scaleIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          Why FRP Over{" "}
          <span className="text-gradient">Traditional Tanks?</span>
        </motion.h2>

        {/* BANCO WINS badge */}
        <motion.div
          className="text-center mb-12"
          initial={{ scale: 0, rotate: -12 }}
          animate={inView ? { scale: 1, rotate: -6 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.5 }}
        >
          <span className="inline-block px-6 py-2 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm shadow-lg shadow-[var(--color-primary)]/30">
            BANCO WINS ⭐
          </span>
        </motion.div>

        {/* Battle cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* FRP Card */}
          <motion.div
            className="rounded-3xl p-8 border-2 border-[var(--color-primary)]/40 dark:border-[var(--color-accent)]/40 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-bg-card-dark) 100%)",
            }}
            variants={prefersReduced ? reducedMotionFade : slideInLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Water texture overlay */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }} />
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-sm">💧</span>
                BANCO FRP Tank
              </h3>
              <ul className="space-y-4">
                {FRP_ADVANTAGES.map((adv, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90 text-sm">
                    <CheckSVG delay={0.3 + i * 0.1} />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Traditional Card */}
          <motion.div
            className="rounded-3xl p-8 border-2 border-gray-400/20 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)",
              transform: "rotate(-1deg)",
            }}
            variants={prefersReduced ? reducedMotionFade : slideInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="relative" style={{ transform: "rotate(1deg)" }}>
              <h3 className="text-2xl font-bold text-gray-400 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gray-600/30 flex items-center justify-center text-sm">🏗️</span>
                Traditional Steel/Concrete
              </h3>
              <ul className="space-y-4">
                {TRADITIONAL_DISADVANTAGES.map((dis, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-500 text-sm">
                    <XSvg delay={0.3 + i * 0.1} />
                    <span className="line-through decoration-red-500/50">{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FRPAdvantages;
