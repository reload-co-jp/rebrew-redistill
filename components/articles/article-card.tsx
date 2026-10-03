import Link from "next/link"
import type { Article } from "@/lib/data"
import { Thumb } from "@/components/makers/maker-card"

export const ArticleCard = ({ article }: { article: Article }) => (
  <article>
    <Link href={`/articles/${article.slug}/`} className="group block">
      <Thumb src={article.thumbnail} alt="" />
      <p className="mt-3 text-xs text-muted">
        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
      </p>
      <h3 className="mt-1 text-lg font-bold group-hover:text-copper">
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-muted">{article.excerpt}</p>
    </Link>
  </article>
)

export const ArticleGrid = ({ articles }: { articles: Article[] }) =>
  articles.length ? (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <ArticleCard key={a.slug} article={a} />
      ))}
    </div>
  ) : (
    <p className="text-muted">訪問記事はまだない。</p>
  )
