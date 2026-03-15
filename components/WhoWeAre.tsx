"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { STATS } from "@/lib/constants";
import { fadeInUp, slideInLeft, reducedMotionFade } from "@/lib/animations";

function useCountUp(target: number, from: number, inView: boolean) {
  const [count, setCount] = useState(from);
  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const duration = 2000;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(from + (target - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, from, inView]);
  return count;
}

interface StatCardProps {
  value: number;
  label: string;
  prefix: string;
  suffix: string;
  countFrom: number;
  index: number;
  inView: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, prefix, suffix, countFrom, index, inView }) => {
  const count = useCountUp(value, countFrom, inView);

  return (
    <motion.div
      className="relative rounded-3xl p-6 sm:p-8 bg-white/5 dark:bg-white/5 backdrop-blur-md border border-cyan-500/20 overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
      style={{ boxShadow: "0 0 30px rgba(0,180,216,0.15)" }}
      variants={fadeInUp}
      custom={index}
      whileHover={{ boxShadow: "0 0 50px rgba(0,180,216,0.3)" }}
    >
      <p className="text-5xl sm:text-6xl font-black text-[var(--color-primary)] dark:text-[var(--color-accent)]">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-[var(--color-muted)] mt-2 font-medium uppercase tracking-wider">
        {label}
      </p>
      {/* Wave decoration */}
      <svg className="absolute bottom-0 left-0 w-full h-8 opacity-20" viewBox="0 0 200 20" preserveAspectRatio="none">
        <path d="M0,10 C50,0 150,20 200,10 L200,20 L0,20 Z" fill="var(--color-accent)" />
      </svg>
    </motion.div>
  );
};

const WhoWeAre: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20%" });
  const prefersReduced = useReducedMotion();
  const v = prefersReduced ? reducedMotionFade : undefined;

  return (
    <section
      id="who-we-are"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]"
    >
      {/* Conic gradient background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div
          className="w-full h-full"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, var(--color-primary) 0deg, var(--color-accent-light) 120deg, var(--color-accent) 240deg, var(--color-primary) 360deg)",
            animation: "spin 20s linear infinite",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with wipe reveal */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={v ?? fadeInUp}
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold"
            data-cursor="text"
          >
            <span className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ x: "100%" }}
                animate={inView ? { x: 0 } : { x: "100%" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Who{" "}
              </motion.span>
            </span>
            <span className="inline-block overflow-hidden">
              <motion.span
                className="inline-block text-gradient"
                initial={{ x: "100%" }}
                animate={inView ? { x: 0 } : { x: "100%" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                We Are
              </motion.span>
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Story */}
          <motion.div
            className="relative pl-8"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={v ?? slideInLeft}
          >
            {/* Animated accent bar */}
            <motion.div
              className="absolute left-0 top-0 w-1 rounded-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)]"
              initial={{ height: "0%" }}
              animate={inView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />
            <p className="text-lg leading-relaxed text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] mb-6">
              Since <strong>1965</strong>, Neomech (T) Ltd. has been at the forefront of
              water storage innovation in East Africa. We manufacture{" "}
              <strong>BANCO FRP Panel Type Water Tanks</strong> — the gold standard in
              durability, hygiene, and modular design.
            </p>
            <p className="text-base text-[var(--color-muted)] leading-relaxed mb-8">
              From hospitals to defence installations, our tanks serve critical
              infrastructure across Tanzania and beyond. Every BANCO tank is engineered
              for safety and built to last — because clean water is a fundamental right.
            </p>

            {/* Tanzania badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
                border: "2px solid transparent",
                backgroundClip: "padding-box",
                backgroundImage:
                  "linear-gradient(var(--color-bg-card-light), var(--color-bg-card-light)), linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-accent-light), var(--color-primary))",
                backgroundOrigin: "border-box",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-lg">🇹🇿</span>
              Proudly Made in Tanzania
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4 sm:gap-6"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                prefix={stat.prefix}
                suffix={stat.suffix}
                countFrom={stat.countFrom}
                index={i}
                inView={inView}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
