export type LeadFormProvider = '' | 'formspree' | 'web3forms' | 'getform' | 'custom'

export interface LeadFormConfig {
  provider?: string
  endpoint?: string
}

export interface LeadSubmitResult {
  ok: boolean
  error?: 'not-configured' | 'network' | `http-${number}`
}

/**
 * Envía los datos de un formulario (subscribe/reserva/contacto) al proveedor
 * configurado por el cliente. `endpoint` significa algo distinto por proveedor:
 * - formspree: form ID → POST a `https://formspree.io/f/{endpoint}`
 * - web3forms: access key → POST a `https://api.web3forms.com/submit` (+ `access_key`)
 * - getform: endpoint ID → POST a `https://getform.io/f/{endpoint}`
 * - custom: URL completa del endpoint propio del cliente
 * provider vacío o endpoint vacío = sin proveedor configurado (modo demo).
 */
export async function submitLead(
  lead: LeadFormConfig | undefined,
  data: Record<string, string>
): Promise<LeadSubmitResult> {
  const provider = (lead?.provider ?? '') as LeadFormProvider
  const endpoint = (lead?.endpoint ?? '').trim()
  if (!provider || !endpoint) return { ok: false, error: 'not-configured' }

  const body = new FormData()
  for (const [key, value] of Object.entries(data)) body.append(key, value)

  let url: string
  switch (provider) {
    case 'formspree':
      url = `https://formspree.io/f/${endpoint}`
      break
    case 'web3forms':
      url = 'https://api.web3forms.com/submit'
      body.append('access_key', endpoint)
      break
    case 'getform':
      url = `https://getform.io/f/${endpoint}`
      break
    case 'custom':
      url = endpoint
      break
    default:
      return { ok: false, error: 'not-configured' }
  }

  try {
    const res = await fetch(url, { method: 'POST', body, headers: { Accept: 'application/json' } })
    return res.ok ? { ok: true } : { ok: false, error: `http-${res.status}` }
  } catch {
    return { ok: false, error: 'network' }
  }
}
