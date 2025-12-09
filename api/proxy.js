const EVENTIM_API = 'https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/api/event'

export default async function handler(req, res) {
  const method = req.method

  // CORS preflight
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
    // Pfad aus query
    const pathParam = req.query.path || ''
    let targetUrl = EVENTIM_API
    if (pathParam) {
      targetUrl = `${EVENTIM_API}/${pathParam}`
    }

    // Andere Query-Parameter anhängen
    const otherParams = new URLSearchParams()
    for (const [key, value] of Object.entries(req.query)) {
      if (key !== 'path' && value) otherParams.append(key, value)
    }
    if (otherParams.toString()) {
      targetUrl = `${targetUrl}?${otherParams.toString()}`
    }

    const response = await fetch(targetUrl)
    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).json(data)
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(502).json({ error: error.message || 'Proxy error' })
  }
}
