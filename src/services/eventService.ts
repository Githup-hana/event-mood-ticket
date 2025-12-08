const DEFAULT_PROD_API = 'https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/api/event'

function getApiBase(): string {
  const envValue = import.meta.env.VITE_API_URL?.toString().trim() ?? ''
  const normalized = envValue.replace(/\/$/, '')
  // Dev: keep proxy. Prod: always use the absolute Eventim URL with CORS proxy
  if (import.meta.env.DEV) return normalized || '/api/event'
  // In production, use Eventim directly (CORS will be handled by the API itself)
  return DEFAULT_PROD_API
}

export async function fetchEvents(): Promise<any[]> {
  const base = getApiBase()
  const res = await fetch(base, { 
    headers: { Accept: 'application/json' },
    mode: 'cors',
    credentials: 'omit'
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}

export async function fetchEventById(id: string): Promise<any> {
  const base = getApiBase()
  const res = await fetch(`${base}/${encodeURIComponent(id)}`, { 
    headers: { Accept: 'application/json' },
    mode: 'cors',
    credentials: 'omit'
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return await res.json()
}
