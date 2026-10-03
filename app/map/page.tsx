import { PageTitle } from "@/components/elements/layout"
import { MakerExplorer } from "@/components/makers/maker-explorer"
import { explorerIds, getArticles, getMakers } from "@/lib/data"
import { Breadcrumbs, pageMeta } from "@/lib/seo"

const TITLE = "東京23区 醸造所・蒸留所マップ"

export const metadata = pageMeta(
  TITLE,
  "東京23区の醸造所・蒸留所を地図で探す。",
  "/map/"
)

const Page = async () => {
  const makers = getMakers()
  const articles = await getArticles()
  return (
    <>
      <Breadcrumbs items={[{ name: "地図", path: "/map/" }]} />
      <PageTitle title={TITLE} />
      <MakerExplorer
        makers={makers}
        view="map"
        {...explorerIds(makers, articles)}
      />
    </>
  )
}

export default Page
