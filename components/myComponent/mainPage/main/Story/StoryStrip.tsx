"use client"

import { story } from "@/lib/queries"
import { useState } from "react"
import { X } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export type StoryItem = {
    id: string
    title: string
    content: string
    createdAt: Date
    mediaType: "image" | "video"
    mediaUrl: string
    viewed: boolean
}

export default function StoryStrip({ initialStories }: { initialStories: StoryItem[] }) {
    const [stories, setStories] = useState(initialStories)
    const [selectedStory, setSelectedStory] = useState<StoryItem | null>(null)

    const { mutate, isPending } = useMutation({
        mutationKey: ["markStoryViewed"],
        mutationFn: story.markViewed,
        onError: (error) => {
            toast.success(error.message, {
                position: "bottom-left", style: {
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
    const openStory = async (item: StoryItem) => {
        setSelectedStory(item)

        if (item.viewed) return

        try {
            mutate(item.id)
            setStories((items) => items.map((storyItem) => storyItem.id === item.id ? { ...storyItem, viewed: true } : storyItem))
        } catch (error) {
            console.error(error)
            // Guests can still view public stories; only authenticated users get a view record.
        }
    }

    if (!stories.length) return null

    return (
        <>
            <div className="flex gap-4 overflow-x-auto bg-linear-to-l px-4 pb-3 pt-3 scrollbar-hide sm:px-8" dir="rtl">
                {stories.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => openStory(item)}
                        className="group w-20 shrink-0 text-center"
                        aria-label={`نمایش ${item.title}`}
                    >
                        <span
                            className={`relative mx-auto block h-20 w-20 rounded-full p-1 shadow-lg transition duration-300 group-hover:scale-110 group-hover:shadow-red-300/70 cursor-pointer ${item.viewed
                                    ? "bg-slate-300 shadow-slate-200"
                                    : "bg-linear-to-br from-red-700 via-red-500 to-orange-300 shadow-red-200 motion-safe:animate-[softPulse_3s_ease-in-out_infinite]"
                                }`}
                        >
                            {!item.viewed && (
                                <span className="absolute -inset-1 z-0 rounded-full bg-red-500/25 blur-md transition duration-300 group-hover:bg-red-500/50" />
                            )}
                            <span className={`relative z-10 block h-full w-full overflow-hidden rounded-full border-2 border-white bg-slate-100 ${item.viewed ? "grayscale" : ""}`}>
                                {item.mediaType === "video" ? (
                                    <video src={item.mediaUrl} muted playsInline className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                                ) : (
                                    <img src={item.mediaUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                                )}
                            </span>
                        </span>
                        <span className={`mt-2 block truncate text-xs font-medium transition-colors ${item.viewed ? "text-slate-500" : "text-red-950 group-hover:text-red-600"}`}>{item.title}</span>
                    </button>
                ))}
            </div>

            {selectedStory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
                    <button
                        type="button"
                        onClick={() => setSelectedStory(null)}
                        className="absolute inset-0 cursor-default"
                        aria-label="بستن نمایشگر استوری"
                    />
                    <div className="relative z-10 flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setSelectedStory(null)}
                            className="absolute left-3 top-3 z-20 rounded-full bg-black/40 p-2 text-white"
                            aria-label="بستن"
                        >
                            <X className="size-5" />
                        </button>
                        <div className="flex min-h-96 items-center justify-center bg-black">
                            {selectedStory.mediaType === "video" ? (
                                <video src={selectedStory.mediaUrl} controls autoPlay playsInline className="max-h-[70vh] w-full object-contain" />
                            ) : (
                                <img src={selectedStory.mediaUrl} alt={selectedStory.title} className="max-h-[70vh] w-full object-contain" />
                            )}
                        </div>
                        <div className="p-5 text-white" dir="rtl">
                            <h2 className="font-bold">{selectedStory.title}</h2>
                            <p className="mt-2 text-sm leading-7 text-slate-300">{selectedStory.content}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
