const EVENTIM_API = 'https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/api/event'

export default async function handler(req: any, res: any) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
    return res.status(200).end()
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { path = '' } = req.query
    const pathStr = Array.isArray(path) ? path.join('/') : (path || '')
    const targetUrl = `${EVENTIM_API}${pathStr ? '/' + pathStr : ''}${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`

    const response = await fetch(targetUrl, {
      headers: { 'Accept': 'application/json' },
    })

    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Content-Type', 'application/json')
    res.status(response.status).json(data)
  } catch (error: any) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(502).json({ error: error.message || 'Proxy error' })
  }
}
