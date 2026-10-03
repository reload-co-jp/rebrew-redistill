import Link from "next/link"
import type { Maker } from "@/lib/data"
import { CATEGORY_LABEL, getArea, getType } from "@/lib/master"

export const FEATURES = [
  ["visitable", "見学可"],
  ["shop", "店舗"],
  ["bar", "バー"],
  ["restaurant", "飲食"],
  ["onlineShop", "オンライン販売"],
] as const

export const Thumb = ({ src, alt }: { src?: string; alt: string }) =>
  src ? (
    <img src={src} alt={alt} className="aspect-[4/3] w-full object-cover" />
  ) : (
    <div
      aria-hidden
      className="flex aspect-[4/3] w-full items-end bg-ink p-3 text-xs tracking-widest text-paper/60 uppercase"
    >
      No photo yet
    </div>
  )

export const MakerCard = ({ maker }: { maker: Maker }) => (
  <article>
    <Link href={`/makers/${maker.id}/`} className="group block">
      <Thumb src={maker.images?.[0]?.src} alt={maker.images?.[0]?.alt ?? ""} />
      <p className="mt-3 text-xs text-muted">
        {CATEGORY_LABEL[maker.category]} ·{" "}
        {maker.types.map((t) => getType(t)?.name ?? t).join(" / ")} ·{" "}
        {getArea(maker.ward)?.name}
        {maker.area && ` ${maker.area}`}
      </p>
      <h3 className="mt-1 text-lg font-bold group-hover:text-copper">
        {maker.name}
      </h3>
    </Link>
    <ul className="mt-2 flex flex-wrap gap-1 text-[11px]">
      {FEATURES.filter(([k]) => maker[k]).map(([k, label]) => (
        <li key={k} className="border border-line px-1.5">
          {label}
        </li>
      ))}
    </ul>
  </article>
)

export const MakerGrid = ({ makers }: { makers: Maker[] }) =>
  makers.length ? (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {makers.map((m) => (
        <MakerCard key={m.id} maker={m} />
      ))}
    </div>
  ) : (
    <p className="text-muted">該当する施設はまだ掲載していない。</p>
  )
