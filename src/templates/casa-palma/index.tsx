"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { ComplexConfigContext, cfgStr } from "@/lib/complexConfigContext";
import { resolveFontFamily } from "@/lib/fonts";
import type { TemplateConfig } from "@/lib/types";
import staticConfig from "./config.json";
import { templateFontVars } from "./fonts";

const Preloader = dynamic(() => import("./components/Preloader"), { ssr: false });
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false });
const HeroSection = dynamic(
  () => import("./components/HeroSection").then((m) => ({ default: m.HeroSection })),
  { ssr: false }
);
const ManifestoSection = dynamic(
  () => import("./components/ManifestoSection").then((m) => ({ default: m.ManifestoSection })),
  { ssr: false }
);
const ExperienceSection = dynamic(
  () => import("./components/ExperienceSection").then((m) => ({ default: m.ExperienceSection })),
  { ssr: false }
);
const GallerySection = dynamic(
  () => import("./components/GallerySection").then((m) => ({ default: m.GallerySection })),
  { ssr: false }
);
const ReservationSection = dynamic(
  () => import("./components/ReservationSection").then((m) => ({ default: m.ReservationSection })),
  { ssr: false }
);
const Footer = dynamic(
  () => import("./components/Footer").then((m) => ({ default: m.Footer })),
  { ssr: false }
);

interface CasaPalmaTemplateProps {
  config?: TemplateConfig;
}

export default function CasaPalmaTemplate({ config }: CasaPalmaTemplateProps) {
  const cfg = config ?? (staticConfig as unknown as TemplateConfig);
  const sec = (cfg.sections ?? {}) as Record<string, { visible?: boolean }>;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const style = document.createElement("style");
    style.id = "casa-palma-cursor-styles";
    style.textContent = `
      .casa-palma-root, .casa-palma-root a, .casa-palma-root button, .casa-palma-root [data-magnetic] { cursor: none !important; }
      #cp-cursor-dot {
        position: fixed; top: 0; left: 0; width: 5px; height: 5px;
        background: var(--accent); border-radius: 50%; pointer-events: none;
        z-index: 99999; will-change: transform; mix-blend-mode: multiply;
        transform: translate3d(-50%, -50%, 0);
      }
      #cp-cursor-ring {
        position: fixed; top: 0; left: 0; width: 26px; height: 26px;
        border: 0.5px solid var(--accent); border-radius: 50%; pointer-events: none;
        z-index: 99998; will-change: transform, width, height;
        transition: width 0.3s, height 0.3s, opacity 0.3s, border-color 0.3s;
      }
      .cp-cursor--light #cp-cursor-dot { background: var(--text-inverse); mix-blend-mode: difference; }
      .cp-cursor--light #cp-cursor-ring { border-color: var(--text-inverse); mix-blend-mode: difference; }
    `;
    document.head.appendChild(style);

    const dot = document.createElement("div");
    dot.id = "cp-cursor-dot";
    const ring = document.createElement("div");
    ring.id = "cp-cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };
    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    document.addEventListener("mousemove", onMove);

    const grow = (size: number) => {
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
    };
    const shrink = () => grow(26);

    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest?.("a, button, [data-magnetic], [data-cursor-size]");
      if (target) grow(Number(target.getAttribute("data-cursor-size")) || 60);
    };
    const onOut = (e: MouseEvent) => {
      const target = (e.target as Element).closest?.("a, button, [data-magnetic], [data-cursor-size]");
      if (!target) return;
      const related = e.relatedTarget as Element | null;
      if (related && target.contains(related)) return;
      shrink();
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    const darkSections = document.querySelectorAll("[data-section-theme='dark']");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            document.body.classList.add("cp-cursor--light");
          }
        });
        const anyDarkVisible = Array.from(darkSections).some((el) => {
          const r = el.getBoundingClientRect();
          return r.top < window.innerHeight / 2 && r.bottom > window.innerHeight / 2;
        });
        if (!anyDarkVisible) document.body.classList.remove("cp-cursor--light");
      },
      { threshold: [0, 0.5, 1] }
    );
    darkSections.forEach((el) => observer.observe(el));

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      observer.disconnect();
      dot.remove();
      ring.remove();
      style.remove();
      document.body.classList.remove("cp-cursor--light");
    };
  }, []);

  const cssVars = {
    "--bg-deep": "#F2EDE4",
    "--bg-surface": "#EDE7DC",
    "--bg-raised": "#E4DDD0",
    "--bg-dark": "#1A1510",
    "--bg-dark-mid": "#231E18",
    "--text-primary": "#1A1510",
    "--text-secondary": "#5A5248",
    "--text-muted": "#9A9088",
    "--text-inverse": "#F2EDE4",
    "--accent": (cfg.palette?.primary as string) ?? "#7A4F2E",
    "--accent-soft": "#B87A50",
    "--accent-warm": (cfg.palette?.secondary as string) ?? "#C8A870",
    "--line": "#D4CEC4",
    "--line-dark": "rgba(26,21,16,0.1)",
    "--font-display": `${resolveFontFamily(cfg.fonts.heading)}, Georgia, serif`,
    "--font-body": `${resolveFontFamily(cfg.fonts.body)}, 'Helvetica Neue', sans-serif`,
    "--font-mono": "var(--font-dm-mono), monospace",
    background: "var(--bg-deep)",
    color: "var(--text-primary)",
    minHeight: "100vh",
    position: "relative",
  } as React.CSSProperties;

  const brandName = (cfg as unknown as { brand?: { name?: string } }).brand?.name ?? "Casa Palma";
  const coordinates = (cfg as unknown as { brand?: { coordinates?: string } }).brand?.coordinates ?? "17.0732° N · 96.7266° W";
  const loadingText = cfgStr(sec.preloader, "loadingText", "Cargando tu próxima escapada");

  return (
    <ComplexConfigContext.Provider value={cfg}>
      <style>{`
        @keyframes cp-grain {
          0%,100%{transform:translate(0,0)}10%{transform:translate(-1%,-1%)}20%{transform:translate(1%,1%)}30%{transform:translate(-2%,0)}40%{transform:translate(2%,-1%)}50%{transform:translate(-1%,2%)}60%{transform:translate(1%,-2%)}70%{transform:translate(-2%,1%)}80%{transform:translate(2%,0)}90%{transform:translate(-1%,-2%)}
        }
        .casa-palma-root::after {
          content:'';position:fixed;inset:0;pointer-events:none;z-index:9990;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity:0.03;mix-blend-mode:multiply;
          animation:cp-grain 0.8s steps(1) infinite;
        }
        .casa-palma-root * { box-sizing: border-box; }
        @media (prefers-reduced-motion: reduce) { .casa-palma-root::after { display: none; } }
      `}</style>
      <div className={`casa-palma-root ${templateFontVars}`} style={cssVars}>
        <div data-section="preloader" style={{ display: 'contents' }}>
          <Preloader brandName={brandName} roomsCount={Number((cfg as unknown as { brand?: { rooms?: string } }).brand?.rooms) || 8} coordinates={coordinates} loadingText={loadingText} />
        </div>
        <div data-section="navbar" style={{ display: 'contents' }}>{sec.navbar?.visible !== false && <Navbar />}</div>
        <main>
          <div data-section="hero" style={{ display: 'contents' }}>{sec.hero?.visible !== false && <HeroSection />}</div>
          <div data-section="manifesto" style={{ display: 'contents' }}>{sec.manifesto?.visible !== false && <ManifestoSection />}</div>
          <div data-section="experience" style={{ display: 'contents' }}>{sec.experience?.visible !== false && <ExperienceSection />}</div>
          <div data-section="gallery" style={{ display: 'contents' }}>{sec.gallery?.visible !== false && <GallerySection />}</div>
          <div data-section="reservation" style={{ display: 'contents' }}>{sec.reservation?.visible !== false && <ReservationSection />}</div>
        </main>
        <div data-section="footer" style={{ display: 'contents' }}>{sec.footer?.visible !== false && <Footer />}</div>
      </div>
    </ComplexConfigContext.Provider>
  );
}
