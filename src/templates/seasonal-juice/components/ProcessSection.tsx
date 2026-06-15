"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useComplexConfig, cfgArr, cfgStr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

type StepItem = {
  num: string;
  title: string;
  description: string;
  accent: string;
  bg: string;
};

const STEPS_FALLBACK: StepItem[] = [
  {
    num: "01",
    title: "Señal de cosecha",
    description:
      "Nuestro equipo de campo monitorea el punto brix de cada lote. Solo aceptamos fruta que llegó a su ventana óptima de azúcares y acidez.",
    accent: "#95E35D",
    bg: "rgba(149,227,93,0.08)",
  },
  {
    num: "02",
    title: "Prensado en frío",
    description:
      "Sin calor, sin pasteurización. El prensado ocurre en las primeras 6 horas de recibida la fruta. Cada lote se etiqueta con origen y hora de prensado.",
    accent: "#FFB347",
    bg: "rgba(255,179,71,0.08)",
  },
  {
    num: "03",
    title: "Cadena de frío y despacho",
    description:
      "Refrigeración continua desde prensado hasta entrega. El destino recibe el pedido con temperatura y número de lote verificados.",
    accent: "#59B9FF",
    bg: "rgba(89,185,255,0.08)",
  },
];

export function ProcessSection() {
  const complexConfig = useComplexConfig();
  const rawSection = complexConfig?.sections?.process;
  const steps = cfgArr<StepItem>(rawSection, "steps", STEPS_FALLBACK);
  const eyebrow = cfgStr(rawSection, "eyebrow", "Así funciona");
  const title = cfgStr(rawSection, "title", "De campo a punto de venta");

  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const bigNumRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current;
      const pinned = pinnedRef.current;
      const bigNum = bigNumRef.current;
      const titleEl = titleRef.current;
      const descEl = descRef.current;
      const progress = progressRef.current;
      if (!section || !pinned || !bigNum || !titleEl || !descEl || !progress)
        return;

      section.style.height = "100vh";

      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });

      const scrollPerStep = window.innerHeight;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${scrollPerStep * steps.length}`,
        pin: true,
        pinSpacing: true,
      });

      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: `top+=${scrollPerStep * i} top`,
          onEnter: () => {
            gsap.to(bigNum, {
              opacity: 0,
              y: -20,
              duration: 0.2,
              ease: "power2.in",
              onComplete: () => {
                bigNum.textContent = step.num;
                bigNum.style.color = step.accent;
                gsap.fromTo(
                  bigNum,
                  { y: 20, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.4)" }
                );
              },
            });
            gsap.to(titleEl, {
              opacity: 0,
              y: -10,
              duration: 0.15,
              ease: "power2.in",
              onComplete: () => {
                titleEl.textContent = step.title;
                gsap.fromTo(
                  titleEl,
                  { y: 10, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
                );
              },
            });
            gsap.to(descEl, {
              opacity: 0,
              duration: 0.15,
              onComplete: () => {
                descEl.textContent = step.description;
                gsap.to(descEl, { opacity: 1, duration: 0.3 });
              },
            });
            gsap.to(pinned, {
              backgroundColor: step.bg,
              duration: 0.5,
              ease: "power2.inOut",
            });
            gsap.to(progress, {
              scaleX: (i + 1) / steps.length,
              duration: 0.4,
              ease: "power2.out",
              transformOrigin: "left center",
            });
          },
          onEnterBack: () => {
            gsap.to(bigNum, {
              opacity: 0,
              y: 20,
              duration: 0.2,
              ease: "power2.in",
              onComplete: () => {
                bigNum.textContent = step.num;
                bigNum.style.color = step.accent;
                gsap.fromTo(
                  bigNum,
                  { y: -20, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.4)" }
                );
              },
            });
            gsap.to(titleEl, {
              opacity: 0,
              duration: 0.15,
              onComplete: () => {
                titleEl.textContent = step.title;
                gsap.to(titleEl, { opacity: 1, duration: 0.25 });
              },
            });
            gsap.to(descEl, {
              opacity: 0,
              duration: 0.15,
              onComplete: () => {
                descEl.textContent = step.description;
                gsap.to(descEl, { opacity: 1, duration: 0.25 });
              },
            });
            gsap.to(pinned, {
              backgroundColor: step.bg,
              duration: 0.5,
              ease: "power2.inOut",
            });
            gsap.to(progress, {
              scaleX: (i + 1) / steps.length,
              duration: 0.4,
              ease: "power2.out",
              transformOrigin: "left center",
            });
          },
        });
      });
      return () => { section.style.height = ""; };
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });
    });

    return () => mm.revert();
  }, [steps]);

  const firstStep = steps[0] ?? STEPS_FALLBACK[0];

  return (
    <section
      id="proceso"
      ref={sectionRef}
      style={{ background: "var(--bg)" }}
    >
      <div
        ref={headerRef}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 1.5rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
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
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          display: "flex",
          gap: "4rem",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            flex: "1 1 50%",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                padding: "3.5rem 0",
                borderBottom:
                  i < steps.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: step.accent,
                    letterSpacing: "0.04em",
                    paddingTop: "0.2rem",
                    minWidth: "2.5rem",
                  }}
                >
                  {step.num}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.93rem",
                      color: "var(--muted)",
                      lineHeight: 1.65,
                      maxWidth: "42ch",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={pinnedRef}
          className="hidden md:flex"
          style={{
            flex: "0 0 42%",
            height: "70vh",
            borderRadius: "2rem",
            background: firstStep.bg,
            flexDirection: "column",
            justifyContent: "center",
            padding: "3rem",
            position: "relative",
            overflow: "hidden",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "var(--border)",
            }}
          >
            <div
              ref={progressRef}
              style={{
                height: "100%",
                background: "var(--accent)",
                borderRadius: "100px",
                transform: `scaleX(${1 / steps.length})`,
                transformOrigin: "left center",
              }}
            />
          </div>

          <div
            ref={bigNumRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 10vw, 9rem)",
              fontWeight: 800,
              color: firstStep.accent,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              marginBottom: "1.5rem",
            }}
          >
            {firstStep.num}
          </div>

          <div
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
              fontWeight: 700,
              color: "var(--ink)",
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            {firstStep.title}
          </div>

          <div
            ref={descRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--muted)",
              lineHeight: 1.65,
              maxWidth: "34ch",
            }}
          >
            {firstStep.description}
          </div>
        </div>
      </div>
    </section>
  );
}
