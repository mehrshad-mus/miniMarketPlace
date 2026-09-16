"use client"
import { MessageCircle, Star, X } from "lucide-react"
import { FormEvent, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { comment } from "@/lib/queries"
import { productWithBrandAndCategory, ReviewData } from "@/lib/types/types"
import Spinner from "@/components/myComponent/Spinner "
import Comments from "./Comments"
import { toast } from "sonner"

const initialReview: ReviewData = {
    rating: 0,
    strengths: "",
    recommend: false,
    weaknesses: "",
    content: "",
}

type ProductComment = productWithBrandAndCategory["comment"][number]

const CommentSection = ({ productId, comments = [] }: { productId: string | undefined, comments?: ProductComment[] }) => {

    const queryClient = useQueryClient()

    const commentRef = useRef<HTMLDialogElement>(null)
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [review, setReview] = useState<ReviewData>(initialReview)
    const [isClosing, setIsClosing] = useState(false)

    const { mutate, isPending } = useMutation({
        mutationKey: ["createComment"],
        mutationFn: comment.createComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productForUser", productId] })
            setReview(initialReview)
            closeDialog()
            toast.success("کامنت شما با موفقیت ثبت شد", {
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
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            closeDialog()
            toast.error(error?.message || "خطایی رخ داده است. لطفا دوباره تلاش کنید.", {
                position:"bottom-left", style: {
                    background: "#dc2626",
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

    useEffect(() => {
        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current)
            }
        }
    }, [])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        mutate({ commentData: review, productId })
    }

    const openDialog = () => {
        setIsClosing(false)
        commentRef.current?.showModal()
    }

    const closeDialog = () => {
        if (!commentRef.current?.open || isClosing) return

        setIsClosing(true)
        closeTimerRef.current = setTimeout(() => {
            commentRef.current?.close()
            setIsClosing(false)
            setReview(initialReview)
        }, 180)
    }

    return (
        <section dir="rtl" className="mt-10 w-full rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm md:p-7" aria-labelledby="comments-title">
            <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <MessageCircle className="size-5 text-red-600" />
                        <h2 id="comments-title" className="text-xl font-bold text-slate-900">نظرات کاربران</h2>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">{comments.length}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">تجربه واقعی کاربران درباره این محصول</p>
                </div>
                <Button type="button" onClick={openDialog} className="bg-gray-300 text-black hover:bg-gray-400">
                    ثبت دیدگاه
                </Button>
            </div>

            <div className="mt-6">
                <Comments comments={comments} />
            </div>

            <dialog
                ref={commentRef}
                aria-labelledby="comment-dialog-title"
                onCancel={(event) => {
                    event.preventDefault()
                    closeDialog()
                }}
                className={`m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-gray-100 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/40 ${isClosing ? "comment-dialog--closing" : "comment-dialog--opening"}`}
            >
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                    <div>
                        <h2 id="comment-dialog-title" className="text-lg font-bold">
                            ثبت دیدگاه
                        </h2>
                        <p className="mt-1 text-xs text-gray-500">نظر شما به انتخاب بهتر دیگران کمک می‌کند.</p>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="بستن"
                        onClick={closeDialog}
                    >
                        <X className="size-5" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-5">
                    <fieldset>
                        <legend className="mb-2 text-sm font-medium">امتیاز شما</legend>
                        <div className="flex items-center gap-1" aria-label={`امتیاز ${review.rating} از ۵`}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    aria-label={`${value} ستاره`}
                                    aria-pressed={review.rating === value}
                                    onClick={() => setReview((current) => ({ ...current, rating: value }))}
                                    className="rounded-md p-1 text-gray-300 transition-colors hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                >
                                    <Star className={`size-7 ${value <= review.rating ? "fill-amber-400 text-amber-400" : ""}`} />
                                </button>
                            ))}
                            <span className="mr-2 text-xs text-gray-500">
                                {review.rating ? `${review.rating} از ۵` : "انتخاب کنید"}
                            </span>
                        </div>
                    </fieldset>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-sm font-medium">
                            نقاط قوت
                            <textarea
                                value={review.strengths}
                                onChange={(event) => setReview((current) => ({ ...current, strengths: event.target.value }))}
                                placeholder="چه چیزی را بیشتر دوست داشتید؟"
                                rows={3}
                                className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm font-normal outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400"
                            />
                        </label>
                        <label className="space-y-2 text-sm font-medium">
                            نقاط ضعف
                            <textarea
                                value={review.weaknesses}
                                onChange={(event) => setReview((current) => ({ ...current, weaknesses: event.target.value }))}
                                placeholder="چه چیزی می‌توانست بهتر باشد؟"
                                rows={3}
                                className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm font-normal outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400"
                            />
                        </label>
                    </div>

                    <label className="block space-y-2 text-sm font-medium">
                        دیدگاه کلی
                        <textarea
                            value={review.content}
                            onChange={(event) => setReview((current) => ({ ...current, content: event.target.value }))}
                            placeholder="تجربه‌تان را با دیگران به اشتراک بگذارید..."
                            rows={4}
                            required
                            className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm font-normal outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400"
                        />
                    </label>

                    <div className="flex items-center gap-2">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                className="h-4 w-4 accent-red-500"
                                onChange={(e) => setReview((current) => ({ ...current, recommend: e.target.checked }))}
                            />

                            <span className="text-sm text-gray-600">
                               محصول را به دیگران توصیه می‌کنم
                            </span>
                        </label>
                    </div>


                    <div className="flex gap-3 pt-1">
                        <Button
                            type="submit"
                            disabled={!review.rating || !review.content.trim() || isPending}
                            className="flex-1 bg-red-600 text-white hover:bg-red-500"
                        >
                            {isPending ? <Spinner/> : "ارسال دیدگاه"}
                        </Button>
                        <Button type="button" variant="outline" onClick={closeDialog}>
                            انصراف
                        </Button>
                    </div>
                </form>
            </dialog>

            <style jsx>{`
                dialog::backdrop {
                    opacity: 0;
                    transition: opacity 180ms ease;
                }

                dialog.comment-dialog--opening::backdrop {
                    opacity: 1;
                }

                dialog.comment-dialog--closing::backdrop {
                    opacity: 0;
                }

                @keyframes comment-dialog-enter {
                    from {
                        opacity: 0;
                        transform: translateY(12px) scale(0.97);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes comment-dialog-exit {
                    from {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(12px) scale(0.97);
                    }
                }

                dialog.comment-dialog--opening {
                    animation: comment-dialog-enter 180ms ease-out both;
                }

                dialog.comment-dialog--closing {
                    animation: comment-dialog-exit 180ms ease-in both;
                }

                @media (prefers-reduced-motion: reduce) {
                    dialog.comment-dialog--opening,
                    dialog.comment-dialog--closing,
                    dialog::backdrop {
                        animation: none;
                        transition: none;
                    }
                }
            `}</style>

            
        </section>
    )
}

export default CommentSection