import type { Metadata } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({ subsets: ['latin'], variable: '--font-barlow-condensed', weight: ['400', '600', '700', '800', '900'], display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: "Nativa Press Co.",
  description: "Bebidas funcionales de temporada para cadenas premium y foodservice",
}

const fontVars = [barlowCondensed.variable, inter.variable].join(' ')

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontVars}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
