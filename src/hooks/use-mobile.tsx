"use client"

import { useState, useEffect } from 'react'

/**
 * Hook to detect if the current device is mobile
 * Uses CSS media query to determine screen size
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    // Check on mount
    checkIsMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

/**
 * Hook to get current screen size category
 * Returns breakpoint name based on Tailwind CSS breakpoints
 */
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md')

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      
      if (width >= 1536) {
        setScreenSize('2xl')
      } else if (width >= 1280) {
        setScreenSize('xl')
      } else if (width >= 1024) {
        setScreenSize('lg')
      } else if (width >= 768) {
        setScreenSize('md')
      } else {
        setScreenSize('sm')
      }
    }

    // Check on mount
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize)

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return screenSize
}

/**
 * Hook to detect if user prefers reduced motion
 * Useful for accessibility - disable animations if user prefers reduced motion
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Hook to detect touch device capability
 * Useful for optimizing touch vs mouse interactions
 */
export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      )
    }

    checkTouch()
  }, [])

  return isTouchDevice
} 