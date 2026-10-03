// dev 専用管理画面のファイル操作（data/ 配下の makers/*.json と articles/*.mdx のみ）
import fs from "node:fs"
import path from "node:path"

const DATA = path.join(process.cwd(), "data")
const VALID = /^(makers\/[a-z0-9-]+\.json|articles\/[a-z0-9-]+\.mdx)$/

export const isValidPath = (p: string) => VALID.test(p)

export const listDataFiles = () =>
  ["makers", "articles"].flatMap((dir) =>
    fs
      .readdirSync(path.join(DATA, dir))
      .map((f) => `${dir}/${f}`)
      .filter(isValidPath)
      .map((p) => ({
        path: p,
        content: fs.readFileSync(path.join(DATA, p), "utf8"),
      }))
  )

export const writeDataFile = (p: string, content: string) => {
  if (p.endsWith(".json")) JSON.parse(content) // 壊れた JSON は保存しない
  fs.writeFileSync(path.join(DATA, p), content)
}

export const deleteDataFile = (p: string) => fs.rmSync(path.join(DATA, p))

// 画像は public/images/ に保存し、サイト上のパス（/images/xxx）を返す
const IMAGES = path.join(process.cwd(), "public", "images")
const IMAGE_NAME = /^[a-z0-9-]+\.(jpe?g|png|webp|gif|avif)$/

export const saveImage = async (file: File) => {
  const name = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")
  if (!IMAGE_NAME.test(name)) throw new Error("jpg/png/webp/gif/avif のみ")
  fs.mkdirSync(IMAGES, { recursive: true })
  if (fs.existsSync(path.join(IMAGES, name)))
    throw new Error(`${name} は既に存在`)
  // flag "wx": 既存ファイルは上書きしない
  fs.writeFileSync(
    path.join(IMAGES, name),
    Buffer.from(await file.arrayBuffer()),
    { flag: "wx" }
  )
  return `/images/${name}`
}

export const listImages = () =>
  fs.existsSync(IMAGES)
    ? fs
        .readdirSync(IMAGES)
        .filter((f) => IMAGE_NAME.test(f))
        .map((f) => `/images/${f}`)
    : []

export const deleteImage = (src: string) => {
  const name = src.replace(/^\/images\//, "")
  if (!IMAGE_NAME.test(name)) throw new Error("invalid image")
  fs.rmSync(path.join(IMAGES, name))
}
