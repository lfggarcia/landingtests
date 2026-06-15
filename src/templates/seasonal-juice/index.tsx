"use client";

import dynamic from "next/dynamic";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ComplexConfigContext } from "@/lib/complexConfigContext";
import { resolveConfigFonts } from "@/lib/fonts";
import type { TemplateConfig } from "@/lib/types";
import staticConfig from "./config.json";
import { templateFontVars } from "./fonts";

const HeroSection = dynamic(
  () => import("./components/HeroSection").then((m) => ({ default: m.HeroSection })),
  { ssr: false }
);
const MarqueeStrip = dynamic(
  () => import("./components/MarqueeStrip").then((m) => ({ default: m.MarqueeStrip })),
  { ssr: false }
);
const ProofStrip = dynamic(
  () => import("./components/ProofStrip").then((m) => ({ default: m.ProofStrip })),
  { ssr: false }
);
const ShowcaseSection = dynamic(
  () => import("./components/ShowcaseSection").then((m) => ({ default: m.ShowcaseSection })),
  { ssr: false }
);
const ManifestoSection = dynamic(
  () => import("./components/ManifestoSection").then((m) => ({ default: m.ManifestoSection })),
  { ssr: false }
);
const TestimonialsSection = dynamic(
  () => import("./components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: false }
);
const ProcessSection = dynamic(
  () => import("./components/ProcessSection").then((m) => ({ default: m.ProcessSection })),
  { ssr: false }
);
const FaqSection = dynamic(
  () => import("./components/FaqSection").then((m) => ({ default: m.FaqSection })),
  { ssr: false }
);
const CtaSection = dynamic(
  () => import("./components/CtaSection").then((m) => ({ default: m.CtaSection })),
  { ssr: false }
);

interface SeasonalJuiceTemplateProps {
  config?: TemplateConfig;
}

export default function SeasonalJuiceTemplate({ config }: SeasonalJuiceTemplateProps) {
  const cfg = resolveConfigFonts(config ?? (staticConfig as unknown as TemplateConfig));
  const { palette, fonts } = cfg;
  const sec = (cfg.sections ?? {}) as Record<string, { visible?: boolean }>

  return (
    <ComplexConfigContext.Provider value={cfg}>
      <div
        style={
          {
            "--bg": palette.bg,
            "--surface": "#162318",
            "--ink": palette.text,
            "--muted": palette.muted,
            "--border": "#2A3C2A",
            "--accent": palette.primary,
            "--accent2": palette.secondary,
            "--font-display": fonts.heading,
            "--font-body": fonts.body,
            "--text-display": "clamp(3rem, 8vw, 9rem)",
            "--text-headline": "clamp(2rem, 4.5vw, 3.8rem)",
            background: "var(--bg)",
            color: "var(--ink)",
            minHeight: "100vh",
          } as React.CSSProperties
        }
        className={templateFontVars}
      >
        <div data-section="navbar" style={{ display: 'contents' }}>{sec.navbar?.visible !== false && <Navbar />}</div>
        <main>
          <div data-section="hero" style={{ display: 'contents' }}>{sec.hero?.visible !== false && <HeroSection />}</div>
          <MarqueeStrip />
          <div data-section="metrics" style={{ display: 'contents' }}>{sec.metrics?.visible !== false && <ProofStrip />}</div>
          <div data-section="showcase" style={{ display: 'contents' }}>{sec.showcase?.visible !== false && <ShowcaseSection />}</div>
          <MarqueeStrip dark />
          <div data-section="manifesto" style={{ display: 'contents' }}>{sec.manifesto?.visible !== false && <ManifestoSection />}</div>
          <div data-section="testimonials" style={{ display: 'contents' }}>{sec.testimonials?.visible !== false && <TestimonialsSection />}</div>
          <div data-section="process" style={{ display: 'contents' }}>{sec.process?.visible !== false && <ProcessSection />}</div>
          <div data-section="faq" style={{ display: 'contents' }}>{sec.faq?.visible !== false && <FaqSection />}</div>
          <div data-section="cta" style={{ display: 'contents' }}>{sec.cta?.visible !== false && <CtaSection />}</div>
        </main>
        <div data-section="footer" style={{ display: 'contents' }}>{sec.footer?.visible !== false && <Footer />}</div>
      </div>
    </ComplexConfigContext.Provider>
  );
}
