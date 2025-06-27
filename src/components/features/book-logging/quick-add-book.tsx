"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { BookSearch } from './book-search'
import { ReadingSessionForm } from './reading-session-form'
import { useMobile } from '@/hooks/use-mobile'
import { Camera, Search, X, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { modalContent, drawerContent } from '@/lib/animations'

interface BookSearchResult {
  id: string
  title: string
  author: string
  isbn?: string
  coverUrl?: string
  publishedYear?: number
  description?: string
}

interface QuickAddBookProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'scan' | 'search' | 'select'
}

type BookLoggingStep = 'method' | 'scan' | 'search' | 'book-select' | 'session-form' | 'success'

export function QuickAddBook({ isOpen, onClose, initialMode }: QuickAddBookProps) {
  const isMobile = useMobile()
  const [currentStep, setCurrentStep] = useState<BookLoggingStep>(
    initialMode === 'scan' ? 'scan' :
    initialMode === 'search' ? 'search' :
    'method'
  )
  const [selectedBook, setSelectedBook] = useState<BookSearchResult | null>(null)

  const handleClose = () => {
    setCurrentStep('method')
    setSelectedBook(null)
    onClose()
  }

  const handleMethodSelect = (method: 'scan' | 'search') => {
    setCurrentStep(method)
  }

  const handleBookSelect = (book: BookSearchResult) => {
    setSelectedBook(book)
    setCurrentStep('book-select')
  }

  const handleSessionSubmit = (sessionData: any) => {
    // Here we would save the reading session data
    console.log('Session data:', { book: selectedBook, session: sessionData })
    setCurrentStep('success')
  }

  const handleBack = () => {
    if (currentStep === 'scan' || currentStep === 'search') {
      setCurrentStep('method')
    } else if (currentStep === 'book-select') {
      setCurrentStep('search')
    } else if (currentStep === 'session-form') {
      setCurrentStep('book-select')
    }
  }

  const content = (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {currentStep === 'method' && (
          <motion.div
            key="method"
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <BookOpen className="h-12 w-12 mx-auto text-sage" />
              <h2 className="text-xl font-semibold text-charcoal">
                Add a reading session
              </h2>
              <p className="text-gray-600">
                How would you like to find the book?
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => handleMethodSelect('scan')}
                className="w-full h-14 bg-sage hover:bg-sage-dark text-white text-lg font-medium gap-3"
                size="lg"
              >
                <Camera className="h-5 w-5" />
                Scan book barcode
              </Button>

              <Button
                onClick={() => handleMethodSelect('search')}
                variant="outline"
                className="w-full h-14 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg gap-3"
                size="lg"
              >
                <Search className="h-5 w-5" />
                Search by title
              </Button>
            </div>

            <div className="text-center">
              <Button variant="ghost" onClick={handleClose} className="text-gray-500">
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 'scan' && (
          <motion.div
            key="scan"
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={handleBack} size="sm">
                ← Back
              </Button>
              <h2 className="text-lg font-semibold text-charcoal">Scan Book</h2>
              <Button variant="ghost" onClick={handleClose} size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-center space-y-4">
              <div className="aspect-square max-w-sm mx-auto bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Camera className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-600">Camera view would appear here</p>
                  <p className="text-xs text-gray-500">Point camera at book barcode</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-sage hover:bg-sage-dark">
                  Start Scanning
                </Button>
                <Button variant="outline" className="w-full" onClick={() => setCurrentStep('search')}>
                  Search manually instead
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'search' && (
          <motion.div
            key="search"
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <BookSearch
              onBookSelect={handleBookSelect}
              onBack={handleBack}
              onClose={handleClose}
            />
          </motion.div>
        )}

        {currentStep === 'book-select' && selectedBook && (
          <motion.div
            key="book-select"
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={handleBack} size="sm">
                ← Back
              </Button>
              <h2 className="text-lg font-semibold text-charcoal">Confirm Book</h2>
              <Button variant="ghost" onClick={handleClose} size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Selected Book Card */}
              <div className="bg-cream/30 border border-sage/20 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={`/api/placeholder?height=120&width=80&text=${encodeURIComponent(selectedBook.title.split(' ')[0])}`}
                      alt={selectedBook.title}
                      className="w-20 h-28 rounded border shadow-sm"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-charcoal mb-2">
                      {selectedBook.title}
                    </h3>
                    <p className="text-base text-gray-600 mb-1">
                      by {selectedBook.author}
                    </p>
                    {selectedBook.publishedYear && (
                      <p className="text-sm text-gray-500 mb-2">
                        Published {selectedBook.publishedYear}
                      </p>
                    )}
                    {selectedBook.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedBook.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Confirmation Message */}
              <div className="text-center space-y-2">
                <p className="text-base text-charcoal">
                  Is this the book you want to log?
                </p>
                <p className="text-sm text-gray-600">
                  Next, you'll add reading session details
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => setCurrentStep('session-form')}
                  className="w-full h-12 bg-sage hover:bg-sage-dark text-white text-lg font-medium"
                  size="lg"
                >
                  Yes, continue with this book
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep('search')}
                  className="w-full"
                >
                  No, search for a different book
                </Button>
              </div>
                         </div>
           </motion.div>
         )}

        {currentStep === 'session-form' && (
          <motion.div
            key="session-form"
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ReadingSessionForm
              onSubmit={handleSessionSubmit}
              onBack={handleBack}
              onClose={handleClose}
            />
          </motion.div>
        )}

        {currentStep === 'success' && (
          <motion.div
            key="success"
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-sage rounded-full flex items-center justify-center">
                <div className="text-2xl">🎉</div>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-charcoal">
                  Reading session logged!
                </h2>
                <p className="text-gray-600">
                  Great job reading together! Your session has been saved.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleClose}
                className="w-full h-12 bg-sage hover:bg-sage-dark text-white text-lg font-medium"
                size="lg"
              >
                Done
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep('method')
                  setSelectedBook(null)
                }}
                className="w-full"
              >
                Log another book
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="pb-4">
            <DrawerTitle className="sr-only">Add Reading Session</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-8">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Add Reading Session</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
} 