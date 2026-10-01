import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
} from "motion/react";
import { useState } from "react";

// ─── Constants ─────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const INTRO_TEXT =
  "Der traditionelle Creator-Alltag zwingt dich dazu, zehn Rollen gleichzeitig zu übernehmen – und raubt dir die Energie für das, was wirklich zählt.";

const DETAILS = [
  {
    num: "01",
    heading: "Content erstellen.",
    desc: "Planen, shooten, schneiden – alles alleine.",
  },
  {
    num: "02",
    heading: "Jede Nachricht beantworten.",
    desc: "24/7 am Handy, immer dieselben Fragen.",
  },
  {
    num: "03",
    heading: "Mehrere Plattformen managen.",
    desc: "Algorithmen, Paywalls, Kanäle – ohne System.",
  },
  {
    num: "04",
    heading: "Chancen gehen verloren.",
    desc: "Langsame Reaktion kostet Käufe und Deals.",
  },
];

const WORKLOAD = [
  {
    heading: "47 ungelesene Käuferanfragen",
    time: "Gerade eben",
    msg: "„Kannst du den privaten Galerie-Link senden? Möchte kaufen.",
  },
  {
    heading: "Content-Warteschlange ausstehend",
    time: "Vor 3 Std.",
    msg: "5 Reels zu schneiden, 12 Stories zu planen, Bildunterschriften-Übersetzung nötig.",
  },
  {
    heading: "Lukrative Markenanfrage verpasst",
    time: "Gestern",
    msg: "Käufer wartete 14 Stunden auf Zahlungsanweisungen und sprang ab.",
  },
];

// ─── Single Word — hooks at top level ────────────────────────────────────

interface WordProps {
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function Word({ word, index, total, scrollYProgress }: WordProps) {
  // Each word lights up over ~15% of the scroll range, staggered by position
  const band = 1 / total;
  const start = Math.max(0, index * band - 0.05);
  const end = Math.min(1, (index + 1) * band + 0.05);

  const color = useTransform(scrollYProgress, [start, end], ["#cccccc", "#111111"]);

  return (
    <motion.span
      aria-hidden="true"
      style={{ color, display: "inline" }}
    >
      {word}
    </motion.span>
  );
}

// ─── Word-reveal — works for any element tag + style ─────────────────────

interface WordRevealProps {
  text: string;
  as?: "p" | "h2";
  style?: React.CSSProperties;
  scrollOffset?: [string, string];
}

function WordReveal({
  text,
  as: Tag = "p",
  style: styleProp,
  scrollOffset = ["start 0.9", "end 0.4"],
}: WordRevealProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollOffset,
  });

  const words = text.split(" ");

  if (prefersReduced) {
    return <Tag style={styleProp}>{text}</Tag>;
  }

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>}
      aria-label={text}
      style={{ ...styleProp, display: "block" }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <Word
            word={word}
            index={i}
            total={words.length}
            scrollYProgress={scrollYProgress}
          />
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </Tag>
  );
}

const introPStyle: React.CSSProperties = {
  fontFamily: "Space Grotesk, sans-serif",
  fontWeight: 400,
  fontSize: "clamp(1.25rem, 2.2vw, 2rem)",
  lineHeight: 1.35,
  letterSpacing: "-0.015em",
  color: "#111111",
  margin: 0,
};

// ─── Column panel with image entrance animation ──────────────────────────

interface ImagePanelProps {
  src: string;
  alt: string;
  objectPosition?: string;
  delay: number;
  inView: boolean;
  prefersReduced: boolean | null;
  bg?: string;
}

function ImagePanel({ src, alt, objectPosition = "center", delay, inView, prefersReduced, bg = "#0d0d0d" }: ImagePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease, delay }}
      style={{
        overflow: "hidden",
        position: "relative",
        backgroundColor: bg,
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: prefersReduced ? 1 : 1.04 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1.1, ease }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          display: "block",
        }}
      />
    </motion.div>
  );
}

// ─── Sticky features row (Umbral-style) ───────────────────────────────────

function StickyFeaturesRow({ prefersReduced }: { prefersReduced: boolean | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / totalHeight));
      setScrollProgress(progress);
      const idx = Math.min(DETAILS.length - 1, Math.floor(progress * DETAILS.length));
      setActiveIndex(Math.max(0, idx));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    /* Tall scroll container — gives each feature ~25vh of scroll space */
    <div
      ref={containerRef}
      className="sticky-features-outer"
      style={{
        position: "relative",
        minHeight: `${DETAILS.length * 60}vh`,
      }}
    >
      {/* Inner sticky wrapper — stays in view while user scrolls the tall container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem,4vw,3rem)",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <div
          className="sticky-features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(20px, 3vw, 40px)",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* LEFT: image scrolls upward as user scrolls — Umbral style */}
          <div
            className="sticky-image-col"
            style={{
              overflow: "hidden",
              backgroundColor: "#0d0d0d",
              aspectRatio: "4 / 3",
              position: "relative",
              borderRadius: "16px",
            }}
          >
            <img
              src="/photos/timeline.png"
              alt="Video-Editing-Timeline"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "120%", // taller so scroll-up reveal works
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                // scroll upward: image translates from 0% → -20% as progress goes 0→1
                transform: prefersReduced ? "none" : `translateY(${-scrollProgress * 20}%)`,
                transition: "transform 0.05s linear",
              }}
            />
          </div>

          {/* RIGHT: features list — highlights based on scroll progress */}
          <div
            className="sticky-features-col"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {DETAILS.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <React.Fragment key={item.num}>
                  <div
                    style={{
                      padding: "clamp(1.5rem, 2.5vw, 2.25rem) 0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.35rem",
                      opacity: isActive ? 1 : 0.28,
                      transition: "opacity 0.45s ease",
                    }}
                  >
                    <span style={{ ...numStyle, color: isActive ? "#00D084" : "#bbb", transition: "color 0.45s ease" }}>
                      {item.num}
                    </span>
                    <span style={{
                      ...detailHeadStyle,
                      fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#111" : "#888",
                      transition: "color 0.45s ease",
                    }}>
                      {item.heading}
                    </span>
                    <span style={{
                      ...detailDescStyle,
                      color: isActive ? "#555" : "#aaa",
                      transition: "color 0.45s ease",
                    }}>
                      {item.desc}
                    </span>
                  </div>
                  {i < DETAILS.length - 1 && (
                    <div style={{ height: "1px", background: "rgba(0,0,0,0.08)" }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────

export function ProblemSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      id="die-creator-realitaet"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        backgroundColor: "#ffffff",
        width: "100%",
      }}
    >
      {/* ── Section header ─────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "clamp(3.5rem,7vh,5.5rem) clamp(1.25rem,4vw,3rem) 0",
        }}
      >
        {/* Label row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <span style={labelStyle}>(DIE CREATOR-REALITÄT)</span>
          <span style={{ ...labelStyle, fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>02</span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease }}
          style={{
            height: "1px",
            background: "rgba(0,0,0,0.12)",
            transformOrigin: "left",
          }}
        />

        {/* Asymmetric intro block */}
        <div
          className="problem-intro-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "clamp(2rem, 4vw, 5rem)",
            paddingTop: "clamp(3.5rem, 6vh, 5rem)",
            paddingBottom: "clamp(3.5rem, 6vh, 5rem)",
          }}
        >
          {/* Left: deliberate negative space */}
          <div aria-hidden="true" />

          {/* Right: headline + word-reveal paragraph */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <WordReveal
              as="h2"
              text="Immer noch alles alleine managen?"
              scrollOffset={["start 1.0", "end 0.6"]}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.9rem, 3.8vw, 3.4rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
                color: "#111111",
                margin: 0,
              }}
            />

            <WordReveal
              text={INTRO_TEXT}
              scrollOffset={["start 0.85", "end 0.25"]}
              style={introPStyle}
            />
          </div>
        </div>
      </div>

      {/* ── Sticky scroll: image left, features right ─────────────── */}
      <StickyFeaturesRow prefersReduced={prefersReduced} />


      <style>{`
        @media (max-width: 768px) {
          .problem-intro-grid {
            grid-template-columns: 1fr !important;
          }
          .problem-intro-grid > div[aria-hidden] {
            display: none !important;
          }
          .sticky-features-grid {
            grid-template-columns: 1fr !important;
          }
          .sticky-image-col {
            position: relative !important;
            top: auto !important;
            aspect-ratio: 16/9 !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Shared micro-styles ──────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 500,
  fontSize: "0.65rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#444444",
};

const numStyle: React.CSSProperties = {
  fontFamily: "Space Grotesk, sans-serif",
  fontWeight: 700,
  fontSize: "0.7rem",
  color: "#00D084",
  letterSpacing: "0.06em",
};

const detailHeadStyle: React.CSSProperties = {
  fontFamily: "Space Grotesk, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
  color: "#111111",
  lineHeight: 1.3,
};

const detailDescStyle: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 400,
  fontSize: "clamp(0.78rem, 0.95vw, 0.88rem)",
  color: "#666666",
  lineHeight: 1.65,
};

const workloadHeadStyle: React.CSSProperties = {
  fontFamily: "Space Grotesk, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(0.82rem, 1.1vw, 0.95rem)",
  color: "#111111",
  lineHeight: 1.3,
};

const workloadTimeStyle: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 500,
  fontSize: "0.65rem",
  letterSpacing: "0.08em",
  color: "#00D084",
  textTransform: "uppercase",
};

const workloadMsgStyle: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 400,
  fontSize: "clamp(0.75rem, 0.95vw, 0.85rem)",
  color: "#555555",
  lineHeight: 1.6,
};
