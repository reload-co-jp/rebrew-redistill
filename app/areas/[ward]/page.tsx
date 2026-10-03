import Link from "next/link"
import { ArticleGrid } from "@/components/articles/article-card"
import { PageTitle, Section } from "@/components/elements/layout"
import { MakerGrid } from "@/components/makers/maker-card"
import { MakerMap } from "@/components/makers/maker-map"
import { getArea, getAreas, getArticles, getMakers, getTypes } from "@/lib/data"
import { Breadcrumbs, pageMeta } from "@/lib/seo"

type Props = { params: Promise<{ ward: string }> }

export const dynamicParams = false
export const generateStaticParams = () =>
  getAreas().map((a) => ({ ward: a.slug }))

export const generateMetadata = async ({ params }: Props) => {
  const a = getArea((await params).ward)!
  return pageMeta(
    `${a.name}の醸造所・蒸留所一覧｜東京23区`,
    `${a.name}のブルワリー・酒蔵・蒸留所と訪問記事。${a.description}`,
    `/areas/${a.slug}/`
  )
}

const Page = async ({ params }: Props) => {
  const a = getArea((await params).ward)!
  const makers = getMakers().filter((m) => m.ward === a.slug)
  const ids = makers.map((m) => m.id)
  const articles = (await getArticles()).filter((x) =>
    x.makerIds.some((id) => ids.includes(id))
  )
  const byType = getTypes()
    .map((t) => ({
      ...t,
      n: makers.filter((m) => m.types.includes(t.slug)).length,
    }))
    .filter((t) => t.n)

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "区", path: "/areas/" },
          { name: a.name, path: `/areas/${a.slug}/` },
        ]}
      />
      <PageTitle title={`${a.name}の醸造所・蒸留所`} lead={a.description} />
      {makers.length > 0 && <MakerMap makers={makers} />}
      {byType.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2 text-sm">
          {byType.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/types/${t.slug}/`}
                className="block border border-ink px-3 py-1 hover:bg-ink hover:text-paper"
              >
                {t.name} {t.n}
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
    </>
  )
}

export default Page
