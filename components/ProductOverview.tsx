"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import { fadeInUp, reducedMotionFade } from "@/lib/animations";

const USP_LIST = [
  "Corrosion-Free FRP Material",
  "UV Stabilized Resin Coating",
  "Modular & Expandable Design",
  "Potable Water Certified",
  "SS304/SS316 Hardware",
];

const FEATURES = ["Corrosion-Free", "UV Resistant", "Modular Design", "Potable Safe", "Quick Install"];

const ProductOverview: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const v = prefersReduced ? reducedMotionFade : fadeInUp;

  return (
    <section
      id="product-overview"
      className="relative bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold text-center mb-16"
          data-cursor="text"
          variants={v}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          FRP Panel Type{" "}
          <span className="text-gradient">Water Tank</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* SVG Tank Diagram */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <svg viewBox="0 0 400 300" className="w-full max-w-md" fill="none">
              {/* Base */}
              <rect x="60" y="240" width="280" height="20" rx="4"
                fill="var(--color-muted)" fillOpacity="0.3" stroke="var(--color-primary)" strokeWidth="2" />
              {/* Left Wall */}
              <rect x="60" y="60" width="20" height="180" rx="2"
                fill="var(--color-primary)" fillOpacity="0.2" stroke="var(--color-primary)" strokeWidth="2" />
              {/* Right Wall */}
              <rect x="320" y="60" width="20" height="180" rx="2"
                fill="var(--color-primary)" fillOpacity="0.2" stroke="var(--color-primary)" strokeWidth="2" />
              {/* Roof */}
              <rect x="60" y="40" width="280" height="20" rx="4"
                fill="var(--color-accent)" fillOpacity="0.3" stroke="var(--color-accent)" strokeWidth="2" />
              {/* Water fill */}
              <rect x="80" y="120" width="240" height="120" rx="2"
                fill="var(--color-accent)" fillOpacity="0.1" />
              {/* Labels */}
              <g>
                <circle cx="60" cy="150" r="4" fill="var(--color-accent)" />
                <line x1="56" y1="150" x2="20" y2="150" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4" />
                <text x="10" y="145" fill="var(--color-accent)" fontSize="8" textAnchor="end">Side Panel</text>
              </g>
              <g>
                <circle cx="200" cy="40" r="4" fill="var(--color-accent)" />
                <line x1="200" y1="36" x2="200" y2="16" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4" />
                <text x="200" y="12" fill="var(--color-accent)" fontSize="8" textAnchor="middle">Roof Panel</text>
              </g>
              <g>
                <circle cx="200" cy="250" r="4" fill="var(--color-accent)" />
                <line x1="200" y1="254" x2="200" y2="274" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4" />
                <text x="200" y="284" fill="var(--color-accent)" fontSize="8" textAnchor="middle">Base Frame</text>
              </g>
            </svg>
          </motion.div>

          {/* USP List + Features */}
          <div>
            <div className="space-y-4 mb-8">
              {USP_LIST.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  custom={i}
                >
                  {/* Connected line */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-accent)]" />
                    {i < USP_LIST.length - 1 && (
                      <div className="w-0.5 h-8 bg-[var(--color-primary)]/30 dark:bg-[var(--color-accent)]/30 mt-1" />
                    )}
                  </div>
                  <p className="text-base font-medium text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">{item}</p>
                </motion.div>
              ))}
            </div>

            {/* Feature pills */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {FEATURES.map((f) => (
                <motion.span
                  key={f}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/10 text-[var(--color-primary)] dark:text-[var(--color-accent)] border border-[var(--color-primary)]/20 dark:border-[var(--color-accent)]/20"
                  variants={v}
                >
                  {f}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
