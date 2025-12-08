const EVENTIM_API = 'https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/api/event'

export async function handler(event: any) {
  const method = event.httpMethod

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    }
  }

  // Only allow GET
  if (method !== 'GET') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    // The path will be empty for base /api/event and contain /id for /api/event/id
    const path = event.path?.replace(/^\/\.netlify\/functions\/proxy\/?/, '') || ''
    const queryString = event.rawQuery || ''
    
    let targetUrl = EVENTIM_API
    if (path) {
      targetUrl = `${EVENTIM_API}/${path}`
    }
    if (queryString) {
      targetUrl = `${targetUrl}?${queryString}`
    }

    const response = await fetch(targetUrl)
    const data = await response.json()

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  } catch (error: any) {
    console.error('Proxy error:', error)
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message }),
    }
  }
}
