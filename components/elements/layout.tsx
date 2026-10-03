import Link from "next/link"
import { SITE_NAME, TAGLINE } from "@/lib/seo"

const NAV = [
  ["/makers/", "醸造所・蒸留所"],
  ["/articles/", "訪問記事"],
  ["/areas/", "区"],
  ["/types/", "酒類"],
  ["/map/", "地図"],
] as const

export const Header = () => (
  <header className="border-b border-line">
    <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-5">
      <Link href="/" className="leading-tight">
        <span className="block text-xl font-bold tracking-tight">
          {SITE_NAME}
        </span>
        <span className="block text-xs text-muted">{TAGLINE}</span>
      </Link>
      <nav aria-label="メイン">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {NAV.map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="hover:text-copper">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
)

export const Footer = () => (
  <footer className="mt-24 bg-ink text-paper">
    <div className="mx-auto max-w-6xl px-4 py-12 text-sm leading-relaxed">
      <p className="text-lg font-bold">{SITE_NAME}</p>
      <p>{TAGLINE}</p>
      <p className="mt-6 text-xs opacity-70">Tokyo, Japan</p>
    </div>
  </footer>
)

export const Section = ({
  title,
  more,
  children,
}: {
  title: string
  more?: string
  children: React.ReactNode
}) => (
  <section className="mt-20">
    <div className="mb-6 flex items-baseline justify-between border-b border-ink pb-2">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {more && (
        <Link href={more} className="text-sm hover:text-copper">
          すべて見る →
        </Link>
      )}
    </div>
    {children}
  </section>
)

export const PageTitle = ({
  title,
  lead,
}: {
  title: string
  lead?: string
}) => (
  <header className="mb-10">
    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
    {lead && <p className="mt-3 text-muted">{lead}</p>}
  </header>
)
