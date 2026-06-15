"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { useComplexConfig, cfgStr, cfgArr } from "@/lib/complexConfigContext";

interface NavLink { label: string; href: string; }

const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

export default function Navbar() {
  const cfg = useComplexConfig();
  const rawNavbar = (cfg?.sections as Record<string, unknown>)?.navbar;

  const ctaLabel = cfgStr(rawNavbar, "ctaLabel", "Disponibilidad");
  const ctaHref = cfgStr(rawNavbar, "ctaHref", "#reserva");
  const links = cfgArr<NavLink>(rawNavbar, "links", [
    { label: "Habitaciones", href: "#habitaciones" },
    { label: "La Casa", href: "#casa" },
    { label: "Oaxaca", href: "#entorno" },
    { label: "Reservar", href: "#reserva" },
  ]);

  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const now = new Date();
  const dateLabel = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  useEffect(() => {
    gsap.set(navRef.current, { opacity: 0, y: -20 });
    gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 2.6, ease: "power3.out" });

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1.25rem clamp(1.5rem, 4vw, 4rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        transition: "background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        background: scrolled ? "rgba(242,237,228,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <a
        href="#"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "1.4rem",
          color: "var(--text-primary)",
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
      >
        C·P
      </a>

      <div className="cp-nav-links" style={{ display: "none", alignItems: "center", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="cp-nav-link"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "var(--text-secondary)",
              textDecoration: "none",
              position: "relative",
              paddingBottom: "2px",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href={ctaHref}
        data-magnetic
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-primary)",
          textDecoration: "none",
        }}
      >
        {ctaLabel}
        <span style={{ color: "var(--text-muted)" }}>· {dateLabel}</span>
      </a>

      <button
        type="button"
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={mobileOpen}
        aria-controls="cp-mobile-menu"
        onClick={() => setMobileOpen((v) => !v)}
        className="cp-nav-toggle"
        style={{
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          padding: 0,
          color: "var(--text-primary)",
        }}
      >
        {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
    </nav>

      <div
        id="cp-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "var(--bg-deep)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "1.5rem clamp(1.5rem, 4vw, 4rem)",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.75rem, 6vw, 3rem)",
              color: "var(--text-primary)",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={ctaHref}
          onClick={() => setMobileOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--accent)",
            textDecoration: "none",
            marginTop: "0.5rem",
          }}
        >
          {ctaLabel}
          <span style={{ color: "var(--text-muted)" }}>· {dateLabel}</span>
        </a>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .cp-nav-links { display: flex !important; }
          .cp-nav-link::after {
            content: '';
            position: absolute;
            bottom: 0; left: 0;
            width: 100%; height: 1px;
            background: var(--text-primary);
            transform-origin: left;
            transform: scaleX(0);
            transition: transform 0.35s cubic-bezier(0.76,0,0.24,1);
          }
          .cp-nav-link:hover::after { transform: scaleX(1); }
          .cp-nav-link:hover { color: var(--text-primary); }
        }
        @media (max-width: 767px) {
          .cp-nav-toggle { display: inline-flex !important; }
          #cp-mobile-menu { display: flex; }
        }
        @media (min-width: 768px) {
          #cp-mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
