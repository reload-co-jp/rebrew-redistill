import { ArticleGrid } from "@/components/articles/article-card"
import { PageTitle } from "@/components/elements/layout"
import { getArticles } from "@/lib/data"
import { Breadcrumbs, pageMeta } from "@/lib/seo"

const TITLE = "訪問記事"

export const metadata = pageMeta(
  TITLE,
  "東京23区の醸造所・蒸留所を実際に訪ねた記録。",
  "/articles/"
)

const Page = async () => (
  <>
    <Breadcrumbs items={[{ name: TITLE, path: "/articles/" }]} />
    <PageTitle title={TITLE} lead="酒造りの現場を歩いた記録。" />
    <ArticleGrid articles={await getArticles()} />
  </>
)

export default Page
