"use client";

import { useState, useEffect } from "react";
import { m as motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PANEL_PARTS } from "@/lib/constants";
import { fadeInUp, reducedMotionFade } from "@/lib/animations";

const EXPLODE_OFFSETS: Record<string, { x: number; y: number }> = {
  "roof": { x: 0, y: -60 },
  "air-vent": { x: 50, y: -80 },
  "wall-left": { x: -90, y: 0 },
  "wall-right": { x: 90, y: 0 },
  "inlet": { x: -100, y: -30 },
  "outlet": { x: 100, y: 30 },
  "bracing": { x: 0, y: 0 },
  "ladder": { x: 100, y: -15 },
  "base": { x: 0, y: 60 },
  "manhole": { x: -50, y: -60 },
};

const PanelDesign: React.FC = () => {
  const [exploded, setExploded] = useState(false);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  return (
    <section
      id="panel-design"
      className="relative py-24 sm:py-32 bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-[family-name:var(--font-clash,_'Clash_Display')] font-bold text-center mb-8"
          data-cursor="text"
          variants={prefersReduced ? reducedMotionFade : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Standard{" "}
          <span className="text-gradient">Panel Design</span>
        </motion.h2>

        {/* Explode toggle */}
        {!isMobile && (
          <div className="text-center mb-12">
            <button
              onClick={() => setExploded(!exploded)}
              className="px-6 py-3 rounded-full bg-[var(--color-primary)] dark:bg-[var(--color-accent)] text-white dark:text-[var(--color-bg-dark)] font-semibold text-sm hover:shadow-lg transition-shadow"
              data-cursor="pointer"
            >
              {exploded ? "Assemble Tank" : "Explode Parts"}
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* SVG Diagram */}
          <div className="relative flex items-center justify-center">
            <svg viewBox="-150 -120 400 340" className="w-full max-w-lg">
              {/* Each part as a group */}
              {PANEL_PARTS.map((part) => {
                const offset = exploded && !isMobile ? EXPLODE_OFFSETS[part.id] ?? { x: 0, y: 0 } : { x: 0, y: 0 };
                const isHovered = hoveredPart === part.id;
                const fillColor = isHovered ? "var(--color-accent)" : "var(--color-primary)";
                const fillOp = isHovered ? 0.4 : 0.15;

                return (
                  <motion.g
                    key={part.id}
                    animate={{ x: offset.x, y: offset.y }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    onMouseEnter={() => setHoveredPart(part.id)}
                    onMouseLeave={() => setHoveredPart(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Simplified part shapes */}
                    {part.id === "roof" && (
                      <rect x="0" y="-10" width="200" height="15" rx="3"
                        fill={fillColor} fillOpacity={fillOp} stroke={fillColor} strokeWidth="1.5" />
                    )}
                    {part.id === "base" && (
                      <rect x="-5" y="160" width="210" height="15" rx="3"
                        fill={fillColor} fillOpacity={fillOp} stroke={fillColor} strokeWidth="1.5" />
                    )}
                    {part.id === "wall-left" && (
                      <rect x="0" y="5" width="12" height="155" rx="2"
                        fill={fillColor} fillOpacity={fillOp} stroke={fillColor} strokeWidth="1.5" />
                    )}
                    {part.id === "wall-right" && (
                      <rect x="188" y="5" width="12" height="155" rx="2"
                        fill={fillColor} fillOpacity={fillOp} stroke={fillColor} strokeWidth="1.5" />
                    )}
                    {part.id === "air-vent" && (
                      <circle cx="160" cy="-5" r="6"
                        fill={fillColor} fillOpacity={fillOp} stroke={fillColor} strokeWidth="1.5" />
                    )}
                    {part.id === "inlet" && (
                      <rect x="-20" y="40" width="25" height="8" rx="4"
                        fill={fillColor} fillOpacity={fillOp} stroke={fillColor} strokeWidth="1.5" />
                    )}
                    {part.id === "outlet" && (
                      <rect x="195" y="130" width="25" height="8" rx="4"
                        fill={fillColor} fillOpacity={fillOp} stroke={fillColor} strokeWidth="1.5" />
                    )}
                    {part.id === "bracing" && (
                      <>
                        <line x1="30" y1="30" x2="170" y2="140" stroke={fillColor} strokeWidth="1" strokeDasharray="4" />
                        <line x1="170" y1="30" x2="30" y2="140" stroke={fillColor} strokeWidth="1" strokeDasharray="4" />
                      </>
                    )}
                    {part.id === "ladder" && (
                      <g>
                        <rect x="202" y="20" width="6" height="140" rx="1"
                          fill={fillColor} fillOpacity={fillOp} stroke={fillColor} strokeWidth="1" />
                        {[30, 55, 80, 105, 130].map((ry) => (
                          <rect key={ry} x="200" y={ry} width="10" height="3" rx="1"
                            fill={fillColor} fillOpacity={fillOp} stroke={fillColor} strokeWidth="0.5" />
                        ))}
                      </g>
                    )}
                    {part.id === "manhole" && (
                      <circle cx="60" cy="-5" r="10"
                        fill={fillColor} fillOpacity={fillOp} stroke={fillColor} strokeWidth="1.5" />
                    )}

                    {/* Callout dots (when exploded) */}
                    {exploded && !isMobile && (
                      <circle cx={part.id === "roof" ? 100 : part.id === "base" ? 100 : 100}
                        cy={part.id === "roof" ? -2 : part.id === "base" ? 168 : 80}
                        r="3" fill="var(--color-accent)" className="callout-pulse" />
                    )}
                  </motion.g>
                );
              })}
            </svg>

            {/* Hover tooltip */}
            <AnimatePresence>
              {hoveredPart && (
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl glass text-sm font-medium text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <strong>{PANEL_PARTS.find(p => p.id === hoveredPart)?.label}</strong>
                  <br />
                  <span className="text-xs text-[var(--color-muted)]">
                    {PANEL_PARTS.find(p => p.id === hoveredPart)?.desc}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend list */}
          <div className="space-y-3">
            {PANEL_PARTS.map((part, i) => (
              <motion.div
                key={part.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  hoveredPart === part.id
                    ? "bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30"
                    : "border border-transparent"
                }`}
                variants={prefersReduced ? reducedMotionFade : fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
              >
                <span className="w-6 h-6 rounded-full bg-[var(--color-primary)]/20 dark:bg-[var(--color-accent)]/20 flex items-center justify-center text-xs font-bold text-[var(--color-primary)] dark:text-[var(--color-accent)]">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-sm">{part.label}</p>
                  <p className="text-xs text-[var(--color-muted)]">{part.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanelDesign;
