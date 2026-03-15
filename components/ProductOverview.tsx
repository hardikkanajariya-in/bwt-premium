"use client";

import { useRef, useEffect, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 1,
            pin: true,
          },
        });

        // Phase 1: Heading
        tl.fromTo(".po-heading", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3 })
          // Phase 2: Tank panels
          .fromTo(".po-tank-left", { x: -200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.2 }, 0.3)
          .fromTo(".po-tank-right", { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 0.2 }, 0.3)
          .fromTo(".po-tank-roof", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 0.35)
          .fromTo(".po-tank-base", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 0.35)
          // Phase 2b: Labels
          .fromTo(".po-label", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.15, stagger: 0.05 }, 0.5)
          // Phase 3: Feature pills
          .fromTo(".po-pill", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.15, stagger: 0.08 }, 0.7);
      }, sectionRef);
    };

    initGSAP();
    return () => { if (ctx) ctx.revert(); };
  }, [prefersReduced, isMobile]);

  return (
    <section
      id="product-overview"
      ref={sectionRef}
      className="relative min-h-screen bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2
          className="po-heading text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold text-center mb-16"
          data-cursor="text"
        >
          FRP Panel Type{" "}
          <span className="text-gradient">Water Tank</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* SVG Tank Diagram */}
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full max-w-md" fill="none">
              {/* Base */}
              <rect className="po-tank-base" x="60" y="240" width="280" height="20" rx="4"
                fill="var(--color-muted)" fillOpacity="0.3" stroke="var(--color-primary)" strokeWidth="2" />
              {/* Left Wall */}
              <rect className="po-tank-left" x="60" y="60" width="20" height="180" rx="2"
                fill="var(--color-primary)" fillOpacity="0.2" stroke="var(--color-primary)" strokeWidth="2" />
              {/* Right Wall */}
              <rect className="po-tank-right" x="320" y="60" width="20" height="180" rx="2"
                fill="var(--color-primary)" fillOpacity="0.2" stroke="var(--color-primary)" strokeWidth="2" />
              {/* Roof */}
              <rect className="po-tank-roof" x="60" y="40" width="280" height="20" rx="4"
                fill="var(--color-accent)" fillOpacity="0.3" stroke="var(--color-accent)" strokeWidth="2" />
              {/* Water fill */}
              <rect x="80" y="120" width="240" height="120" rx="2"
                fill="var(--color-accent)" fillOpacity="0.1" />
              {/* Labels */}
              <g className="po-label">
                <circle cx="60" cy="150" r="4" fill="var(--color-accent)" />
                <line x1="56" y1="150" x2="20" y2="150" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4" />
                <text x="10" y="145" fill="var(--color-accent)" fontSize="8" textAnchor="end">Side Panel</text>
              </g>
              <g className="po-label">
                <circle cx="200" cy="40" r="4" fill="var(--color-accent)" />
                <line x1="200" y1="36" x2="200" y2="16" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4" />
                <text x="200" y="12" fill="var(--color-accent)" fontSize="8" textAnchor="middle">Roof Panel</text>
              </g>
              <g className="po-label">
                <circle cx="200" cy="250" r="4" fill="var(--color-accent)" />
                <line x1="200" y1="254" x2="200" y2="274" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="4" />
                <text x="200" y="284" fill="var(--color-accent)" fontSize="8" textAnchor="middle">Base Frame</text>
              </g>
            </svg>
          </div>

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
                  <p className="text-base font-medium">{item}</p>
                </motion.div>
              ))}
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              {FEATURES.map((f) => (
                <span
                  key={f}
                  className="po-pill px-4 py-2 rounded-full text-sm font-semibold bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/10 text-[var(--color-primary)] dark:text-[var(--color-accent)] border border-[var(--color-primary)]/20 dark:border-[var(--color-accent)]/20"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
