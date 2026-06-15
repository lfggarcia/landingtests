'use client'

import { createContext, useContext } from 'react'
import type { TemplateConfig } from './types'

export const ComplexConfigContext = createContext<TemplateConfig | null>(null)

export function useComplexConfig(): TemplateConfig | null {
  return useContext(ComplexConfigContext)
}

/** Helper: safely read a string field from an unknown section record. */
export function cfgStr(section: unknown, key: string, fallback: string): string {
  if (section && typeof section === 'object' && !Array.isArray(section)) {
    const v = (section as Record<string, unknown>)[key]
    if (typeof v === 'string') return v
  }
  return fallback
}

/**
 * Helper: safely read an array from an unknown section record.
 * Un array vacío `[]` del config (el usuario vació la lista en el editor) se
 * respeta y se devuelve tal cual — el `fallback` solo aplica si la clave no
 * existe o no es array (snapshots viejos sin esa clave).
 */
export function cfgArr<T>(section: unknown, key: string, fallback: T[]): T[] {
  if (section && typeof section === 'object' && !Array.isArray(section)) {
    const v = (section as Record<string, unknown>)[key]
    if (Array.isArray(v)) return v as T[]
  }
  return fallback
}
