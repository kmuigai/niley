import { useState, useEffect } from 'react'
import { searchBooks } from '@/lib/api/google-books'
import { BookSearchResult } from '@/types'

export interface RecentBook {
  title: string
  searchQuery: string
  imageUrl?: string
  id?: string
  authors?: string[]
}

const RECENT_BOOKS: Omit<RecentBook, 'imageUrl' | 'id' | 'authors'>[] = [
  { title: 'Panda Activity Book', searchQuery: 'Panda Activity Book children' },
  { title: 'The Very Hungry Caterpillar', searchQuery: 'The Very Hungry Caterpillar Eric Carle' },
  { title: 'Goodnight Moon', searchQuery: 'Goodnight Moon Margaret Wise Brown' },
  { title: 'Brown Bear, Brown Bear', searchQuery: 'Brown Bear Brown Bear What Do You See Bill Martin' },
  { title: 'The Gruffalo', searchQuery: 'The Gruffalo Julia Donaldson' }
]

export function useRecentBooks() {
  const [books, setBooks] = useState<RecentBook[]>(RECENT_BOOKS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBookImages() {
      try {
        setLoading(true)
        const booksWithImages = await Promise.all(
          RECENT_BOOKS.map(async (book) => {
            try {
              const searchResults = await searchBooks(book.searchQuery, 1)
              const result = searchResults[0]
              
              if (result) {
                return {
                  ...book,
                  imageUrl: result.imageLinks?.thumbnail || result.imageLinks?.small,
                  id: result.id,
                  authors: result.authors
                }
              }
              
              return book
            } catch (err) {
              console.warn(`Failed to fetch book: ${book.title}`, err)
              return book
            }
          })
        )
        
        setBooks(booksWithImages)
      } catch (err) {
        setError('Failed to fetch book images')
        console.error('Error fetching recent books:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookImages()
  }, [])

  return { books, loading, error }
} 