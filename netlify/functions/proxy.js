const EVENTIM_API = 'https://www.eventim-light.com/de/a/5da03c56503ca200015df6cb/api/event'

exports.handler = async (event, context) => {
  console.log('=== PROXY DEBUG ===')
  console.log('event.path:', event.path)
  console.log('event.queryStringParameters:', event.queryStringParameters)
  console.log('event.rawQuery:', event.rawQuery)
  console.log('event.httpMethod:', event.httpMethod)
  
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
    // Build URL - proxy just passes through to Eventim API
    // If there's a query param 'path', append it
    const queryParams = event.queryStringParameters || {}
    const pathParam = queryParams.path || ''
    
    let targetUrl = EVENTIM_API
    if (pathParam) {
      targetUrl = `${EVENTIM_API}/${pathParam}`
    }
    
    // Include other query params (exclude 'path')
    const otherParams = new URLSearchParams()
    for (const [key, value] of Object.entries(queryParams)) {
      if (key !== 'path' && value) {
        otherParams.append(key, value as string)
      }
    }
    if (otherParams.toString()) {
      targetUrl = `${targetUrl}?${otherParams.toString()}`
    }

    console.log('Fetching from Eventim:', targetUrl)

    const response = await fetch(targetUrl)
    const data = await response.json()

    console.log('Success:', data)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.error('Proxy error:', error)
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message || 'Proxy error' }),
    }
  }
}
