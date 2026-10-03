import type { Metadata } from "next"
import Link from "next/link"

export const SITE_NAME = "ReBrew & ReDistill"
export const TAGLINE = "酒造りを歩く。"
export const SUBCOPY = "東京23区の醸造所・蒸留所を訪ねる。"
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rbrd.reload.co.jp"
).replace(/\/$/, "")

export const pageMeta = (
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "website",
    ...(image && { images: [image] }),
  },
})

export const JsonLd = ({ data }: { data: object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        ...data,
      }).replace(/</g, "\\u003c"),
    }}
  />
)

export const Breadcrumbs = ({
  items,
}: {
  items: { name: string; path: string }[]
}) => {
  const all = [{ name: "ホーム", path: "/" }, ...items]
  return (
    <nav aria-label="パンくずリスト" className="mb-8 text-xs text-muted">
      <ol className="flex flex-wrap gap-2">
        {all.map((c, i) => (
          <li key={c.path} className="flex gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page">{c.name}</span>
            ) : (
              <Link href={c.path} className="hover:text-ink">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: SITE_URL + c.path,
          })),
        }}
      />
    </nav>
  )
}
