// Netlify serverless proxy
const PROD_API = '/.netlify/functions/proxy'

function getApiBase(): string {
  // Development: use Vite proxy (configured in vite.config.ts)
  // Production: use Netlify serverless function
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
