"use client"

import { comment } from "@/lib/queries"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Star, ThumbsUp, Trash2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type UserComment = Awaited<ReturnType<typeof comment.getAll>>[number]

const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date)

    if (isNaN(parsedDate.getTime())) {
        return "تاریخ نامعتبر"
    }

    return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(parsedDate)
}

export default function CommentsGrid({ initialComments }: { initialComments: UserComment[] }) {

    console.log(initialComments)

    const [removingId, setRemovingId] = useState<string | null>(null)

    const queryClient = useQueryClient()

    const { mutate: removeComment, isPending } = useMutation({
        mutationKey: ["removeComment"],
        mutationFn: comment.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getComment"] });
            toast.success("از علاقه مندی ها حذف شد", {
                position: "bottom-left", style: {
                    background: "#98e897",
                    color: "#ffffff",
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px"
                },
            })
        }
    })


    if (initialComments?.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <span className="text-3xl">✎</span>
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-900">هنوز دیدگاهی ثبت نکرده‌اید</h2>
                <p className="mt-2 text-sm text-slate-500">پس از خرید، تجربه‌تان را با دیگران به اشتراک بگذارید.</p>
            </div>
        )
    }

    return (
        <div className="space-y-5">
            {initialComments?.map((item) => {
                const image = item.product.productImage[0]

                return (
                    <article key={item.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70">
                        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
                            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-28 sm:w-28">
                                {image?.url ? (
                                    <Image
                                        src={image.url}
                                        alt={image.altText || item.product.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-xs text-slate-400">بدون تصویر</div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                    <div>
                                        <p className="text-xs font-semibold text-red-500">دیدگاه درباره محصول</p>
                                        <h2 className="mt-1 text-lg font-bold text-slate-900">{item.product.title}</h2>
                                        <time
                                            dateTime={new Date(item.createdAt).toISOString()}
                                            className="mt-1 block text-xs text-slate-400"
                                        >
                                            {formatDate(item.createdAt)}
                                        </time>
                                    </div>
                                    <div className="flex w-fit items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-amber-600" aria-label={`امتیاز ${item.rate} از ۵`}>
                                        <Star className="size-3.5 fill-current" />
                                        <span className="text-xs font-bold">{item.rate} از ۵</span>
                                    </div>
                                </div>

                                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">{item.content}</p>

                                {(item.strength || item.weakness) && (
                                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                        {item.strength && (
                                            <div className="rounded-xl bg-emerald-50/70 px-3 py-2.5">
                                                <span className="text-xs font-semibold text-emerald-700">نقاط قوت</span>
                                                <p className="mt-1 text-xs leading-6 text-emerald-900/70">{item.strength}</p>
                                            </div>
                                        )}
                                        {item.weakness && (
                                            <div className="rounded-xl bg-rose-50/70 px-3 py-2.5">
                                                <span className="text-xs font-semibold text-rose-700">نقاط ضعف</span>
                                                <p className="mt-1 text-xs leading-6 text-rose-900/70">{item.weakness}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                                    {item.recommendation ? (
                                        <span className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                                            <ThumbsUp className="size-3.5" />
                                            این محصول را پیشنهاد می‌کنم
                                        </span>
                                    ) : (
                                        <span />
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/product/${item.product.id}`}
                                            className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-500"
                                        >
                                            مشاهده محصول
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => removeComment({ commentId: item.id })}
                                            disabled={removingId === item.id}
                                            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-wait disabled:opacity-60"
                                        >
                                            <Trash2 className="size-3.5" />
                                            {removingId === item.id ? "در حال حذف..." : "حذف"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}
