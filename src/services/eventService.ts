export async function fetchEvents(): Promise<any[]> {
  const base = (import.meta.env.VITE_API_URL ?? '/api/event').replace(/\/$/, '')
  const res = await fetch(base, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

export async function fetchEventById(id: string): Promise<any> {
  const base = (import.meta.env.VITE_API_URL ?? '/api/event').replace(/\/$/, '')
  const res = await fetch(`${base}/${encodeURIComponent(id)}`, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}
