"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useComplexConfig, cfgArr } from "@/lib/complexConfigContext";

gsap.registerPlugin(ScrollTrigger);

interface RoomItem {
  num: string;
  eyebrow: string;
  nameLines: string[];
  description: string;
  price: string;
  imageUrl: string;
  hoverImageUrl: string;
}

const FALLBACK_ROOMS: RoomItem[] = [
  {
    num: "01",
    eyebrow: "Hab. 01 · Suite Jardín",
    nameLines: ["La del", "Árbol"],
    description: "Tiene una palma en el patio que lleva más años que la casa.",
    price: "desde $ 280 USD / noche",
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1800&q=85&auto=format&fit=crop",
    hoverImageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=70&auto=format&fit=crop",
  },
];

export function RoomsSection() {
  const cfg = useComplexConfig();
  const raw = (cfg?.sections as Record<string, unknown>)?.rooms;
  const rooms = cfgArr<RoomItem>(raw, "items", FALLBACK_ROOMS);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      const rs = document.querySelectorAll<HTMLElement>(".cp-room-scene");
      const distance = () => (rs.length - 1) * window.innerWidth;

      const trackTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: ".cp-rooms-sticky",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      rs.forEach((room) => {
        const img = room.querySelector(".cp-room-img");
        const info = room.querySelector(".cp-room-info");
        const num = room.querySelector(".cp-room-number");

        gsap.from(img, {
          clipPath: "inset(0 92% 0 0)",
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: room,
            containerAnimation: trackTween,
            start: "left 90%",
            end: "left 15%",
            scrub: 0.8,
          },
        });
        gsap.from(info, {
          y: 40,
          opacity: 0,
          scrollTrigger: {
            trigger: room,
            containerAnimation: trackTween,
            start: "left 50%",
            end: "left 10%",
            scrub: true,
          },
        });
        gsap.from(num, {
          opacity: 0,
          scrollTrigger: {
            trigger: room,
            containerAnimation: trackTween,
            start: "left 70%",
            end: "left 30%",
            scrub: true,
          },
        });
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, [rooms.length]);

  // Cursor room preview — sigue al mouse con lag al hacer hover sobre el nombre de una habitación
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const preview = previewRef.current;
    if (!preview) return;

    let mx = 0, my = 0, px = 0, py = 0, raf = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      px += (mx - px) * 0.12;
      py += (my - py) * 0.12;
      preview.style.transform = `translate3d(${px + 24}px, ${py - 130}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const showPreview = (url: string) => {
    if (previewImgRef.current) previewImgRef.current.src = url;
    gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
  };
  const hidePreview = () => {
    gsap.to(previewRef.current, { opacity: 0, scale: 0.9, duration: 0.35, ease: "power2.out" });
  };

  return (
    <div ref={wrapperRef} id="habitaciones" style={{ position: "relative", height: `${rooms.length * 100}vh` }}>
      <div className="cp-rooms-sticky" style={{ position: "sticky", top: 0, height: "100svh", overflow: "hidden" }}>
        <div ref={trackRef} style={{ display: "flex", height: "100%", willChange: "transform" }}>
          {rooms.map((room) => (
            <div key={room.num} className="cp-room-scene" style={{ width: "100vw", height: "100%", flexShrink: 0, position: "relative", overflow: "hidden", display: "grid", gridTemplateColumns: "55% 45%" }}>
              <div
                className="cp-room-img"
                style={{
                  height: "100%",
                  backgroundImage: `url(${room.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="cp-room-info" style={{ padding: "clamp(3rem, 6vw, 6rem) clamp(2rem, 4vw, 4rem)", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "var(--bg-surface)", position: "relative" }}>
                <span
                  className="cp-room-number"
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "2rem",
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(8rem, 15vw, 16rem)",
                    lineHeight: 1,
                    color: "var(--bg-raised)",
                    userSelect: "none",
                  }}
                >
                  {room.num}
                </span>

                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--accent)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1rem" }}>
                  {room.eyebrow}
                </span>

                <h3
                  onMouseEnter={() => showPreview(room.hoverImageUrl)}
                  onMouseLeave={hidePreview}
                  data-cursor-size="80"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(2.5rem, 4vw, 4.5rem)",
                    lineHeight: 1.05,
                    color: "var(--text-primary)",
                    margin: "0 0 1rem",
                    cursor: "default",
                  }}
                >
                  {room.nameLines.map((line, i) => (
                    <span key={i} style={{ display: "block" }}>{line}</span>
                  ))}
                </h3>

                <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "32ch", margin: "0 0 1.5rem" }}>
                  {room.description}
                </p>

                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", letterSpacing: "0.05em" }}>
                  {room.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor room preview */}
      <div
        ref={previewRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "380px",
          height: "260px",
          opacity: 0,
          transform: "scale(0.9)",
          pointerEvents: "none",
          zIndex: 9995,
          overflow: "hidden",
          border: "0.5px solid var(--line)",
        }}
        className="cp-room-preview"
      >
        <img ref={previewImgRef} alt="" loading="lazy" width={380} height={260} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cp-room-scene { grid-template-columns: 1fr !important; grid-template-rows: 45% 55%; }
          .cp-room-preview { display: none !important; }
        }
      `}</style>
    </div>
  );
}
