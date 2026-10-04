import type { Metadata } from "next"
import Script from "next/script"
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
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-G5E3K7JD4L" strategy="afterInteractive" />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-G5E3K7JD4L');`}
      </Script>
    </body>
  </html>
)
export default RootLayout
