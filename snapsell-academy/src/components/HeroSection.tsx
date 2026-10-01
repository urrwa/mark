import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

// Mixed-color segments — flows as one paragraph, wraps naturally at container width
const HEADLINE_SEGMENTS: { text: string; color: string }[] = [
  { text: "Dein Talent. ", color: "#F5F5F2" },
  { text: "Ein ", color: "#777" },
  { text: "stärkeres ", color: "#F5F5F2" },
  { text: "Creator", color: "#00D084" },
  { text: "-Business.", color: "#F5F5F2" },
];

export default function HeroSection() {
  const prefersReduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setReady(true), 120);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const dur = prefersReduced ? 0 : 1;
  const stagger = prefersReduced ? 0 : 0.15;

  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <motion.div
        initial={{ opacity: 0, scale: prefersReduced ? 1 : 1.03 }}
        animate={ready ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: prefersReduced ? 0 : 1.4, ease }}
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        <img
          src="/photos/hero-3.png"
          alt="Mark Aurel in professional studio environment"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center right",
            display: "block",
          }}
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>

      {/* Gradient — stronger left for text, fade at bottom */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(105deg, rgba(5,5,5,0.93) 0%, rgba(5,5,5,0.80) 38%, rgba(5,5,5,0.35) 65%, rgba(5,5,5,0.08) 100%)",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "220px", zIndex: 1,
        background: "linear-gradient(to top, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0) 100%)",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2, flex: 1,
        display: "flex", flexDirection: "column",
        maxWidth: "1400px", width: "100%", margin: "0 auto",
        padding: "0 clamp(1.25rem, 4vw, 3rem)",
        paddingTop: "calc(72px + clamp(4.5rem, 11vh, 8rem))",
        paddingBottom: "clamp(3.5rem, 7vh, 5.5rem)",
        boxSizing: "border-box",
      }}>
        {/* Upper: eyebrow + headline + CTAs */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur * 0.7, ease, delay: stagger * 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}
          >
            <span style={{ display: "block", width: "28px", height: "1px", background: "#00D084", flexShrink: 0 }} />
            <span style={{
              fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "0.68rem",
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#A5A5A5",
            }}>
              MARK AUREL CREATOR AGENCY&nbsp;·&nbsp;
              <span style={{ color: "#00D084" }}>Powered by SnapSell</span>
            </span>
          </motion.div>

          {/* Headline — flows naturally like Arc Studio, wraps at ~60% container */}
          <motion.h1
            initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur * 0.9, ease, delay: stagger + 0.1 }}
            style={{
              margin: 0,
              padding: 0,
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(2rem, 5vw, 5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: "62%",
            }}
          >
            {HEADLINE_SEGMENTS.map((seg, i) => (
              <span key={i} style={{ color: seg.color }}>{seg.text}</span>
            ))}
          </motion.h1>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur * 0.7, ease, delay: stagger * 4 + 0.1 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2.5rem" }}
          >
            <HeroCTA href="#bewerbung" variant="primary" label="BEWERBUNG STARTEN" />
            <HeroCTA href="#snapsell" variant="ghost" label="SO FUNKTIONIERT ES" />
          </motion.div>
        </div>

        {/* Bottom row: scroll indicator (left) + supporting paragraph (right) */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          gap: "2rem", marginTop: "clamp(3rem, 8vh, 5rem)",
        }}>
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: dur, ease, delay: stagger * 5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
            aria-hidden="true"
          >
            <span style={{
              fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: "0.6rem",
              letterSpacing: "0.2em", textTransform: "uppercase", color: "#5a5a5a",
            }}>
              Scroll
            </span>
            <ScrollArrow />
          </motion.div>

          {/* Supporting paragraph */}
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: dur * 0.8, ease, delay: stagger * 5 + 0.1 }}
            className="hero-supporting"
            style={{
              margin: 0,
              fontFamily: "Manrope, sans-serif", fontWeight: 400,
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              lineHeight: 1.7, color: "#A5A5A5",
              maxWidth: "320px", textAlign: "right",
            }}
          >
            Baue deine Marke mit persönlicher Unterstützung,<br />
            professioneller Content-Hilfe und moderner<br />
            Technologie auf.
          </motion.p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-supporting {
            text-align: left !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

function ScrollArrow() {
  return (
    <motion.svg
      width="16" height="24" viewBox="0 0 16 24" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <line x1="8" y1="0" x2="8" y2="18" stroke="#5a5a5a" strokeWidth="1.2" />
      <polyline points="3,13 8,19 13,13" stroke="#5a5a5a" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
    </motion.svg>
  );
}

function HeroCTA({ href, variant, label }: { href: string; variant: "primary" | "ghost"; label: string }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        fontFamily: "Space Grotesk, sans-serif", fontWeight: 600,
        fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
        textDecoration: "none",
        padding: isPrimary ? "0.7rem 1.5rem" : "0.7rem 1.25rem",
        borderRadius: "2px",
        border: isPrimary ? "none" : "1px solid rgba(255,255,255,0.22)",
        background: isPrimary ? (hovered ? "#00b873" : "#00D084") : (hovered ? "rgba(255,255,255,0.07)" : "transparent"),
        color: isPrimary ? "#050505" : "#F5F5F2",
        transition: "background 0.18s ease, border-color 0.18s ease, transform 0.18s ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      {!isPrimary && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ transition: "transform 0.18s ease", transform: hovered ? "translateX(3px)" : "translateX(0)" }}>
          <polyline points="4,2 10,6 4,10" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  );
}
