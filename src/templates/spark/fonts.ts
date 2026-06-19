import { Bebas_Neue, Inter } from 'next/font/google'

const bebasNeue = Bebas_Neue({ subsets: ['latin'], variable: '--font-bebas-neue', weight: ['400'], display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const templateFontVars = [bebasNeue.variable, inter.variable].join(' ')
