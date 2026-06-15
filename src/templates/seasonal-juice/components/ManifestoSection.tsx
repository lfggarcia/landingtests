"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useComplexConfig, cfgStr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_FALLBACK =
  "Los mejores ingredientes no necesitan disfraz. Solo necesitan respeto, frío y velocidad. Lo que llega en 18 horas no se puede falsificar con conservantes.";

export function ManifestoSection() {
  const complexConfig = useComplexConfig();
  const rawSection = complexConfig?.sections?.manifesto;
  const manifesto = cfgStr(rawSection, "text", MANIFESTO_FALLBACK);
  const eyebrow = cfgStr(rawSection, "eyebrow", "Nuestra postura");

  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const words = manifesto.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: { each: 0.04, from: "start" },
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 35%",
            scrub: 1.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "9rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "2.5rem",
          display: "block",
        }}
      >
        {eyebrow}
      </span>

      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.7rem, 3.5vw, 3.2rem)",
          fontWeight: 700,
          lineHeight: 1.45,
          letterSpacing: "-0.025em",
          maxWidth: "28ch",
          textAlign: "center",
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) wordsRef.current[i] = el;
            }}
            style={{
              display: "inline-block",
              marginRight: "0.3em",
              color: "var(--ink)",
              opacity: 0.1,
            }}
          >
            {word}
          </span>
        ))}
      </p>

      <div
        aria-hidden="true"
        style={{
          width: "48px",
          height: "4px",
          background: "var(--accent)",
          borderRadius: "100px",
          marginTop: "3.5rem",
        }}
      />
    </section>
  );
}
