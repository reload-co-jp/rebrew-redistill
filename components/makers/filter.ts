import type { Maker } from "@/lib/data"

export type Filters = {
  q: string
  ward: string
  area: string
  category: string
  type: string
  flags: string[]
}

export const FLAGS = [
  ["visitable", "見学可能"],
  ["shop", "店舗あり"],
  ["bar", "バーあり"],
  ["restaurant", "飲食可能"],
  ["purchasable", "商品購入可能"],
  ["hasArticle", "訪問記事あり"],
  ["visited", "訪問済み"],
] as const

export const EMPTY: Filters = {
  q: "",
  ward: "",
  area: "",
  category: "",
  type: "",
  flags: [],
}

const flagOf = (
  m: Maker,
  flag: string,
  ctx: { articleIds: string[]; visitedIds: string[] }
) => {
  switch (flag) {
    case "purchasable":
      return !!(m.shop || m.onlineShop)
    case "hasArticle":
      return ctx.articleIds.includes(m.id)
    case "visited":
      return ctx.visitedIds.includes(m.id)
    default:
      return !!m[flag as keyof Maker]
  }
}

export const filterMakers = (
  makers: Maker[],
  f: Filters,
  ctx: { articleIds: string[]; visitedIds: string[] }
) => {
  const q = f.q.trim().toLowerCase()
  return makers.filter(
    (m) =>
      (!q ||
        [m.name, m.address, m.area, m.description, ...(m.nearestStations ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(q)) &&
      (!f.ward || m.ward === f.ward) &&
      (!f.area || m.area === f.area) &&
      (!f.category || m.category === f.category) &&
      (!f.type || m.types.includes(f.type)) &&
      f.flags.every((flag) => flagOf(m, flag, ctx))
  )
}
