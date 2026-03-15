"use client";

import { useCallback, useRef, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FOOTER_LINKS, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import { fadeInUp, reducedMotionFade } from "@/lib/animations";

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const handleWatermarkClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const footer = footerRef.current;
    if (!footer) return;
    const rect = footer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement("div");
    ripple.className = "footer-ripple absolute rounded-full border-2 border-[var(--color-accent)]/30 pointer-events-none";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = "100px";
    ripple.style.height = "100px";
    footer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
  }, [prefersReduced]);

  return (
    <footer ref={footerRef} className="relative bg-[var(--color-bg-card-dark)] text-[var(--color-text-dark)] overflow-hidden">
      {/* Gradient border */}
      <div className="animated-gradient-border h-1" />

      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-auto select-none cursor-pointer"
        onClick={handleWatermarkClick}
        role="presentation"
      >
        <span className="font-[family-name:var(--font-clash,_'Clash_Display')] text-[20vw] font-black opacity-[0.03] leading-none">
          BANCO
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo + tagline */}
          <motion.div
            variants={prefersReduced ? reducedMotionFade : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-[var(--color-accent)]">
                <path
                  d="M16 2C16 2 6 14 6 20C6 25.5 10.5 30 16 30C21.5 30 26 25.5 26 20C26 14 16 2 16 2Z"
                  stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.2"
                />
              </svg>
              <span className="font-[family-name:var(--font-clash,_'Clash_Display')] font-bold text-lg">BANCO</span>
            </div>
            <p className="text-sm text-[var(--color-muted)] max-w-xs">
              Designed for Safety. Built to Last. Premium FRP Panel Type Water Tanks by Neomech (T) Ltd.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            variants={prefersReduced ? reducedMotionFade : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-accent)]">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="nav-link text-sm text-[var(--color-muted)] hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + Social */}
          <motion.div
            variants={prefersReduced ? reducedMotionFade : fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-accent)]">Contact</h4>
            <div className="space-y-2 text-sm text-[var(--color-muted)]">
              <p>{CONTACT_INFO.address}</p>
              <p>{CONTACT_INFO.phone}</p>
              <p>{CONTACT_INFO.email}</p>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-[var(--color-muted)] hover:text-white hover:-translate-y-1 transition-all"
                  style={{ ["--glow" as string]: social.color }}
                  data-cursor="pointer"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${social.color}40`;
                    (e.currentTarget as HTMLElement).style.borderColor = social.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                  }}
                >
                  <span className="text-xs font-bold">{social.name[0]}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-[var(--color-muted)]">
            &copy; 2026 BANCO Water Tank &mdash; Neomech (T) Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
