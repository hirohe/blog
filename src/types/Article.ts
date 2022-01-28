import { Category } from './Category'

export interface Article {
  id: number
  title: string
  subTitle: string
  category: Category
  content: string | null
  coverUrl: string
  labels: string
  likes: number
  preview: string
  createdAt: Date
  updatedAt: Date
}

export interface ArticleResponseData {
  id: number
  title: string
  subTitle: string
  category: string
  content: string | null
  coverUrl: string
  labels: string
  likes: number
  preview: string
  createdAt: string
  updatedAt: string
}

export function articleFromResponseData(data: ArticleResponseData): Article {
  return {
    id: data.id,
    title: data.title,
    subTitle: data.subTitle,
    category: data.category as Category,
    content: data.content,
    coverUrl: data.coverUrl,
    labels: data.labels,
    likes: data.likes,
    preview: data.preview,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }
}
