import {
  deleteDataFile,
  deleteImage,
  isValidPath,
  saveImage,
  writeDataFile,
} from "../files"

const handle = async (req: Request, fn: (p: string, c: string) => void) => {
  const { path, content } = (await req.json()) as {
    path: string
    content?: string
  }
  if (!isValidPath(path))
    return Response.json({ error: "invalid path" }, { status: 400 })
  try {
    fn(path, content ?? "")
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 400 })
  }
  return Response.json({ ok: true })
}

export const PUT = (req: Request) => handle(req, writeDataFile)
export const DELETE = async (req: Request) => {
  const { image } = (await req.clone().json()) as { image?: string }
  if (!image) return handle(req, deleteDataFile)
  try {
    deleteImage(image)
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 400 })
  }
  return Response.json({ ok: true })
}

export const POST = async (req: Request) => {
  const file = (await req.formData()).get("file")
  if (!(file instanceof File))
    return Response.json({ error: "no file" }, { status: 400 })
  try {
    return Response.json({ src: await saveImage(file) })
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 400 })
  }
}
