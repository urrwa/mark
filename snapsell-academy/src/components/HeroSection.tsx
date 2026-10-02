import React from "react";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

// ── Marquee strip ─────────────────────────────────────────────────────────────
function Marquee({ prefersReduced }: { prefersReduced: boolean | null }) {
  const text = "MARK AUREL · CREATOR AGENCY · ";
  const repeated = Array(12).fill(text).join("");

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      <div
        className={prefersReduced ? "" : "marquee-track"}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        {[0, 1].map(i => (
          <span
            key={i}
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(6rem, 14vw, 13rem)",
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.07)",
              lineHeight: 1,
              userSelect: "none",
              flexShrink: 0,
            }}
          >
            {repeated}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        background: "linear-gradient(160deg, #111417 0%, #050505 60%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Layer 2: Scrolling marquee */}
      <Marquee prefersReduced={prefersReduced} />

      {/* Layer 3: Mark portrait cutout */}
      <motion.div
        initial={{ opacity: 0, scale: prefersReduced ? 1 : 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
        className="mark-portrait"
        style={{
          position: "absolute",
          bottom: 0,
          right: "clamp(2%, 8vw, 12%)",
          zIndex: 3,
          height: "clamp(78vh, 92vh, 100vh)",
          display: "flex",
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        <img
          src="/photos/mark-hero-cutout.png"
          alt="Mark Aurel – Gründer der Creator Agency"
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
            objectPosition: "bottom center",
            display: "block",
            filter: "drop-shadow(0 0 60px rgba(0,0,0,0.6))",
          }}
        />
      </motion.div>

      {/* Layer 4: Headline + copy + CTAs */}
      <div
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "1440px",
          width: "100%",
          margin: "0 auto",
          padding: "clamp(6rem, 14vh, 10rem) clamp(1.25rem, 5vw, 4rem) clamp(3rem, 6vh, 5rem)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "clamp(300px, 44vw, 540px)" }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "clamp(1rem, 2.5vh, 1.8rem)" }}
          >
            <span style={{ display: "inline-block", width: "28px", height: "2px", background: "#00D084", flexShrink: 0 }} />
            <span style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: "0.63rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#00D084",
            }}>
              Powered by SnapSell
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.25 }}
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#F5F5F2",
              margin: "0 0 clamp(1rem, 2.5vh, 1.8rem) 0",
            }}
          >
            DEIN TALENT.<br />
            EIN STÄRKERES<br />
            <span style={{ color: "#00D084" }}>CREATOR-BUSINESS.</span>
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.4 }}
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
              lineHeight: 1.72,
              color: "#A5A5A5",
              margin: "0 0 clamp(1.8rem, 4vh, 2.8rem) 0",
              maxWidth: "390px",
            }}
          >
            Baue deine Marke mit persönlicher Unterstützung,
            professioneller Content-Hilfe und moderner
            Technologie auf.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: 0.55 }}
            style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}
          >
            <a
              href="#bewerbung"
              onClick={e => { e.preventDefault(); document.querySelector("#bewerbung")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "0.76rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#050505",
                background: "#00D084",
                textDecoration: "none",
                padding: "0.85rem 2rem",
                borderRadius: "4px",
                display: "inline-block",
                transition: "background 0.18s, transform 0.18s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#00b873"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#00D084"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              Bewerbung starten
            </a>
            <a
              href="#snapsell"
              onClick={e => { e.preventDefault(); document.querySelector("#snapsell")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "0.76rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#F5F5F2",
                background: "transparent",
                textDecoration: "none",
                padding: "0.85rem 1.6rem",
                borderRadius: "4px",
                border: "1px solid rgba(255,255,255,0.18)",
                display: "inline-block",
                transition: "border-color 0.18s, transform 0.18s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              So funktioniert es
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="scroll-hint"
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 3vh, 2.5rem)",
          left: "clamp(1.25rem, 5vw, 4rem)",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))" }} />
        <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#444" }}>Scroll</span>
      </motion.div>

      <style>{`
        @keyframes marquee-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-ltr 40s linear infinite;
        }

        @media (max-width: 768px) {
          .mark-portrait {
            right: 50% !important;
            transform: translateX(50%) !important;
            height: clamp(50vh, 60vh, 66vh) !important;
            opacity: 0.28 !important;
          }
          .hero-content {
            justify-content: flex-end !important;
            padding-bottom: clamp(4.5rem, 9vh, 6rem) !important;
          }
          .scroll-hint { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
