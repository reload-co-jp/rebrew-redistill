import createMDX from "@next/mdx"
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js"

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

// *.dev.tsx / *.dev.ts は dev サーバーのみでルート化（/admin/ 管理画面）
export default (phase) =>
  createMDX()({
    ...nextConfig,
    pageExtensions:
      phase === PHASE_DEVELOPMENT_SERVER
        ? ["dev.tsx", "dev.ts", "tsx", "ts"]
        : ["tsx", "ts"],
  })
