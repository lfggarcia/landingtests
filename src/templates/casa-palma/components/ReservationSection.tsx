"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useComplexConfig, cfgArr, cfgStr } from "@/lib/complexConfigContext";

export function ReservationSection() {
  const cfg = useComplexConfig();
  const raw = (cfg?.sections as Record<string, unknown>)?.reservation;

  const eyebrow = cfgStr(raw, "eyebrow", "Disponibilidad 2025 · Máximo 8 huéspedes");
  const headlineLines = cfgArr<string>(raw, "headlineLines", ["¿Cuándo", "nos visitas?"]);
  const body = cfgStr(
    raw,
    "body",
    "Las reservas se confirman por correo en menos de 24 horas. Sin tarjeta de crédito hasta la confirmación. Cancelación gratuita hasta 7 días antes."
  );
  const buttonLabel = cfgStr(raw, "buttonLabel", "Verificar disponibilidad");
  const arrivalLabel = cfgStr(raw, "arrivalLabel", "Llegada");
  const departureLabel = cfgStr(raw, "departureLabel", "Salida");
  const email = cfgStr(raw, "email", "reservas@casapalma.mx");
  const whatsapp = cfgStr(raw, "whatsapp", "+52 951 000 0000");
  const contactPrefix = cfgStr(raw, "contactPrefix", "O escríbenos:");
  const whatsappLabel = cfgStr(raw, "whatsappLabel", "WhatsApp:");

  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - r.left - r.width / 2) * 0.4,
        y: (e.clientY - r.top - r.height / 2) * 0.4,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.4)" });
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const inputStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    fontSize: "0.9rem",
    color: "var(--bg-deep)",
    background: "transparent",
    border: "none",
    borderBottom: "0.5px solid var(--bg-dark)",
    borderRadius: 0,
    padding: "0.5rem 0",
    outline: "none",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "0.6rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(26,21,16,0.55)",
    marginBottom: "0.5rem",
  };

  return (
    <section id="reserva" style={{ background: "var(--accent)", padding: "clamp(5rem, 10vw, 10rem) clamp(1.5rem, 4vw, 4rem)" }}>
      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "rgba(242,237,228,0.6)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
        {eyebrow}
      </span>

      <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(3.5rem, 9vw, 11rem)", lineHeight: 0.85, color: "var(--bg-deep)", margin: "0 0 clamp(2rem, 4vw, 3rem)" }}>
        {headlineLines.map((line, i) => (
          <span key={i} style={{ display: "block" }}>{line}</span>
        ))}
      </h2>

      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "1rem", lineHeight: 1.7, maxWidth: "38ch", color: "rgba(242,237,228,0.75)", margin: "0 0 clamp(2.5rem, 5vw, 4rem)" }}>
        {body}
      </p>

      <div className="cp-booking-widget" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "1.5rem", background: "rgba(26,21,16,0.08)", border: "0.5px solid rgba(26,21,16,0.2)", padding: "1.5rem", maxWidth: "640px", marginBottom: "2.5rem" }}>
        <div style={{ flex: "1 1 160px" }}>
          <label style={labelStyle}>{arrivalLabel}</label>
          <input type="date" style={inputStyle} />
        </div>
        <div style={{ flex: "1 1 160px" }}>
          <label style={labelStyle}>{departureLabel}</label>
          <input type="date" style={inputStyle} />
        </div>
        <button
          ref={btnRef}
          type="button"
          data-magnetic
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "0.85rem",
            color: "var(--accent)",
            background: "var(--bg-dark)",
            border: "none",
            borderRadius: 0,
            padding: "0.9rem 1.75rem",
            cursor: "none",
            whiteSpace: "nowrap",
          }}
        >
          {buttonLabel}
        </button>
      </div>

      <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.85rem", color: "rgba(26,21,16,0.6)", margin: 0 }}>
        {contactPrefix} <a href={`mailto:${email}`} style={{ color: "var(--bg-dark)" }}>{email}</a> · {whatsappLabel} {whatsapp}
      </p>

      <style>{`
        @media (max-width: 600px) {
          .cp-booking-widget { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </section>
  );
}
