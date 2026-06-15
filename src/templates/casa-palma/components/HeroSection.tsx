"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useComplexConfig, cfgStr, cfgArr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const cfg = useComplexConfig();
  const rawHero = (cfg?.sections as Record<string, unknown>)?.hero;

  const eyebrow = cfgStr(rawHero, "eyebrow", "Oaxaca · México · 8 habitaciones");
  const headlineLines = cfgArr<string>(rawHero, "headlineLines", ["Oaxaca no", "se explica.", "Se vive."]);
  const headlineAccent = cfgStr(rawHero, "headlineAccent", "Se vive.");
  const imageUrl = cfgStr(rawHero, "imageUrl", "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=2560&q=85&auto=format&fit=crop");
  const detailImageUrl = cfgStr(rawHero, "detailImageUrl", "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=85&auto=format&fit=crop");
  const detailCaption = cfgStr(rawHero, "detailCaption", "Disponible desde marzo 2019");

  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = linesRef.current?.querySelectorAll(".cp-hero-word");

      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power4.out" } });
      tl.from(bgRef.current, { scale: 1.1, opacity: 0, duration: 2.4, ease: "power2.out" }, 0)
        .from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.7 }, 0.5)
        .from(Array.from(words ?? []), { yPercent: 105, stagger: 0.18, duration: 1.0 }, 0.8)
        .from(detailRef.current, { opacity: 0, x: 20, duration: 0.9, ease: "power3.out" }, 1.4);

      gsap.to(bgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(overlayRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(detailRef.current, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      data-section-theme="dark"
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: "-5%",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: "-5%",
          background: "linear-gradient(to bottom, rgba(26,21,16,0.2) 0%, rgba(26,21,16,0.0) 40%, rgba(26,21,16,0.65) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          padding: "0 5vw 4vw",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <span
          ref={eyebrowRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--accent-warm)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>

        <h1
          ref={linesRef}
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(4.5rem, 10vw, 12rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            color: "var(--text-inverse)",
            margin: 0,
          }}
        >
          {headlineLines.map((line, i) => (
            <span key={i} style={{ display: "block", overflow: "hidden" }}>
              <span
                className="cp-hero-word"
                style={{
                  display: "inline-block",
                  fontWeight: line === headlineAccent ? 700 : 300,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <div
        ref={detailRef}
        className="cp-hero-detail"
        style={{
          position: "absolute",
          right: "5vw",
          bottom: "4vw",
          width: "200px",
        }}
      >
        <div style={{ width: "200px", height: "280px", border: "0.5px solid var(--line)", overflow: "hidden", position: "relative" }}>
          <Image src={detailImageUrl} alt="" fill loading="lazy" sizes="200px" style={{ objectFit: "cover" }} />
        </div>
        <span
          style={{
            display: "block",
            marginTop: "0.6rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
          }}
        >
          {detailCaption}
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cp-hero-detail { display: none; }
        }
      `}</style>
    </section>
  );
}
