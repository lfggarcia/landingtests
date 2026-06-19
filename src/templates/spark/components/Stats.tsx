import type { TemplateConfig } from '@/lib/types'

interface StatsSection {
  visible: boolean
  items: { value: string; label: string }[]
}

export default function Stats({ config }: { config: TemplateConfig }) {
  const stats = config.sections.stats as StatsSection | undefined
  if (!stats?.visible) return null
  const { items } = stats

  return (
    <section
      className="border-y"
      style={{ borderColor: `${config.palette.text}10` }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0" style={{ '--tw-divide-opacity': '1', borderColor: `${config.palette.text}10` } as React.CSSProperties}>
        {items.map(({ value, label }) => (
          <div key={label} className="px-8 py-10 text-center" style={{ borderColor: `${config.palette.text}10` }}>
            <div
              className="font-bold text-3xl mb-1"
              style={{ fontFamily: config.fonts.heading, color: config.palette.primary }}
            >
              {value}
            </div>
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: config.palette.muted }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
