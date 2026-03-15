"use client";

import { useRef, useEffect, useState } from "react";
import { m as motion, useReducedMotion } from "framer-motion";
import { ASSEMBLY_STEPS, ASSEMBLY_FEATURES } from "@/lib/constants";
import { fadeInUp, reducedMotionFade } from "@/lib/animations";

const FeaturesAssembly: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (prefersReduced || isMobile) return;
    let ctx: { revert: () => void } | null = null;

    const initGSAP = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        gsap.to({}, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
              const step = Math.min(
                Math.floor(self.progress * ASSEMBLY_STEPS.length),
                ASSEMBLY_STEPS.length - 1
              );
              setActiveStep(step);
            },
          },
        });
      }, sectionRef);
    };

    initGSAP();
    return () => { if (ctx) ctx.revert(); };
  }, [prefersReduced, isMobile]);

  const phase = activeStep;
  const tankBaseH = phase >= 0 ? 20 : 0;
  const tankWallsVisible = phase >= 1;
  const bracingVisible = phase >= 2;
  const waterFill = phase >= 3;
  const allComplete = phase >= 3;

  return (
    <section
      id="assembly"
      ref={sectionRef}
      className="relative bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] py-24 min-h-screen overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={prefersReduced ? reducedMotionFade : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold mb-4"
            data-cursor="text"
          >
            Easy Modular{" "}
            <span className="text-gradient">Assembly</span>
          </h2>
          <p className="text-[var(--color-muted)] text-lg">
            No welding. No heavy equipment. Just precision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Animated Tank SVG */}
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 300 240" className="w-full max-w-sm">
              {/* Base */}
              <motion.rect
                x="30" y="200" width="240" height={tankBaseH} rx="3"
                fill="var(--color-muted)" fillOpacity="0.4"
                stroke="var(--color-primary)" strokeWidth="1.5"
                animate={{ height: tankBaseH, opacity: phase >= 0 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              {/* Left wall */}
              <motion.rect
                x="30" y="40" width="15" height="160" rx="2"
                fill="var(--color-primary)" fillOpacity="0.2"
                stroke="var(--color-primary)" strokeWidth="1.5"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: tankWallsVisible ? 0 : -60, opacity: tankWallsVisible ? 1 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
              />
              {/* Right wall */}
              <motion.rect
                x="255" y="40" width="15" height="160" rx="2"
                fill="var(--color-primary)" fillOpacity="0.2"
                stroke="var(--color-primary)" strokeWidth="1.5"
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: tankWallsVisible ? 0 : 60, opacity: tankWallsVisible ? 1 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
              />
              {/* Bracing */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: bracingVisible ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <line x1="60" y1="60" x2="240" y2="180" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="6" />
                <line x1="240" y1="60" x2="60" y2="180" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="6" />
                {/* Horizontal tie rods */}
                <line x1="45" y1="100" x2="255" y2="100" stroke="var(--color-accent)" strokeWidth="1" />
                <line x1="45" y1="150" x2="255" y2="150" stroke="var(--color-accent)" strokeWidth="1" />
              </motion.g>
              {/* Water fill */}
              <motion.rect
                x="45" y="130" width="210" height="70" rx="2"
                fill="var(--color-accent)" fillOpacity="0.15"
                initial={{ height: 0, y: 200 }}
                animate={{ height: waterFill ? 70 : 0, y: waterFill ? 130 : 200 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              {/* Roof */}
              <motion.rect
                x="30" y="30" width="240" height="12" rx="3"
                fill="var(--color-accent)" fillOpacity="0.3"
                stroke="var(--color-accent)" strokeWidth="1.5"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: waterFill ? 0 : -30, opacity: waterFill ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </svg>
          </div>

          {/* Step cards */}
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10 dark:bg-white/5">
              <motion.div
                className="w-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)]"
                animate={{ height: `${((activeStep + 1) / ASSEMBLY_STEPS.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="space-y-6">
              {ASSEMBLY_STEPS.map((s, i) => {
                const isActive = i <= activeStep;

                return (
                  <motion.div
                    key={s.step}
                    className={`relative pl-16 py-4 rounded-2xl transition-colors ${
                      isActive ? "bg-[var(--color-primary)]/5 dark:bg-[var(--color-accent)]/5" : ""
                    }`}
                    variants={prefersReduced ? reducedMotionFade : fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                  >
                    {/* Step number */}
                    <motion.div
                      className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                        isActive
                          ? "bg-[var(--color-primary)] dark:bg-[var(--color-accent)] text-white dark:text-[var(--color-bg-dark)] border-transparent"
                          : "border-[var(--color-muted)]/30 text-[var(--color-muted)]"
                      }`}
                      animate={allComplete && i <= activeStep ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ delay: i * 0.1 }}
                    >
                      {allComplete ? "✓" : s.step}
                    </motion.div>
                    <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                    <p className="text-sm text-[var(--color-muted)]">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Assembly complete banner */}
            {allComplete && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="inline-block px-6 py-3 rounded-full bg-green-500/10 text-green-500 font-bold text-sm border border-green-500/20">
                  Assembly Complete! ✅
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Feature pills */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          {ASSEMBLY_FEATURES.map((f, i) => (
            <motion.div
              key={f.text}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-bg-card-light)] dark:bg-[var(--color-bg-card-dark)] border border-[var(--color-primary)]/15 dark:border-[var(--color-accent)]/15"
              variants={prefersReduced ? reducedMotionFade : fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <span className="text-xl">{f.icon}</span>
              <span className="text-sm font-medium">{f.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAssembly;
