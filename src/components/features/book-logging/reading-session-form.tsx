"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { X, User, Clock, Moon, Sun, Coffee, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface Child {
  id: string
  name: string
  age: number
  avatarUrl?: string
  color: string
}

interface ReadingContext {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

interface ReadingSessionData {
  childId: string
  context: string
  reaction: string
  notes?: string
  duration?: number
}

interface ReadingSessionFormProps {
  onSubmit: (sessionData: ReadingSessionData) => void
  onBack?: () => void
  onClose?: () => void
}

// Mock data for development
const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Nile',
    age: 3,
    color: 'bg-sage',
    avatarUrl: '/api/placeholder?height=40&width=40&text=N'
  },
  {
    id: '2',
    name: 'Emma',
    age: 5,
    color: 'bg-rose',
    avatarUrl: '/api/placeholder?height=40&width=40&text=E'
  },
  {
    id: '3',
    name: 'Max',
    age: 7,
    color: 'bg-blue-500',
    avatarUrl: '/api/placeholder?height=40&width=40&text=M'
  }
]

const readingContexts: ReadingContext[] = [
  {
    id: 'bedtime',
    name: 'Bedtime',
    icon: <Moon className="h-4 w-4" />,
    description: 'Before sleep'
  },
  {
    id: 'naptime',
    name: 'Naptime',
    icon: <Clock className="h-4 w-4" />,
    description: 'Afternoon nap'
  },
  {
    id: 'morning',
    name: 'Morning',
    icon: <Sun className="h-4 w-4" />,
    description: 'Start of day'
  },
  {
    id: 'anytime',
    name: 'Anytime',
    icon: <Heart className="h-4 w-4" />,
    description: 'Just for fun'
  }
]

const reactionEmojis = [
  { emoji: '😍', label: 'Loved it' },
  { emoji: '😊', label: 'Enjoyed it' },
  { emoji: '🙂', label: 'Liked it' },
  { emoji: '😐', label: 'It was okay' },
  { emoji: '😴', label: 'Fell asleep' },
  { emoji: '🤔', label: 'Confused' },
  { emoji: '😢', label: 'Sad parts' },
  { emoji: '😂', label: 'Funny!' }
]

export function ReadingSessionForm({ onSubmit, onBack, onClose }: ReadingSessionFormProps) {
  const [selectedChild, setSelectedChild] = useState<string>('')
  const [selectedContext, setSelectedContext] = useState<string>('')
  const [selectedReaction, setSelectedReaction] = useState<string>('')
  const [notes, setNotes] = useState('')
  const [duration, setDuration] = useState<number>(15)

  const handleSubmit = () => {
    if (!selectedChild || !selectedContext || !selectedReaction) {
      return // Add validation feedback later
    }

    const sessionData: ReadingSessionData = {
      childId: selectedChild,
      context: selectedContext,
      reaction: selectedReaction,
      notes: notes.trim() || undefined,
      duration
    }

    onSubmit(sessionData)
  }

  const isFormValid = selectedChild && selectedContext && selectedReaction

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        {onBack && (
          <Button variant="ghost" onClick={onBack} size="sm">
            ← Back
          </Button>
        )}
        <h2 className="text-lg font-semibold text-charcoal">Reading Session</h2>
        {onClose && (
          <Button variant="ghost" onClick={onClose} size="sm">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Child Selector */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-charcoal">
            Who read this book? *
          </Label>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-3"
          >
            {mockChildren.map((child) => (
              <motion.button
                key={child.id}
                variants={staggerItem}
                onClick={() => setSelectedChild(child.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                  selectedChild === child.id
                    ? 'border-sage bg-sage/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={child.avatarUrl} alt={child.name} />
                  <AvatarFallback className={child.color}>
                    {child.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="font-medium text-charcoal">{child.name}</p>
                  <p className="text-sm text-gray-600">{child.age} years old</p>
                </div>
                {selectedChild === child.id && (
                  <div className="w-5 h-5 bg-sage rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Reading Context */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-charcoal">
            When did you read? *
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {readingContexts.map((context) => (
              <button
                key={context.id}
                onClick={() => setSelectedContext(context.id)}
                className={`flex flex-col items-center space-y-2 p-4 rounded-lg border-2 transition-all ${
                  selectedContext === context.id
                    ? 'border-sage bg-sage/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  selectedContext === context.id ? 'bg-sage text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {context.icon}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-charcoal">{context.name}</p>
                  <p className="text-xs text-gray-500">{context.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reaction Emojis */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-charcoal">
            How did they react? *
          </Label>
          <div className="grid grid-cols-4 gap-3">
            {reactionEmojis.map((reaction) => (
              <button
                key={reaction.emoji}
                onClick={() => setSelectedReaction(reaction.emoji)}
                className={`flex flex-col items-center space-y-2 p-3 rounded-lg border-2 transition-all ${
                  selectedReaction === reaction.emoji
                    ? 'border-sage bg-sage/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <span className="text-2xl">{reaction.emoji}</span>
                <span className="text-xs text-charcoal text-center leading-tight">
                  {reaction.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-charcoal">
            How long did you read?
          </Label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-charcoal min-w-[60px]">
              {duration} min
            </span>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <Label htmlFor="notes" className="text-sm font-medium text-charcoal">
            Any notes? (Optional)
          </Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What happened during reading? Favorite parts? Questions they asked?"
            className="min-h-[80px] resize-none"
            maxLength={300}
          />
          <div className="text-right">
            <span className="text-xs text-gray-500">{notes.length}/300</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="space-y-3">
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-full h-12 bg-sage hover:bg-sage-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-lg font-medium"
            size="lg"
          >
            Log Reading Session
          </Button>
          
          {!isFormValid && (
            <p className="text-xs text-gray-500 text-center">
              Please select a child, reading time, and reaction to continue
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 