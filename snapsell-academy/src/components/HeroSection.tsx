import { motion } from "motion/react";

const HEADLINE_LINES = [
  "Deine Creator-Marke.",
  "Professionell.",
  "Skalierbar.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay, duration: 0.55, ease: "easeOut" },
  },
});

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <img
        src="/photos/hero-1.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 20%",
          zIndex: -1,
          display: "block",
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(5,5,5,0.85) 45%, rgba(5,5,5,0.3) 100%)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingLeft: "clamp(1.5rem, 6vw, 8rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
          paddingTop: "clamp(3rem, 8vw, 5rem)",
          paddingBottom: "5rem",
          maxWidth: "900px",
        }}
      >
        {/* Section label */}
        <motion.div
          variants={fadeIn(0)}
          initial="hidden"
          animate="visible"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            borderLeft: "2px solid #00D084",
            paddingLeft: "0.75rem",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "#A5A5A5",
              textTransform: "uppercase",
            }}
          >
            (01) Creator Agency
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          style={{
            margin: "0 0 clamp(1.25rem, 3vw, 2rem)",
            padding: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 7vw, 7rem)",
            lineHeight: 0.95,
            color: "#F5F5F2",
            letterSpacing: "-0.01em",
          }}
        >
          {HEADLINE_LINES.map((line, i) => (
            <motion.span
              key={line}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ display: "block" }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          variants={fadeIn(0.6)}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            color: "#A5A5A5",
            maxWidth: "480px",
            lineHeight: 1.65,
            margin: "0 0 clamp(1.75rem, 3vw, 2.5rem)",
          }}
        >
          Wir bauen deine persönliche Marke auf — von der Strategie bis zur
          Umsetzung. Kein Rauschen, nur Wachstum.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#bewerbung"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#bewerbung")?.scrollIntoView({ behavior: "smooth" });
          }}
          variants={fadeIn(0.9)}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          style={{
            display: "inline-block",
            background: "#00D084",
            color: "#050505",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(0.9rem, 1.3vw, 1rem)",
            letterSpacing: "0.03em",
            padding: "0.85rem 2.25rem",
            borderRadius: "3px",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Jetzt bewerben
        </motion.a>
      </div>

      {/* Bottom rule + scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1.1rem 0",
          }}
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4v12M5 11l5 5 5-5"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
