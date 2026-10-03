import fs from "node:fs"
import path from "node:path"
import type { ComponentType } from "react"
import type { Category } from "./master"

export * from "./master"

export type Image = { src: string; alt: string; caption?: string }

export type Product = { name: string; type?: string; description?: string }

export type Maker = {
  id: string
  name: string
  category: Category
  types: string[]
  ward: string
  area?: string
  address: string
  latitude?: number
  longitude?: number
  nearestStations?: string[]
  description?: string
  openingHours?: string
  closedDays?: string
  visitable?: boolean
  shop?: boolean
  bar?: boolean
  restaurant?: boolean
  onlineShop?: boolean
  website?: string
  sns?: { x?: string; instagram?: string; facebook?: string }
  equipment?: string
  process?: string
  products?: Product[]
  images?: Image[]
  firstVisitedAt?: string
  visitCount?: number
  memo?: string
  sourceUrls?: string[]
  createdAt: string
  updatedAt: string
}

export type Article = {
  slug: string
  title: string
  makerIds: string[]
  publishedAt: string
  visitedAt?: string
  excerpt: string
  tags: string[]
  thumbnail?: string
  images?: Image[]
  updatedAt: string
}

const DATA = path.join(process.cwd(), "data")

const listFiles = (dir: string, ext: string) =>
  fs
    .readdirSync(path.join(DATA, dir))
    .filter((f) => f.endsWith(ext))
    .map((f) => f.slice(0, -ext.length))

export const getMakers = (): Maker[] =>
  listFiles("makers", ".json")
    .map(
      (id) =>
        JSON.parse(
          fs.readFileSync(path.join(DATA, "makers", `${id}.json`), "utf8")
        ) as Maker
    )
    .sort((a, b) => a.name.localeCompare(b.name, "ja"))

export const getMaker = (id: string) => getMakers().find((m) => m.id === id)

const loadArticle = async (slug: string) => {
  const mod = (await import(`../data/articles/${slug}.mdx`)) as {
    default: ComponentType
    metadata: Omit<Article, "slug">
  }
  return { article: { ...mod.metadata, slug }, Content: mod.default }
}

export const getArticles = async (): Promise<Article[]> =>
  (
    await Promise.all(
      listFiles("articles", ".mdx").map(
        async (s) => (await loadArticle(s)).article
      )
    )
  ).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export const getArticle = (slug: string) => loadArticle(slug)

export const articlesFor = (articles: Article[], makerId: string) =>
  articles.filter((a) => a.makerIds.includes(makerId))

export const isVisited = (m: Maker, articles: Article[]) =>
  !!m.firstVisitedAt || articlesFor(articles, m.id).length > 0

export const explorerIds = (makers: Maker[], articles: Article[]) => ({
  articleIds: makers
    .filter((m) => articlesFor(articles, m.id).length)
    .map((m) => m.id),
  visitedIds: makers.filter((m) => isVisited(m, articles)).map((m) => m.id),
})
