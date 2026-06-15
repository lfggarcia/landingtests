"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useComplexConfig, cfgStr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

export function CtaSection() {
  const complexConfig = useComplexConfig();
  const rawSection = complexConfig?.sections?.cta;
  const rawButton =
    rawSection && typeof rawSection === "object" && !Array.isArray(rawSection)
      ? (rawSection as unknown as Record<string, unknown>)["button"]
      : undefined;

  const title = cfgStr(
    rawSection,
    "title",
    "Tu primer lote piloto está a un correo de distancia"
  );
  const description = cfgStr(
    rawSection,
    "description",
    "Sin burocracia. Cuéntanos tu canal de venta y volumen estimado y te preparamos una propuesta con sabores disponibles en 48 horas."
  );
  const buttonLabel = cfgStr(rawButton, "label", "Solicitar lote piloto");
  const buttonHref = cfgStr(rawButton, "href", "mailto:ventas@nativapress.co");
  const eyebrow = cfgStr(rawSection, "eyebrow", "Da el primer paso");
  const secondaryLabel = cfgStr(rawSection, "secondaryLabel", "Ver catálogo de temporada ↓");
  const secondaryHref = cfgStr(rawSection, "secondaryHref", "#coleccion");

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const innerWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      const btn = primaryBtnRef.current;
      const inner = innerWrapRef.current;
      if (btn && inner) {
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
        };
        inner.addEventListener("mousemove", onMove);
        inner.addEventListener("mouseleave", onLeave);
        return () => {
          inner.removeEventListener("mousemove", onMove);
          inner.removeEventListener("mouseleave", onLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--ink)",
        padding: "7rem 1.5rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(149,227,93,0.12), transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-8%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,179,71,0.1), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={contentRef}
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {eyebrow}
        </span>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            color: "var(--bg)",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            color: "var(--muted)",
            lineHeight: 1.65,
            maxWidth: "48ch",
          }}
        >
          {description}
        </p>

        <div
          ref={innerWrapRef}
          style={{ display: "flex", justifyContent: "center", padding: "1.5rem" }}
        >
          <a
            ref={primaryBtnRef}
            href={buttonHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.65rem",
              background: "var(--accent)",
              color: "var(--bg)",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "1.05rem",
              padding: "1rem 2.25rem",
              borderRadius: "100px",
              textDecoration: "none",
              willChange: "transform",
            }}
          >
            {buttonLabel}
          </a>
        </div>

        <a
          href={secondaryHref}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--muted)",
            textDecoration: "none",
            borderBottom: "1px solid rgba(175,195,168,0.3)",
            paddingBottom: "2px",
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
          }}
        >
          {secondaryLabel}
        </a>
      </div>
    </section>
  );
}
