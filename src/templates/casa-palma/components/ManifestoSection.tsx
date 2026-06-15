"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useComplexConfig, cfgStr, cfgArr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

export function ManifestoSection() {
  const cfg = useComplexConfig();
  const raw = (cfg?.sections as Record<string, unknown>)?.manifesto;

  const eyebrow = cfgStr(raw, "eyebrow", "La casa · Desde 2019");
  const headlineLines = cfgArr<string>(raw, "headlineLines", ["La tierra", "que construye", "el descanso."]);
  const headlineAccent = cfgStr(raw, "headlineAccent", "el descanso.");
  const body = cfgStr(
    raw,
    "body",
    "Casa Palma no tiene recepción. Tiene una cocina donde el desayuno siempre está listo a la hora que tú decidas."
  );
  const facts = cfgArr<string>(raw, "facts", [
    "8 habitaciones · construidas en 2019",
    "40 min del centro histórico de Oaxaca",
    "Arquitectura de tierra y madera local",
  ]);

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
      gsap.from(rightRef.current, {
        opacity: 0,
        x: 30,
        duration: 1.0,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="casa"
      style={{
        background: "var(--bg-surface)",
        padding: "clamp(5rem, 9vw, 10rem) clamp(1.5rem, 4vw, 4rem)",
        display: "grid",
        gridTemplateColumns: "0.9fr 1.1fr",
        gap: "clamp(2rem, 5vw, 5rem)",
      }}
    >
      <style>{`
        @media (max-width: 860px) {
          #casa { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div ref={leftRef}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--accent)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          {eyebrow}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(2.8rem, 5.5vw, 7rem)",
            lineHeight: 0.9,
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {headlineLines.map((line, i) => (
            <span
              key={i}
              style={{
                display: "block",
                fontWeight: line === headlineAccent ? 700 : 300,
                color: line === headlineAccent ? "var(--accent)" : "var(--text-primary)",
              }}
            >
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div ref={rightRef} style={{ display: "flex", flexDirection: "column", gap: "2.5rem", justifyContent: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "var(--text-secondary)",
            maxWidth: "40ch",
            margin: 0,
          }}
        >
          {body}
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {facts.map((fact, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
                padding: "0.85rem 0",
                borderTop: "1px solid var(--line-dark)",
              }}
            >
              {fact}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
