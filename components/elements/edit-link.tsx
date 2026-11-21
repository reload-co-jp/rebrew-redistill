"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

// dev 専用: 表示中のスポット・記事を管理画面で開く
export const EditLink = () => {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null
  const m = pathname.match(/^\/(makers|articles)\/([a-z0-9-]+)\/?$/)
  const href = m
    ? `/admin/?path=${m[1]}/${m[2]}.${m[1] === "makers" ? "json" : "mdx"}`
    : "/admin/"
  return (
    <Link
      href={href}
      className="fixed right-4 bottom-4 z-[1000] bg-ink px-4 py-2 text-sm text-paper shadow"
    >
      {m ? "編集" : "管理"}
    </Link>
  )
}
