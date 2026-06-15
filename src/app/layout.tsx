import type { Metadata } from 'next'
import { DM_Mono, Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const dmMono = DM_Mono({ subsets: ['latin'], variable: '--font-dm-mono', weight: ['400', '500'], display: 'swap' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', weight: ['300', '700'], display: 'swap' })
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta-sans', display: 'swap' })

export const metadata: Metadata = {
  title: "Casa Palma",
  description: "Oaxaca no se explica. Se vive.",
}

const fontVars = [dmMono.variable, fraunces.variable, plusJakartaSans.variable].join(' ')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontVars}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
