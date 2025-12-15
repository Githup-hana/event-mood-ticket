// api/proxy.js
const EVENTIM_API = 'https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/api/event'

export default async function handler(req, res) {
  const method = req.method

  // CORS Preflight
  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (method !== 'GET') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const pathParam = req.query.path || ''
    let targetUrl = EVENTIM_API
    if (pathParam) targetUrl = `${EVENTIM_API}/${pathParam}`

    const otherParams = new URLSearchParams()
    for (const [key, value] of Object.entries(req.query)) {
      if (key !== 'path' && value) otherParams.append(key, value)
    }
    if (otherParams.toString()) targetUrl = `${targetUrl}?${otherParams.toString()}`

    const start = Date.now()
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.eventim-light.com/',
        'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8'
      }
    })
    console.log('Fetch Dauer (ms):', Date.now() - start)   // <-- Log direkt nach fetch

    // Prüfen, ob die API OK ist
    if (!response.ok) {
      const errText = await response.text().catch(() => '')
      console.log(`API returned status ${response.status} for URL: ${targetUrl}`)
      console.log('Upstream response body:', errText)
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Cache-Control', 'no-store')
      return res.status(response.status).json({ error: `Eventim API error ${response.status}`, details: errText })
    }

    const data = await response.json()
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json(data)
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    console.error('Proxy Fehler:', error)   // <-- auch hier loggen
    return res.status(502).json({ error: error.message || 'Proxy error' })
  }
}
