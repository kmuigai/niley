"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ColorSwatch = ({ name, value, className }: { name: string; value: string; className: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-16 h-16 rounded-lg border-2 border-gray-200 ${className}`} />
    <div className="text-center">
      <p className="text-sm font-medium text-gray-900">{name}</p>
      <p className="text-xs text-gray-500">{value}</p>
    </div>
  </div>
)

const TypographyExample = ({ level, className, children }: { level: string; className: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <p className="text-sm font-mono text-gray-500">{level}</p>
    <div className={className}>{children}</div>
  </div>
)

export function DesignSystem() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-charcoal">Niley Design System</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A comprehensive design system for creating beautiful, consistent, and accessible reading experiences for families.
        </p>
      </div>

      {/* Color Palette */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-charcoal">Color Palette</h2>
        
        {/* Brand Colors */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Brand Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ColorSwatch name="Sage" value="#87A96B" className="bg-sage" />
            <ColorSwatch name="Sage Light" value="#9BB885" className="bg-sage-light" />
            <ColorSwatch name="Sage Dark" value="#7a9660" className="bg-sage-dark" />
            <ColorSwatch name="Charcoal" value="#36454F" className="bg-charcoal" />
            <ColorSwatch name="Cream" value="#FAF9F6" className="bg-cream border-gray-300" />
            <ColorSwatch name="Cream Light" value="#FDFCF9" className="bg-cream-light border-gray-300" />
            <ColorSwatch name="Cream Dark" value="#F5F3F0" className="bg-cream-dark border-gray-300" />
            <ColorSwatch name="Rose" value="#D4A5A5" className="bg-rose" />
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Semantic Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ColorSwatch name="Primary" value="hsl(var(--primary))" className="bg-primary" />
            <ColorSwatch name="Secondary" value="hsl(var(--secondary))" className="bg-secondary" />
            <ColorSwatch name="Destructive" value="hsl(var(--destructive))" className="bg-destructive" />
            <ColorSwatch name="Muted" value="hsl(var(--muted))" className="bg-muted" />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-charcoal">Typography</h2>
        <div className="space-y-6">
          <TypographyExample level="H1 - Page Title" className="text-4xl font-bold text-charcoal">
            Welcome to Your Reading Journey
          </TypographyExample>
          <TypographyExample level="H2 - Section Header" className="text-3xl font-bold text-charcoal">
            Today's Reading Session
          </TypographyExample>
          <TypographyExample level="H3 - Subsection" className="text-xl font-semibold text-gray-900">
            Recently Read Books
          </TypographyExample>
          <TypographyExample level="H4 - Card Title" className="text-lg font-medium text-gray-900">
            The Very Hungry Caterpillar
          </TypographyExample>
          <TypographyExample level="Body - Regular" className="text-base text-gray-700">
            Track your family's reading progress and celebrate every story shared together.
          </TypographyExample>
          <TypographyExample level="Caption - Small" className="text-sm text-gray-600">
            Last read 2 hours ago
          </TypographyExample>
          <TypographyExample level="Label - Form" className="text-sm font-medium text-gray-900">
            Child's Name
          </TypographyExample>
        </div>
      </section>

      {/* Component Examples */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-charcoal">Components</h2>
        
        {/* Buttons */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button size="sm">Small Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </div>

        {/* Form Elements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Form Elements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="space-y-2">
              <Label htmlFor="example-input">Text Input</Label>
              <Input id="example-input" placeholder="Enter book title..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="example-textarea">Textarea</Label>
              <Textarea id="example-textarea" placeholder="Share your thoughts about the book..." />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Book Card</CardTitle>
                <CardDescription>A simple card for displaying book information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Perfect for showcasing reading progress and book details.</p>
              </CardContent>
            </Card>
            <Card className="border-sage">
              <CardHeader>
                <CardTitle className="text-sage">Featured Card</CardTitle>
                <CardDescription>Highlighted with brand colors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Uses sage accent color for emphasis.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Avatars and Skeletons */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Avatars & Loading States</h3>
          <div className="flex items-center gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Avatar</p>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Child" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Loading Skeleton</p>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Text Skeleton</p>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing & Layout */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-charcoal">Spacing & Layout</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Spacing Scale</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm font-mono">xs (4px)</div>
              <div className="h-4 bg-sage" style={{ width: '4px' }} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm font-mono">sm (8px)</div>
              <div className="h-4 bg-sage" style={{ width: '8px' }} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm font-mono">md (16px)</div>
              <div className="h-4 bg-sage" style={{ width: '16px' }} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm font-mono">lg (24px)</div>
              <div className="h-4 bg-sage" style={{ width: '24px' }} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm font-mono">xl (32px)</div>
              <div className="h-4 bg-sage" style={{ width: '32px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-charcoal">Usage Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sage">Do's</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">✅ Use sage for primary actions and highlights</p>
              <p className="text-sm">✅ Maintain consistent spacing throughout</p>
              <p className="text-sm">✅ Use cream backgrounds for warmth</p>
              <p className="text-sm">✅ Prioritize accessibility and readability</p>
              <p className="text-sm">✅ Keep the 30-second interaction goal in mind</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Don'ts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">❌ Don't use brand colors for destructive actions</p>
              <p className="text-sm">❌ Avoid overwhelming users with too many colors</p>
              <p className="text-sm">❌ Don't compromise on touch target sizes</p>
              <p className="text-sm">❌ Avoid complex interactions that slow down logging</p>
              <p className="text-sm">❌ Don't use small text for important actions</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 