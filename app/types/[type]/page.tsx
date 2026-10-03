import Link from "next/link"
import { ArticleGrid } from "@/components/articles/article-card"
import { PageTitle, Section } from "@/components/elements/layout"
import { MakerGrid } from "@/components/makers/maker-card"
import { MakerMap } from "@/components/makers/maker-map"
import { getAreas, getArticles, getMakers, getType, getTypes } from "@/lib/data"
import { Breadcrumbs, pageMeta } from "@/lib/seo"

type Props = { params: Promise<{ type: string }> }

export const dynamicParams = false
export const generateStaticParams = () =>
  getTypes().map((t) => ({ type: t.slug }))

export const generateMetadata = async ({ params }: Props) => {
  const t = getType((await params).type)!
  return pageMeta(
    `東京23区の${t.label}一覧`,
    `東京23区で${t.name}を造る${t.label}の一覧と訪問記事。`,
    `/types/${t.slug}/`
  )
}

const Page = async ({ params }: Props) => {
  const t = getType((await params).type)!
  const makers = getMakers().filter((m) => m.types.includes(t.slug))
  const ids = makers.map((m) => m.id)
  const articles = (await getArticles()).filter((x) =>
    x.makerIds.some((id) => ids.includes(id))
  )
  const byWard = getAreas()
    .map((a) => ({ ...a, n: makers.filter((m) => m.ward === a.slug).length }))
    .filter((a) => a.n)
  const products = makers.flatMap((m) =>
    (m.products ?? [])
      .filter((p) => !p.type || p.type === t.slug)
      .map((p) => ({ ...p, maker: m }))
  )

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "酒類", path: "/types/" },
          { name: t.name, path: `/types/${t.slug}/` },
        ]}
      />
      <PageTitle title={`東京23区の${t.label}`} />
      {makers.length > 0 && <MakerMap makers={makers} />}
      {byWard.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2 text-sm">
          {byWard.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/areas/${a.slug}/`}
                className="block border border-ink px-3 py-1 hover:bg-ink hover:text-paper"
              >
                {a.name} {a.n}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Section title="施設一覧">
        <MakerGrid makers={makers} />
      </Section>
      <Section title="訪問記事">
        <ArticleGrid articles={articles} />
      </Section>
      {products.length > 0 && (
        <Section title="関連商品">
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            {products.map((p) => (
              <li key={p.maker.id + p.name}>
                {p.name}{" "}
                <Link
                  href={`/makers/${p.maker.id}/`}
                  className="text-muted underline"
                >
                  {p.maker.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  )
}

export default Page
