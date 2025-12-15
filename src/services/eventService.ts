
const PROD_API = '/api/proxy'

function getApiBase(): string {

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
  const base = getApiBase()
  // Use query parameter for the ID in production (proxy expects ?path=id)
  const url = import.meta.env.DEV 
    ? `${base}/${encodeURIComponent(id)}`
    : `${base}?path=${encodeURIComponent(id)}`
  
  const res = await fetch(url, { 
    headers: { Accept: 'application/json' }
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch event ${id}: ${res.status} ${res.statusText}`)
  }
  return await res.json()
}
