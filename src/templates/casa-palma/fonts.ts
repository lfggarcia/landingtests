import { Fraunces, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', style: ['normal', 'italic'], weight: ['300', '700'], display: 'swap' })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans', display: 'swap' })
const dmMono = DM_Mono({ subsets: ['latin'], variable: '--font-dm-mono', weight: ['400', '500'], display: 'swap' })

export const templateFontVars = [fraunces.variable, plusJakartaSans.variable, dmMono.variable].join(' ')
