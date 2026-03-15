export interface Book {
  id: string
  title: string
  author: string
  description: string
  summary: string
  coverColor: string
  pageCount: number
  text: string
  ageRange: string
  duration: number
  estimatedMinutes?: number
  coverImageUrl?: string | null
  category?: string | null
}

export interface Voice {
  id: string | null
  recorded: boolean
  recordedAt: string | null
}

export type GenerationStatus = 'idle' | 'generating' | 'done' | 'error'

export interface Generation {
  bookId: string
  status: GenerationStatus
  progress: number // 0-100
  audioUrl: string | null
}
