export type Tier = 'simple' | 'complex' | 'custom'
export type AnimationStrategy = 'none' | 'framer-motion' | 'gsap'

export interface TemplatePalette {
  bg: string
  text: string
  primary: string
  secondary: string
  muted: string
}

export interface TemplateFonts {
  heading: string
  body: string
}

export interface TemplateCta {
  label: string
  href: string
}

export interface TemplateSection {
  visible: boolean
}

export interface HeroSection extends TemplateSection {
  headline: string
  subheadline?: string
  imageUrl?: string
  cta: {
    primary: TemplateCta
    secondary?: TemplateCta
  }
}

export interface TestimonialItem {
  name: string
  role: string
  avatarUrl: string
  text: string
}

export interface TestimonialsSection extends TemplateSection {
  items: TestimonialItem[]
}

export interface PartnerLogo {
  name: string
  logoUrl: string
}

export interface PartnersSection extends TemplateSection {
  logos: PartnerLogo[]
}

export interface ContactSection extends TemplateSection {
  email: string
  phone?: string
  formEnabled: boolean
}

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection extends TemplateSection {
  copyright: string
  links: FooterLink[]
}

export interface SocialLinks {
  instagram?: string
  linkedin?: string
  twitter?: string
  github?: string
}

export interface TemplateConfig {
  brand: {
    name: string
    logoUrl?: string
    tagline?: string
  }
  palette: TemplatePalette
  fonts: TemplateFonts
  sections: {
    hero?: HeroSection
    testimonials?: TestimonialsSection
    partners?: PartnersSection
    contact?: ContactSection
    footer?: FooterSection
    [key: string]: TemplateSection | undefined
  }
  seo?: {
    title?: string
    description?: string
    ogImageUrl?: string
    faviconUrl?: string
  }
  analytics?: {
    provider?: '' | 'ga4' | 'plausible'
    id?: string
  }
  social?: SocialLinks
  fomo?: {
    counterLabel?: string
    counterValue?: number
    countdownTarget?: string
  }
}

export interface TemplateManifestPreview {
  thumbnail?: string
  accent: string
}

export interface TemplateManifest {
  slug: string
  tier: Tier
  name: string
  description: string
  tags: string[]
  preview: TemplateManifestPreview
  animations: AnimationStrategy
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}
