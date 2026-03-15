"use client";

import { useRef, useEffect, useState } from "react";
import { m as motion, useReducedMotion } from "framer-motion";
import { APPLICATIONS } from "@/lib/constants";
import { fadeInUp, reducedMotionFade } from "@/lib/animations";
import Image from "next/image";

const APP_IMAGES: Record<string, string> = {
  "Hospitals & Healthcare": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
  "Hotels & Hospitality": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "Defence & Military": "https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=800&q=80",
  "Industrial & Manufacturing": "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80",
  "Commercial Buildings": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "Schools & Universities": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  "Agriculture & Farming": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80",
  "Residential Estates": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
};

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
        <div className="fixed top-0 left-0 right-0 z-30 h-0.5 bg-[var(--color-primary)]/10 dark:bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      {/* Heading */}
      <div className="px-4 sm:px-8 pt-16 pb-10 text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold"
          data-cursor="text"
        >
          <span className="text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">Where BANCO Tanks</span>{" "}
          <span className="text-gradient">Are Used</span>
        </h2>
      </div>

      {/* Horizontal track (desktop) or vertical grid (mobile) */}
      {isMobile ? (
        <div className="px-4 pb-24 grid sm:grid-cols-2 gap-6">
          {APPLICATIONS.map((app, i) => (
            <motion.div
              key={app.name}
              className="rounded-3xl overflow-hidden border border-white/10 dark:border-white/5 relative group"
              variants={prefersReduced ? reducedMotionFade : fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={APP_IMAGES[app.name] ?? ""}
                  alt={app.name}
                  fill
                  className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                  style={{ objectPosition: "center" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-4 text-4xl">{app.icon}</span>
              </div>
              <div className="p-6 bg-[var(--color-bg-card-light)] dark:bg-[var(--color-bg-card-dark)]">
                <h3 className="text-xl font-bold mb-1 text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">{app.name}</h3>
                <p className="text-sm text-[var(--color-muted)]">{app.desc}</p>
              </div>
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
                className="shrink-0 w-[60vw] md:w-[45vw] lg:w-[35vw] h-[70vh] rounded-3xl overflow-hidden relative group hover:border-[var(--color-accent)]/40 transition-colors border border-white/10 dark:border-white/5"
              >
                <Image
                  src={APP_IMAGES[app.name] ?? ""}
                  alt={app.name}
                  fill
                  className="object-cover scale-110 group-hover:scale-[1.15] transition-transform duration-700"
                  style={{ objectPosition: "center", transform: "translateZ(0)" }}
                  sizes="60vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <span className="text-7xl mb-6 block group-hover:scale-110 transition-transform">{app.icon}</span>
                  <h3 className="text-3xl lg:text-4xl font-black mb-3 text-white">{app.name}</h3>
                  <p className="text-base text-white/70 max-w-sm">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Applications;
