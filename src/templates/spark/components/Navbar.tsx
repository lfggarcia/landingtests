'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cfgArr } from '@/lib/complexConfigContext'
import type { TemplateConfig } from '@/lib/types'

interface NavLink { label: string; href: string }

export default function Navbar({ config }: { config: TemplateConfig }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = cfgArr<NavLink>(config.sections?.navbar, 'links', [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="fixed top-5 inset-x-0 z-50 flex flex-col items-center gap-2 px-4">
      <nav
        className="flex w-fit items-center gap-8 px-5 py-2.5 rounded-full transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? `${config.palette.bg}e0`
            : `${config.palette.bg}80`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${config.palette.primary}25`,
          boxShadow: scrolled ? `0 8px 32px rgba(0,0,0,0.4)` : 'none',
        }}
      >
        <span
          className="text-sm font-bold tracking-tight"
          style={{ color: config.palette.text, fontFamily: config.fonts.heading }}
        >
          {config.brand.name}
        </span>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium transition-opacity hover:opacity-100"
              style={{ color: config.palette.muted, opacity: 0.7 }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
          aria-controls="spark-mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex items-center justify-center md:hidden"
          style={{ color: config.palette.text }}
        >
          {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>

        <a
          href={config.sections.hero?.cta.primary.href ?? '#'}
          className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105 hover:brightness-110"
          style={{ backgroundColor: config.palette.primary, color: '#fff' }}
        >
          {config.sections.hero?.cta.primary.label ?? 'Get started'}
        </a>
      </nav>

      {mobileOpen && (
        <div
          id="spark-mobile-menu"
          className="flex w-[calc(100vw-2rem)] max-w-xs flex-col gap-1 rounded-2xl p-3 md:hidden"
          style={{
            backgroundColor: `${config.palette.bg}f0`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${config.palette.primary}25`,
            boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
              style={{ color: config.palette.text }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

