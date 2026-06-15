"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useComplexConfig, cfgStr, cfgArr } from "@/lib/complexConfigContext";

interface FooterLink { label: string; href: string; }

export function Footer() {
  const cfg = useComplexConfig();
  const raw = (cfg?.sections as Record<string, unknown>)?.footer;
  const rawBrand = cfg?.brand as Record<string, string> | undefined;
  const rawSocial = cfg?.social as Record<string, string> | undefined;

  const marqueeItems = cfgArr<string>(raw, "marqueeItems", ["Casa Palma", "Oaxaca", "8 Habitaciones", "Valles Centrales", "Desde 2019"]);
  const navLinks = cfgArr<FooterLink>(raw, "navLinks", [
    { label: "Habitaciones", href: "#habitaciones" },
    { label: "La Casa", href: "#casa" },
    { label: "El Entorno", href: "#entorno" },
    { label: "Reservar", href: "#reserva" },
  ]);
  const email = cfgStr(raw, "email", "reservas@casapalma.mx");
  const phone = cfgStr(raw, "phone", "+52 951 000 0000");
  const copyright = cfgStr(raw, "copyright", "Casa Palma · Oaxaca, México · Todos los derechos reservados.");
  const exploreLabel = cfgStr(raw, "exploreLabel", "Explora");
  const contactLabel = cfgStr(raw, "contactLabel", "Contacto");
  const instagramLabel = cfgStr(raw, "instagramLabel", "Instagram");
  const tagline = rawBrand?.tagline ?? "Oaxaca no se explica. Se vive.";
  const coordinates = rawBrand?.coordinates ?? "17.0732° N · 96.7266° W";
  const instagram = rawSocial?.instagram;

  const marqueeRef = useRef<HTMLDivElement>(null);
  const doubled = [...marqueeItems, ...marqueeItems];

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const total = el.scrollWidth / 2;
    const tween = gsap.to(el, { x: -total, duration: 30, ease: "none", repeat: -1 });
    return () => { tween.kill(); };
  }, []);

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "0.85rem",
    fontWeight: 300,
    color: "rgba(242,237,228,0.55)",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  return (
    <footer data-section-theme="dark" style={{ background: "var(--bg-dark)", overflow: "hidden" }}>
      <div style={{ borderBottom: "1px solid rgba(242,237,228,0.06)", padding: "1.5rem 0", overflow: "hidden" }}>
        <div ref={marqueeRef} style={{ display: "flex", whiteSpace: "nowrap", willChange: "transform" }}>
          {doubled.map((item, i) => (
            <span key={i} style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "rgba(242,237,228,0.1)", paddingRight: "2.5rem", flexShrink: 0 }}>
              {item.toUpperCase()}
              <span style={{ marginLeft: "2.5rem", color: "rgba(242,237,228,0.06)" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="cp-footer-grid" style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem clamp(1.5rem, 4vw, 4rem) 3rem", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "3rem" }}>
        <div>
          <span style={{ display: "block", fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "2rem", color: "var(--text-inverse)", marginBottom: "0.75rem" }}>
            C·P
          </span>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.85rem", color: "rgba(242,237,228,0.5)", margin: "0 0 1rem", maxWidth: "28ch" }}>
            {tagline}
          </p>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(242,237,228,0.3)", letterSpacing: "0.05em" }}>
            {coordinates}
          </span>
        </div>

        <div>
          <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,228,0.3)", marginBottom: "1.25rem" }}>
            {exploreLabel}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={linkStyle}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-inverse)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,237,228,0.55)"; }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(242,237,228,0.3)", marginBottom: "1.25rem" }}>
            {contactLabel}
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <a href={`mailto:${email}`} style={{ ...linkStyle, fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-inverse)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,237,228,0.55)"; }}>
              {email}
            </a>
            <a href={`tel:${phone}`} style={{ ...linkStyle, fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-inverse)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,237,228,0.55)"; }}>
              {phone}
            </a>
            {instagram && (
              <a href={instagram} target="_blank" rel="noreferrer" style={linkStyle}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-inverse)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(242,237,228,0.55)"; }}>
                {instagramLabel}
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(242,237,228,0.06)", padding: "1.5rem clamp(1.5rem, 4vw, 4rem)", maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(242,237,228,0.2)", letterSpacing: "0.05em" }}>
          © {new Date().getFullYear()} {copyright}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(242,237,228,0.12)", letterSpacing: "0.05em" }}>
          Tier Custom · Agencia D
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cp-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
