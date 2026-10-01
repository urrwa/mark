import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";

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

// ─── Main section ──────────────────────────────────────────────────────────

// ─── Scroll-active detail item ────────────────────────────────────────────

interface DetailItemProps {
  item: typeof DETAILS[0];
  index: number;
  activeIndex: number;
  total: number;
}

function DetailItem({ item, index, activeIndex }: DetailItemProps) {
  const isActive = index === activeIndex;
  return (
    <div
      style={{
        padding: "clamp(1.2rem, 2vw, 1.75rem) 0",
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
        transition: "opacity 0.35s ease",
        opacity: isActive ? 1 : 0.35,
        cursor: "default",
      }}
    >
      <span style={{ ...numStyle, color: isActive ? "#00D084" : "#aaa" }}>{item.num}</span>
      <span style={{
        ...detailHeadStyle,
        color: isActive ? "#111111" : "#777",
        fontWeight: isActive ? 600 : 500,
        fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
        transition: "color 0.35s ease, font-weight 0.35s ease",
      }}>{item.heading}</span>
      <span style={{
        ...detailDescStyle,
        color: isActive ? "#444" : "#999",
        transition: "color 0.35s ease",
      }}>{item.desc}</span>
    </div>
  );
}

export function ProblemSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const columnsRef = useRef<HTMLDivElement>(null);
  const columnsInView = useInView(columnsRef, { once: true, margin: "-80px" });

  // Scroll-linked active index for detail items
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: columnsRef,
    offset: ["start 0.7", "end 0.3"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        DETAILS.length - 1,
        Math.floor(v * DETAILS.length)
      );
      setActiveIndex(Math.max(0, idx));
    });
    return unsubscribe;
  }, [scrollYProgress]);

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

      {/* ── Sticky scroll section ─────────────────────────────────── */}
      {/* Tall scroll container — gives space for sticky effect */}
      <div
        ref={columnsRef}
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem,4vw,3rem) clamp(3.5rem,7vh,5rem)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
          animate={columnsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="problem-sticky-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            alignItems: "start",
          }}
        >
          {/* LEFT: details panel — sticky */}
          <div
            className="problem-sticky-left"
            style={{
              position: "sticky",
              top: "120px",
              backgroundColor: "#f3f3f3",
              padding: "clamp(1.75rem, 2.5vw, 2.5rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {DETAILS.map((item, i) => (
              <React.Fragment key={item.num}>
                <DetailItem
                  item={item}
                  index={i}
                  activeIndex={activeIndex}
                  total={DETAILS.length}
                />
                {i < DETAILS.length - 1 && (
                  <div style={{ height: "1px", background: "rgba(0,0,0,0.08)" }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* RIGHT: timeline image — sticky */}
          <div
            className="problem-sticky-right"
            style={{
              position: "sticky",
              top: "120px",
              overflow: "hidden",
              backgroundColor: "#e8e8e8",
              aspectRatio: "4/5",
            }}
          >
            <motion.img
              src="/photos/timeline.png"
              alt="Video-Editing-Timeline – professionelle Content-Produktion"
              initial={{ scale: prefersReduced ? 1 : 1.04 }}
              animate={columnsInView ? { scale: 1 } : {}}
              transition={{ duration: 1.1, ease }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
          </div>
        </motion.div>
      </div>


      <style>{`
        @media (max-width: 768px) {
          .problem-intro-grid {
            grid-template-columns: 1fr !important;
          }
          .problem-intro-grid > div[aria-hidden] {
            display: none !important;
          }
          .problem-sticky-row {
            grid-template-columns: 1fr !important;
          }
          .problem-sticky-left,
          .problem-sticky-right {
            position: relative !important;
            top: auto !important;
          }
          .problem-sticky-right {
            aspect-ratio: 16/9 !important;
            min-height: 240px;
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
