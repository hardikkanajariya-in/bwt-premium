"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BENEFITS } from "@/lib/constants";
import { fadeInUp, reducedMotionFade, cardHover } from "@/lib/animations";

const KeyBenefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const tankRef = useRef<SVGSVGElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const prefersReduced = useReducedMotion();
  const [fillProgress, setFillProgress] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

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
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onUpdate: (self) => {
              setFillProgress(self.progress);
            },
          },
        });
      }, sectionRef);
    };

    initGSAP();
    return () => { if (ctx) ctx.revert(); };
  }, [prefersReduced, isMobile]);

  const visibleCount = Math.ceil(fillProgress * BENEFITS.length);
  const fillHeight = fillProgress * 200;

  return (
    <section
      id="key-benefits"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold text-center mb-16"
          data-cursor="text"
          variants={prefersReduced ? reducedMotionFade : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          12 Reasons to Choose{" "}
          <span className="text-gradient">BANCO</span>
        </motion.h2>

        {/* Water fill tank + cards */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* SVG Tank (desktop only) */}
          {!isMobile && (
            <div className="hidden lg:block sticky top-32 w-48 shrink-0">
              <svg ref={tankRef} viewBox="0 0 120 260" className="w-full">
                {/* Tank outline */}
                <rect x="10" y="20" width="100" height="220" rx="8"
                  fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeOpacity="0.4" />
                {/* Water fill */}
                <defs>
                  <clipPath id="tankClip">
                    <rect x="12" y="22" width="96" height="216" rx="6" />
                  </clipPath>
                </defs>
                <g clipPath="url(#tankClip)">
                  {/* Water body */}
                  <rect
                    x="12"
                    y={238 - fillHeight}
                    width="96"
                    height={fillHeight}
                    fill="var(--color-primary)"
                    fillOpacity="0.3"
                  />
                  {/* Wave top */}
                  <path
                    d={`M12,${238 - fillHeight} Q35,${232 - fillHeight} 60,${238 - fillHeight} T108,${238 - fillHeight}`}
                    fill="var(--color-accent)"
                    fillOpacity="0.4"
                    className="water-wave-anim"
                  />
                </g>
              </svg>
            </div>
          )}

          {/* Benefit cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 flex-1">
            {BENEFITS.map((benefit, i) => {
              const isVisible = isMobile || prefersReduced || i < visibleCount;
              return (
                <motion.div
                  key={benefit.title}
                  className="rounded-2xl p-6 border border-cyan-500/20 bg-[var(--color-bg-card-light)] dark:bg-[var(--color-bg-card-dark)] group"
                  initial={{ opacity: 0, x: 40 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14, delay: isMobile ? i * 0.05 : 0 }}
                  whileHover={cardHover.hover}
                  whileTap={cardHover.tap}
                >
                  <span className="text-4xl block mb-3" style={{ filter: "drop-shadow(0 0 8px rgba(0,180,216,0.3))" }}>
                    {benefit.icon}
                  </span>
                  <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-sm text-[var(--color-muted)]">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyBenefits;
