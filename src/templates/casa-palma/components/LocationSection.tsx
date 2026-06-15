"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useComplexConfig, cfgArr, cfgStr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

interface Stat { value: string; label: string; }

export function LocationSection() {
  const cfg = useComplexConfig();
  const raw = (cfg?.sections as Record<string, unknown>)?.location;
  const rawBrand = cfg?.brand as Record<string, string> | undefined;

  const eyebrow = cfgStr(raw, "eyebrow", "Valles Centrales · Oaxaca · México");
  const headlineLines = cfgArr<string>(raw, "headlineLines", ["40 minutos del", "centro histórico.", "Un mundo aparte."]);
  const headlineAccent = cfgStr(raw, "headlineAccent", "Un mundo aparte.");
  const stats = cfgArr<Stat>(raw, "stats", [
    { value: "40 min", label: "del Zócalo de Oaxaca" },
    { value: "1,550 m", label: "sobre el nivel del mar" },
    { value: "15 min", label: "de la destilería de mezcal artesanal más cercana" },
  ]);
  const howToArrive = cfgArr<string>(raw, "howToArrive", [
    "Vuelo a Oaxaca (OAX) · 1h desde CDMX",
    "Taxi del aeropuerto: $350 MXN · 45 min",
    "Renta de auto: recomendada para libertad de explorar",
  ]);
  const coordinates = rawBrand?.coordinates ?? "17.0732° N · 96.7266° W";

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cp-location-stat", {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="entorno" data-section-theme="dark" style={{ position: "relative", background: "var(--bg-dark)", overflow: "hidden", padding: "clamp(5rem, 9vw, 8rem) clamp(1.5rem, 4vw, 4rem)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
        <Image
          src="https://images.unsplash.com/photo-1518731240438-1ec1656418f6?w=2560&q=80&auto=format&fit=crop"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div style={{ position: "relative" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent-warm)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          {eyebrow}
        </span>

        <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(3rem, 6vw, 8rem)", lineHeight: 1.05, color: "var(--text-inverse)", margin: "0 0 clamp(3rem, 6vw, 5rem)" }}>
          {headlineLines.map((line, i) => (
            <span key={i} style={{ display: "block", fontWeight: line === headlineAccent ? 700 : 300 }}>{line}</span>
          ))}
        </h2>

        <div className="cp-location-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(1.5rem, 3vw, 3rem)", borderTop: "1px solid rgba(242,237,228,0.1)", paddingTop: "clamp(2rem, 4vw, 3rem)", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          {stats.map((stat, i) => (
            <div key={i} className="cp-location-stat">
              <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--accent-warm)", lineHeight: 1, marginBottom: "0.75rem" }}>
                {stat.value}
              </span>
              <span style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.85rem", color: "rgba(242,237,228,0.6)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "clamp(2rem, 4vw, 3rem)", alignItems: "center" }}>
          <div style={{ background: "var(--bg-dark-mid)", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", border: "0.5px solid rgba(242,237,228,0.08)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "rgba(242,237,228,0.4)", letterSpacing: "0.1em" }}>
              {coordinates}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {howToArrive.map((item, i) => (
              <span key={i} style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(242,237,228,0.65)", display: "flex", gap: "0.6rem" }}>
                <span style={{ color: "var(--accent-warm)" }}>✦</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cp-location-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
