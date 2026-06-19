import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Stats from './components/Stats'
import Waitlist from './components/Waitlist'
import staticConfig from './config.json'
import type { TemplateConfig } from '@/lib/types'
import { resolveConfigFonts } from '@/lib/fonts'
import { templateFontVars } from './fonts'

interface SparkTemplateProps {
  /** Override del config estático — usado por el preview en vivo del editor (EditorShell/PreviewPage). */
  config?: TemplateConfig
}

export default function SparkTemplate({ config }: SparkTemplateProps) {
  const typedConfig = resolveConfigFonts(config ?? (staticConfig as unknown as TemplateConfig))

  return (
    <div
      style={{ backgroundColor: typedConfig.palette.bg, color: typedConfig.palette.text }}
      className={`overflow-x-hidden ${templateFontVars}`}
    >
      <div data-section="navbar" style={{ display: 'contents' }}>{typedConfig.sections.navbar?.visible !== false && <Navbar config={typedConfig} />}</div>
      <div data-section="hero" style={{ display: 'contents' }}>{typedConfig.sections.hero?.visible !== false && <Hero config={typedConfig} />}</div>
      <div data-section="features" style={{ display: 'contents' }}>{typedConfig.sections.features?.visible !== false && <Features config={typedConfig} />}</div>
      <div data-section="stats" style={{ display: 'contents' }}>{typedConfig.sections.stats?.visible !== false && <Stats config={typedConfig} />}</div>
      <div data-section="waitlist" style={{ display: 'contents' }}>{typedConfig.sections.waitlist?.visible !== false && <Waitlist config={typedConfig} />}</div>
    </div>
  )
}
