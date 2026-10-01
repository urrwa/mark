import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

/* ─── Panel data ────────────────────────────────────────────────── */

type PanelKind = "image" | "svg";

interface Panel {
  kind: PanelKind;
  imageSrc?: string;
  svgBg?: string;
  tag: string;
  subtitle: string;
  title: string;
  desc: string;
}

const PANELS: Panel[] = [
  {
    kind: "image",
    imageSrc: "/photos/collab-02.png",
    tag: "Keine verpassten DMs",
    subtitle: "KI-CHAT-SUPPORT",
    title: "Smarte Kommunikation",
    desc: "24/7 Konversationsassistent beantwortet Anfragen, qualifiziert Käufer und teilt Kauf-Links nahtlos.",
  },
  {
    kind: "svg",
    svgBg: "#0d1a14",
    tag: "Multiformat-Skalierung",
    subtitle: "KI-CONTENT-ERSTELLUNG",
    title: "Konsistente Produktion",
    desc: "Verwandle deine Identität in hochkarätige Lifestyle-Bilder, Reels, Stories und mehrsprachige Assets.",
  },
  {
    kind: "image",
    imageSrc: "/photos/snapsell-01.png",
    tag: "1-Link-Checkout",
    subtitle: "SNAPSELL-DIREKTVERKÄUFE",
    title: "Direkte Monetarisierung",
    desc: "Direkter digitaler Vertrieb ohne Algorithmen. Bepreise deinen Content, generiere einen Link.",
  },
];

/* ─── Middle panel SVG mockup ───────────────────────────────────── */

function ChatMockup() {
  return (
    <svg
      viewBox="0 0 320 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      {/* Phone outline */}
      <rect x="80" y="30" width="160" height="320" rx="20" fill="#0a1a10" stroke="#1a3a22" strokeWidth="1.5" />
      {/* Status bar dots */}
      <circle cx="145" cy="50" r="3" fill="#1e4028" />
      <rect x="148" y="47" width="24" height="6" rx="3" fill="#1e4028" />
      {/* Screen area */}
      <rect x="88" y="64" width="144" height="260" rx="4" fill="#081510" />
      {/* Header bar */}
      <rect x="88" y="64" width="144" height="36" rx="4" fill="#0d2018" />
      <circle cx="108" cy="82" r="10" fill="#1a3a22" />
      {/* Avatar initials */}
      <text x="108" y="86" textAnchor="middle" fontSize="8" fill="#00D084" fontFamily="system-ui">M</text>
      <rect x="124" y="76" width="48" height="5" rx="2.5" fill="#1a3a22" />
      <rect x="124" y="85" width="32" height="4" rx="2" fill="#0f2a1a" />
      {/* Green dot online */}
      <circle cx="115" cy="72" r="3" fill="#00D084" />
      {/* Chat bubbles - received */}
      <rect x="92" y="108" width="90" height="22" rx="11" fill="#0d2018" />
      <text x="100" y="122" fontSize="7" fill="#88b89a" fontFamily="system-ui">Wie kaufe ich deinen Kurs?</text>
      {/* Chat bubbles - sent */}
      <rect x="148" y="138" width="80" height="22" rx="11" fill="#00D084" />
      <text x="156" y="152" fontSize="7" fill="#041008" fontFamily="system-ui">Hier ist dein Link 👇</text>
      {/* Link chip */}
      <rect x="148" y="168" width="80" height="26" rx="8" fill="#0a2a14" stroke="#00D084" strokeWidth="0.8" />
      <rect x="156" y="174" width="36" height="4" rx="2" fill="#00D084" />
      <rect x="156" y="182" width="24" height="3" rx="1.5" fill="#1a4a28" />
      <text x="196" y="184" fontSize="8" fill="#00D084" fontFamily="system-ui">→</text>
      {/* Received again */}
      <rect x="92" y="202" width="68" height="18" rx="9" fill="#0d2018" />
      <text x="100" y="214" fontSize="6.5" fill="#88b89a" fontFamily="system-ui">Perfekt, danke! 🙌</text>
      {/* Typing indicator */}
      <rect x="92" y="228" width="44" height="18" rx="9" fill="#0d2018" />
      <circle cx="106" cy="237" r="2.5" fill="#1a4a28" />
      <circle cx="114" cy="237" r="2.5" fill="#2a6a3a" />
      <circle cx="122" cy="237" r="2.5" fill="#1a4a28" />
      {/* Input bar */}
      <rect x="88" y="298" width="144" height="26" rx="4" fill="#0d2018" />
      <rect x="96" y="307" width="90" height="8" rx="4" fill="#1a3a22" />
      <circle cx="214" cy="311" r="8" fill="#00D084" />
      <text x="214" y="315" textAnchor="middle" fontSize="10" fill="#041008" fontFamily="system-ui">↑</text>
      {/* Ambient glow */}
      <ellipse cx="160" cy="200" rx="60" ry="80" fill="#00D084" fillOpacity="0.04" />
    </svg>
  );
}

/* ─── Single panel ──────────────────────────────────────────────── */

interface PanelCardProps {
  key?: React.Key;
  panel: Panel;
  delay: number;
  inView: boolean;
}

function PanelCard({ panel, delay, inView }: PanelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        background: "#050505",
        overflow: "hidden",
      }}
    >
      {/* Top — image or SVG mockup (65% height) */}
      <motion.div
        initial={{ scale: 1.04 }}
        animate={inView ? { scale: 1 } : { scale: 1.04 }}
        transition={{ duration: 0.9, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          flex: "0 0 65%",
          overflow: "hidden",
          background: panel.svgBg ?? "#111",
        }}
      >
        {panel.kind === "image" && panel.imageSrc ? (
          <img
            src={panel.imageSrc}
            alt={panel.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <ChatMockup />
        )}
        {/* Subtle bottom fade into info panel */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 48,
            background: "linear-gradient(to bottom, transparent, #0d0d0d)",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* Bottom — info (35% height) */}
      <div
        style={{
          flex: "0 0 35%",
          background: "#0d0d0d",
          padding: "24px 28px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {/* Tag chip */}
        <span
          style={{
            display: "inline-block",
            alignSelf: "flex-start",
            fontSize: "0.6rem",
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#00D084",
            background: "rgba(0,208,132,0.08)",
            border: "1px solid rgba(0,208,132,0.18)",
            borderRadius: 4,
            padding: "3px 8px",
          }}
        >
          {panel.tag}
        </span>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#666",
            margin: 0,
          }}
        >
          {panel.subtitle}
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)",
            color: "#F5F5F2",
            margin: 0,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {panel.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "0.85rem",
            fontWeight: 400,
            color: "#888",
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
          }}
        >
          {panel.desc}
        </p>

        {/* Details link */}
        <a
          href="#leistungen"
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#00D084",
            textDecoration: "none",
            letterSpacing: "0.02em",
            marginTop: 4,
          }}
        >
          Details →
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Main export ───────────────────────────────────────────────── */

export default function ServiceCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px 0px" });

  return (
    <div
      ref={sectionRef}
      style={{ background: "#050505", width: "100%" }}
    >
      {/* ── Header row ── */}
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "5rem 32px 0",
        }}
      >
        {/* Label + rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "3rem" }}>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            (03) LEISTUNGEN
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2rem,4vw,4rem)",
            letterSpacing: "-0.025em",
            color: "#F5F5F2",
            textAlign: "center",
            margin: "0 0 1.25rem",
            lineHeight: 1.1,
          }}
        >
          Drei Säulen. Ein Creator-Business.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "1rem",
            color: "#888",
            textAlign: "center",
            margin: "0 auto 3.5rem",
            maxWidth: 520,
            lineHeight: 1.6,
          }}
        >
          Alles in der Academy basiert auf drei miteinander verknüpften Systemen.
        </motion.p>
      </div>

      {/* ── 3 panels ── */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "clamp(480px, 56vw, 620px)",
          gap: 2,
        }}
      >
        {PANELS.map((panel, i) => (
          <PanelCard
            key={panel.title}
            panel={panel}
            delay={i * 0.1}
            inView={inView}
          />
        ))}
      </div>

      {/* ── Closing row ── */}
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "3rem 32px 4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        {/* Left */}
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "0.75rem",
            fontVariant: "small-caps",
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.3)",
            whiteSpace: "nowrap",
          }}
        >
          Integriert von Mark Aurel
        </span>

        {/* Center */}
        <p
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontStyle: "italic",
            fontSize: "0.95rem",
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
            flex: 1,
            minWidth: 200,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          Verbindet Aufmerksamkeit, automatisierte Konversationen und Direktverkäufe zu einem verlässlichen Motor.
        </p>

        {/* Right — CTA */}
        <a
          href="#leistungen"
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#050505",
            background: "#00D084",
            padding: "10px 20px",
            borderRadius: 6,
            textDecoration: "none",
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Säule 1 entdecken →
        </a>
      </div>

      {/* ── Responsive stacking ── */}
      <style>{`
        @media (max-width: 700px) {
          /* Stack panels vertically on small screens */
          .service-panels-row {
            flex-direction: column !important;
            height: auto !important;
          }
          .service-panels-row > * {
            flex: none !important;
            height: 480px;
          }
        }
      `}</style>
    </div>
  );
}
