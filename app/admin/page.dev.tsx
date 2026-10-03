import { Editor } from "./editor"
import { listDataFiles, listImages } from "./files"

export const metadata = { title: "管理", robots: { index: false } }

const Page = () => <Editor files={listDataFiles()} images={listImages()} />

export default Page
