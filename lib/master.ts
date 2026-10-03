// fs非依存のマスタデータ（クライアントからも import 可）
import areas from "@/data/areas.json"
import types from "@/data/types.json"

export type Category = "brewery" | "distillery"
export type Area = (typeof areas)[number]
export type DrinkType = (typeof types)[number] & { category: Category }

export const CATEGORY_LABEL: Record<Category, string> = {
  brewery: "醸造所",
  distillery: "蒸留所",
}

export const getAreas = (): Area[] => areas
export const getArea = (slug: string) => areas.find((a) => a.slug === slug)
export const getTypes = (): DrinkType[] => types as DrinkType[]
export const getType = (slug: string) => getTypes().find((t) => t.slug === slug)
