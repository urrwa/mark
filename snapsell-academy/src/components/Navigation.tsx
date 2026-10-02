import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Über Mark", href: "#lerne-mark-kennen" },
  { label: "Unterstützung", href: "#leistungen" },
  { label: "So funktioniert es", href: "#snapsell" },
  { label: "Zypern", href: "#zypern" },
  { label: "FAQ", href: "#faq" },
];

const ease = [0.22, 1, 0.36, 1] as const;

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

  useEffect(() => {
    if (!menuOpen) return;
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenuOpen(false); hamburgerRef.current?.focus(); return; }
      if (e.key === "Tab" && menuRef.current) {
        const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
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
      <header
        style={{
          position: "fixed",
          top: "clamp(10px, 1.8vh, 18px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          width: "min(94vw, 1100px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{
            display: "flex",
            alignItems: "center",
            background: scrolled ? "rgba(12,12,12,0.92)" : "rgba(18,18,18,0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "0.6rem 0.7rem 0.6rem 1.4rem",
            boxShadow: scrolled ? "0 10px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
            gap: "1.5rem",
          }}
        >
          {/* Brand – left */}
          <a
            href="/"
            aria-label="Mark Aurel Creator Agency"
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.15,
              flexShrink: 0,
            }}
          >
            <span style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.14em",
              color: "#F5F5F2",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              MARK AUREL
            </span>
            <span style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "0.58rem",
              letterSpacing: "0.11em",
              color: "#555",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}>
              Creator Agency · <span style={{ color: "#00D084" }}>SnapSell</span>
            </span>
          </a>

          {/* Nav links – desktop center */}
          <nav
            aria-label="Hauptnavigation"
            className="desktop-nav"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              gap: "clamp(0.8rem, 2vw, 2rem)",
            }}
          >
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "Manrope, sans-serif", fontWeight: 500,
                  fontSize: "0.78rem", letterSpacing: "0.02em",
                  color: "#999", padding: "0.25rem 0",
                  transition: "color 0.18s ease", whiteSpace: "nowrap",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F5F5F2")}
                onMouseLeave={e => (e.currentTarget.style.color = "#999")}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA – desktop right */}
          <a
            href="#bewerbung"
            onClick={e => { e.preventDefault(); handleLinkClick("#bewerbung"); }}
            className="desktop-nav"
            style={{
              flexShrink: 0,
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700, fontSize: "0.72rem",
              letterSpacing: "0.11em", textTransform: "uppercase",
              color: "#050505", background: "#00D084",
              textDecoration: "none",
              padding: "0.55rem 1.3rem",
              borderRadius: "6px",
              transition: "background 0.18s ease, transform 0.18s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#00b873"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#00D084"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            Bewerben
          </a>

          {/* Mobile: CTA + hamburger */}
          <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: "0.7rem", marginLeft: "auto" }}>
            <a
              href="#bewerbung"
              onClick={e => { e.preventDefault(); handleLinkClick("#bewerbung"); }}
              style={{
                fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
                fontSize: "0.68rem", letterSpacing: "0.1em",
                color: "#050505", background: "#00D084",
                textDecoration: "none", padding: "0.45rem 0.9rem",
                borderRadius: "6px",
              }}
            >
              Bewerben
            </a>
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen(v => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
              style={{ background: "none", border: "none", cursor: "pointer", width: "32px", height: "32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", padding: 0 }}
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  animate={menuOpen ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 7 } : { rotate: -45, y: -7 } : { rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: "block", height: "1.5px", background: "#F5F5F2", transformOrigin: "center" }}
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
            role="dialog" aria-modal="true" aria-label="Navigation"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease }}
            style={{
              position: "fixed",
              top: "clamp(68px, 10vh, 86px)",
              left: "50%", transform: "translateX(-50%)",
              width: "min(94vw, 1100px)",
              zIndex: 99,
              background: "rgba(10,10,10,0.97)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "1.4rem 1.5rem 1.8rem",
              display: "flex", flexDirection: "column", gap: 0,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  background: "none", border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  fontFamily: "Space Grotesk, sans-serif", fontWeight: 500,
                  fontSize: "1.05rem", color: "#F5F5F2",
                  padding: "1rem 0", textAlign: "left",
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
