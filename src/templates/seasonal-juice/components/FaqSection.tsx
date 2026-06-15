"use client";

import { useRef, useState } from "react";
import { useComplexConfig, cfgArr, cfgStr } from "@/lib/complexConfigContext";

type FaqItem = {
  q: string;
  a: string;
};

const QUESTIONS_FALLBACK: FaqItem[] = [
  {
    q: "¿Qué volumen mínimo necesito para empezar?",
    a: "Trabajamos desde lotes de prueba de 50 unidades por SKU para que puedas validar la rotación en tu punto de venta antes de comprometer un pedido mayor. Sin costo de muestrario para distribuidores nuevos con carta de presentación.",
  },
  {
    q: "¿Con qué frecuencia cambia el catálogo de sabores?",
    a: "Actualizamos la colección cada 4 a 6 semanas según disponibilidad de fruta en punto óptimo. Te notificamos con 10 días de anticipación para que puedas planear tu pedido con los sabores entrantes y salientes.",
  },
  {
    q: "¿Cómo funciona la trazabilidad de lote?",
    a: "Cada botella lleva código de lote que incluye fecha de prensado, origen del campo, variedad de fruta y operador de turno. Lo puedes escanear con el sistema de tu almacén o verificar directo en nuestro portal de proveedores.",
  },
  {
    q: "¿Cuánto dura el producto en almacén?",
    a: "Sin conservantes, el shelf life es de 4 a 6 días en refrigeración continua. Dimensionamos los pedidos para que el producto llegue a tu cliente con mínimo 3 días de vida útil. Cold-chain es condición de servicio, no opción.",
  },
  {
    q: "¿Tienen certificaciones para exportación o retail premium?",
    a: "Sí. Contamos con certificación orgánica NOM-037, HACCP activo y BPA en proceso. Para cuentas retail premium podemos compartir la documentación completa bajo NDA antes de cerrar condiciones.",
  },
];

export function FaqSection() {
  const complexConfig = useComplexConfig();
  const rawSection = complexConfig?.sections?.faq;
  const questions = cfgArr<FaqItem>(rawSection, "items", QUESTIONS_FALLBACK);
  const eyebrow = cfgStr(rawSection, "eyebrow", "Dudas frecuentes");
  const title = cfgStr(rawSection, "title", "Preguntas frecuentes");

  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{ background: "var(--surface)", padding: "6rem 1.5rem" }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {questions.map((item, i) => (
            <div
              key={i}
              style={{
                background: open === i ? "var(--bg)" : "transparent",
                border: `1.5px solid ${open === i ? "var(--accent)" : "var(--border)"}`,
                borderRadius: "1rem",
                overflow: "hidden",
                transition: "border-color 0.25s, background 0.25s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.25rem 1.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--ink)",
                    lineHeight: 1.35,
                  }}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "var(--accent)",
                    flexShrink: 0,
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                    display: "inline-block",
                  }}
                >
                  +
                </span>
              </button>

              <div
                style={{
                  maxHeight: open === i ? "400px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.925rem",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    padding: "0 1.5rem 1.5rem",
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
