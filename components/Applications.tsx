"use client";

import { useRef, useEffect, useState } from "react";
import { m as motion, useReducedMotion } from "framer-motion";
import { APPLICATIONS } from "@/lib/constants";
import { fadeInUp, reducedMotionFade } from "@/lib/animations";

const Applications: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
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

      if (!sectionRef.current || !trackRef.current) return;

      const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

      ctx = gsap.context(() => {
        gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: true,
            onUpdate: (self) => setProgress(self.progress),
          },
        });
      }, sectionRef);
    };

    initGSAP();
    return () => { if (ctx) ctx.revert(); };
  }, [prefersReduced, isMobile]);

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="relative bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] overflow-hidden"
      style={{ minHeight: isMobile ? "auto" : "100vh" }}
    >
      {/* Progress bar */}
      {!isMobile && (
        <div className="fixed top-0 left-0 right-0 z-30 h-0.5 bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      {/* Fixed heading */}
      <div className="sticky top-20 z-20 px-4 sm:px-8 py-6">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold"
          data-cursor="text"
        >
          Where BANCO Tanks{" "}
          <span className="text-gradient">Are Used</span>
        </h2>
      </div>

      {/* Horizontal track (desktop) or vertical grid (mobile) */}
      {isMobile ? (
        <div className="px-4 pb-24 grid gap-6">
          {APPLICATIONS.map((app, i) => (
            <motion.div
              key={app.name}
              className={`rounded-3xl p-8 bg-gradient-to-br ${app.gradient} border border-white/10 dark:border-white/5`}
              variants={prefersReduced ? reducedMotionFade : fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <span className="text-5xl block mb-4">{app.icon}</span>
              <h3 className="text-2xl font-bold mb-2">{app.name}</h3>
              <p className="text-[var(--color-muted)]">{app.desc}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="pt-4">
          <div
            ref={trackRef}
            className="flex gap-8 px-8"
            style={{ width: "fit-content" }}
          >
            {APPLICATIONS.map((app) => (
              <div
                key={app.name}
                className={`shrink-0 w-[60vw] md:w-[45vw] lg:w-[35vw] h-[70vh] rounded-3xl p-10 flex flex-col justify-end bg-gradient-to-br ${app.gradient} border border-white/10 dark:border-white/5 group hover:border-[var(--color-accent)]/40 transition-colors`}
              >
                <span className="text-7xl mb-6 group-hover:scale-110 transition-transform">{app.icon}</span>
                <h3 className="text-3xl lg:text-4xl font-black mb-3">{app.name}</h3>
                <p className="text-base text-[var(--color-muted)] max-w-sm">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Applications;
