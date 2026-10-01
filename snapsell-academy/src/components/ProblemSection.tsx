import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";

// ─── Data ──────────────────────────────────────────────────────────────────

const DETAILS = [
  {
    num: "01",
    heading: "Du erstellst den Content.",
    desc: "Stundenlanges manuelles Planen, Stylen, Shooten und Bearbeiten jedes einzelnen Assets.",
  },
  {
    num: "02",
    heading: "Du beantwortest jede Nachricht.",
    desc: "Rund um die Uhr über verschiedene Zeitzonen hinweg an dein Smartphone gefesselt, um immer dieselben Fragen zu beantworten.",
  },
  {
    num: "03",
    heading: "Du verwaltest mehrere Plattformen.",
    desc: "Unterschiedliche Algorithmen, Paywalls und Vertriebskanäle jonglieren – ohne eine zentrale Schaltstelle.",
  },
  {
    num: "04",
    heading: "Und wertvolle Chancen gehen trotzdem verloren.",
    desc: "Sobald Antwortzeiten sinken, entgehen dir hochpreisige digitale Käufe und Kooperationen.",
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

const INTRO_TEXT =
  "Der traditionelle Creator-Alltag zwingt dich dazu, zehn Rollen gleichzeitig zu übernehmen – und raubt dir die Energie für das, was wirklich zählt.";

const ease = [0.22, 1, 0.36, 1] as const;

// ─── Word-reveal paragraph ─────────────────────────────────────────────────

function WordReveal({ text }: { text: string }) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(/(\s+)/);

  if (prefersReduced) {
    return (
      <p
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 500,
          fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
          lineHeight: 1.55,
          letterSpacing: "-0.01em",
          color: "#F5F5F2",
          margin: 0,
        }}
      >
        {text}
      </p>
    );
  }

  const wordCount = words.filter((w) => w.trim().length > 0).length;
  let wordIdx = 0;

  return (
    <p
      ref={containerRef}
      aria-label={text}
      style={{
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: 500,
        fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
        lineHeight: 1.55,
        letterSpacing: "-0.01em",
        margin: 0,
        display: "flex",
        flexWrap: "wrap",
        columnGap: "0.27em",
        rowGap: 0,
      }}
    >
      {words.map((chunk, ci) => {
        if (/^\s+$/.test(chunk)) return null;
        const idx = wordIdx++;
        const start = idx / wordCount;
        const end = (idx + 1) / wordCount;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const color = useTransform(
          scrollYProgress,
          [Math.max(0, start - 0.05), Math.min(1, end + 0.05)],
          ["#4a4a4a", "#F5F5F2"]
        );
        return (
          <motion.span
            key={ci}
            aria-hidden="true"
            style={{ color, display: "inline-block", whiteSpace: "pre" }}
          >
            {chunk}
          </motion.span>
        );
      })}
    </p>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────

export function ProblemSection() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const columnsInView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <>
      {/*
        Sticky hero spacer: keeps hero "behind" this section while it scrolls.
        The hero itself is position:relative in normal flow; this section sits
        on top with a white background — giving the natural overlap effect.
      */}
      <section
        id="die-creator-realitaet"
        ref={sectionRef}
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#050505",
          width: "100%",
        }}
      >
        {/* ── Section header ── */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "clamp(4rem,8vh,6rem) clamp(1.25rem,4vw,3rem) 0",
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
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#5a5a5a",
              }}
            >
              (DIE CREATOR-REALITÄT)
            </span>
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "#5a5a5a",
              }}
            >
              02
            </span>
          </motion.div>

          {/* Divider */}
          <motion.hr
            initial={{ scaleX: 0, originX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease }}
            style={{
              border: "none",
              borderTop: "1px solid rgba(255,255,255,0.10)",
              margin: 0,
            }}
          />

          {/* Asymmetric intro: left 1/3 empty, right 2/3 has headline + paragraph */}
          <div
            className="problem-intro-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "clamp(1.5rem, 4vw, 4rem)",
              paddingTop: "clamp(2.5rem, 5vh, 4rem)",
              paddingBottom: "clamp(3rem, 6vh, 5rem)",
            }}
          >
            {/* Left: intentional whitespace */}
            <div aria-hidden="true" />

            {/* Right: headline + paragraph */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              <motion.h2
                initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease, delay: 0.15 }}
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.7rem, 4vw, 3.2rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "#F5F5F2",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                IMMER NOCH ALLES ALLEINE MANAGEN?
              </motion.h2>

              <WordReveal text={INTRO_TEXT} />
            </div>
          </div>
        </div>

        {/* ── Three-column content row ── */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 clamp(1.25rem,4vw,3rem) clamp(4rem,8vh,6rem)",
          }}
        >
          <div
            className="problem-columns"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr 1fr",
              gap: "clamp(0.75rem, 1.5vw, 1.25rem)",
              alignItems: "stretch",
            }}
          >
            {/* LEFT: details panel */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
              animate={columnsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease, delay: 0.1 }}
              style={{
                backgroundColor: "#111417",
                padding: "clamp(1.25rem,2.5vw,2rem)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {DETAILS.map((item, i) => (
                <div key={item.num}>
                  <div style={{ padding: "clamp(1rem,2vw,1.5rem) 0", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <span
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                        color: "#00D084",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {item.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "Space Grotesk, sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(0.82rem,1.2vw,0.95rem)",
                        color: "#F5F5F2",
                        lineHeight: 1.35,
                      }}
                    >
                      {item.heading}
                    </span>
                    <span
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(0.75rem,1vw,0.82rem)",
                        color: "#A5A5A5",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </span>
                  </div>
                  {i < DETAILS.length - 1 && (
                    <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.07)", margin: 0 }} />
                  )}
                </div>
              ))}
            </motion.div>

            {/* CENTER: timeline image */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
              animate={columnsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease, delay: 0.2 }}
              style={{
                backgroundColor: "#0d0d0d",
                overflow: "hidden",
                position: "relative",
                minHeight: "320px",
              }}
            >
              <img
                src="/photos/timeline.png"
                alt="Video-Editing Timeline – professionelle Content-Produktion"
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
            </motion.div>

            {/* RIGHT: complementary photo (collab-01 — creator at workstation) */}
            <motion.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 28 }}
              animate={columnsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease, delay: 0.3 }}
              style={{
                overflow: "hidden",
                position: "relative",
                minHeight: "320px",
              }}
            >
              <img
                src="/photos/collab-01.png"
                alt="Creator am Arbeitsplatz – professionelle Produktionsumgebung"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* ── Workload strip ── */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 clamp(1.25rem,4vw,3rem) clamp(4rem,8vh,6rem)",
          }}
        >
          {/* Strip label */}
          <div style={{ marginBottom: "2rem" }}>
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#5a5a5a",
              }}
            >
              Manueller Aufwand · 24/7 Postfach-Druck
            </span>
            <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "0.75rem" }} />
          </div>

          <div
            className="workload-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0",
            }}
          >
            {WORKLOAD.map((item, i) => (
              <motion.div
                key={item.heading}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
                animate={columnsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.1 }}
                className="workload-item"
                style={{
                  padding: "clamp(1.25rem,2vw,1.75rem) clamp(1.25rem,2vw,1.75rem) clamp(1.25rem,2vw,1.75rem) 0",
                  borderRight: i < WORKLOAD.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  paddingLeft: i > 0 ? "clamp(1.25rem,2vw,1.75rem)" : 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(0.82rem,1.2vw,0.95rem)",
                    color: "#F5F5F2",
                    lineHeight: 1.3,
                  }}
                >
                  {item.heading}
                </span>
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 500,
                    fontSize: "0.68rem",
                    letterSpacing: "0.06em",
                    color: "#00D084",
                    textTransform: "uppercase",
                  }}
                >
                  {item.time}
                </span>
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(0.75rem,1vw,0.82rem)",
                    color: "#A5A5A5",
                    lineHeight: 1.6,
                    fontStyle: item.msg.startsWith("„") ? "italic" : "normal",
                  }}
                >
                  {item.msg}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Closing statement ── */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "clamp(2rem,4vh,3rem) clamp(1.25rem,4vw,3rem) clamp(5rem,10vh,8rem)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
            animate={columnsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#5a5a5a",
              }}
            >
              Das Academy-Paradigma
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              <p
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#A5A5A5",
                  margin: 0,
                }}
              >
                „Du musst nicht härter arbeiten.
              </p>
              <p
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#00D084",
                  margin: 0,
                }}
              >
                Du brauchst ein besseres System."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .problem-intro-grid {
            grid-template-columns: 1fr !important;
          }
          .problem-intro-grid > div:first-child {
            display: none !important;
          }
          .problem-columns {
            grid-template-columns: 1fr !important;
          }
          .workload-grid {
            grid-template-columns: 1fr !important;
          }
          .workload-item {
            border-right: none !important;
            padding-left: 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          .workload-item:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </>
  );
}
