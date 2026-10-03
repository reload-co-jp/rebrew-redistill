"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

type DataFile = { path: string; content: string }

const today = () => new Date().toISOString().slice(0, 10)

const template = (dir: string, id: string) =>
  dir === "makers"
    ? JSON.stringify(
        {
          id,
          name: "",
          category: "brewery",
          types: [],
          ward: "",
          address: "",
          createdAt: today(),
          updatedAt: today(),
        },
        null,
        2
      ) + "\n"
    : `export const metadata = {
  title: "",
  makerIds: [],
  publishedAt: "${today()}",
  excerpt: "",
  tags: [],
  updatedAt: "${today()}",
}

## 概要
`

const api = (method: string, body: object) =>
  fetch("/admin/api/", { method, body: JSON.stringify(body) }).then(
    async (r) => (r.ok ? null : ((await r.json()).error as string))
  )

export const Editor = ({
  files,
  images,
}: {
  files: DataFile[]
  images: string[]
}) => {
  const router = useRouter()
  const [current, setCurrent] = useState<DataFile | null>(null)
  const [message, setMessage] = useState("")
  const textarea = useRef<HTMLTextAreaElement>(null)

  const open = (f: DataFile) => {
    setCurrent(f)
    setMessage("")
  }
  const create = (dir: string) => {
    const id = prompt("ID（英小文字・数字・ハイフン）")
    if (!id) return
    const path = `${dir}/${id}.${dir === "makers" ? "json" : "mdx"}`
    if (files.some((f) => f.path === path)) return setMessage("既に存在")
    open({ path, content: template(dir, id) })
  }
  const save = async () => {
    const error = await api("PUT", current)
    setMessage(error ?? `保存: ${current.path}`)
    router.refresh()
  }
  const remove = async () => {
    if (!confirm(`${current.path} を削除？`)) return
    const error = await api("DELETE", { path: current.path })
    setMessage(error ?? `削除: ${current.path}`)
    if (!error) setCurrent(null)
    router.refresh()
  }
  const upload = async (file: File) => {
    const body = new FormData()
    body.append("file", file)
    const res = await fetch("/admin/api/", { method: "POST", body })
    const { src, error } = await res.json()
    if (error) return setMessage(error)
    insert(src)
    setMessage(`アップロード: ${src}`)
    router.refresh()
  }
  // カーソル位置に画像パスを挿入（MDX は Markdown 画像記法）
  const insert = (src: string) => {
    const text = current.path.endsWith(".mdx") ? `![](${src})` : src
    const { selectionStart: a, selectionEnd: b } = textarea.current
    const c = current.content
    setCurrent({ ...current, content: c.slice(0, a) + text + c.slice(b) })
  }
  const usedBy = (src: string) =>
    files.filter((f) => f.content.includes(src)).map((f) => f.path)
  const removeImage = async (src: string) => {
    const used = usedBy(src)
    const warn = used.length ? `\n使用中: ${used.join(", ")}` : ""
    if (!confirm(`${src} を削除？${warn}`)) return
    const error = await api("DELETE", { image: src })
    setMessage(error ?? `削除: ${src}`)
    router.refresh()
  }

  return (
    <div className="grid gap-8 md:grid-cols-[16rem_1fr]">
      <nav aria-label="データ" className="space-y-6 text-sm">
        {(["makers", "articles"] as const).map((dir) => (
          <section key={dir}>
            <h2 className="mb-2 flex justify-between font-bold">
              {dir === "makers" ? "スポット" : "記事"}
              <button className="text-copper" onClick={() => create(dir)}>
                ＋新規
              </button>
            </h2>
            <ul className="space-y-1">
              {files
                .filter((f) => f.path.startsWith(dir))
                .map((f) => (
                  <li key={f.path}>
                    <button
                      className={
                        f.path === current?.path
                          ? "text-copper"
                          : "hover:text-copper"
                      }
                      onClick={() => open(f)}
                    >
                      {f.path.slice(dir.length + 1)}
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        ))}
        <section>
          <h2 className="mb-2 font-bold">画像</h2>
          <ul className="grid grid-cols-3 gap-2">
            {images.map((src) => (
              <li key={src} className="relative">
                <button
                  className="block w-full"
                  title={current ? `${src} を挿入` : src}
                  disabled={!current}
                  onClick={() => insert(src)}
                >
                  <img
                    src={src}
                    alt={src}
                    className={`aspect-square w-full object-cover ${usedBy(src).length ? "" : "opacity-50"}`}
                  />
                </button>
                <button
                  aria-label={`${src} を削除`}
                  className="absolute top-0 right-0 bg-ink px-1 text-xs text-paper"
                  onClick={() => removeImage(src)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </section>
      </nav>
      <div>
        {message && <p className="mb-2 text-sm text-muted">{message}</p>}
        {current && (
          <>
            <div className="mb-2 flex items-center gap-4 text-sm">
              <code className="flex-1">data/{current.path}</code>
              <label className="cursor-pointer border border-line px-3 py-1">
                画像
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    e.target.value = ""
                    if (file) upload(file)
                  }}
                />
              </label>
              <button className="border border-line px-3 py-1" onClick={remove}>
                削除
              </button>
              <button className="bg-ink px-3 py-1 text-paper" onClick={save}>
                保存
              </button>
            </div>
            <textarea
              ref={textarea}
              aria-label="内容"
              className="h-[70vh] w-full border border-line bg-white p-3 font-mono text-sm"
              value={current.content}
              onChange={(e) =>
                setCurrent({ ...current, content: e.target.value })
              }
            />
          </>
        )}
      </div>
    </div>
  )
}
