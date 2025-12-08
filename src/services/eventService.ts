// Netlify serverless proxy
const PROD_API = '/.netlify/functions/proxy'
// Fallback direct API (in case proxy fails)
const FALLBACK_API = 'https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/api/event'

function getApiBase(): string {
  // Development: use Vite proxy (configured in vite.config.ts)
  // Production: use Netlify serverless function
  return import.meta.env.DEV ? '/api/event' : PROD_API
}

export async function fetchEvents(): Promise<any[]> {
  const url = getApiBase()
  try {
    const res = await fetch(url, { 
      headers: { Accept: 'application/json' }
    })
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }
    return await res.json()
  } catch (error) {
    // Fallback to direct API if proxy fails
    if (!import.meta.env.DEV && url === PROD_API) {
      console.warn('Proxy failed, trying direct API:', error)
      const res = await fetch(FALLBACK_API, { 
        headers: { Accept: 'application/json' }
      })
      if (!res.ok) {
        throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
      }
      return await res.json()
    }
    throw error
  }
}

export async function fetchEventById(id: string): Promise<any> {
  const url = `${getApiBase()}/${encodeURIComponent(id)}`
  try {
    const res = await fetch(url, { 
      headers: { Accept: 'application/json' }
    })
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }
    return await res.json()
  } catch (error) {
    // Fallback to direct API if proxy fails
    if (!import.meta.env.DEV && getApiBase() === PROD_API) {
      console.warn('Proxy failed, trying direct API:', error)
      const fallbackUrl = `${FALLBACK_API}/${encodeURIComponent(id)}`
      const res = await fetch(fallbackUrl, { 
        headers: { Accept: 'application/json' }
      })
      if (!res.ok) {
        throw new Error(`Failed to fetch event ${id}: ${res.status} ${res.statusText}`)
      }
      return await res.json()
    }
    throw error
  }
}
