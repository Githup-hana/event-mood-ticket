const EVENTIM_API = 'https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/api/event'

export default async function handler(event: any, context: any) {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
      },
    }
  }

  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    // Extract path from the request - Netlify functions receive the full path in path property
    const path = event.path?.replace('/.netlify/functions/proxy', '') || ''
    const queryString = event.rawQuery || ''
    const targetUrl = `${EVENTIM_API}${path}${queryString ? '?' + queryString : ''}`

    console.log('Proxy request to:', targetUrl)

    const response = await fetch(targetUrl, {
      headers: { 'Accept': 'application/json' },
    })

    const data = await response.json()

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  } catch (error: any) {
    console.error('Proxy error:', error)
    return {
      statusCode: 502,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: error.message || 'Proxy error' }),
    }
  }
}
