export interface Book {
  id: string
  title: string
  author: string
  description: string
  summary: string          // 2-3 sentence story description for book page
  coverColor: string
  pageCount: number
  text: string             // full narration text (not shown in UI)
  ageRange: string         // "2-4", "3-6" etc.
  duration: number         // estimated narration duration in minutes
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
