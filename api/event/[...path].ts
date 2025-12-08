export const config = { runtime: 'edge' }

const TARGET_BASE = 'https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/api/event'

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
  'Access-Control-Max-Age': '86400',
}

export default async function handler(req: Request, ) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }

  if (req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405, headers: CORS_HEADERS })
  }

  const url = new URL(req.url)
  const pathParts = url.pathname.split('/').slice(3) // /api/event/(...)
  const suffix = pathParts.join('/')
  const targetUrl = `${TARGET_BASE}${suffix ? '/' + suffix : ''}${url.search}`

  try {
    const upstream = await fetch(targetUrl, {
      headers: { Accept: 'application/json' },
    })

    const headers = new Headers(upstream.headers)
    headers.set('Access-Control-Allow-Origin', req.headers.get('origin') || '*')
    headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
    headers.set('Access-Control-Max-Age', '86400')

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers,
    })
  } catch (err: any) {
    const message = err?.message || 'Upstream fetch failed'
    return new Response(message, { status: 502, headers: CORS_HEADERS })
  }
}
