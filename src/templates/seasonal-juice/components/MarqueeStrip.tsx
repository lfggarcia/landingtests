"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MarqueeStripProps {
  items?: string[];
  speed?: number;
  dark?: boolean;
}

const DEFAULT_ITEMS = [
  "CERTIFICADO ORGÁNICO",
  "18H FRUTA–BOTELLA",
  "186 TIENDAS ACTIVAS",
  "97.4% COLD-CHAIN",
  "LOTE A LOTE",
  "SIN CONSERVANTES",
  "PRENSADO EN FRÍO",
  "TRAZABILIDAD TOTAL",
];

export function MarqueeStrip({
  items = DEFAULT_ITEMS,
  speed = 24,
  dark = false,
}: MarqueeStripProps) {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = track1Ref.current;
    const t2 = track2Ref.current;
    if (!t1 || !t2) return;

    const tween = gsap.to([t1, t2], {
      xPercent: -50,
      ease: "none",
      repeat: -1,
      duration: speed,
    });

    const onEnter = () =>
      gsap.to(tween, { timeScale: 0, duration: 0.5, ease: "power2.out" });
    const onLeave = () =>
      gsap.to(tween, { timeScale: 1, duration: 0.5, ease: "power2.in" });

    const container = t1.parentElement;
    if (container) {
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);
    }

    return () => {
      tween.kill();
      if (container) {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [speed]);

  const dotColor = dark ? "var(--accent)" : "var(--muted)";
  const textColor = dark ? "var(--accent)" : "var(--muted)";
  const bgColor = dark ? "var(--surface)" : "rgba(255,255,255,0.04)";
  const borderColor = dark ? "rgba(149,227,93,0.15)" : "rgba(175,195,168,0.15)";

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      style={{
        background: bgColor,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        overflow: "hidden",
        padding: "0.85rem 0",
        cursor: "default",
        userSelect: "none",
      }}
      aria-hidden="true"
    >
      <div style={{ display: "flex", width: "max-content" }}>
        <div ref={track1Ref} style={{ display: "flex", gap: "0", whiteSpace: "nowrap" }}>
          {repeated.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: textColor,
                  padding: "0 1.6rem",
                }}
              >
                {item}
              </span>
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: dotColor,
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </div>
        <div ref={track2Ref} style={{ display: "flex", gap: "0", whiteSpace: "nowrap" }}>
          {repeated.map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: textColor,
                  padding: "0 1.6rem",
                }}
              >
                {item}
              </span>
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: dotColor,
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
