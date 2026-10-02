import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const LEFT_LINKS = [
  { label: "Über Mark", href: "#lerne-mark-kennen" },
  { label: "So funktioniert's", href: "#snapsell" },
];

const RIGHT_LINKS = [
  { label: "Unterstützung", href: "#leistungen" },
  { label: "FAQ", href: "#faq" },
];

const ease = [0.22, 1, 0.36, 1];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus trap
  useEffect(() => {
    if (!menuOpen) return;
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusable = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        const first = focusable[0] as HTMLElement | undefined;
        const last = focusable[focusable.length - 1] as HTMLElement | undefined;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleLinkClick = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* Floating pill nav */}
      <header
        style={{
          position: "fixed",
          top: "clamp(12px, 2vh, 20px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          width: "min(92vw, 860px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: scrolled
              ? "rgba(18,18,18,0.88)"
              : "rgba(22,22,22,0.72)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "100px",
            padding: "0.45rem 0.55rem 0.45rem 1.4rem",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.45)"
              : "0 4px 16px rgba(0,0,0,0.28)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
            gap: "1rem",
          }}
        >
          {/* LEFT links — desktop */}
          <nav
            aria-label="Navigation links left"
            className="pill-desktop"
            style={{
              display: "flex",
              gap: "clamp(0.75rem, 2vw, 1.75rem)",
              flex: 1,
            }}
          >
            {LEFT_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  letterSpacing: "0.02em",
                  color: "#B0B0B0",
                  padding: "0.3rem 0",
                  transition: "color 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F2")}
                onMouseLeave={e => (e.currentTarget.style.color = "#B0B0B0")}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CENTER brand */}
          <a
            href="/"
            aria-label="Mark Aurel Creator Agency"
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 1.1,
              flexShrink: 0,
            }}
          >
            <span style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "0.82rem",
              letterSpacing: "0.16em",
              color: "#F5F5F2",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              MARK AUREL
            </span>
            <span style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              color: "#666",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              Creator Agency
            </span>
          </a>

          {/* RIGHT links + CTA — desktop */}
          <nav
            aria-label="Navigation links right"
            className="pill-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(0.75rem, 2vw, 1.75rem)",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {RIGHT_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  letterSpacing: "0.02em",
                  color: "#B0B0B0",
                  padding: "0.3rem 0",
                  transition: "color 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F2")}
                onMouseLeave={e => (e.currentTarget.style.color = "#B0B0B0")}
              >
                {link.label}
              </button>
            ))}

            {/* Bewerben pill button */}
            <a
              href="#bewerbung"
              onClick={e => { e.preventDefault(); handleLinkClick("#bewerbung"); }}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#050505",
                background: "#00D084",
                textDecoration: "none",
                padding: "0.5rem 1.1rem",
                borderRadius: "100px",
                transition: "background 0.18s ease, transform 0.18s ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#00b873";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#00D084";
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
            >
              Bewerben
            </a>
          </nav>

          {/* Mobile: hamburger */}
          <div className="pill-mobile" style={{ display: "none", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="#bewerbung"
              onClick={e => { e.preventDefault(); handleLinkClick("#bewerbung"); }}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
                color: "#050505",
                background: "#00D084",
                textDecoration: "none",
                padding: "0.45rem 0.85rem",
                borderRadius: "100px",
              }}
            >
              Bewerben
            </a>
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen(v => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                width: "32px",
                height: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "5px",
                padding: 0,
              }}
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  animate={menuOpen
                    ? i === 1
                      ? { opacity: 0 }
                      : i === 0
                        ? { rotate: 45, y: 7 }
                        : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "block",
                    height: "1.5px",
                    background: "#F5F5F2",
                    transformOrigin: "center",
                  }}
                />
              ))}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease }}
            style={{
              position: "fixed",
              top: "clamp(70px, 10vh, 90px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(92vw, 860px)",
              zIndex: 99,
              background: "rgba(14,14,14,0.97)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "20px",
              padding: "1.5rem 1.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {[...LEFT_LINKS, ...RIGHT_LINKS].map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  color: "#F5F5F2",
                  padding: "1rem 0",
                  textAlign: "left",
                  letterSpacing: "0.02em",
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 680px) {
          .pill-desktop { display: none !important; }
          .pill-mobile { display: flex !important; }
        }
        @media (min-width: 681px) {
          .pill-mobile { display: none !important; }
          .pill-desktop { display: flex !important; }
        }
      `}</style>
    </>
  );
}
