"use client"

import { story } from "@/lib/queries"
import { useMutation } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type AdminStory = {
    id: string
    title: string
    content: string
    createdAt: Date
    mediaType: "image" | "video"
    mediaUrl: string
}

export default function StoryAdminList({ stories }: { stories: AdminStory[] }) {
    const router = useRouter()
    const { mutate: removeStory, isPending } = useMutation({
        mutationFn: story.remove,
        onSuccess: () => {
            toast.success("استوری با موفقیت حذف شد")
            router.refresh()
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "حذف استوری انجام نشد")
        },
    })

    return (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70 md:p-8">
            <div className="mb-5">
                <h2 className="text-xl font-black text-slate-900">استوری‌های آپلودشده</h2>
                <p className="mt-1 text-sm text-slate-500">از این بخش می‌توانید هر استوری را حذف کنید.</p>
            </div>

            {!stories.length ? (
                <p className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">هنوز استوری‌ای آپلود نشده است.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {stories.map((item) => (
                        <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200">
                            <div className="h-48 bg-slate-900">
                                {item.mediaType === "video" ? (
                                    <video src={item.mediaUrl} controls className="h-full w-full object-contain" />
                                ) : (
                                    <img src={item.mediaUrl} alt={item.title} className="h-full w-full object-cover" />
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="truncate font-bold text-slate-900">{item.title}</h3>
                                <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">{item.content}</p>
                                <button
                                    type="button"
                                    onClick={() => removeStory(item.id)}
                                    disabled={isPending}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Trash2 className="size-4" />
                                    حذف استوری
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}
