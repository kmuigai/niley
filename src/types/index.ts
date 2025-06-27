export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Child {
  id: string
  user_id: string
  name: string
  birth_date: string
  profile_photo?: string
  created_at: string
  updated_at: string
}

export interface Book {
  id: string
  title: string
  author: string
  isbn?: string
  google_books_id?: string
  cover_image?: string
  page_count?: number
  publisher?: string
  published_date?: string
  description?: string
  categories?: string[]
  book_type?: BookType
  created_at: string
  updated_at: string
}

export interface Reading {
  id: string
  user_id: string
  child_id: string
  book_id: string
  read_at: string
  reaction?: ReactionType
  reaction_notes?: string
  reading_context?: ReadingContext
  created_at: string
  updated_at: string
  
  // Relations
  book?: Book
  child?: Child
}

export type BookType = 
  | 'board_book'
  | 'picture_book'
  | 'touch_and_feel'
  | 'nursery_rhymes'
  | 'story_book'
  | 'educational'
  | 'activity_book'

export type ReactionType = 
  | 'loved_it'      // 😍 
  | 'enjoyed_it'    // 😊
  | 'just_okay'     // 😄
  | 'boring'        // 😴
  | 'new_favorite'  // 🎉

export type ReadingContext = 
  | 'bedtime'
  | 'naptime'
  | 'playtime'
  | 'car_ride'
  | 'meal_time'
  | 'other'

export interface ReadingStreak {
  current_streak: number
  longest_streak: number
  last_read_date?: string
}

export interface ReadingStats {
  total_books: number
  total_readings: number
  books_this_month: number
  readings_this_month: number
  favorite_books: Book[]
  reading_streak: ReadingStreak
  reading_by_day: { [key: string]: number }
  reading_by_context: { [key in ReadingContext]: number }
  reading_by_reaction: { [key in ReactionType]: number }
}

export interface BookSearchResult {
  id: string
  title: string
  authors: string[]
  publishedDate?: string
  description?: string
  imageLinks?: {
    thumbnail?: string
    small?: string
    medium?: string
    large?: string
  }
  industryIdentifiers?: Array<{
    type: string
    identifier: string
  }>
  pageCount?: number
  categories?: string[]
  publisher?: string
}

export interface ContributionDay {
  date: Date
  activity: number
  booksRead: number
  readingPartner?: string
} 