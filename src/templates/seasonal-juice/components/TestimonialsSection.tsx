"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useComplexConfig, cfgArr, cfgStr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

type TestimonialItem = {
  name: string;
  /** role maps to what the component calls "context" */
  role?: string;
  text?: string;
  accent?: string;
};

const TESTIMONIALS_FALLBACK: TestimonialItem[] = [
  {
    text: "Llevamos 4 meses con Nativa Press en nuestras 12 tiendas. El índice de caducidad bajó a cero porque el producto rota antes de los 3 días. Nunca habíamos tenido eso con un proveedor de jugos.",
    name: "Alejandro Fierro",
    role: "Director de Compras, Cadena Gourmet Mx",
    accent: "#95E35D",
  },
  {
    text: "La trazabilidad por lote nos dio el argumento que nos faltaba con nuestros clientes B2B premium. Cuando puedes decirle a un hotel exactamente de qué campo viene el mango, eso cierra el trato.",
    name: "Valeria Montes",
    role: "Category Manager, Distribuidora Holistic",
    accent: "#FFB347",
  },
  {
    text: "El equipo de Nativa cambia la fórmula cuando el sabor del fruto cambia de región. Eso nunca lo habíamos visto. Nuestros clientes notan la diferencia semana a semana.",
    name: "Rodrigo Castellanos",
    role: "Chef Ejecutivo, Grupo Hotelero Aldea",
    accent: "#95E35D",
  },
];

function TiltCard({ t }: { t: TestimonialItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accent = t.accent ?? "#95E35D";
  const quote = t.text ?? "";
  const context = t.role ?? "";

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 14,
        rotateX: -y * 14,
        transformPerspective: 800,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="tilt-card"
      style={{
        background: "var(--bg)",
        borderRadius: "1.25rem",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        border: "1px solid var(--border)",
        willChange: "transform",
        transformStyle: "preserve-3d",
        cursor: "default",
      }}
    >
      <span
        style={{ fontSize: "1rem", color: accent, letterSpacing: "0.05em" }}
        aria-label="5 estrellas"
      >
        ★★★★★
      </span>

      <blockquote
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          color: "var(--ink)",
          fontWeight: 400,
          margin: 0,
          padding: 0,
          border: "none",
          flexGrow: 1,
        }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.15rem",
          borderTop: "1px solid var(--border)",
          paddingTop: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "var(--ink)",
          }}
        >
          {t.name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.77rem",
            color: accent,
            fontWeight: 500,
          }}
        >
          {context}
        </span>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const complexConfig = useComplexConfig();
  const rawSection = complexConfig?.sections?.testimonials;
  const testimonials = cfgArr<TestimonialItem>(rawSection, "items", TESTIMONIALS_FALLBACK);
  const eyebrow = cfgStr(rawSection, "eyebrow", "Lo que dicen los compradores");
  const title = cfgStr(rawSection, "title", "Relaciones que se sostienen");

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(
        ".tilt-card",
        gridRef.current
      );
      gsap.fromTo(
        cards,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.75,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--surface)", padding: "6rem 1.5rem" }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        <div
          ref={headerRef}
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
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
              fontSize: "var(--text-headline)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h2>
        </div>

        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {testimonials.map((t) => (
            <TiltCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
