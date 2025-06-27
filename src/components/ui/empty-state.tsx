"use client"

import React from 'react'
import { BookOpen, Search, Plus, Heart, User, Calendar } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent } from './card'

interface EmptyStateProps {
  title?: string
  description?: string
  type?: 'books' | 'search' | 'children' | 'sessions' | 'favorites' | 'general'
  actionLabel?: string
  onAction?: () => void
  showAction?: boolean
  className?: string
  illustration?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  type = 'general',
  actionLabel,
  onAction,
  showAction = true,
  className = '',
  illustration
}: EmptyStateProps) {
  const getEmptyContent = () => {
    switch (type) {
      case 'books':
        return {
          title: title || 'No books yet',
          description: description || 'Start building your family\'s reading library by adding your first book.',
          actionLabel: actionLabel || 'Add Your First Book',
          icon: <BookOpen className="h-16 w-16 text-sage/40" />
        }
      case 'search':
        return {
          title: title || 'No results found',
          description: description || 'We couldn\'t find any books matching your search. Try different keywords.',
          actionLabel: actionLabel || 'Clear Search',
          icon: <Search className="h-16 w-16 text-sage/40" />
        }
      case 'children':
        return {
          title: title || 'No children added',
          description: description || 'Add your children\'s profiles to start tracking their reading journey.',
          actionLabel: actionLabel || 'Add Child Profile',
          icon: <User className="h-16 w-16 text-sage/40" />
        }
      case 'sessions':
        return {
          title: title || 'No reading sessions',
          description: description || 'Start logging reading sessions to track your family\'s progress.',
          actionLabel: actionLabel || 'Log First Session',
          icon: <Calendar className="h-16 w-16 text-sage/40" />
        }
      case 'favorites':
        return {
          title: title || 'No favorites yet',
          description: description || 'Mark books as favorites during reading sessions to see them here.',
          actionLabel: actionLabel || 'Explore Books',
          icon: <Heart className="h-16 w-16 text-sage/40" />
        }
      default:
        return {
          title: title || 'Nothing here yet',
          description: description || 'Get started by adding some content.',
          actionLabel: actionLabel || 'Get Started',
          icon: <Plus className="h-16 w-16 text-sage/40" />
        }
    }
  }

  const emptyContent = getEmptyContent()

  return (
    <Card className={`border-sage/10 bg-cream/30 ${className}`}>
      <CardContent className="flex flex-col items-center text-center p-12 space-y-6">
        {illustration || emptyContent.icon}
        
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-charcoal">
            {emptyContent.title}
          </h3>
          <p className="text-base text-gray-600 max-w-md leading-relaxed">
            {emptyContent.description}
          </p>
        </div>

        {showAction && onAction && (
          <Button onClick={onAction} className="gap-2 mt-4">
            <Plus className="h-4 w-4" />
            {emptyContent.actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Specific empty state components for common use cases
export function EmptyBookLibrary({ onAddBook, className }: { onAddBook?: () => void; className?: string }) {
  return (
    <EmptyState
      type="books"
      onAction={onAddBook}
      className={className}
      illustration={
        <div className="relative">
          <BookOpen className="h-20 w-20 text-sage/30" />
          <div className="absolute -top-1 -right-1 bg-sage rounded-full p-1">
            <Plus className="h-4 w-4 text-white" />
          </div>
        </div>
      }
    />
  )
}

export function EmptySearchResults({ onClearSearch, className }: { onClearSearch?: () => void; className?: string }) {
  return (
    <EmptyState
      type="search"
      onAction={onClearSearch}
      className={className}
    />
  )
}

export function EmptyChildrenList({ onAddChild, className }: { onAddChild?: () => void; className?: string }) {
  return (
    <EmptyState
      type="children"
      onAction={onAddChild}
      className={className}
      illustration={
        <div className="relative">
          <div className="flex space-x-2">
            <div className="w-12 h-12 rounded-full bg-sage/20 border-2 border-sage/30" />
            <div className="w-12 h-12 rounded-full bg-rose/20 border-2 border-rose/30" />
          </div>
          <div className="absolute -top-1 -right-1 bg-sage rounded-full p-1">
            <Plus className="h-4 w-4 text-white" />
          </div>
        </div>
      }
    />
  )
}

export function EmptyReadingSessions({ onLogSession, className }: { onLogSession?: () => void; className?: string }) {
  return (
    <EmptyState
      type="sessions"
      onAction={onLogSession}
      className={className}
      illustration={
        <div className="relative">
          <Calendar className="h-20 w-20 text-sage/30" />
          <BookOpen className="h-8 w-8 text-sage/50 absolute bottom-0 right-0" />
        </div>
      }
    />
  )
}

export function EmptyFavorites({ onExploreBooks, className }: { onExploreBooks?: () => void; className?: string }) {
  return (
    <EmptyState
      type="favorites"
      onAction={onExploreBooks}
      className={className}
      illustration={
        <div className="relative">
          <Heart className="h-20 w-20 text-sage/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-sage/20" />
          </div>
        </div>
      }
    />
  )
}

// Compact empty state for smaller spaces
export function CompactEmptyState({ 
  title, 
  description, 
  actionLabel, 
  onAction, 
  icon,
  className = '' 
}: {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`text-center py-8 px-4 ${className}`}>
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      
      <h4 className="text-lg font-medium text-charcoal mb-2">
        {title}
      </h4>
      
      {description && (
        <p className="text-sm text-gray-600 mb-4 max-w-sm mx-auto">
          {description}
        </p>
      )}
      
      {onAction && actionLabel && (
        <Button size="sm" onClick={onAction} className="gap-2">
          <Plus className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
} 