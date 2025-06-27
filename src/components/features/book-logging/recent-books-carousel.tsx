"use client"

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface RecentBook {
  id: string
  title: string
  author: string
  coverUrl: string
  lastRead: string
  childName: string
  reaction: string
  readCount: number
}

interface RecentBooksCarouselProps {
  books?: RecentBook[]
  onBookClick?: (book: RecentBook) => void
  onAddBookClick?: () => void
}

const mockRecentBooks: RecentBook[] = [
  {
    id: '1',
    title: 'The Very Hungry Caterpillar',
    author: 'Eric Carle',
    coverUrl: '/api/placeholder?height=120&width=80&text=Caterpillar',
    lastRead: '2 days ago',
    childName: 'Nile',
    reaction: '😍',
    readCount: 12
  },
  {
    id: '2',
    title: 'Goodnight Moon',
    author: 'Margaret Wise Brown',
    coverUrl: '/api/placeholder?height=120&width=80&text=Goodnight',
    lastRead: '3 days ago',
    childName: 'Emma',
    reaction: '😴',
    readCount: 8
  }
]

export function RecentBooksCarousel({ 
  books = mockRecentBooks, 
  onBookClick, 
  onAddBookClick 
}: RecentBooksCarouselProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-charcoal">Recent Books</h2>
          <p className="text-sm text-gray-600">Books you've read recently</p>
        </div>
      </div>

      <div className="flex space-x-4 overflow-x-auto">
        {books.map((book) => (
          <div key={book.id} className="flex-shrink-0 w-32 cursor-pointer">
            <div className="aspect-[3/4] bg-white rounded-lg shadow-sm border">
              <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium text-charcoal line-clamp-2">{book.title}</h3>
              <p className="text-xs text-gray-600">{book.childName} • {book.lastRead}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 