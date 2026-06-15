"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useComplexConfig, cfgStr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const complexConfig = useComplexConfig();
  const rawSection = complexConfig?.sections?.hero;

  const eyebrow = cfgStr(rawSection, "eyebrow", "Temporada activa · 2026");
  const subheadline = cfgStr(
    rawSection,
    "subheadline",
    "Diseñamos sabores por ventana de cosecha y los llevamos a retail en menos de 24 horas desde el prensado. Trazabilidad lote a lote incluida."
  );
  const imageUrl = cfgStr(
    rawSection,
    "imageUrl",
    "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=960&q=85&auto=format&fit=crop"
  );

  const rawCta =
    rawSection && typeof rawSection === "object" && !Array.isArray(rawSection)
      ? (rawSection as unknown as Record<string, unknown>)["cta"]
      : undefined;
  const rawCtaPrimary =
    rawCta && typeof rawCta === "object" && !Array.isArray(rawCta)
      ? (rawCta as Record<string, unknown>)["primary"]
      : undefined;
  const rawCtaSecondary =
    rawCta && typeof rawCta === "object" && !Array.isArray(rawCta)
      ? (rawCta as Record<string, unknown>)["secondary"]
      : undefined;

  const primaryLabel = cfgStr(rawCtaPrimary, "label", "Solicitar lote piloto");
  const primaryHref = cfgStr(rawCtaPrimary, "href", "#contact");
  const secondaryLabel = cfgStr(rawCtaSecondary, "label", "Ver catálogo vivo");
  const secondaryHref = cfgStr(rawCtaSecondary, "href", "#coleccion");

  const containerRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordInners = headlineRef.current?.querySelectorAll(".word-inner");

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(eyebrowRef.current, { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" })
        .from(wordInners ?? [], { y: "115%", duration: 0.9, stagger: 0.1 }, "-=0.25")
        .from(subRef.current, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(imageRef.current, { x: 70, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=0.9")
        .from(badgeRef.current, { scale: 0.7, opacity: 0, duration: 0.6, ease: "back.out(2)" }, "-=0.35");

      gsap.to(orb1Ref.current, { y: "-22px", duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(orb2Ref.current, { y: "18px", duration: 4.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1 });
      gsap.to(orb3Ref.current, { y: "-14px", duration: 2.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.5 });

      gsap.to(imageRef.current, {
        y: "-50px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const btn = primaryBtnRef.current;
      if (btn) {
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        };
        const onLeave = () =>
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: "100svh",
        background: "var(--bg)",
        display: "grid",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "64px",
        position: "relative",
      }}
    >
      <div
        ref={orb1Ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "5%",
          right: "-8%",
          width: "clamp(260px, 40vw, 520px)",
          height: "clamp(260px, 40vw, 520px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, rgba(149,227,93,0.18), rgba(255,179,71,0.08), transparent 70%)",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />
      <div
        ref={orb2Ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "8%",
          left: "-6%",
          width: "clamp(160px, 22vw, 300px)",
          height: "clamp(160px, 22vw, 300px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(255,179,71,0.14), transparent 70%)",
          filter: "blur(44px)",
          pointerEvents: "none",
        }}
      />
      <div
        ref={orb3Ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          right: "30%",
          width: "clamp(60px, 10vw, 150px)",
          height: "clamp(60px, 10vw, 150px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, rgba(149,227,93,0.12), transparent 70%)",
          filter: "blur(24px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          <span
            ref={eyebrowRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: "20px", height: "2px", background: "var(--accent)", display: "inline-block" }}
            />
            {eyebrow}
          </span>

          <h1
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.1em" }}>
              <span className="word-inner" style={{ display: "inline-block" }}>Jugos</span>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.1em" }}>
              <span className="word-inner" style={{ display: "inline-block", marginRight: "0.2em" }}>de</span>
              <em
                className="word-inner"
                style={{
                  display: "inline-block",
                  fontStyle: "italic",
                  color: "var(--accent)",
                }}
              >
                temporada
              </em>
            </span>
            <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.1em" }}>
              <span className="word-inner" style={{ display: "inline-block" }}>sin atajos.</span>
            </span>
          </h1>

          <p
            ref={subRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
              lineHeight: 1.7,
              color: "var(--muted)",
              maxWidth: "44ch",
            }}
          >
            {subheadline}
          </p>

          <div
            ref={ctaRef}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
          >
            <a
              ref={primaryBtnRef}
              href={primaryHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--accent)",
                color: "var(--bg)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.95rem",
                padding: "0.85rem 1.75rem",
                borderRadius: "100px",
                textDecoration: "none",
                willChange: "transform",
              }}
            >
              {primaryLabel}
            </a>

            <a
              href={secondaryHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "var(--ink)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                borderBottom: "1.5px solid var(--border)",
                paddingBottom: "2px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)")
              }
            >
              {secondaryLabel} <span aria-hidden="true">↓</span>
            </a>
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              color: "var(--muted)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <span style={{ color: "var(--accent2)" }}>◆◆◆◆◆</span>
            186 tiendas activas&nbsp;·&nbsp;Cold-chain 97.4%
          </p>
        </div>

        <div
          ref={imageRef}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              aspectRatio: "4/5",
              borderRadius: "2rem",
              overflow: "hidden",
            }}
          >
            <Image
              src={imageUrl}
              alt="Nativa Press Co — Jugos prensados en frío"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, transparent 55%, rgba(149,227,93,0.12))",
              }}
            />
          </div>

          <div
            ref={badgeRef}
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "-1rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "1rem",
              padding: "0.8rem 1.2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.15rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "var(--accent)",
                lineHeight: 1,
              }}
            >
              18h
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                color: "var(--muted)",
                fontWeight: 500,
              }}
            >
              fruta→botella
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
