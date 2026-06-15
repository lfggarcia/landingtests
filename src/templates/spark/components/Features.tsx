import type { TemplateConfig } from '@/lib/types'

interface FeaturesSection {
  visible: boolean
  eyebrow: string
  heading: string
  items: { label: string; desc: string; icon: string }[]
}

export default function Features({ config }: { config: TemplateConfig }) {
  const features = config.sections.features as FeaturesSection | undefined
  if (!features?.visible) return null
  const { items, eyebrow, heading } = features

  return (
    <section className="py-28 px-6 md:px-16" style={{ backgroundColor: config.palette.bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-xl">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] mb-3"
            style={{ color: config.palette.primary }}
          >
            {eyebrow}
          </p>
          <h2
            className="font-bold leading-tight"
            style={{
              fontFamily: config.fonts.heading,
              color: config.palette.text,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {heading.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y"
          style={{ borderColor: `${config.palette.text}10` }}
        >
          {items.map(({ label, desc, icon }) => (
            <div
              key={label}
              className="p-8 group hover:bg-white/2 transition-colors"
              style={{ borderColor: `${config.palette.text}10` }}
            >
              <span
                className="text-2xl mb-5 block"
                style={{ color: config.palette.primary, fontFamily: 'monospace' }}
              >
                {icon}
              </span>
              <h3
                className="font-semibold text-base mb-2"
                style={{ fontFamily: config.fonts.heading, color: config.palette.text }}
              >
                {label}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: config.palette.muted }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
