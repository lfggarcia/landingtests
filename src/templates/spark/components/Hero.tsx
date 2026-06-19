'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { InstagramIcon, TwitterX } from '@/components/SocialIcons'
import type { TemplateConfig } from '@/lib/types'

interface HeroSection {
  visible: boolean
  eyebrow?: string
  headline: string
  subheadline?: string
  cta: { primary: { label: string; href: string }; secondary?: { label: string; href: string } }
  images?: string[]
}

const FAN = [
  { rotate: -24, tx: -320, scale: 0.75, delay: 0.2 },
  { rotate: -12, tx: -160, scale: 0.87, delay: 0.1 },
  { rotate: 0,   tx: 0,    scale: 1.0,  delay: 0.0 },
  { rotate: 12,  tx: 160,  scale: 0.87, delay: 0.1 },
  { rotate: 24,  tx: 320,  scale: 0.75, delay: 0.2 },
]

const CARD_W = 160
const CARD_H = 240

interface HeroProps { config: TemplateConfig }

function useCountdown(iso?: string) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    if (!iso) return
    const update = () => {
      const diff = new Date(iso).getTime() - Date.now()
      if (diff <= 0) return
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [iso])
  return t
}

export default function Hero({ config }: HeroProps) {
  const hero = config.sections.hero as HeroSection | undefined
  const fomo = config.fomo
  const { palette, fonts, brand } = config
  const t = useCountdown(fomo?.countdownTarget)

  if (!hero || !hero.visible) return null

  const countdownBlocks = [
    { label: 'Days', value: t.d, tick: false },
    { label: 'Hrs',  value: t.h, tick: false },
    { label: 'Min',  value: t.m, tick: false },
    { label: 'Sec',  value: t.s, tick: true  },
  ]

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-x-hidden"
      style={{
        minHeight: '100dvh',
        backgroundColor: palette.bg,
        color: palette.text,
        paddingBottom: '100px',
        paddingTop: '48px',
      }}
    >
      {/* background dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle, ${palette.text} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 w-full px-4">

        {/* eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-bold tracking-[0.35em] uppercase"
          style={{ color: palette.muted, fontFamily: fonts.body }}
        >
          {hero.eyebrow}
        </motion.p>

        {/* brand name */}
        <motion.h1
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="text-7xl md:text-9xl leading-none tracking-widest"
          style={{ fontFamily: fonts.heading, color: palette.primary }}
        >
          {brand.name}
        </motion.h1>

        {/* fan of cards */}
        <div className="relative w-full" style={{ height: `${CARD_H + 20}px` }}>
          {/* ambient glow under fan */}
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '480px',
              height: '160px',
              background: `radial-gradient(ellipse at center, ${palette.primary}38 0%, transparent 70%)`,
              filter: 'blur(36px)',
              borderRadius: '50%',
            }}
          />

          {/* zero-width perspective pivot — cards spread out via FM x */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: 0,
              height: `${CARD_H}px`,
              perspective: '1200px',
            }}
          >
            {FAN.map((fan, i) => {
              const isCenter = i === 2
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 120, rotate: fan.rotate, x: fan.tx - CARD_W / 2, scale: fan.scale }}
                  animate={{ opacity: 1, y: 0,   rotate: fan.rotate, x: fan.tx - CARD_W / 2, scale: fan.scale }}
                  whileHover={{ scale: isCenter ? 1.08 : 1.05, zIndex: 10 }}
                  transition={{
                    opacity: { duration: 0.5, delay: fan.delay },
                    y: { type: 'spring', stiffness: 100, damping: 15, delay: fan.delay },
                  }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: `${CARD_W}px`,
                    height: `${CARD_H}px`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    zIndex: isCenter ? 5 : 4 - Math.abs(i - 2),
                    boxShadow: isCenter
                      ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${palette.primary}40`
                      : '0 20px 60px rgba(0,0,0,0.6)',
                  }}
                >
                  {isCenter ? (
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                      style={{ position: 'relative', width: '100%', height: '100%' }}
                    >
                      {hero.images?.[i] && (
                        <Image
                          src={hero.images[i]}
                          alt="fashion"
                          fill
                          priority
                          sizes={`${CARD_W}px`}
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                    </motion.div>
                  ) : (
                    hero.images?.[i] && (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image
                          src={hero.images[i]}
                          alt="fashion"
                          fill
                          loading="lazy"
                          sizes={`${CARD_W}px`}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* countdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex items-center gap-3 md:gap-5"
        >
          {countdownBlocks.map((block, i) => (
            <React.Fragment key={block.label}>
              <div className="flex flex-col items-center min-w-13">
                {block.tick ? (
                  <motion.span
                    key={t.s}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl md:text-6xl leading-none"
                    style={{ fontFamily: fonts.heading, color: palette.primary }}
                  >
                    {String(block.value).padStart(2, '0')}
                  </motion.span>
                ) : (
                  <span
                    className="text-4xl md:text-6xl leading-none"
                    style={{ fontFamily: fonts.heading, color: palette.primary }}
                  >
                    {String(block.value).padStart(2, '0')}
                  </span>
                )}
                <span
                  className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: palette.muted, fontFamily: fonts.body }}
                >
                  {block.label}
                </span>
              </div>
              {i < 3 && (
                <span
                  className="text-2xl md:text-4xl pb-5 font-bold select-none"
                  style={{ color: palette.muted, fontFamily: fonts.heading }}
                >
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-xl md:text-2xl text-center max-w-lg mx-auto leading-relaxed"
          style={{ color: palette.muted, fontFamily: fonts.body }}
        >
          {hero.headline}
        </motion.p>

        {/* social links */}
        <div className="flex items-center gap-5">
          {config.social?.instagram && (
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-100"
              style={{ color: palette.muted, opacity: 0.5 }}
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          )}
          {config.social?.twitter && (
            <a
              href={config.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-100"
              style={{ color: palette.muted, opacity: 0.5 }}
            >
              <TwitterX className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* fixed CTA — always visible */}
      <div className="fixed bottom-8 left-1/2 z-50" style={{ transform: 'translateX(-50%)' }}>
        <motion.a
          href={hero.cta.primary.href}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base whitespace-nowrap"
          style={{
            backgroundColor: palette.primary,
            color: '#ffffff',
            boxShadow: `0 8px 32px ${palette.primary}55`,
            fontFamily: fonts.body,
            textDecoration: 'none',
          }}
        >
          {hero.cta.primary.label}
          {fomo?.counterValue !== undefined && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.22)', color: '#ffffff' }}
            >
              {fomo.counterValue} {fomo.counterLabel ?? 'left'}
            </span>
          )}
        </motion.a>
      </div>
    </section>
  )
}
