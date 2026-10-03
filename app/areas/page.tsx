import Link from "next/link"
import { PageTitle } from "@/components/elements/layout"
import { getAreas, getMakers } from "@/lib/data"
import { Breadcrumbs, pageMeta } from "@/lib/seo"

const TITLE = "東京23区から探す"

export const metadata = pageMeta(
  TITLE,
  "東京23区ごとの醸造所・蒸留所一覧。",
  "/areas/"
)

const Page = () => {
  const makers = getMakers()
  return (
    <>
      <Breadcrumbs items={[{ name: "区", path: "/areas/" }]} />
      <PageTitle title={TITLE} />
      <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {getAreas().map((a) => (
          <li key={a.slug} className="bg-paper">
            <Link
              href={`/areas/${a.slug}/`}
              className="block p-5 hover:text-copper"
            >
              <span className="flex items-baseline justify-between">
                <span className="text-lg font-bold">{a.name}</span>
                <span className="text-sm text-muted">
                  {makers.filter((m) => m.ward === a.slug).length}件
                </span>
              </span>
              <span className="mt-1 block text-xs text-muted">
                {a.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Page
