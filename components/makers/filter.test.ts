import { describe, expect, it } from "vitest"
import type { Maker } from "@/lib/data"
import { EMPTY, filterMakers } from "./filter"

const base = { address: "", createdAt: "", updatedAt: "" }
const makers: Maker[] = [
  {
    ...base,
    id: "a",
    name: "蔵前蒸溜所",
    category: "distillery",
    types: ["gin"],
    ward: "taito",
    area: "蔵前",
    bar: true,
  },
  {
    ...base,
    id: "b",
    name: "清澄ブルワリー",
    category: "brewery",
    types: ["beer"],
    ward: "koto",
    onlineShop: true,
  },
]
const ctx = { articleIds: ["a"], visitedIds: ["a"] }
const ids = (f: Partial<typeof EMPTY>) =>
  filterMakers(makers, { ...EMPTY, ...f }, ctx).map((m) => m.id)

describe("filterMakers", () => {
  it("returns all with empty filters", () =>
    expect(ids({})).toEqual(["a", "b"]))
  it("filters by text", () => expect(ids({ q: "蔵前" })).toEqual(["a"]))
  it("filters by ward / category / type", () => {
    expect(ids({ ward: "koto" })).toEqual(["b"])
    expect(ids({ category: "distillery" })).toEqual(["a"])
    expect(ids({ type: "beer" })).toEqual(["b"])
  })
  it("ANDs flags incl. derived ones", () => {
    expect(ids({ flags: ["purchasable"] })).toEqual(["b"])
    expect(ids({ flags: ["hasArticle", "bar"] })).toEqual(["a"])
    expect(ids({ flags: ["visited", "purchasable"] })).toEqual([])
  })
})
