'use client'

import { useState } from 'react'
import type { TemplateConfig } from '@/lib/types'
import { useLeadForm } from '@/lib/useLeadForm'
import type { LeadFormConfig } from '@/lib/leadForm'

interface WaitlistSection {
  visible: boolean
  eyebrow: string
  heading: string
  body: string
  ctaLabel: string
  confirmMessage: string
  footnote: string
  lead?: LeadFormConfig
}

export default function Waitlist({ config }: { config: TemplateConfig }) {
  const [email, setEmail] = useState('')
  const waitlist = config.sections.waitlist as WaitlistSection | undefined
  const { status, submit } = useLeadForm(waitlist?.lead)
  const submitted = status === 'sent'
  if (!waitlist?.visible) return null

  return (
    <section
      className="relative py-32 px-6 md:px-16 overflow-hidden"
      style={{ backgroundColor: config.palette.bg }}
    >
      {/* radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${config.palette.primary}15, transparent)`,
        }}
      />
      {/* grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(${config.palette.primary}15 1px, transparent 1px), linear-gradient(90deg, ${config.palette.primary}15 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <p
          className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
          style={{ color: config.palette.primary }}
        >
          {waitlist.eyebrow}
        </p>
        <h2
          className="font-bold mb-4"
          style={{
            fontFamily: config.fonts.heading,
            color: config.palette.text,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '-0.03em',
            lineHeight: '1.1',
          }}
        >
          {waitlist.heading}
        </h2>
        <p className="text-base mb-10 max-w-md mx-auto" style={{ color: config.palette.muted }}>
          {waitlist.body}
        </p>

        {!submitted ? (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full sm:w-72 px-5 py-4 rounded-lg text-sm border focus:outline-none"
              style={{
                backgroundColor: `${config.palette.text}06`,
                borderColor: `${config.palette.primary}30`,
                color: config.palette.text,
              }}
            />
            <button
              type="button"
              disabled={status === 'sending'}
              onClick={() => email && submit({ email })}
              className="px-8 py-4 rounded-lg font-bold text-sm transition-transform duration-150 ease-out hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-60"
              style={{ backgroundColor: config.palette.primary, color: '#fff' }}
            >
              {status === 'sending' ? '...' : waitlist.ctaLabel}
            </button>
          </div>
        ) : (
          <div
            className="inline-block px-6 py-4 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: `${config.palette.primary}15`, color: config.palette.primary }}
          >
            {waitlist.confirmMessage}
          </div>
        )}
        {status === 'error' && (
          <p className="text-xs mt-3" style={{ color: config.palette.primary }}>
            No se pudo enviar. Intenta de nuevo.
          </p>
        )}

        <p className="text-xs mt-5" style={{ color: config.palette.muted }}>
          {waitlist.footnote}
        </p>
      </div>
    </section>
  )
}
