import { BookSearchResult } from '@/types'

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes'

export interface GoogleBooksResponse {
  items?: {
    id: string
    volumeInfo: {
      title: string
      authors?: string[]
      publishedDate?: string
      description?: string
      imageLinks?: {
        thumbnail?: string
        small?: string
        medium?: string
        large?: string
      }
      industryIdentifiers?: Array<{
        type: string
        identifier: string
      }>
      pageCount?: number
      categories?: string[]
      publisher?: string
    }
  }[]
  totalItems: number
}

export async function searchBooks(query: string, maxResults = 10): Promise<BookSearchResult[]> {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
  
  if (!apiKey) {
    console.warn('Google Books API key not found')
    return []
  }

  try {
    const url = new URL(GOOGLE_BOOKS_API_URL)
    url.searchParams.set('q', query)
    url.searchParams.set('maxResults', maxResults.toString())
    url.searchParams.set('key', apiKey)

    const response = await fetch(url.toString())
    
    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`)
    }

    const data: GoogleBooksResponse = await response.json()

    if (!data.items) {
      return []
    }

    return data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      authors: item.volumeInfo.authors || ['Unknown Author'],
      publishedDate: item.volumeInfo.publishedDate,
      description: item.volumeInfo.description,
      imageLinks: item.volumeInfo.imageLinks,
      industryIdentifiers: item.volumeInfo.industryIdentifiers,
      pageCount: item.volumeInfo.pageCount,
      categories: item.volumeInfo.categories,
      publisher: item.volumeInfo.publisher,
    }))
  } catch (error) {
    console.error('Error searching books:', error)
    throw new Error('Failed to search books')
  }
}

export async function getBookByISBN(isbn: string): Promise<BookSearchResult | null> {
  const results = await searchBooks(`isbn:${isbn}`, 1)
  return results[0] || null
}

export async function getBookById(googleBooksId: string): Promise<BookSearchResult | null> {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
  
  if (!apiKey) {
    console.warn('Google Books API key not found')
    return null
  }

  try {
    const url = `${GOOGLE_BOOKS_API_URL}/${googleBooksId}?key=${apiKey}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status}`)
    }

    const item = await response.json()

    return {
      id: item.id,
      title: item.volumeInfo.title || 'Unknown Title',
      authors: item.volumeInfo.authors || ['Unknown Author'],
      publishedDate: item.volumeInfo.publishedDate,
      description: item.volumeInfo.description,
      imageLinks: item.volumeInfo.imageLinks,
      industryIdentifiers: item.volumeInfo.industryIdentifiers,
      pageCount: item.volumeInfo.pageCount,
      categories: item.volumeInfo.categories,
      publisher: item.volumeInfo.publisher,
    }
  } catch (error) {
    console.error('Error fetching book by ID:', error)
    return null
  }
} 