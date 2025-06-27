"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Search, Book, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem, fadeIn } from '@/lib/animations'

interface BookSearchResult {
  id: string
  title: string
  author: string
  isbn?: string
  coverUrl?: string
  publishedYear?: number
  description?: string
}

interface BookSearchProps {
  onBookSelect: (book: BookSearchResult) => void
  onBack?: () => void
  onClose?: () => void
}

// Mock data for development - will be replaced with real API
const mockBooks: BookSearchResult[] = [
  {
    id: '1',
    title: 'The Very Hungry Caterpillar',
    author: 'Eric Carle',
    isbn: '9780399213014',
    publishedYear: 1994,
    description: 'A classic children\'s book about a caterpillar\'s transformation'
  },
  {
    id: '2',
    title: 'Goodnight Moon',
    author: 'Margaret Wise Brown',
    isbn: '9780064430173',
    publishedYear: 1947,
    description: 'A beloved bedtime story for children'
  },
  {
    id: '3',
    title: 'Brown Bear, Brown Bear, What Do You See?',
    author: 'Bill Martin Jr.',
    isbn: '9780805047905',
    publishedYear: 1996,
    description: 'A rhythmic tale featuring animals and colors'
  },
  {
    id: '4',
    title: 'The Gruffalo',
    author: 'Julia Donaldson',
    isbn: '9780142403874',
    publishedYear: 1999,
    description: 'A clever mouse outwits forest predators'
  },
  {
    id: '5',
    title: 'Where the Wild Things Are',
    author: 'Maurice Sendak',
    isbn: '9780060254926',
    publishedYear: 1963,
    description: 'Max\'s imaginative adventure to a land of wild creatures'
  },
  {
    id: '6',
    title: 'Green Eggs and Ham',
    author: 'Dr. Seuss',
    isbn: '9780394800165',
    publishedYear: 1960,
    description: 'Sam-I-Am tries to convince someone to try green eggs and ham'
  }
]

export function BookSearch({ onBookSelect, onBack, onClose }: BookSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Mock search function - simulate API delay
  const searchBooks = async (query: string): Promise<BookSearchResult[]> => {
    if (!query.trim()) return []
    
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const filtered = mockBooks.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    )
    
    setIsLoading(false)
    return filtered
  }

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        const results = await searchBooks(searchQuery)
        setSearchResults(results)
        setShowResults(true)
      } else {
        setSearchResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  const handleBookSelect = (book: BookSearchResult) => {
    onBookSelect(book)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowResults(false)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        {onBack && (
          <Button variant="ghost" onClick={onBack} size="sm">
            ← Back
          </Button>
        )}
        <h2 className="text-lg font-semibold text-charcoal">Search Books</h2>
        {onClose && (
          <Button variant="ghost" onClick={onClose} size="sm">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Input */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for book title or author..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent text-base"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-sage" />
            <span className="ml-2 text-sm text-gray-600">Searching...</span>
          </div>
        )}

        {/* Search Results */}
        <AnimatePresence>
          {showResults && !isLoading && (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              {searchResults.length > 0 ? (
                <>
                  <p className="text-sm text-gray-600">
                    Found {searchResults.length} book{searchResults.length !== 1 ? 's' : ''}
                  </p>
                  {searchResults.map((book) => (
                    <motion.div
                      key={book.id}
                      variants={staggerItem}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleBookSelect(book)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-16 bg-gray-100 rounded border flex items-center justify-center">
                            <Book className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-charcoal truncate">
                            {book.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            by {book.author}
                          </p>
                          {book.publishedYear && (
                            <p className="text-xs text-gray-500 mt-1">
                              Published {book.publishedYear}
                            </p>
                          )}
                          {book.description && (
                            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                              {book.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                <motion.div
                  variants={fadeIn}
                  className="text-center py-8 text-gray-500"
                >
                  <Book className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No books found for "{searchQuery}"</p>
                  <p className="text-xs mt-1">Try searching with different keywords</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!showResults && !isLoading && !searchQuery && (
          <div className="text-center text-gray-500 py-8">
            <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Start typing to search for books...</p>
            <p className="text-xs mt-1">Search by title or author name</p>
          </div>
        )}
      </div>
    </div>
  )
} 