"use client";

import { useEffect, useState, useCallback } from "react";
import {
  m,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";
import { staggerContainer, fadeInUp, reducedMotionFade } from "@/lib/animations";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 80);
    setHidden(latest > prev && latest > 200);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <m.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${!scrolled ? "text-white" : ""}`}
        animate={{ y: hidden && !mobileOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: scrolled ? undefined : "transparent",
        }}
      >
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "glass border-b border-white/10 shadow-lg"
              : ""
          }`}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group" data-cursor="pointer">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-[var(--color-primary)] dark:text-[var(--color-accent)]"
              >
                <path
                  d="M16 2C16 2 6 14 6 20C6 25.5 10.5 30 16 30C21.5 30 26 25.5 26 20C26 14 16 2 16 2Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="currentColor"
                  fillOpacity="0.2"
                  className="transition-all duration-[1200ms]"
                  strokeDasharray="80"
                  strokeDashoffset="0"
                />
              </svg>
              <span className="font-[family-name:var(--font-clash,_'Clash_Display')] font-bold text-xl tracking-wider group-hover:tracking-[0.25em] transition-all duration-300">
                BANCO
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className={`nav-link text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                    activeSection === href.slice(1)
                      ? `active ${scrolled ? "text-[var(--color-primary)] dark:text-[var(--color-accent)]" : "text-[var(--color-accent)]"}`
                      : ""
                  }`}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden md:block">
                <MagneticButton
                  href="#contact"
                  className="px-5 py-2.5 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-accent)] text-white dark:text-[var(--color-bg-dark)] text-sm font-semibold hover:shadow-lg hover:shadow-[var(--color-primary)]/30 transition-shadow"
                >
                  Get Quote
                </MagneticButton>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden flex flex-col gap-1.5 min-w-[44px] min-h-[44px] w-11 h-11 items-center justify-center"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <m.span
                  className="block w-6 h-0.5 bg-current origin-center"
                  animate={
                    mobileOpen
                      ? { rotate: 45, y: 4 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />
                <m.span
                  className="block w-6 h-0.5 bg-current origin-center"
                  animate={
                    mobileOpen
                      ? { rotate: -45, y: -4 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </nav>
        </div>
      </m.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <m.nav
              className="flex flex-col items-center gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map(({ label, href }, i) => (
                <m.a
                  key={href}
                  href={href}
                  onClick={closeMobile}
                  className="text-4xl md:text-5xl font-bold text-white hover:text-[var(--color-accent)] transition-colors"
                  variants={prefersReduced ? reducedMotionFade : fadeInUp}
                  custom={i}
                >
                  {label}
                </m.a>
              ))}
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
