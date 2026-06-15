"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useComplexConfig, cfgStr, cfgArr } from "@/lib/complexConfigContext";

interface NavLink {
  label: string;
  href: string;
}

const STATIC_NAV_LINKS: NavLink[] = [
  { label: "Colección", href: "#coleccion" },
  { label: "Proceso", href: "#proceso" },
  { label: "Preguntas", href: "#faq" },
];

export function Navbar() {
  const complexConfig = useComplexConfig();
  const rawSection = complexConfig?.sections?.navbar;
  const brandName = cfgStr(complexConfig?.brand as unknown, "name", "Nativa Press Co.");
  const ctaLabel = cfgStr(rawSection, "ctaLabel", "Solicitar lote piloto");
  const ctaHref = cfgStr(rawSection, "ctaHref", "#contact");
  const navLinks = cfgArr<NavLink>(rawSection, "links", STATIC_NAV_LINKS);

  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -16,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Split brand name for accent on last word
  const nameParts = brandName.split(/(?<=\s)/);
  const firstName = nameParts.slice(0, -1).join("");
  const lastPart = nameParts[nameParts.length - 1] ?? brandName;

  return (
    <>
    <header
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.4s ease, box-shadow 0.4s ease",
        background: scrolled ? "rgba(15,25,18,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(42,60,42,0.5)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.3rem",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
              flexShrink: 0,
              boxShadow: "0 0 8px var(--accent)",
            }}
          />
          {firstName}<span style={{ color: "var(--accent)" }}>{lastPart}</span>
        </Link>

        <ul
          className="hidden md:flex"
          style={{ gap: "2rem", listStyle: "none", alignItems: "center" }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "var(--ink)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "var(--muted)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={ctaHref}
          className="hidden md:inline-flex"
          style={{
            alignItems: "center",
            background: "var(--accent)",
            color: "var(--bg)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "0.85rem",
            padding: "0.55rem 1.25rem",
            borderRadius: "100px",
            textDecoration: "none",
            transition: "opacity 0.2s, transform 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          }}
        >
          {ctaLabel}
        </a>

        <button
          type="button"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="nativapress-mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", color: "var(--ink)", padding: 0 }}
        >
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>
    </header>

      <div
        id="nativapress-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          top: "64px",
          zIndex: 49,
          background: "rgba(15,25,18,0.98)",
          backdropFilter: "blur(14px)",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "1.5rem",
          transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", textDecoration: "none", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {link.label}
          </a>
        ))}
        <a
          href={ctaHref}
          onClick={() => setMobileOpen(false)}
          style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: "1rem", background: "var(--accent)", color: "var(--bg)", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", padding: "0.85rem 1.25rem", borderRadius: "100px", textDecoration: "none" }}
        >
          {ctaLabel}
        </a>
      </div>
    </>
  );
}
