/**
 * Accessibility utilities for Niley
 * Provides helpers for ARIA labels, keyboard navigation, and focus management
 */

import React, { useEffect, useRef, useState } from 'react'

// ARIA label generators
export const ariaLabels = {
  // Book-related labels
  book: (title: string, author?: string) =>
    author ? `Book: ${title} by ${author}` : `Book: ${title}`,
  
  bookCard: (title: string, author?: string, readCount?: number) => {
    const base = ariaLabels.book(title, author)
    return readCount ? `${base}, read ${readCount} times` : base
  },

  // Child profile labels
  childProfile: (name: string, age?: { years: number; months: number }) => {
    const ageText = age ? `, ${age.years} years ${age.months} months old` : ''
    return `Child profile: ${name}${ageText}`
  },

  // Reading session labels
  readingSession: (bookTitle: string, childName: string, date: Date) =>
    `Reading session: ${bookTitle} read with ${childName} on ${date.toLocaleDateString()}`,

  // Navigation labels
  navigation: {
    main: 'Main navigation',
    mobile: 'Mobile navigation menu',
    user: 'User account menu',
    breadcrumb: 'Breadcrumb navigation'
  },

  // Action labels
  actions: {
    addBook: 'Add a new book to library',
    logSession: 'Log a new reading session',
    addChild: 'Add a new child profile',
    edit: (item: string) => `Edit ${item}`,
    delete: (item: string) => `Delete ${item}`,
    favorite: (isFavorited: boolean) => 
      isFavorited ? 'Remove from favorites' : 'Add to favorites',
    search: 'Search books and content',
    filter: 'Filter results',
    sort: 'Sort options'
  },

  // Form labels
  forms: {
    required: (fieldName: string) => `${fieldName} (required)`,
    optional: (fieldName: string) => `${fieldName} (optional)`,
    error: (fieldName: string, error: string) => `${fieldName}: ${error}`,
    success: (action: string) => `Success: ${action} completed`
  },

  // Loading and status labels
  status: {
    loading: 'Loading content, please wait',
    saving: 'Saving changes',
    error: 'An error occurred',
    success: 'Action completed successfully',
    empty: (content: string) => `No ${content} found`
  }
}

// Keyboard navigation helpers
export const keyboardNavigation = {
  KEYS: {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    TAB: 'Tab',
    HOME: 'Home',
    END: 'End'
  },

  isActionKey: (key: string) => 
    key === keyboardNavigation.KEYS.ENTER || key === keyboardNavigation.KEYS.SPACE,

  isNavigationKey: (key: string) =>
    [
      keyboardNavigation.KEYS.ARROW_UP,
      keyboardNavigation.KEYS.ARROW_DOWN,
      keyboardNavigation.KEYS.ARROW_LEFT,
      keyboardNavigation.KEYS.ARROW_RIGHT,
      keyboardNavigation.KEYS.HOME,
      keyboardNavigation.KEYS.END
    ].includes(key),

  handleListNavigation: (
    event: KeyboardEvent,
    currentIndex: number,
    itemCount: number,
    onSelect: (index: number) => void
  ) => {
    const { key } = event

    switch (key) {
      case keyboardNavigation.KEYS.ARROW_DOWN:
        event.preventDefault()
        onSelect(currentIndex < itemCount - 1 ? currentIndex + 1 : 0)
        break
      case keyboardNavigation.KEYS.ARROW_UP:
        event.preventDefault()
        onSelect(currentIndex > 0 ? currentIndex - 1 : itemCount - 1)
        break
      case keyboardNavigation.KEYS.HOME:
        event.preventDefault()
        onSelect(0)
        break
      case keyboardNavigation.KEYS.END:
        event.preventDefault()
        onSelect(itemCount - 1)
        break
    }
  }
}

// Focus management hooks
export function useFocusManagement() {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const itemRefs = useRef<(HTMLElement | null)[]>([])

  const setItemRef = (index: number) => (element: HTMLElement | null) => {
    itemRefs.current[index] = element
  }

  const focusItem = (index: number) => {
    const item = itemRefs.current[index]
    if (item) {
      item.focus()
      setFocusedIndex(index)
    }
  }

  const resetFocus = () => {
    setFocusedIndex(-1)
  }

  return {
    focusedIndex,
    setItemRef,
    focusItem,
    resetFocus,
    itemRefs: itemRefs.current
  }
}

// Hook for managing focus trap (useful for modals and dropdowns)
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isActive) return

    const container = containerRef.current
    if (!container) return

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // This should be handled by the parent component
        container.dispatchEvent(new CustomEvent('escape-key'))
      }
    }

    document.addEventListener('keydown', handleTab)
    document.addEventListener('keydown', handleEscape)

    // Focus the first element when the trap becomes active
    firstElement?.focus()

    return () => {
      document.removeEventListener('keydown', handleTab)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isActive])

  return containerRef
}

// Hook for announcing changes to screen readers
export function useScreenReaderAnnouncement() {
  const [announcement, setAnnouncement] = useState('')

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement('')
    // Small delay to ensure screen readers pick up the change
    setTimeout(() => setAnnouncement(message), 100)
  }

  const AnnouncementRegion = () => {
    return React.createElement('div', {
      role: 'status',
      'aria-live': 'polite',
      'aria-atomic': 'true',
      className: 'sr-only'
    }, announcement)
  }

  return { announce, AnnouncementRegion }
}

// Utility for generating unique IDs
export function useUniqueId(prefix: string = 'niley') {
  const [id] = useState(() => `${prefix}-${Math.random().toString(36).substr(2, 9)}`)
  return id
}

// Screen reader only text utility
export const srOnly = 'sr-only absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0'

// High contrast mode detection
export function useHighContrastMode() {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setIsHighContrast(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setIsHighContrast(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isHighContrast
}

// Reduced motion detection
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Touch target size validation
export const touchTargets = {
  MINIMUM_SIZE: 44, // 44px is the recommended minimum touch target size
  
  validateSize: (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return rect.width >= touchTargets.MINIMUM_SIZE && rect.height >= touchTargets.MINIMUM_SIZE
  },

  ensureMinimumSize: (className: string = '') => 
    `min-h-[44px] min-w-[44px] ${className}`
} 