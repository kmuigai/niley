// This file will be auto-generated by Supabase CLI
// Run: npm run db:generate-types

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          updated_at?: string
        }
      }
      children: {
        Row: {
          id: string
          user_id: string
          name: string
          birth_date: string
          profile_photo: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          birth_date: string
          profile_photo?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          birth_date?: string
          profile_photo?: string | null
          updated_at?: string
        }
      }
      books: {
        Row: {
          id: string
          title: string
          author: string
          isbn: string | null
          google_books_id: string | null
          cover_image: string | null
          page_count: number | null
          publisher: string | null
          published_date: string | null
          description: string | null
          categories: string[] | null
          book_type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          author: string
          isbn?: string | null
          google_books_id?: string | null
          cover_image?: string | null
          page_count?: number | null
          publisher?: string | null
          published_date?: string | null
          description?: string | null
          categories?: string[] | null
          book_type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          author?: string
          isbn?: string | null
          google_books_id?: string | null
          cover_image?: string | null
          page_count?: number | null
          publisher?: string | null
          published_date?: string | null
          description?: string | null
          categories?: string[] | null
          book_type?: string | null
          updated_at?: string
        }
      }
      readings: {
        Row: {
          id: string
          user_id: string
          child_id: string
          book_id: string
          read_at: string
          reaction: string | null
          reaction_notes: string | null
          reading_context: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          child_id: string
          book_id: string
          read_at?: string
          reaction?: string | null
          reaction_notes?: string | null
          reading_context?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          child_id?: string
          book_id?: string
          read_at?: string
          reaction?: string | null
          reaction_notes?: string | null
          reading_context?: string | null
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 