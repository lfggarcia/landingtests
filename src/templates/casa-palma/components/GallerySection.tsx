"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useComplexConfig, cfgArr, cfgStr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem { imageUrl: string; label: string; }

const FALLBACK_ITEMS: GalleryItem[] = [
  { imageUrl: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=900&q=85&auto=format&fit=crop", label: "Textil" },
  { imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=1400&q=85&auto=format&fit=crop", label: "Patio" },
  { imageUrl: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=900&q=85&auto=format&fit=crop", label: "Madera" },
  { imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop", label: "Desayuno" },
  { imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=85&auto=format&fit=crop", label: "Luz" },
];

const GRID_AREAS = [
  { gridColumn: "1", gridRow: "1" },
  { gridColumn: "2", gridRow: "1 / 3" },
  { gridColumn: "3", gridRow: "1" },
  { gridColumn: "1", gridRow: "2" },
  { gridColumn: "3", gridRow: "2" },
];

export function GallerySection() {
  const cfg = useComplexConfig();
  const raw = (cfg?.sections as Record<string, unknown>)?.gallery;
  const headlineLines = cfgArr<string>(raw, "headlineLines", ["El material", "de los días."]);
  const headlineAccent = cfgStr(raw, "headlineAccent", "de los días.");
  const items = cfgArr<GalleryItem>(raw, "items", FALLBACK_ITEMS);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cp-gallery-item", {
        yPercent: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "var(--bg-surface)", padding: "clamp(5rem, 9vw, 8rem) clamp(1.5rem, 4vw, 4rem)" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(3rem, 6vw, 7rem)",
          lineHeight: 1,
          color: "var(--text-primary)",
          margin: "0 0 clamp(2rem, 4vw, 3rem)",
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

      <div className="cp-gallery-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1fr", gridTemplateRows: "260px 260px", gap: "1rem" }}>
        {items.map((item, i) => (
          <div
            key={i}
            className="cp-gallery-item"
            style={{ ...GRID_AREAS[i % GRID_AREAS.length], position: "relative", overflow: "hidden", background: "var(--bg-raised)" }}
          >
            <Image
              src={item.imageUrl}
              alt={item.label}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="cp-gallery-img"
              style={{ objectFit: "cover", transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)" }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .cp-gallery-item:hover .cp-gallery-img { transform: scale(1.04); }
        @media (max-width: 860px) {
          .cp-gallery-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: 200px 200px 200px !important; }
        }
      `}</style>
    </section>
  );
}
