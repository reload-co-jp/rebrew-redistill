import { PageTitle } from "@/components/elements/layout"
import { MakerExplorer } from "@/components/makers/maker-explorer"
import { explorerIds, getArticles, getMakers } from "@/lib/data"
import { Breadcrumbs, pageMeta } from "@/lib/seo"

const TITLE = "東京23区の醸造所・蒸留所"

export const metadata = pageMeta(
  TITLE,
  "東京23区のブルワリー・酒蔵・蒸留所を区・酒類・見学可否などで絞り込んで探す。",
  "/makers/"
)

const Page = async () => {
  const makers = getMakers()
  const articles = await getArticles()
  return (
    <>
      <Breadcrumbs items={[{ name: TITLE, path: "/makers/" }]} />
      <PageTitle title={TITLE} />
      <MakerExplorer
        makers={makers}
        view="list"
        {...explorerIds(makers, articles)}
      />
    </>
  )
}

export default Page
