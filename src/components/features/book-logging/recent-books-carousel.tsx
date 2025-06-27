"use client"

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useReadAgainBooks, ReadAgainBook } from '@/hooks/useReadAgainBooks'

interface RecentBooksCarouselProps {
  onBookClick?: (book: ReadAgainBook) => void
  onAddBookClick?: () => void
}

export function RecentBooksCarousel({ 
  onBookClick, 
  onAddBookClick 
}: RecentBooksCarouselProps) {
  const { books, loading } = useReadAgainBooks()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-charcoal">Read Again...</h2>
        </div>
      </div>

      <div className="flex space-x-4 overflow-x-auto">
        {loading ? (
          // Loading state with same exact sizing
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-32">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg shadow-sm border animate-pulse"></div>
              <div className="mt-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          ))
        ) : (
          books.map((book: ReadAgainBook) => (
            <div key={book.id} className="flex-shrink-0 w-32 cursor-pointer" onClick={() => onBookClick?.(book)}>
              <div className="aspect-[3/4] bg-white rounded-lg shadow-sm border">
                <img 
                  src={book.coverUrl || `/api/placeholder?height=120&width=80&text=${encodeURIComponent(book.title.split(' ')[0])}`} 
                  alt={book.title} 
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    const target = e.target as HTMLImageElement
                    target.src = `/api/placeholder?height=120&width=80&text=${encodeURIComponent(book.title.split(' ')[0])}`
                  }}
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-charcoal line-clamp-2">{book.title}</h3>
                <p className="text-xs text-gray-600">{book.childName} • {book.lastRead}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
} 