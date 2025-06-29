"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Search, ChevronRight, BookOpen } from "lucide-react"
import { ContributionGrid } from "@/components/features/analytics/contribution-grid"
import { Navigation } from "@/components/layout/navigation"
import { QuickAddBook } from "@/components/features/book-logging/quick-add-book"
import { RecentBooksCarousel } from "@/components/features/book-logging/recent-books-carousel"
import { getGreeting } from "@/lib/utils"
import { useRecentBooks } from "@/hooks/useRecentBooks"
import { useState } from "react"

export default function HomePage() {
  const greeting = getGreeting()
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)
  const [quickAddMode, setQuickAddMode] = useState<'scan' | 'search' | 'select'>('scan')
  const { books: recentBooks, loading: booksLoading } = useRecentBooks()

  return (
    <div className="min-h-screen bg-cream-dark">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-2">{greeting}, Kayu!🌙</h1>
          <p className="text-xl text-gray-600">Nile is on a reading roll</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - What did you read tonight */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg mb-8 rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-charcoal">What did you read tonight?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="flex-1 h-14 bg-sage hover:bg-sage-dark text-white text-lg font-medium"
                    size="lg"
                    onClick={() => {
                      setQuickAddMode('scan')
                      setIsQuickAddOpen(true)
                    }}
                  >
                    <Camera className="mr-3 h-5 w-5" />
                    Scan book
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 h-14 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white text-lg"
                    size="lg"
                    onClick={() => {
                      setQuickAddMode('search')
                      setIsQuickAddOpen(true)
                    }}
                  >
                    <Search className="mr-3 h-5 w-5" />
                    Search by title
                  </Button>
                </div>

                <RecentBooksCarousel 
                  onBookClick={(book) => {
                    setQuickAddMode('select')
                    setIsQuickAddOpen(true)
                  }}
                  onAddBookClick={() => {
                    setQuickAddMode('scan')
                    setIsQuickAddOpen(true)
                  }}
                />
              </CardContent>
            </Card>

            {/* Reading Streak Calendar */}
            <Card className="bg-cream shadow-lg rounded-xl">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-sage" />
                  <CardTitle className="text-xl font-semibold text-charcoal">Reading Streak</CardTitle>
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-sage mb-1">47</div>
                  <div className="text-gray-600">day streak 🔥</div>
                </div>
              </CardHeader>
              <CardContent>
                <ContributionGrid />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent reads */}
            <div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">Recent reads</h3>
              <div className="space-y-3">
                {booksLoading ? (
                  // Loading state
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-12 bg-gray-200 rounded shadow-sm animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))
                ) : (
                  // Actual books
                  recentBooks.map((book, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <img
                          src={book.imageUrl || `/api/placeholder?height=50&width=40&text=${encodeURIComponent(book.title.split(' ')[0])}`}
                          alt={book.title}
                          className="w-10 h-12 rounded shadow-sm object-cover"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            const target = e.target as HTMLImageElement
                            target.src = `/api/placeholder?height=50&width=40&text=${encodeURIComponent(book.title.split(' ')[0])}`
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="text-charcoal font-medium">{book.title}</span>
                          {book.authors && book.authors.length > 0 && (
                            <span className="text-gray-500 text-sm">{book.authors[0]}</span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quick Add Book Modal/Drawer */}
      <QuickAddBook
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        initialMode={quickAddMode}
      />
    </div>
  )
} 