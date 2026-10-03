import Link from "next/link"
import { PageTitle } from "@/components/elements/layout"
import { CATEGORY_LABEL, getMakers, getTypes } from "@/lib/data"
import { Breadcrumbs, pageMeta } from "@/lib/seo"

const TITLE = "酒類から探す"

export const metadata = pageMeta(
  TITLE,
  "ビール・日本酒・ジン・ウイスキーなど酒類別に東京23区の醸造所・蒸留所を探す。",
  "/types/"
)

const Page = () => {
  const makers = getMakers()
  return (
    <>
      <Breadcrumbs items={[{ name: "酒類", path: "/types/" }]} />
      <PageTitle title={TITLE} />
      {(["brewery", "distillery"] as const).map((c) => (
        <section key={c} className="mb-12">
          <h2 className="mb-4 border-b border-ink pb-2 text-xl font-bold">
            {CATEGORY_LABEL[c]}
          </h2>
          <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {getTypes()
              .filter((t) => t.category === c)
              .map((t) => (
                <li key={t.slug} className="bg-paper">
                  <Link
                    href={`/types/${t.slug}/`}
                    className="flex items-baseline justify-between p-5 hover:text-copper"
                  >
                    <span className="text-lg font-bold">{t.name}</span>
                    <span className="text-sm text-muted">
                      {makers.filter((m) => m.types.includes(t.slug)).length}件
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  )
}

export default Page
