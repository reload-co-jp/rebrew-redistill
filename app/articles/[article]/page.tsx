import Link from "next/link"
import { ArticleGrid } from "@/components/articles/article-card"
import { Section } from "@/components/elements/layout"
import { MakerGrid } from "@/components/makers/maker-card"
import { getArticle, getArticles, getMaker, getMakers } from "@/lib/data"
import { Breadcrumbs, JsonLd, SITE_NAME, SITE_URL, pageMeta } from "@/lib/seo"

type Props = { params: Promise<{ article: string }> }

export const dynamicParams = false
export const generateStaticParams = async () =>
  (await getArticles()).map((a) => ({ article: a.slug }))

export const generateMetadata = async ({ params }: Props) => {
  const { article } = await getArticle((await params).article)
  return {
    ...pageMeta(
      article.title,
      article.excerpt,
      `/articles/${article.slug}/`,
      article.thumbnail
    ),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/articles/${article.slug}/`,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      ...(article.thumbnail && { images: [article.thumbnail] }),
    },
  }
}

const Page = async ({ params }: Props) => {
  const { article, Content } = await getArticle((await params).article)
  const makers = article.makerIds.flatMap((id) => getMaker(id) ?? [])
  const related = getMakers().filter(
    (m) =>
      !article.makerIds.includes(m.id) &&
      makers.some(
        (x) => x.ward === m.ward || x.types.some((t) => m.types.includes(t))
      )
  )
  const others = (await getArticles()).filter(
    (a) =>
      a.slug !== article.slug &&
      a.makerIds.some((id) => article.makerIds.includes(id))
  )

  return (
    <>
      <JsonLd
        data={{
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          image: article.thumbnail ? [SITE_URL + article.thumbnail] : undefined,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
          mainEntityOfPage: `${SITE_URL}/articles/${article.slug}/`,
          about: makers.map((m) => ({
            "@type": "LocalBusiness",
            name: m.name,
            url: `${SITE_URL}/makers/${m.id}/`,
          })),
        }}
      />
      <Breadcrumbs
        items={[
          { name: "訪問記事", path: "/articles/" },
          { name: article.title, path: `/articles/${article.slug}/` },
        ]}
      />
      <article className="mx-auto max-w-3xl">
        <header>
          <h1 className="text-3xl leading-snug font-bold tracking-tight sm:text-4xl">
            {article.title}
          </h1>
          {article.thumbnail && (
            <img
              src={article.thumbnail}
              alt=""
              className="-mx-4 mt-8 w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:w-full"
            />
          )}
          <dl className="mt-6 grid grid-cols-[6rem_1fr] gap-y-1 text-sm">
            {article.visitedAt && (
              <>
                <dt className="text-muted">訪問日</dt>
                <dd>
                  <time dateTime={article.visitedAt}>{article.visitedAt}</time>
                </dd>
              </>
            )}
            <dt className="text-muted">公開日</dt>
            <dd>
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            </dd>
            <dt className="text-muted">訪問した施設</dt>
            <dd>
              {makers.map((m, i) => (
                <span key={m.id}>
                  {i > 0 && "、"}
                  <Link href={`/makers/${m.id}/`} className="underline">
                    {m.name}
                  </Link>
                </span>
              ))}
            </dd>
          </dl>
          <p className="mt-6 leading-loose">{article.excerpt}</p>
        </header>
        <div className="prose-article">
          <Content />
        </div>
        {article.tags.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2 text-xs">
            {article.tags.map((t) => (
              <li key={t} className="border border-line px-2 py-0.5">
                #{t}
              </li>
            ))}
          </ul>
        )}
      </article>

      <Section title="訪問した施設">
        <MakerGrid makers={makers} />
      </Section>
      {related.length > 0 && (
        <Section title="関連する醸造所・蒸留所">
          <MakerGrid makers={related.slice(0, 6)} />
        </Section>
      )}
      {others.length > 0 && (
        <Section title="同じ施設の訪問記事">
          <ArticleGrid articles={others} />
        </Section>
      )}
    </>
  )
}

export default Page
