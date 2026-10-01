import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Service {
  number: string;
  name: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    number: "(01)",
    name: "POSITIONIERUNG",
    description:
      "Wir definieren deine einzigartige Creator-Stimme und bauen deine Markenidentität strategisch auf.",
  },
  {
    number: "(02)",
    name: "CONTENT",
    description:
      "Professionelle Produktion deiner Inhalte — von der Idee bis zum fertigen Format für alle relevanten Kanäle.",
  },
  {
    number: "(03)",
    name: "COMMERCE",
    description:
      "Dein Content wird zum Geschäftsmodell. Wir verbinden Creator-Reichweite mit SnapSell-Technologie.",
  },
];

const SPRING = { type: "spring", stiffness: 320, damping: 32, mass: 0.8 };

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [textVisible, setTextVisible] = useState(true);
  const [displayedIndex, setDisplayedIndex] = useState(1);
  const isSliding = useRef(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (next: number) => {
      if (isSliding.current) return;
      isSliding.current = true;

      setTextVisible(false);

      setTimeout(() => {
        setActiveIndex(next);
        setDisplayedIndex(next);
        setTextVisible(true);
        isSliding.current = false;
      }, 160);
    },
    []
  );

  const prev = useCallback(() => {
    goTo((activeIndex - 1 + SERVICES.length) % SERVICES.length);
  }, [activeIndex, goTo]);

  const next = useCallback(() => {
    goTo((activeIndex + 1) % SERVICES.length);
  }, [activeIndex, goTo]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    },
    [prev, next]
  );

  // Compute card layout positions
  // Center card offset is 0; left is -1, right is +1 relative slot
  const getSlot = (idx: number) => {
    const diff = idx - activeIndex;
    // Wrap for cyclic: with 3 cards, diff will be -1, 0, or 1
    if (diff === 0) return 0;
    if (diff === 1 || diff === -2) return 1;
    return -1;
  };

  const active = SERVICES[displayedIndex];

  return (
    <section
      style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      className="w-full py-20 px-4 select-none"
    >
      {/* Section label */}
      <p
        className="text-center mb-12 tracking-widest font-semibold"
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "0.7rem",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        (03) LEISTUNGEN
      </p>

      {/* Carousel region */}
      <div
        ref={regionRef}
        role="region"
        aria-label="Services carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative flex items-center justify-center outline-none"
        style={{ minHeight: 280 }}
      >
        {/* Arrow left */}
        <button
          onClick={prev}
          aria-label="Previous service"
          className="absolute left-0 z-20 flex items-center justify-center rounded-full transition-colors"
          style={{
            width: 44,
            height: 44,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Cards track */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "100%",
            maxWidth: 960,
            height: 260,
          }}
        >
          {SERVICES.map((service, idx) => {
            const slot = getSlot(idx);
            const isActive = idx === activeIndex;

            // x position: center slot = 0%, left = -37%, right = +37%
            // On mobile we only show center
            const xPct = slot * 37;

            return (
              <motion.div
                key={service.name}
                aria-hidden={!isActive}
                animate={{ x: `${xPct}%`, opacity: isActive ? 1 : 0.35 }}
                transition={SPRING}
                onClick={() => !isActive && goTo(idx)}
                className="absolute top-0"
                style={{
                  left: 0,
                  right: 0,
                  width: isActive ? "38%" : "28%",
                  marginLeft: isActive ? "31%" : slot === -1 ? "4%" : "68%",
                  cursor: isActive ? "default" : "pointer",
                  filter: isActive ? "none" : "grayscale(1)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "2rem 2rem 2.25rem",
                  background: isActive
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.01)",
                  boxSizing: "border-box",
                  // Mobile: collapse side cards
                }}
              >
                {/* Number */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.p
                      key={`num-${displayedIndex}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 6 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, delay: textVisible ? 0.1 : 0 }}
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "#00D084",
                        letterSpacing: "0.12em",
                        marginBottom: "1rem",
                      }}
                    >
                      {active.number}
                    </motion.p>
                  )}
                  {!isActive && (
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.2)",
                        letterSpacing: "0.12em",
                        marginBottom: "1rem",
                      }}
                    >
                      {service.number}
                    </p>
                  )}
                </AnimatePresence>

                {/* Service name */}
                {isActive ? (
                  <motion.h2
                    key={`name-${displayedIndex}`}
                    animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 8 }}
                    transition={{ duration: 0.22, delay: textVisible ? 0.2 : 0 }}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                      color: "#ffffff",
                      lineHeight: 1.1,
                      marginBottom: "1.2rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {active.name}
                  </motion.h2>
                ) : (
                  <h2
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {service.name}
                  </h2>
                )}

                {/* Description — active card only */}
                {isActive && (
                  <motion.p
                    key={`desc-${displayedIndex}`}
                    animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : 10 }}
                    transition={{ duration: 0.26, delay: textVisible ? 0.5 : 0 }}
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.65,
                    }}
                  >
                    {active.description}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Arrow right */}
        <button
          onClick={next}
          aria-label="Next service"
          className="absolute right-0 z-20 flex items-center justify-center rounded-full transition-colors"
          style={{
            width: 44,
            height: 44,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.6)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-10">
        {SERVICES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to service ${idx + 1}`}
            style={{
              width: idx === activeIndex ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: idx === activeIndex ? "#00D084" : "rgba(255,255,255,0.2)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Mobile: hide side cards via responsive class override */}
      <style>{`
        @media (max-width: 640px) {
          .service-side-card { display: none !important; }
        }
      `}</style>
    </section>
  );
}
