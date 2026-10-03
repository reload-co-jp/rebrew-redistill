import Link from "next/link"
import { notFound } from "next/navigation"
import { ArticleGrid } from "@/components/articles/article-card"
import { PageTitle, Section } from "@/components/elements/layout"
import { FEATURES, MakerGrid } from "@/components/makers/maker-card"
import { MakerMap } from "@/components/makers/maker-map"
import {
  CATEGORY_LABEL,
  articlesFor,
  getArea,
  getArticles,
  getMaker,
  getMakers,
  getType,
} from "@/lib/data"
import { Breadcrumbs, JsonLd, SITE_URL, pageMeta } from "@/lib/seo"

type Props = { params: Promise<{ maker: string }> }

export const dynamicParams = false
export const generateStaticParams = () =>
  getMakers().map((m) => ({ maker: m.id }))

const subtitle = (id: string) => {
  const m = getMaker(id)!
  const t = getType(m.types[0])
  return `${getArea(m.ward)?.name}の${t?.label ?? CATEGORY_LABEL[m.category]}`
}

export const generateMetadata = async ({ params }: Props) => {
  const { maker } = await params
  const m = getMaker(maker)
  if (!m) return {}
  return pageMeta(
    `${m.name}｜${subtitle(m.id)}`,
    m.description ?? `${m.name}（${subtitle(m.id)}）の施設情報と訪問記録。`,
    `/makers/${m.id}/`,
    m.images?.[0]?.src
  )
}

const Row = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) =>
  children ? (
    <div className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-3 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  ) : null

const ext = (href?: string) =>
  href && (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-all underline"
    >
      {href}
    </a>
  )

const Page = async ({ params }: Props) => {
  const { maker } = await params
  const m = getMaker(maker)
  if (!m) notFound()
  const area = getArea(m.ward)!
  const articles = articlesFor(await getArticles(), m.id)
  const related = getMakers().filter(
    (x) =>
      x.id !== m.id &&
      (x.ward === m.ward || x.types.some((t) => m.types.includes(t)))
  )
  const sns = Object.values(m.sns ?? {}).filter(Boolean)

  return (
    <>
      <JsonLd
        data={{
          "@type": m.category === "brewery" ? "Brewery" : "LocalBusiness",
          name: m.name,
          description: m.description,
          url: `${SITE_URL}/makers/${m.id}/`,
          image: m.images?.map((i) => i.src),
          address: {
            "@type": "PostalAddress",
            streetAddress: m.address,
            addressRegion: "東京都",
            addressLocality: area.name,
            addressCountry: "JP",
          },
          ...(m.latitude && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: m.latitude,
              longitude: m.longitude,
            },
          }),
          openingHours: m.openingHours,
          sameAs: [m.website, ...sns].filter(Boolean),
        }}
      />
      <Breadcrumbs
        items={[
          { name: "醸造所・蒸留所", path: "/makers/" },
          { name: area.name, path: `/areas/${area.slug}/` },
          { name: m.name, path: `/makers/${m.id}/` },
        ]}
      />
      <PageTitle title={m.name} lead={m.description} />

      {m.images?.length ? (
        <div className="-mx-4 mb-12 grid gap-2 sm:mx-0 sm:grid-cols-2">
          {m.images.map((img) => (
            <figure key={img.src}>
              <img src={img.src} alt={img.alt} className="w-full" />
              {img.caption && (
                <figcaption className="mt-1 px-4 text-xs text-muted sm:px-0">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ) : null}

      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <h2 className="mb-2 font-bold">基本情報</h2>
          <dl>
            <Row label="種別">{CATEGORY_LABEL[m.category]}</Row>
            <Row label="酒類">
              {m.types.map((t, i) => (
                <span key={t}>
                  {i > 0 && " / "}
                  <Link href={`/types/${t}/`} className="underline">
                    {getType(t)?.name ?? t}
                  </Link>
                </span>
              ))}
            </Row>
            <Row label="区">
              <Link href={`/areas/${area.slug}/`} className="underline">
                {area.name}
              </Link>
            </Row>
            <Row label="エリア">{m.area}</Row>
            <Row label="住所">{m.address}</Row>
            <Row label="最寄駅">{m.nearestStations?.join("、")}</Row>
            <Row label="営業時間">{m.openingHours}</Row>
            <Row label="定休日">{m.closedDays}</Row>
            <Row label="公式サイト">{ext(m.website)}</Row>
            <Row label="SNS">
              {sns.length > 0 && (
                <ul>
                  {sns.map((s) => (
                    <li key={s}>{ext(s)}</li>
                  ))}
                </ul>
              )}
            </Row>
          </dl>
        </section>
        <MakerMap makers={[m]} className="h-80 lg:h-full" />
      </div>

      <Section title="施設情報">
        <ul className="mb-6 flex flex-wrap gap-2 text-sm">
          {FEATURES.map(([k, label]) => (
            <li
              key={k}
              className={`border px-3 py-1 ${m[k] ? "border-ink" : "border-line text-muted line-through"}`}
            >
              {label}
            </li>
          ))}
        </ul>
        <dl>
          <Row label="製造設備">{m.equipment}</Row>
          <Row label="製造方法">{m.process}</Row>
          <Row label="主な商品">
            {m.products?.length && (
              <ul>
                {m.products.map((p) => (
                  <li key={p.name}>
                    {p.name}
                    {p.description && (
                      <span className="text-muted"> — {p.description}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Row>
        </dl>
      </Section>

      <Section title="ReBrew & ReDistillの記録">
        <dl className="mb-8">
          <Row label="初回訪問日">{m.firstVisitedAt}</Row>
          <Row label="訪問回数">{m.visitCount && `${m.visitCount}回`}</Row>
          <Row label="運営者メモ">{m.memo}</Row>
        </dl>
        <ArticleGrid articles={articles} />
      </Section>

      {related.length > 0 && (
        <Section title="関連する醸造所・蒸留所">
          <MakerGrid makers={related.slice(0, 6)} />
        </Section>
      )}

      <footer className="mt-16 text-xs text-muted">
        <p>情報更新日: {m.updatedAt}</p>
        {m.sourceUrls?.length ? (
          <p className="mt-1">
            情報源:{" "}
            {m.sourceUrls.map((u) => (
              <span key={u} className="mr-2">
                {ext(u)}
              </span>
            ))}
          </p>
        ) : null}
      </footer>
    </>
  )
}

export default Page
