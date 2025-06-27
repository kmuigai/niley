import { useState, useEffect } from 'react'
import { searchBooks } from '@/lib/api/google-books'

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
}

const READ_AGAIN_BOOKS: Omit<ReadAgainBook, 'coverUrl' | 'googleBooksId'>[] = [
  {
    id: '1',
    title: 'The Very Hungry Caterpillar',
    author: 'Eric Carle',
    searchQuery: 'The Very Hungry Caterpillar Eric Carle',
    lastRead: '2 days ago',
    childName: 'Nile',
    reaction: '😍',
    readCount: 12
  },
  {
    id: '2',
    title: 'Goodnight Moon',
    author: 'Margaret Wise Brown',
    searchQuery: 'Goodnight Moon Margaret Wise Brown',
    lastRead: '3 days ago',
    childName: 'Emma',
    reaction: '😴',
    readCount: 8
  },
  {
    id: '3',
    title: 'Where the Wild Things Are',
    author: 'Maurice Sendak',
    searchQuery: 'Where the Wild Things Are Maurice Sendak',
    lastRead: '5 days ago',
    childName: 'Nile',
    reaction: '🤔',
    readCount: 6
  },
  {
    id: '4',
    title: 'Green Eggs and Ham',
    author: 'Dr. Seuss',
    searchQuery: 'Green Eggs and Ham Dr. Seuss',
    lastRead: '1 week ago',
    childName: 'Emma',
    reaction: '😂',
    readCount: 15
  }
]

export function useReadAgainBooks() {
  const [books, setBooks] = useState<ReadAgainBook[]>(READ_AGAIN_BOOKS as ReadAgainBook[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBookImages() {
      try {
        setLoading(true)
        const booksWithImages = await Promise.all(
          READ_AGAIN_BOOKS.map(async (book) => {
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
        setError('Failed to fetch book images')
        console.error('Error fetching read again books:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookImages()
  }, [])

  return { books, loading, error }
} 