"use client"

import React, { useState, useEffect } from 'react'
import { Monitor, Tablet, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type DeviceSize = {
  name: string
  width: number
  height: number
  icon: React.ReactNode
  description: string
}

const deviceSizes: DeviceSize[] = [
  {
    name: 'iPhone SE',
    width: 375,
    height: 667,
    icon: <Smartphone className="h-4 w-4" />,
    description: 'Small mobile device'
  },
  {
    name: 'iPhone 12 Pro',
    width: 390,
    height: 844,
    icon: <Smartphone className="h-4 w-4" />,
    description: 'Standard mobile device'
  },
  {
    name: 'iPad Mini',
    width: 768,
    height: 1024,
    icon: <Tablet className="h-4 w-4" />,
    description: 'Small tablet'
  },
  {
    name: 'iPad Pro',
    width: 1024,
    height: 1366,
    icon: <Tablet className="h-4 w-4" />,
    description: 'Large tablet'
  },
  {
    name: 'Desktop',
    width: 1440,
    height: 900,
    icon: <Monitor className="h-4 w-4" />,
    description: 'Desktop computer'
  },
  {
    name: 'Large Desktop',
    width: 1920,
    height: 1080,
    icon: <Monitor className="h-4 w-4" />,
    description: 'Large desktop monitor'
  }
]

interface ResponsiveTesterProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveTester({ children, className = '' }: ResponsiveTesterProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceSize>(deviceSizes[1])
  const [currentViewport, setCurrentViewport] = useState({ width: 0, height: 0 })
  const [showBreakpoints, setShowBreakpoints] = useState(false)

  useEffect(() => {
    const updateViewport = () => {
      setCurrentViewport({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  const getTailwindBreakpoint = (width: number) => {
    if (width >= 1536) return '2xl (1536px+)'
    if (width >= 1280) return 'xl (1280px+)'
    if (width >= 1024) return 'lg (1024px+)'
    if (width >= 768) return 'md (768px+)'
    if (width >= 640) return 'sm (640px+)'
    return 'Base (<640px)'
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Control Panel */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-charcoal mb-2">
                Responsive Design Tester
              </h2>
              <div className="flex flex-wrap gap-2">
                {deviceSizes.map((device) => (
                  <Button
                    key={device.name}
                    variant={selectedDevice.name === device.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDevice(device)}
                    className="gap-2"
                  >
                    {device.icon}
                    {device.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBreakpoints(!showBreakpoints)}
              >
                {showBreakpoints ? 'Hide' : 'Show'} Breakpoints
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Current:</span> {currentViewport.width}×{currentViewport.height}px
            </div>
            <div>
              <span className="font-medium">Breakpoint:</span> {getTailwindBreakpoint(currentViewport.width)}
            </div>
            <div>
              <span className="font-medium">Testing:</span> {selectedDevice.name} ({selectedDevice.width}×{selectedDevice.height}px)
            </div>
          </div>
        </div>
      </div>

      {/* Breakpoint Indicators */}
      {showBreakpoints && (
        <div className="bg-sage/10 border-b border-sage/20 p-2">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              <div className="bg-white p-2 rounded border text-center">
                <div className="font-mono">Base</div>
                <div className="text-gray-600">&lt;640px</div>
              </div>
              <div className="bg-white p-2 rounded border text-center">
                <div className="font-mono">sm</div>
                <div className="text-gray-600">640px+</div>
              </div>
              <div className="bg-white p-2 rounded border text-center">
                <div className="font-mono">md</div>
                <div className="text-gray-600">768px+</div>
              </div>
              <div className="bg-white p-2 rounded border text-center">
                <div className="font-mono">lg</div>
                <div className="text-gray-600">1024px+</div>
              </div>
              <div className="bg-white p-2 rounded border text-center">
                <div className="font-mono">xl</div>
                <div className="text-gray-600">1280px+</div>
              </div>
              <div className="bg-white p-2 rounded border text-center">
                <div className="font-mono">2xl</div>
                <div className="text-gray-600">1536px+</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Device Preview */}
      <div className="p-8 flex justify-center">
        <div className="relative">
          {/* Device Frame */}
          <div 
            className="bg-white border-2 border-gray-300 rounded-lg shadow-2xl overflow-hidden relative"
            style={{
              width: Math.min(selectedDevice.width, window.innerWidth - 100),
              height: Math.min(selectedDevice.height, window.innerHeight - 200)
            }}
          >
            {/* Device Info */}
            <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded z-10">
              {selectedDevice.name} - {selectedDevice.description}
            </div>

            {/* Content Container */}
            <div 
              className="w-full h-full overflow-auto"
              style={{
                width: selectedDevice.width,
                height: selectedDevice.height
              }}
            >
              {children}
            </div>
          </div>

          {/* Scale indicator for smaller screens */}
          {(selectedDevice.width > window.innerWidth - 100 || selectedDevice.height > window.innerHeight - 200) && (
            <div className="absolute bottom-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
              Scaled to fit
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Component for testing specific UI patterns
export function ResponsivePatternTest() {
  return (
    <div className="p-6 space-y-8">
      {/* Navigation Pattern */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded">
            <div className="md:hidden">
              <Button variant="outline" size="sm">☰ Menu</Button>
            </div>
            <div className="hidden md:flex gap-4">
              <Button variant="ghost" size="sm">Home</Button>
              <Button variant="ghost" size="sm">Books</Button>
              <Button variant="ghost" size="sm">Children</Button>
              <Button variant="ghost" size="sm">Analytics</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid Pattern */}
      <Card>
        <CardHeader>
          <CardTitle>Grid Layout Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-sage/20 p-4 rounded h-20 flex items-center justify-center">
                Item {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Text Scaling */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Scaling</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold text-charcoal">
            Responsive Heading
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            This paragraph demonstrates how text scales across different screen sizes. 
            On mobile devices, the text is smaller and more compact, while on larger 
            screens it becomes more spacious and easier to read.
          </p>
        </CardContent>
      </Card>

      {/* Button Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Button Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="w-full sm:w-auto">Primary Action</Button>
            <Button variant="outline" className="w-full sm:w-auto">Secondary</Button>
            <Button variant="ghost" className="w-full sm:w-auto">Tertiary</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 