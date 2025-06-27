// Smart recommendation algorithm for children's books
// Factors: spaced repetition, engagement, educational value, variety

export interface BookReadingHistory {
  bookId: string
  title: string
  author: string
  searchQuery: string
  lastReadDate: Date
  readCount: number
  totalReadingTime: number // minutes
  completionRate: number // 0-1
  engagementRating: number // 1-5 (child's reaction)
  difficultyLevel: number // 1-5
  educationalThemes: string[]
  genre: string
  childId: string
}

export interface ChildProfile {
  id: string
  name: string
  age: number
  readingLevel: number // 1-5
  favoriteGenres: string[]
  attentionSpan: number // average minutes
}

export interface RecommendationScore {
  bookId: string
  score: number
  reasons: string[]
}

// Mock data simulating real reading history
const MOCK_READING_HISTORY: BookReadingHistory[] = [
  {
    bookId: '1',
    title: 'The Very Hungry Caterpillar',
    author: 'Eric Carle',
    searchQuery: 'The Very Hungry Caterpillar Eric Carle',
    lastReadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    readCount: 12,
    totalReadingTime: 45,
    completionRate: 0.95,
    engagementRating: 5,
    difficultyLevel: 2,
    educationalThemes: ['counting', 'life-cycles', 'days-of-week'],
    genre: 'educational',
    childId: 'nile'
  },
  {
    bookId: '2',
    title: 'Goodnight Moon',
    author: 'Margaret Wise Brown',
    searchQuery: 'Goodnight Moon Margaret Wise Brown',
    lastReadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    readCount: 8,
    totalReadingTime: 32,
    completionRate: 1.0,
    engagementRating: 4,
    difficultyLevel: 1,
    educationalThemes: ['bedtime-routine', 'objects-identification'],
    genre: 'bedtime',
    childId: 'nile'
  },
  {
    bookId: '3',
    title: 'Where the Wild Things Are',
    author: 'Maurice Sendak',
    searchQuery: 'Where the Wild Things Are Maurice Sendak',
    lastReadDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    readCount: 6,
    totalReadingTime: 55,
    completionRate: 0.85,
    engagementRating: 4,
    difficultyLevel: 3,
    educationalThemes: ['imagination', 'emotions', 'family-bonds'],
    genre: 'adventure',
    childId: 'nile'
  },
  {
    bookId: '4',
    title: 'Green Eggs and Ham',
    author: 'Dr. Seuss',
    searchQuery: 'Green Eggs and Ham Dr. Seuss',
    lastReadDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    readCount: 15,
    totalReadingTime: 38,
    completionRate: 1.0,
    engagementRating: 5,
    difficultyLevel: 2,
    educationalThemes: ['persistence', 'trying-new-things', 'rhyming'],
    genre: 'humor',
    childId: 'nile'
  },
  {
    bookId: '5',
    title: 'Brown Bear, Brown Bear',
    author: 'Bill Martin Jr.',
    searchQuery: 'Brown Bear Brown Bear What Do You See Bill Martin',
    lastReadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    readCount: 20,
    totalReadingTime: 25,
    completionRate: 1.0,
    engagementRating: 4,
    difficultyLevel: 1,
    educationalThemes: ['colors', 'animals', 'pattern-recognition'],
    genre: 'educational',
    childId: 'nile'
  },
  {
    bookId: '6',
    title: 'The Gruffalo',
    author: 'Julia Donaldson',
    searchQuery: 'The Gruffalo Julia Donaldson',
    lastReadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    readCount: 4,
    totalReadingTime: 48,
    completionRate: 0.9,
    engagementRating: 5,
    difficultyLevel: 3,
    educationalThemes: ['problem-solving', 'courage', 'forest-animals'],
    genre: 'adventure',
    childId: 'nile'
  },
  {
    bookId: '7',
    title: 'Chicka Chicka Boom Boom',
    author: 'Bill Martin Jr.',
    searchQuery: 'Chicka Chicka Boom Boom Bill Martin',
    lastReadDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000), // 28 days ago
    readCount: 18,
    totalReadingTime: 35,
    completionRate: 1.0,
    engagementRating: 5,
    difficultyLevel: 2,
    educationalThemes: ['alphabet', 'letters', 'rhyming'],
    genre: 'educational',
    childId: 'nile'
  },
  {
    bookId: '8',
    title: 'Corduroy',
    author: 'Don Freeman',
    searchQuery: 'Corduroy Don Freeman bear',
    lastReadDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 days ago
    readCount: 7,
    totalReadingTime: 42,
    completionRate: 0.95,
    engagementRating: 4,
    difficultyLevel: 3,
    educationalThemes: ['friendship', 'belonging', 'shopping'],
    genre: 'friendship',
    childId: 'nile'
  }
]

const MOCK_CHILD_PROFILE: ChildProfile = {
  id: 'nile',
  name: 'Nile',
  age: 3,
  readingLevel: 2,
  favoriteGenres: ['educational', 'adventure', 'humor'],
  attentionSpan: 15 // minutes
}

export function calculateRecommendationScores(
  readingHistory: BookReadingHistory[] = MOCK_READING_HISTORY,
  childProfile: ChildProfile = MOCK_CHILD_PROFILE
): RecommendationScore[] {
  const now = Date.now()
  
  return readingHistory.map(book => {
    let score = 0
    const reasons: string[] = []

    // 1. Spaced Repetition Score (0-40 points)
    // Books read longer ago get higher scores for re-reading
    const daysSinceLastRead = (now - book.lastReadDate.getTime()) / (1000 * 60 * 60 * 24)
    let spacedRepetitionScore = 0
    
    if (daysSinceLastRead >= 30) {
      spacedRepetitionScore = 40
      reasons.push('Perfect time to revisit')
    } else if (daysSinceLastRead >= 14) {
      spacedRepetitionScore = 30
      reasons.push('Good time to re-read')
    } else if (daysSinceLastRead >= 7) {
      spacedRepetitionScore = 20
    } else if (daysSinceLastRead >= 3) {
      spacedRepetitionScore = 10
    } else {
      spacedRepetitionScore = 5 // Too recent
    }
    score += spacedRepetitionScore

    // 2. Engagement Score (0-25 points)
    // Higher engagement = more likely to enjoy re-reading
    const engagementScore = (book.engagementRating / 5) * 25
    score += engagementScore
    if (book.engagementRating >= 4) {
      reasons.push('Loved this book')
    }

    // 3. Reading Level Match (0-20 points)
    // Books that match or slightly challenge reading level
    let levelMatchScore = 0
    const levelDiff = Math.abs(book.difficultyLevel - childProfile.readingLevel)
    if (levelDiff === 0) {
      levelMatchScore = 20
    } else if (levelDiff === 1) {
      levelMatchScore = 15
    } else if (levelDiff === 2) {
      levelMatchScore = 5
    }
    score += levelMatchScore

    // 4. Educational Value (0-10 points)
    // Books with more educational themes get bonus points
    const educationalScore = Math.min(book.educationalThemes.length * 3, 10)
    score += educationalScore
    if (book.educationalThemes.length >= 2) {
      reasons.push('Great learning opportunity')
    }

    // 5. Completion Success (0-10 points)
    // Books that were completed successfully are good candidates
    const completionScore = book.completionRate * 10
    score += completionScore

    // 6. Genre Preference (0-5 points)
    // Bonus for favorite genres
    if (childProfile.favoriteGenres.includes(book.genre)) {
      score += 5
      reasons.push('Favorite genre')
    }

    // 7. Reading Count Balance (-5 to +5 points)
    // Slightly prefer books that haven't been over-read
    let readCountScore = 0
    if (book.readCount < 5) {
      readCountScore = 5 // Fresh enough
    } else if (book.readCount < 15) {
      readCountScore = 0 // Just right
    } else {
      readCountScore = -2 // Maybe too familiar
    }
    score += readCountScore

    return {
      bookId: book.bookId,
      score: Math.round(score),
      reasons
    }
  })
  .sort((a, b) => b.score - a.score) // Sort by highest score first
}

export function getRecommendedBooks(limit: number = 4): BookReadingHistory[] {
  const scores = calculateRecommendationScores()
  const topScores = scores.slice(0, limit)
  
  return topScores
    .map(scoreResult => MOCK_READING_HISTORY.find(book => book.bookId === scoreResult.bookId))
    .filter(book => book !== undefined) as BookReadingHistory[]
}

// Export mock data for use in hooks
export { MOCK_READING_HISTORY, MOCK_CHILD_PROFILE } 