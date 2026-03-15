"use client";

import { useRef } from "react";
import { m as motion, useInView, useReducedMotion } from "framer-motion";
import { SPECS } from "@/lib/constants";
import { slideInLeft, reducedMotionFade } from "@/lib/animations";

const TechnicalSpecs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="technical-specs"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold text-center mb-16"
          data-cursor="text"
          variants={prefersReduced ? reducedMotionFade : slideInLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          Technical{" "}
          <span className="text-gradient">Specifications</span>
        </motion.h2>

        <div className="space-y-1">
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.param}
              className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-xl transition-colors hover:bg-cyan-500/8 ${
                i % 2 === 1 ? "bg-[var(--color-primary)]/[0.03]" : ""
              }`}
              variants={prefersReduced ? reducedMotionFade : slideInLeft}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              {/* Parameter */}
              <span className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider w-44 shrink-0">
                {spec.param}
              </span>

              {/* Middle: bar or badge */}
              <div className="flex-1 flex items-center gap-2">
                {spec.bar !== null && spec.bar !== undefined && (
                  <div className="flex-1 h-2 rounded-full bg-[var(--color-primary)]/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${spec.bar}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                    />
                  </div>
                )}
                {"dual" in spec && spec.dual && (
                  <div className="flex-1 h-2 rounded-full bg-[var(--color-primary)]/10 overflow-hidden relative">
                    <motion.div
                      className="absolute h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)]"
                      initial={{ left: "20%", width: 0 }}
                      animate={inView ? { width: "60%" } : { width: 0 }}
                      transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
                    />
                  </div>
                )}
                {"badge" in spec && spec.badge && (
                  <div className="flex gap-2 flex-wrap">
                    {spec.badge.map((b: string) => (
                      <span
                        key={b}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/15 text-[var(--color-primary)] dark:text-[var(--color-accent)] border border-[var(--color-primary)]/20 dark:border-[var(--color-accent)]/20"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Value */}
              <span className="font-mono font-bold text-sm text-[var(--color-primary)] dark:text-cyan-400 w-44 text-right shrink-0">
                {spec.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;
