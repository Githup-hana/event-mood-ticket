// Production API endpoint
const PROD_API = 'https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/api/event'

function getApiBase(): string {
  // Development: use Vite proxy (configured in vite.config.ts)
  // Production: use absolute URL (Eventim API supports CORS for this endpoint)
  return import.meta.env.DEV ? '/api/event' : PROD_API
}

export async function fetchEvents(): Promise<any[]> {
  const url = getApiBase()
  const res = await fetch(url, { 
    headers: { Accept: 'application/json' }
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
  }
  return await res.json()
}

export async function fetchEventById(id: string): Promise<any> {
  const url = `${getApiBase()}/${encodeURIComponent(id)}`
  const res = await fetch(url, { 
    headers: { Accept: 'application/json' }
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch event ${id}: ${res.status} ${res.statusText}`)
  }
  return await res.json()
}
