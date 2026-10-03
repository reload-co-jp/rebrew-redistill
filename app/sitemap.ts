import type { MetadataRoute } from "next"
import { getAreas, getArticles, getMakers, getTypes } from "@/lib/data"
import { SITE_URL } from "@/lib/seo"

export const dynamic = "force-static"

const sitemap = async (): Promise<MetadataRoute.Sitemap> => [
  ...["/", "/makers/", "/articles/", "/areas/", "/types/", "/map/"].map(
    (p) => ({ url: SITE_URL + p })
  ),
  ...getMakers().map((m) => ({
    url: `${SITE_URL}/makers/${m.id}/`,
    lastModified: m.updatedAt,
  })),
  ...(await getArticles()).map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}/`,
    lastModified: a.updatedAt,
  })),
  ...getAreas().map((a) => ({ url: `${SITE_URL}/areas/${a.slug}/` })),
  ...getTypes().map((t) => ({ url: `${SITE_URL}/types/${t.slug}/` })),
]
export default sitemap
