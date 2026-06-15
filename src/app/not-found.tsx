import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-wide opacity-60">Nativa Press Co.</p>
      <h1 className="text-5xl font-bold">404</h1>
      <p className="max-w-md text-base opacity-70">La página que buscas no existe o fue movida.</p>
      <Link href="/" className="mt-2 rounded-md border border-current/20 px-5 py-2 text-sm font-medium">
        Volver al inicio
      </Link>
    </main>
  )
}
