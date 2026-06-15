"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  brandName: string;
  roomsCount: number;
  coordinates: string;
  loadingText: string;
}

export default function Preloader({ brandName, roomsCount, coordinates, loadingText }: PreloaderProps) {
  const [mounted, setMounted] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leafWrapRef = useRef<HTMLDivElement>(null);
  const leafPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const loadingRef = useRef<HTMLSpanElement>(null);

  const [first, ...rest] = brandName.split(" ");

  useEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    const leafWrap = leafWrapRef.current;
    const leafPaths = leafPathRefs.current.filter((el): el is SVGPathElement => el !== null);
    if (!root || !content || !leafWrap || leafPaths.length < 8) return;

    const stem = leafPaths[0];
    const blades = leafPaths.slice(1);

    const obj = { val: 1 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap
          .timeline()
          .to(content, { y: -20, opacity: 0, duration: 0.5, ease: "power2.in" })
          .to(
            root,
            {
              clipPath: "inset(0 0 100% 0)",
              duration: 0.9,
              ease: "expo.inOut",
              onComplete: () => setMounted(false),
            },
            "-=0.1"
          );
      },
    });

    tl.set(leafWrap, { opacity: 1 })
      .to(stem, { strokeDashoffset: 0, duration: 0.3, ease: "power1.out" })
      .to(blades, { strokeDashoffset: 0, duration: 0.5, ease: "power2.out", stagger: 0.08 }, "-=0.1")
      .to(leafWrap, { opacity: 0.14, duration: 0.5, ease: "power2.out" }, "-=0.15")
      .addLabel("reveal", "-=0.2")
      .to(coordsRef.current, { opacity: 0.6, duration: 0.4, ease: "power1.out" }, "reveal")
      .fromTo(logoRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "reveal+=0.3")
      .fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.5, ease: "power2.out", transformOrigin: "top" }, "reveal+=0.6")
      .to(
        obj,
        {
          val: roomsCount,
          duration: 1.4,
          ease: "steps(" + (roomsCount - 1) + ")",
          onUpdate: () => {
            if (counterRef.current) counterRef.current.textContent = String(Math.round(obj.val)).padStart(2, "0");
          },
        },
        "reveal+=0.6"
      )
      .to(loadingRef.current, { opacity: 0.4, duration: 0.6, ease: "power1.out" }, "-=0.4");

    return () => { tl.kill(); };
  }, [roomsCount]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--bg-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "inset(0 0 0% 0)",
        overflow: "hidden",
      }}
    >
      <span
        ref={counterRef}
        aria-hidden
        style={{
          position: "absolute",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(5rem, 11vw, 10rem)",
          color: "rgba(242,237,228,0.06)",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        01
      </span>

      <div
        ref={contentRef}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div ref={leafWrapRef} style={{ opacity: 0, width: "clamp(150px, 26vw, 230px)" }}>
          <svg viewBox="0 0 200 165" style={{ width: "100%", height: "auto", display: "block" }}>
            <path ref={(el) => { leafPathRefs.current[0] = el; }} d="M 100 156 L 100 142" fill="none" stroke="var(--accent-warm)" strokeWidth="1.5" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            <path ref={(el) => { leafPathRefs.current[1] = el; }} d="M 100 142 Q 74.29 129.46 49.14 131.19" fill="none" stroke="var(--accent-warm)" strokeWidth="1.25" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            <path ref={(el) => { leafPathRefs.current[2] = el; }} d="M 100 142 Q 76.97 112.53 46.42 100.14" fill="none" stroke="var(--accent-warm)" strokeWidth="1.25" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            <path ref={(el) => { leafPathRefs.current[3] = el; }} d="M 100 142 Q 90.62 97.89 64.05 68.3" fill="none" stroke="var(--accent-warm)" strokeWidth="1.25" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            <path ref={(el) => { leafPathRefs.current[4] = el; }} d="M 100 142 Q 111.98 93.97 100 52" fill="none" stroke="var(--accent-warm)" strokeWidth="1.25" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            <path ref={(el) => { leafPathRefs.current[5] = el; }} d="M 100 142 Q 128.99 107.45 135.95 68.3" fill="none" stroke="var(--accent-warm)" strokeWidth="1.25" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            <path ref={(el) => { leafPathRefs.current[6] = el; }} d="M 100 142 Q 134.17 126.79 153.58 100.14" fill="none" stroke="var(--accent-warm)" strokeWidth="1.25" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            <path ref={(el) => { leafPathRefs.current[7] = el; }} d="M 100 142 Q 128.58 143 150.86 131.19" fill="none" stroke="var(--accent-warm)" strokeWidth="1.25" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
          </svg>
        </div>

        <span
          ref={coordsRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
            opacity: 0,
          }}
        >
          {coordinates}
        </span>

        <div ref={logoRef} style={{ textAlign: "center", opacity: 0 }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.4rem",
              letterSpacing: "0.3em",
              color: "var(--text-inverse)",
              textTransform: "uppercase",
            }}
          >
            {first}
          </span>
          {rest.length > 0 && (
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "0.7rem",
                letterSpacing: "0.6em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                marginTop: "0.35rem",
              }}
            >
              {rest.join(" ")}
            </span>
          )}
        </div>

        <div
          ref={lineRef}
          style={{
            width: "1px",
            height: "48px",
            background: "var(--accent)",
            transform: "scaleY(0)",
          }}
        />

        <span
          ref={loadingRef}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "var(--text-muted)",
            opacity: 0,
            marginTop: "0.5rem",
          }}
        >
          {loadingText}
        </span>
      </div>
    </div>
  );
}
