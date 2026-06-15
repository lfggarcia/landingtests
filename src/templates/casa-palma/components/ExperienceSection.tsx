"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useComplexConfig, cfgArr, cfgStr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

interface Moment {
  time: string;
  title: string;
  body: string;
  imageUrl: string;
}

const FALLBACK_MOMENTS: Moment[] = [
  { time: "06:30 — 10:00", title: "La mañana", body: "El desayuno aparece cuando tú quieras.", imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1600&q=85&auto=format&fit=crop" },
];

export function ExperienceSection() {
  const cfg = useComplexConfig();
  const raw = (cfg?.sections as Record<string, unknown>)?.experience;
  const titleRaw = cfgStr(raw, "title", "Un día en\nCasa Palma.");
  const titleLines = titleRaw.split("\n");
  const moments = cfgArr<Moment>(raw, "moments", FALLBACK_MOMENTS);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const momentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = momentRefs.current.filter(Boolean) as HTMLDivElement[];
      if (els.length === 0) return;

      gsap.set(els, { opacity: 0 });
      gsap.set(els[0], { opacity: 1 });

      let current = 0;
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${els.length * 100}%`,
        pin: ".cp-experience-sticky",
        scrub: 1.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(els.length - 1, Math.floor(self.progress * els.length));
          if (idx !== current) {
            gsap.to(els[current], { opacity: 0, duration: 0.5, ease: "power2.out" });
            gsap.to(els[idx], { opacity: 1, duration: 0.5, ease: "power2.out" });
            current = idx;
          }
        },
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, [moments.length]);

  return (
    <div ref={wrapperRef} style={{ position: "relative", height: `${(moments.length + 1) * 100}vh` }}>
      <div className="cp-experience-sticky" data-section-theme="dark" style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden", background: "var(--bg-dark)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "0 clamp(1.5rem, 4vw, 4rem)" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 5.5rem)", lineHeight: 1.05, color: "var(--text-inverse)", margin: 0 }}>
            {titleLines.map((line, i) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          </h2>
        </div>

        <div className="cp-experience-right" style={{ position: "relative" }}>
          {moments.map((moment, i) => (
            <div
              key={i}
              ref={(el) => { momentRefs.current[i] = el; }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "clamp(2rem, 4vw, 4rem)",
              }}
            >
              <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Image src={moment.imageUrl} alt="" fill loading="lazy" sizes="(min-width: 1024px) 33vw, 100vw" style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,21,16,0.85) 0%, rgba(26,21,16,0.2) 60%)" }} />
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent-warm)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "0.75rem" }}>
                  {moment.time}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "2rem", color: "var(--text-inverse)", margin: "0 0 0.75rem" }}>
                  {moment.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(242,237,228,0.7)", maxWidth: "40ch", margin: 0 }}>
                  {moment.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cp-experience-sticky { grid-template-columns: 1fr !important; grid-template-rows: auto 1fr; }
        }
      `}</style>
    </div>
  );
}
