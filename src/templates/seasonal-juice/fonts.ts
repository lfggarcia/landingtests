import { Barlow_Condensed, Inter } from 'next/font/google'

const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], variable: '--font-barlow-condensed', weight: ['400', '600', '700', '800', '900'], display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const templateFontVars = [barlowCondensed.variable, inter.variable].join(' ')
