"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { Maker } from "@/lib/data"
import { CATEGORY_LABEL, getAreas, getTypes } from "@/lib/master"
import { EMPTY, FLAGS, Filters, filterMakers } from "./filter"
import { MakerGrid } from "./maker-card"
import { MakerMap } from "./maker-map"

const field = "border border-line bg-paper px-2 py-1.5 text-sm"

export const MakerExplorer = ({
  makers,
  articleIds,
  visitedIds,
  view,
}: {
  makers: Maker[]
  articleIds: string[]
  visitedIds: string[]
  view: "list" | "map"
}) => {
  const [f, setF] = useState<Filters>(EMPTY)
  const set = (patch: Partial<Filters>) =>
    setF((prev) => ({ ...prev, ...patch }))
  const result = useMemo(
    () => filterMakers(makers, f, { articleIds, visitedIds }),
    [makers, f, articleIds, visitedIds]
  )
  const wards = getAreas().filter((a) => makers.some((m) => m.ward === a.slug))
  const areas = [...new Set(makers.flatMap((m) => m.area ?? []))]

  return (
    <>
      <form
        role="search"
        className="mb-8 grid gap-3 border-y border-line py-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            aria-label="キーワード"
            placeholder="施設名・駅名で検索"
            className={`${field} min-w-56 flex-1`}
            value={f.q}
            onChange={(e) => set({ q: e.target.value })}
          />
          <select
            aria-label="区"
            className={field}
            value={f.ward}
            onChange={(e) => set({ ward: e.target.value })}
          >
            <option value="">すべての区</option>
            {wards.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
          <select
            aria-label="エリア"
            className={field}
            value={f.area}
            onChange={(e) => set({ area: e.target.value })}
          >
            <option value="">すべてのエリア</option>
            {areas.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          <select
            aria-label="種別"
            className={field}
            value={f.category}
            onChange={(e) => set({ category: e.target.value })}
          >
            <option value="">醸造 / 蒸留</option>
            {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <select
            aria-label="酒類"
            className={field}
            value={f.type}
            onChange={(e) => set({ type: e.target.value })}
          >
            <option value="">すべての酒類</option>
            {getTypes().map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <fieldset className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <legend className="sr-only">条件</legend>
          {FLAGS.map(([k, label]) => (
            <label key={k} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={f.flags.includes(k)}
                onChange={(e) =>
                  set({
                    flags: e.target.checked
                      ? [...f.flags, k]
                      : f.flags.filter((x) => x !== k),
                  })
                }
              />
              {label}
            </label>
          ))}
          <button
            type="button"
            className="ml-auto text-muted underline"
            onClick={() => setF(EMPTY)}
          >
            リセット
          </button>
        </fieldset>
      </form>
      <p className="mb-4 text-sm text-muted" aria-live="polite">
        {result.length}件
      </p>
      {view === "map" ? (
        <>
          <MakerMap makers={result} className="h-[70vh]" />
          <ul className="mt-6 grid gap-1 text-sm sm:grid-cols-2">
            {result.map((m) => (
              <li key={m.id}>
                <Link href={`/makers/${m.id}/`} className="hover:text-copper">
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <MakerGrid makers={result} />
      )}
    </>
  )
}
