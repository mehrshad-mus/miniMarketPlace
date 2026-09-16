import { Star, ThumbsUp } from "lucide-react"
import { productWithBrandAndCategory } from "@/lib/types/types"
import Image from "next/image"

type ProductComment = productWithBrandAndCategory["comment"][number]

const getAuthorName = (comment: ProductComment) =>
    comment.user.name || comment.user.userName || "کاربر"

const formatDate = (date: Date) =>
    new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date))

const Comments = ({ comments = [] }: { comments?: ProductComment[] }) => {
    if (!comments.length) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
                <p className="text-sm font-medium text-slate-700">هنوز دیدگاهی ثبت نشده است</p>
                <p className="mt-1 text-xs text-slate-400">اولین نفری باشید که تجربه‌تان را به اشتراک می‌گذارد.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => {
                const authorName = getAuthorName(comment)
                const initial = authorName.trim().charAt(0)

                return (
                    <article key={comment.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                        <header className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
                                    {comment.user.avatar ? <Image src={comment.user.avatar} alt="avatar" width={40} height={40}/> : initial}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-semibold text-slate-800">{authorName}</h3>
                                    <time dateTime={new Date(comment.createdAt).toISOString()} className="mt-1 block text-xs text-slate-400">
                                        {formatDate(comment.createdAt)}
                                    </time>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-amber-600" aria-label={`امتیاز ${comment.rate} از ۵`}>
                                <Star className="size-3.5 fill-current" />
                                <span className="text-xs font-bold">{comment.rate}</span>
                            </div>
                        </header>

                        <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">{comment.content}</p>

                        {(comment.strength || comment.weakness) && (
                            <div className="mt-4 grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-2">
                                {comment.strength && (
                                    <div className="rounded-xl bg-emerald-50/70 px-3 py-2.5">
                                        <span className="text-xs font-semibold text-emerald-700">نقاط قوت</span>
                                        <p className="mt-1 text-xs leading-6 text-emerald-900/70">{comment.strength}</p>
                                    </div>
                                )}
                                {comment.weakness && (
                                    <div className="rounded-xl bg-rose-50/70 px-3 py-2.5">
                                        <span className="text-xs font-semibold text-rose-700">نقاط ضعف</span>
                                        <p className="mt-1 text-xs leading-6 text-rose-900/70">{comment.weakness}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {comment.recommendation && (
                            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600">
                                <ThumbsUp className="size-3.5" />
                                این محصول را پیشنهاد می‌کند
                            </div>
                        )}
                    </article>
                )
            })}
        </div>
    )
}

export default Comments