"use client"

import React from 'react'
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent } from './card'

interface ErrorStateProps {
  title?: string
  description?: string
  type?: 'general' | 'network' | 'not-found' | 'permission'
  showRetryButton?: boolean
  showHomeButton?: boolean
  showBackButton?: boolean
  onRetry?: () => void
  onHome?: () => void
  onBack?: () => void
  className?: string
}

export function ErrorState({
  title,
  description,
  type = 'general',
  showRetryButton = true,
  showHomeButton = false,
  showBackButton = false,
  onRetry,
  onHome,
  onBack,
  className = ''
}: ErrorStateProps) {
  const getErrorContent = () => {
    switch (type) {
      case 'network':
        return {
          title: title || 'Connection Problem',
          description: description || 'Please check your internet connection and try again.',
          icon: <RefreshCw className="h-12 w-12 text-rose" />
        }
      case 'not-found':
        return {
          title: title || 'Page Not Found',
          description: description || 'Sorry, we couldn\'t find the page you\'re looking for.',
          icon: <AlertTriangle className="h-12 w-12 text-rose" />
        }
      case 'permission':
        return {
          title: title || 'Access Denied',
          description: description || 'You don\'t have permission to view this content.',
          icon: <AlertTriangle className="h-12 w-12 text-rose" />
        }
      default:
        return {
          title: title || 'Something went wrong',
          description: description || 'An unexpected error occurred. Please try again.',
          icon: <AlertTriangle className="h-12 w-12 text-rose" />
        }
    }
  }

  const errorContent = getErrorContent()

  return (
    <Card className={`border-rose/20 bg-cream ${className}`}>
      <CardContent className="flex flex-col items-center text-center p-8 space-y-6">
        {errorContent.icon}
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-charcoal">
            {errorContent.title}
          </h3>
          <p className="text-sm text-gray-600 max-w-md">
            {errorContent.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {showRetryButton && onRetry && (
            <Button onClick={onRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          
          {showHomeButton && onHome && (
            <Button variant="outline" onClick={onHome} className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          )}
          
          {showBackButton && onBack && (
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Specific error state components for common use cases
export function NetworkError({ onRetry, className }: { onRetry?: () => void; className?: string }) {
  return (
    <ErrorState
      type="network"
      showRetryButton={true}
      onRetry={onRetry}
      className={className}
    />
  )
}

export function NotFoundError({ onHome, onBack, className }: { onHome?: () => void; onBack?: () => void; className?: string }) {
  return (
    <ErrorState
      type="not-found"
      showRetryButton={false}
      showHomeButton={true}
      showBackButton={true}
      onHome={onHome}
      onBack={onBack}
      className={className}
    />
  )
}

export function PermissionError({ onHome, className }: { onHome?: () => void; className?: string }) {
  return (
    <ErrorState
      type="permission"
      showRetryButton={false}
      showHomeButton={true}
      onHome={onHome}
      className={className}
    />
  )
} 