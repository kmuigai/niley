import { useState, useEffect } from 'react'
import { searchBooks } from '@/lib/api/google-books'
import { getRecommendedBooks, BookReadingHistory } from '@/lib/recommendation-algorithm'

export interface ReadAgainBook {
  id: string
  title: string
  author: string
  coverUrl?: string
  lastRead: string
  childName: string
  reaction: string
  readCount: number
  searchQuery: string
  googleBooksId?: string
  recommendationScore?: number
}

// Helper function to convert date to human-readable format
function formatLastRead(date: Date): string {
  const now = new Date()
  const diffTime = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 60) return '1 month ago'
  return `${Math.floor(diffDays / 30)} months ago`
}

// Helper function to convert engagement rating to emoji
function getReactionEmoji(engagementRating: number): string {
  switch (engagementRating) {
    case 5: return '😍'
    case 4: return '😊'
    case 3: return '🙂'
    case 2: return '😐'
    case 1: return '😕'
    default: return '🙂'
  }
}

// Transform algorithm results to ReadAgainBook format
function transformToReadAgainBooks(recommendedBooks: BookReadingHistory[]): Omit<ReadAgainBook, 'coverUrl' | 'googleBooksId'>[] {
  return recommendedBooks.map(book => ({
    id: book.bookId,
    title: book.title,
    author: book.author,
    searchQuery: book.searchQuery,
    lastRead: formatLastRead(book.lastReadDate),
    childName: 'Nile', // In real app, this would come from child profile
    reaction: getReactionEmoji(book.engagementRating),
    readCount: book.readCount
  }))
}

export function useReadAgainBooks() {
  const [books, setBooks] = useState<ReadAgainBook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSmartRecommendations() {
      try {
        setLoading(true)
        
        // Get smart recommendations from algorithm
        const recommendedBooks = getRecommendedBooks(4) // Get top 4 recommendations
        const transformedBooks = transformToReadAgainBooks(recommendedBooks)
        
        // Fetch real book images from Google Books API
        const booksWithImages = await Promise.all(
          transformedBooks.map(async (book) => {
            try {
              const searchResults = await searchBooks(book.searchQuery, 1)
              const result = searchResults[0]
              
              if (result) {
                return {
                  ...book,
                  coverUrl: result.imageLinks?.thumbnail || result.imageLinks?.small,
                  googleBooksId: result.id
                }
              }
              
              return {
                ...book,
                coverUrl: `/api/placeholder?height=120&width=80&text=${encodeURIComponent(book.title.split(' ')[0])}`
              }
            } catch (err) {
              console.warn(`Failed to fetch book: ${book.title}`, err)
              return {
                ...book,
                coverUrl: `/api/placeholder?height=120&width=80&text=${encodeURIComponent(book.title.split(' ')[0])}`
              }
            }
          })
        )
        
        setBooks(booksWithImages)
      } catch (err) {
        setError('Failed to fetch smart recommendations')
        console.error('Error fetching smart read again books:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSmartRecommendations()
  }, [])

  return { books, loading, error }
} 