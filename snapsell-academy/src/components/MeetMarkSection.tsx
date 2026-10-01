import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const SLIDES = [
  {
    num: "01",
    label: "CREATOR.",
    photo: "/photos/mark-03.png",
    alt: "Mark Aurel in seinem Studio mit Kamera und Editing-Setup",
  },
  {
    num: "02",
    label: "MENTOR.",
    photo: "/photos/mark-01.png",
    alt: "Mark Aurel präsentiert Creator-Business-Strategien",
  },
  {
    num: "03",
    label: "BRANCHENVERBINDER.",
    photo: "/photos/network-01.png",
    alt: "Mark Aurel mit seinem Creator-Netzwerk bei der Produktion",
  },
];

export function MeetMarkSection() {
  const [active, setActive] = useState(1);

  const prev = (active - 1 + SLIDES.length) % SLIDES.length;
  const next = (active + 1) % SLIDES.length;

  return (
    <section
      id="lerne-mark-kennen"
      style={{
        position: "relative",
        zIndex: 10,
        backgroundColor: "#0a0a0a",
        width: "100%",
        paddingBottom: "clamp(4rem, 8vh, 7rem)",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "clamp(3.5rem,7vh,5.5rem) clamp(1.25rem,4vw,3rem) 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <span style={labelStyle}>(LERNE MARK KENNEN)</span>
          <span style={{ ...labelStyle, fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>03</span>
        </div>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", marginBottom: "clamp(2rem,4vh,3.5rem)" }} />

        {/* Active label */}
        <div style={{ textAlign: "center", marginBottom: "clamp(1.5rem,3vh,2.5rem)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.75rem" }}
            >
              <span style={numStyle}>{SLIDES[active].num}</span>
              <span style={roleStyle}>{SLIDES[active].label}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Three-image carousel ──────────────────────────────────── */}
      <div
        className="mark-carousel"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.55fr 1fr",
          gap: "clamp(10px, 1.5vw, 20px)",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem,4vw,3rem)",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <motion.div
          onClick={() => setActive(prev)}
          whileHover={{ scale: 1.02 }}
          style={{
            cursor: "pointer",
            overflow: "hidden",
            borderRadius: "12px",
            aspectRatio: "3 / 4",
            position: "relative",
            opacity: 0.45,
            filter: "grayscale(20%)",
            transition: "opacity 0.4s ease, filter 0.4s ease",
          }}
        >
          <img
            src={SLIDES[prev].photo}
            alt={SLIDES[prev].alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(10,10,10,0.5) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        </motion.div>

        {/* CENTER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease }}
            style={{
              overflow: "hidden",
              borderRadius: "14px",
              aspectRatio: "3 / 4",
              position: "relative",
              boxShadow: "0 24px 60px rgba(0,0,0,0.14)",
            }}
          >
            <img
              src={SLIDES[active].photo}
              alt={SLIDES[active].alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* RIGHT */}
        <motion.div
          onClick={() => setActive(next)}
          whileHover={{ scale: 1.02 }}
          style={{
            cursor: "pointer",
            overflow: "hidden",
            borderRadius: "12px",
            aspectRatio: "3 / 4",
            position: "relative",
            opacity: 0.45,
            filter: "grayscale(20%)",
            transition: "opacity 0.4s ease, filter 0.4s ease",
          }}
        >
          <img
            src={SLIDES[next].photo}
            alt={SLIDES[next].alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to left, rgba(10,10,10,0.5) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
        </motion.div>
      </div>

      {/* ── Dot indicators ────────────────────────────────────────── */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "clamp(1.5rem,3vh,2.5rem)" }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === active ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === active ? "#00D084" : "#444",
              border: "none",
              cursor: "pointer",
              transition: "all 0.35s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Bio ───────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "680px",
          margin: "clamp(2.5rem,5vh,4rem) auto 0",
          padding: "0 clamp(1.25rem,4vw,3rem)",
          textAlign: "center",
        }}
      >
        <p style={bioStyle}>
          Mark Aurel ist Creator, Mentor und Netzwerker – mit über einem Jahrzehnt Erfahrung in der digitalen Creator-Wirtschaft. Er baut keine Follower-Zahlen auf, sondern nachhaltige Creator-Businesses.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mark-carousel {
            grid-template-columns: 0.3fr 1fr 0.3fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 500,
  fontSize: "0.65rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#888888",
};

const numStyle: React.CSSProperties = {
  fontFamily: "Space Grotesk, sans-serif",
  fontWeight: 700,
  fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
  color: "#00D084",
  letterSpacing: "0.06em",
};

const roleStyle: React.CSSProperties = {
  fontFamily: "Space Grotesk, sans-serif",
  fontWeight: 600,
  fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
  color: "#ffffff",
  letterSpacing: "-0.02em",
  lineHeight: 1,
};

const bioStyle: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 400,
  fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
  lineHeight: 1.75,
  color: "#aaaaaa",
  margin: 0,
};
