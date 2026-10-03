import Link from "next/link"
import { ArticleGrid } from "@/components/articles/article-card"
import { Section } from "@/components/elements/layout"
import { MakerGrid } from "@/components/makers/maker-card"
import { MakerMap } from "@/components/makers/maker-map"
import { getAreas, getArticles, getMakers, getTypes } from "@/lib/data"
import { JsonLd, SITE_NAME, SITE_URL, SUBCOPY, TAGLINE } from "@/lib/seo"

export const metadata = { alternates: { canonical: "/" } }

const Page = async () => {
  const makers = getMakers()
  const articles = await getArticles()
  const visited = makers
    .filter((m) => m.firstVisitedAt)
    .sort((a, b) => b.firstVisitedAt!.localeCompare(a.firstVisitedAt!))
  const count = (pred: (m: (typeof makers)[number]) => boolean) =>
    makers.filter(pred).length

  return (
    <>
      <JsonLd
        data={{
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          description: SUBCOPY,
        }}
      />
      <section className="-mx-4 -mt-10 bg-ink px-4 py-28 text-paper sm:py-40">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm tracking-[0.3em] uppercase opacity-70">
            {SITE_NAME}
          </p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
            {TAGLINE}
          </h1>
          <p className="mt-6 text-lg opacity-80">{SUBCOPY}</p>
        </div>
      </section>

      <Section title={`${SITE_NAME}とは`}>
        <p className="max-w-2xl leading-loose">
          東京23区に存在する醸造所・蒸留所を探し、実際に訪問し、その場所で行われている酒造りを記録するWebメディア。施設情報だけでなく、東京の街を歩きながら酒が生まれる場所を訪ねる。
        </p>
      </Section>

      <Section title="東京23区の醸造所・蒸留所" more="/makers/">
        <MakerGrid makers={makers.slice(0, 6)} />
      </Section>

      <Section title="Map" more="/map/">
        <MakerMap makers={makers} />
      </Section>

      {visited.length > 0 && (
        <Section title="最近訪問した場所">
          <MakerGrid makers={visited.slice(0, 3)} />
        </Section>
      )}

      <Section title="最新の訪問記事" more="/articles/">
        <ArticleGrid articles={articles.slice(0, 3)} />
      </Section>

      <Section title="区から探す" more="/areas/">
        <ul className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4 lg:grid-cols-6">
          {getAreas().map((a) => (
            <li key={a.slug}>
              <Link href={`/areas/${a.slug}/`} className="hover:text-copper">
                {a.name}{" "}
                <span className="text-muted">
                  {count((m) => m.ward === a.slug)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="酒類から探す" more="/types/">
        <ul className="flex flex-wrap gap-2 text-sm">
          {getTypes().map((t) => (
            <li key={t.slug}>
              <Link
                href={`/types/${t.slug}/`}
                className="block border border-ink px-3 py-1 hover:bg-ink hover:text-paper"
              >
                {t.name} {count((m) => m.types.includes(t.slug))}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

export default Page
