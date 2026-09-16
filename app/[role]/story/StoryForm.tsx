"use client"

import Spinner from "@/components/myComponent/Spinner "
import { story } from "@/lib/queries"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"

const IMAGE_MAX_SIZE = 10 * 1024 * 1024
const VIDEO_MAX_SIZE = 50 * 1024 * 1024

export default function StoryForm() {

    const router = useRouter()

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const { mutate, isPending } = useMutation({
        mutationKey: ["createStory"],
        mutationFn: story.create,
        onSuccess: () => {
            toast.success("استوری با موفقیت ساخته شد")
            setTitle("")
            setContent("")
            setFile(null)
            router.refresh()
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "ساخت استوری انجام نشد")
        },
    })

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (!selectedFile) return

        const isImage = selectedFile.type.startsWith("image/")
        const isVideo = selectedFile.type.startsWith("video/")
        const maxSize = isImage ? IMAGE_MAX_SIZE : VIDEO_MAX_SIZE

        if (!isImage && !isVideo) {
            toast.error("فقط فایل تصویری یا ویدیویی مجاز است")
            event.target.value = ""
            return
        }

        if (selectedFile.size > maxSize) {
            toast.error(isImage ? "حجم عکس نباید بیشتر از ۱۰ مگابایت باشد" : "حجم ویدیو نباید بیشتر از ۵۰ مگابایت باشد")
            event.target.value = ""
            return
        }

        setFile(selectedFile)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!file) {
            toast.error("یک عکس یا ویدیو انتخاب کنید")
            return
        }

        mutate({ title, content, file })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 md:p-8">
            <label className="block text-sm font-semibold text-slate-700">
                عنوان استوری
                <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    maxLength={80}
                    required
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400"
                    placeholder="عنوان کوتاه استوری"
                />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
                متن استوری
                <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    maxLength={500}
                    required
                    rows={4}
                    className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none transition focus:border-blue-400"
                    placeholder="متن کوتاه برای نمایش روی استوری"
                />
            </label>

            <label className="block cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-blue-300 hover:bg-red-50/30">
                <span className="text-sm font-semibold text-slate-700">انتخاب عکس یا ویدیو</span>
                <span className="mt-2 block text-xs text-slate-400">عکس تا ۱۰MB، ویدیو تا ۵۰MB</span>
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                    onChange={handleFileChange}
                    className="sr-only"
                />
                {file && <span className="mt-3 block truncate text-xs font-medium text-red-500">{file.name}</span>}
            </label>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-2xl bg-blue-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-400 cursor-pointer disabled:cursor-wait disabled:opacity-60"
            >
                {isPending ? <Spinner /> : "انتشار استوری"}
            </button>
        </form>
    )
}
