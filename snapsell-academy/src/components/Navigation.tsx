import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Über Mark", href: "#ueber-mark" },
  { label: "Unterstützung", href: "#leistungen" },
  { label: "So funktioniert es", href: "#snapsell" },
  { label: "FAQ", href: "#faq" },
];

const ease = [0.22, 1, 0.36, 1];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus trap
  useEffect(() => {
    if (!menuOpen) return;
    // Focus first link
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

  const headerBg = scrolled
    ? "rgba(5,5,5,0.94)"
    : "transparent";
  const headerBlur = scrolled ? "blur(14px)" : "none";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          transition: "background 0.35s ease, backdrop-filter 0.35s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 clamp(1.25rem,4vw,3rem)",
            height: "72px",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              textDecoration: "none",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.1,
            }}
            aria-label="Mark Aurel Creator Agency"
          >
            <span style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.14em",
              color: "#F5F5F2",
              textTransform: "uppercase",
            }}>
              MARK AUREL
            </span>
            <span style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              color: "#A5A5A5",
              textTransform: "uppercase",
            }}>
              Creator Agency · <span style={{ color: "#00D084" }}>SnapSell</span>
            </span>
          </a>

          {/* Desktop center nav */}
          <nav
            aria-label="Hauptnavigation"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              gap: "clamp(1rem,2.5vw,2.5rem)",
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.82rem",
                  letterSpacing: "0.03em",
                  color: "#C0C0C0",
                  padding: "0.25rem 0",
                  transition: "color 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F2")}
                onMouseLeave={e => (e.currentTarget.style.color = "#C0C0C0")}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#bewerbung"
            onClick={e => { e.preventDefault(); handleLinkClick("#bewerbung"); }}
            className="desktop-nav"
            style={{
              flexShrink: 0,
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 600,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#050505",
              background: "#00D084",
              textDecoration: "none",
              padding: "0.55rem 1.25rem",
              borderRadius: "2px",
              transition: "background 0.18s ease, transform 0.18s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#00b873";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#00D084";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Bewerben
          </a>

          {/* Mobile right: CTA + hamburger */}
          <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: "0.75rem", marginLeft: "auto" }}>
            <a
              href="#bewerbung"
              onClick={e => { e.preventDefault(); handleLinkClick("#bewerbung"); }}
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                color: "#050505",
                background: "#00D084",
                textDecoration: "none",
                padding: "0.45rem 0.9rem",
                borderRadius: "2px",
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
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease }}
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(5,5,5,0.97)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              padding: "1.5rem clamp(1.25rem,4vw,3rem) 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
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
                  fontSize: "1.1rem",
                  color: "#F5F5F2",
                  padding: "1.1rem 0",
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
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
          .desktop-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
}
