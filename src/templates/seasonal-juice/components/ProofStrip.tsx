"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useComplexConfig, cfgArr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

type StatItem = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

const STATS_FALLBACK: StatItem[] = [
  { value: 18, suffix: "h", label: "fruta a botella" },
  { value: 97.4, suffix: "%", label: "cumplimiento cold-chain", decimals: 1 },
  { value: 186, suffix: "+", label: "tiendas activas" },
  { value: 43, suffix: "", label: "rotaciones anuales" },
];

export function ProofStrip() {
  const complexConfig = useComplexConfig();
  const rawSection = complexConfig?.sections?.metrics;
  const stats = cfgArr<StatItem>(rawSection, "items", STATS_FALLBACK);

  const stripRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(stripRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stripRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      countersRef.current.forEach((el, i) => {
        if (!el) return;
        const stat = stats[i];
        if (!stat) return;
        const isDecimal = (stat.decimals ?? 0) > 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.6,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: stripRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate() {
            el.textContent = isDecimal
              ? obj.val.toFixed(stat.decimals)
              : Math.round(obj.val).toString();
          },
        });
      });
    }, stripRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <div
      ref={stripRef}
      style={{
        background: "var(--surface)",
        padding: "3.5rem 1.5rem",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <ul
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "2rem",
          listStyle: "none",
        }}
      >
        {stats.map((stat, i) => (
          <li
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.35rem",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                lineHeight: 1,
                display: "flex",
                alignItems: "baseline",
                gap: "0.05em",
              }}
            >
              <span
                ref={(el) => {
                  if (el) countersRef.current[i] = el;
                }}
              >
                0
              </span>
              <span style={{ color: "var(--accent)" }}>{stat.suffix}</span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                color: "var(--muted)",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
            >
              {stat.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
