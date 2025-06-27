import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const width = parseInt(searchParams.get('width') || '200')
  const height = parseInt(searchParams.get('height') || '300')
  const text = searchParams.get('text') || 'Placeholder'
  const bgColor = searchParams.get('bg') || '#f3f4f6'
  const textColor = searchParams.get('color') || '#6b7280'
  
  // Calculate font size based on dimensions
  const fontSize = Math.min(width, height) * 0.15
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}" stroke="#e5e7eb" stroke-width="1"/>
      <text 
        x="${width / 2}" 
        y="${height / 2}" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}" 
        text-anchor="middle" 
        dominant-baseline="middle" 
        fill="${textColor}"
        font-weight="500"
      >
        ${text}
      </text>
    </svg>
  `

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
} 