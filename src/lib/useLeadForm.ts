'use client'

import { useState } from 'react'
import { submitLead, type LeadFormConfig } from './leadForm'

export type LeadFormStatus = 'idle' | 'sending' | 'sent' | 'error'

/** Estado + envío de un formulario de lead (subscribe/reserva/contacto) hacia el proveedor configurado. */
export function useLeadForm(lead: LeadFormConfig | undefined) {
  const [status, setStatus] = useState<LeadFormStatus>('idle')

  async function submit(data: Record<string, string>) {
    setStatus('sending')
    const result = await submitLead(lead, data)
    // Sin proveedor configurado = modo demo, se muestra confirmación igual.
    setStatus(result.ok || result.error === 'not-configured' ? 'sent' : 'error')
  }

  return { status, submit }
}
