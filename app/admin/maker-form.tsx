"use client"

import type { ReactNode } from "react"
import type { Maker } from "@/lib/data"
import { CATEGORY_LABEL, getAreas, getTypes, type Category } from "@/lib/master"

const REQUIRED = [
  "id",
  "name",
  "category",
  "types",
  "ward",
  "address",
  "createdAt",
  "updatedAt",
]
const input = "w-full border border-line bg-white px-2 py-1"

type Row = Record<string, string | undefined>

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <span className="text-xs text-muted">{label}</span>
    {children}
  </label>
)

// 空文字のキーは削除（keep に含むキーは残す）
const clean = (o: Row, keep: Row = {}) =>
  Object.fromEntries(Object.entries(o).filter(([k, v]) => v || k in keep))

export const MakerForm = ({
  maker,
  images,
  onChange,
}: {
  maker: Maker
  images: string[]
  onChange: (m: Maker) => void
}) => {
  // 空値はキーごと削除し JSON を簡潔に保つ（必須項目は残す）
  const set = (key: keyof Maker, value: unknown) => {
    const m: Record<string, unknown> = { ...maker, [key]: value }
    const empty =
      value === "" ||
      value === undefined ||
      (typeof value === "object" && !Object.keys(value as object).length)
    if (empty && !REQUIRED.includes(key)) delete m[key]
    onChange(m as Maker)
  }

  const text = (key: keyof Maker, label: string, type = "text") => (
    <Field label={label}>
      <input
        type={type}
        className={input}
        value={(maker[key] as string) ?? ""}
        onChange={(e) => set(key, e.target.value)}
      />
    </Field>
  )
  const area = (key: keyof Maker, label: string) => (
    <Field label={label}>
      <textarea
        rows={3}
        className={input}
        value={(maker[key] as string) ?? ""}
        onChange={(e) => set(key, e.target.value)}
      />
    </Field>
  )
  const num = (key: keyof Maker, label: string) => (
    <Field label={label}>
      <input
        type="number"
        step="any"
        className={input}
        value={(maker[key] as number) ?? ""}
        onChange={(e) =>
          set(key, e.target.value === "" ? undefined : Number(e.target.value))
        }
      />
    </Field>
  )
  // 1行1件。入力中の空行は残し、フォーカスを外したら除去
  const lines = (key: "nearestStations" | "sourceUrls", label: string) => (
    <Field label={`${label}（1行1件）`}>
      <textarea
        rows={3}
        className={input}
        value={(maker[key] ?? []).join("\n")}
        onChange={(e) => set(key, e.target.value.split("\n"))}
        onBlur={(e) => set(key, e.target.value.split("\n").filter(Boolean))}
      />
    </Field>
  )
  const rows = (
    key: "products" | "images",
    label: string,
    cols: [string, string][],
    blank: Row
  ) => {
    const list = (maker[key] ?? []) as Row[]
    return (
      <fieldset className="space-y-2 sm:col-span-2">
        <legend className="text-xs text-muted">{label}</legend>
        {list.map((row, i) => (
          <div key={i} className="flex gap-2">
            {cols.map(([c, placeholder]) => (
              <input
                key={c}
                aria-label={placeholder}
                placeholder={placeholder}
                list={c === "src" ? "admin-images" : undefined}
                className={input}
                value={row[c] ?? ""}
                onChange={(e) =>
                  set(
                    key,
                    list.map((r, j) =>
                      j === i ? clean({ ...r, [c]: e.target.value }, blank) : r
                    )
                  )
                }
              />
            ))}
            <button
              aria-label={`${label}${i + 1}を削除`}
              className="border border-line px-2"
              onClick={() =>
                set(
                  key,
                  list.filter((_, j) => j !== i)
                )
              }
            >
              ×
            </button>
          </div>
        ))}
        <button
          className="border border-line px-3 py-1 text-sm"
          onClick={() => set(key, [...list, blank])}
        >
          ＋追加
        </button>
      </fieldset>
    )
  }

  return (
    <div className="grid h-[70vh] content-start gap-3 overflow-y-auto border border-line p-3 text-sm sm:grid-cols-2">
      {text("name", "名前")}
      <Field label="カテゴリ">
        <select
          className={input}
          value={maker.category}
          onChange={(e) => set("category", e.target.value as Category)}
        >
          {Object.entries(CATEGORY_LABEL).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </Field>
      <fieldset className="sm:col-span-2">
        <legend className="text-xs text-muted">種類</legend>
        <div className="flex flex-wrap gap-x-4">
          {getTypes()
            .filter((t) => t.category === maker.category)
            .map((t) => (
              <label key={t.slug}>
                <input
                  type="checkbox"
                  checked={maker.types.includes(t.slug)}
                  onChange={(e) =>
                    set(
                      "types",
                      e.target.checked
                        ? [...maker.types, t.slug]
                        : maker.types.filter((s) => s !== t.slug)
                    )
                  }
                />{" "}
                {t.name}
              </label>
            ))}
        </div>
      </fieldset>
      <Field label="区">
        <select
          className={input}
          value={maker.ward}
          onChange={(e) => set("ward", e.target.value)}
        >
          <option value="">—</option>
          {getAreas().map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.name}
            </option>
          ))}
        </select>
      </Field>
      {text("area", "エリア")}
      <div className="sm:col-span-2">{text("address", "住所")}</div>
      {num("latitude", "緯度")}
      {num("longitude", "経度")}
      {lines("nearestStations", "最寄駅")}
      <div className="sm:col-span-2">{area("description", "説明")}</div>
      {text("openingHours", "営業時間")}
      {text("closedDays", "定休日")}
      <fieldset className="sm:col-span-2">
        <legend className="text-xs text-muted">施設</legend>
        <div className="flex flex-wrap gap-x-4">
          {(
            [
              ["visitable", "見学可"],
              ["shop", "ショップ"],
              ["bar", "バー"],
              ["restaurant", "レストラン"],
              ["onlineShop", "オンラインショップ"],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={!!maker[key]}
                onChange={(e) => set(key, e.target.checked || undefined)}
              />{" "}
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      {text("website", "Webサイト", "url")}
      {(["x", "instagram", "facebook"] as const).map((k) => (
        <Field key={k} label={k}>
          <input
            type="url"
            className={input}
            value={maker.sns?.[k] ?? ""}
            onChange={(e) =>
              set("sns", clean({ ...maker.sns, [k]: e.target.value }))
            }
          />
        </Field>
      ))}
      {area("equipment", "設備")}
      {area("process", "工程")}
      {rows(
        "products",
        "商品",
        [
          ["name", "名前"],
          ["type", "種類"],
          ["description", "説明"],
        ],
        { name: "" }
      )}
      {rows(
        "images",
        "画像",
        [
          ["src", "src"],
          ["alt", "alt"],
          ["caption", "キャプション"],
        ],
        { src: "", alt: "" }
      )}
      <datalist id="admin-images">
        {images.map((src) => (
          <option key={src} value={src} />
        ))}
      </datalist>
      {text("firstVisitedAt", "初訪問日", "date")}
      {num("visitCount", "訪問回数")}
      <div className="sm:col-span-2">{area("memo", "メモ")}</div>
      {lines("sourceUrls", "出典URL")}
      {text("createdAt", "作成日", "date")}
      {text("updatedAt", "更新日", "date")}
    </div>
  )
}
