"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useComplexConfig, cfgArr, cfgStr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

type ProductItem = {
  title: string;
  description: string;
  season: string;
  accent: string;
  imageUrl: string;
  tag: string | null;
};

const PRODUCTS_FALLBACK: ProductItem[] = [
  {
    title: "Citrus Dawn",
    description: "Naranja valencia, mandarina tardía y jengibre suave. Perfil para desayuno en retail premium.",
    season: "Temporada: ene — abr",
    accent: "#FF8C42",
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?w=900&q=85&auto=format&fit=crop",
    tag: "Más pedido",
  },
  {
    title: "Berry Shift",
    description: "Frutos rojos de altura y manzana verde. Perfil antioxidante para clubs y hoteles.",
    season: "Temporada: dic — mar",
    accent: "#C0395A",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&q=85&auto=format&fit=crop",
    tag: null,
  },
  {
    title: "Green Noon",
    description: "Pepino, kale baby, piña y menta fresca. Alta rotación en oficinas wellness.",
    season: "Todo el año",
    accent: "#4A9E30",
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900&q=85&auto=format&fit=crop",
    tag: "Nuevo formato",
  },
  {
    title: "Sunset Root",
    description: "Zanahoria, naranja, cúrcuma y pimienta. Activo antinflamatorio para línea funcional.",
    season: "Temporada: feb — jun",
    accent: "#E8650A",
    imageUrl: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=900&q=85&auto=format&fit=crop",
    tag: null,
  },
  {
    title: "Tropical Dew",
    description: "Piña, coco y maracuyá. Alta rotación en aeropuertos y tiendas de conveniencia.",
    season: "Temporada: may — sep",
    accent: "#D4A020",
    imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&q=85&auto=format&fit=crop",
    tag: null,
  },
];

export function ShowcaseSection() {
  const complexConfig = useComplexConfig();
  const rawSection = complexConfig?.sections?.showcase;
  const products = cfgArr<ProductItem>(rawSection, "cards", PRODUCTS_FALLBACK);
  const eyebrow = cfgStr(rawSection, "eyebrow", "Colección actual");
  const title = cfgStr(rawSection, "title", "Por ventana de cosecha");
  const subtitle = cfgStr(rawSection, "subtitle", "Cada fórmula se activa con materia prima en punto óptimo de azúcares y acidez. Sin inventario fijo.");

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      const film = filmRef.current;
      if (!track || !film) return;

      const panels = gsap.utils.toArray<HTMLElement>(".product-panel", track);

      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });

      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - film.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: film,
          start: "top top",
          end: () =>
            `+=${track.scrollWidth - film.clientWidth + film.clientHeight}`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.inOut",
          },
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        const content = panel.querySelector(".panel-content");
        if (content && tween.scrollTrigger) {
          gsap.from(content, {
            opacity: 0,
            y: 35,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 90%",
              toggleActions: "play none none reset",
            },
          });
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      });

      const cards = gsap.utils.toArray<HTMLElement>(
        ".product-panel",
        trackRef.current
      );
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: trackRef.current, start: "top 80%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="coleccion" ref={sectionRef}>
      <div
        ref={headerRef}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 1.5rem 2.5rem",
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
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
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
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              color: "var(--muted)",
              maxWidth: "38ch",
              lineHeight: 1.55,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <div
        ref={filmRef}
        style={{
          height: "100vh",
          overflow: "hidden",
          background: "var(--surface)",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100%",
            gap: "1.5rem",
            paddingLeft: "clamp(1.5rem, 5vw, 6rem)",
            paddingRight: "clamp(1.5rem, 5vw, 6rem)",
            alignItems: "center",
            width: "max-content",
          }}
        >
          {products.map((product) => (
            <div
              key={product.title}
              className="product-panel"
              style={{
                width: "clamp(290px, 50vw, 620px)",
                height: "calc(100vh - 5rem)",
                flexShrink: 0,
                borderRadius: "1.75rem",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src={product.imageUrl}
                alt={`${product.title} — Nativa Press Co`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 90vw, 52vw"
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, ${product.accent}F0 0%, ${product.accent}66 30%, transparent 60%)`,
                }}
              />
              {product.tag && (
                <span
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    left: "1.5rem",
                    background: "#fff",
                    color: product.accent,
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "100px",
                  }}
                >
                  {product.tag}
                </span>
              )}
              <div
                className="panel-content"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "2rem 2rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {product.season}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  {product.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.55,
                    maxWidth: "36ch",
                  }}
                >
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
