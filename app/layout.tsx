import type { Metadata } from "next"
import { Footer, Header } from "@/components/elements/layout"
import { SITE_NAME, SITE_URL, SUBCOPY, TAGLINE } from "@/lib/seo"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME}｜${TAGLINE}`, template: `%s｜${SITE_NAME}` },
  description: SUBCOPY,
  openGraph: { siteName: SITE_NAME, locale: "ja_JP", type: "website" },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ja">
    <body className="antialiased">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <Footer />
    </body>
  </html>
)
export default RootLayout
