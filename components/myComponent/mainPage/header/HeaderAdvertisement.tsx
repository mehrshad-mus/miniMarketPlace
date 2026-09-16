"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft, Sparkles } from "lucide-react"

const advertisements = [
    {
        eyebrow: "پیشنهاد ویژه امروز",
        title: "تا ۳۰٪ تخفیف برای خریدهای منتخب",
        action: "مشاهده پیشنهادها",
        href: "/",
        accent: "from-red-600 via-rose-600 to-orange-500",
    },
    {
        eyebrow: "ارسال سریع و مطمئن",
        title: "خریدت را امروز ثبت کن، سریع تحویل بگیر",
        action: "شروع خرید",
        href: "/",
        accent: "from-red-700 via-red-600 to-pink-600",
    },
    {
        eyebrow: "ویژه اعضای جدید",
        title: "با اولین خریدت یک قدم به جایزه نزدیک‌تر شو",
        action: "کشف محصولات",
        href: "/",
        accent: "from-rose-700 via-red-600 to-orange-600",
    },
]

export default function HeaderAdvertisement() {
    const [activeIndex, setActiveIndex] = useState(0)
    const activeAdvertisement = advertisements[activeIndex]

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveIndex((index) => (index + 1) % advertisements.length)
        }, 5000)

        return () => window.clearInterval(interval)
    }, [])

    return (
        <div className={`relative overflow-hidden bg-gradient-to-l ${activeAdvertisement.accent} px-4 py-2.5 text-white shadow-lg shadow-red-950/10`}>
            <div className="pointer-events-none absolute -left-8 -top-10 size-28 rounded-full bg-white/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 right-1/3 size-24 rounded-full bg-orange-200/20 blur-2xl" />

            <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4" dir="rtl">
                <div className="flex min-w-0 items-center gap-2.5">
                    <span className="hidden size-8 shrink-0 items-center justify-center rounded-full bg-white/15 sm:flex">
                        <Sparkles className="size-4" />
                    </span>
                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold tracking-wide text-white/75 sm:text-xs">
                            {activeAdvertisement.eyebrow}
                        </p>
                        <p className="truncate text-xs font-bold sm:text-sm">
                            {activeAdvertisement.title}
                        </p>
                    </div>
                </div>

                <Link
                    href={activeAdvertisement.href}
                    className="flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-bold backdrop-blur-sm transition hover:bg-white hover:text-red-700 sm:px-4 sm:text-xs"
                >
                    <span className="hidden sm:inline">{activeAdvertisement.action}</span>
                    <ArrowLeft className="size-3.5" />
                </Link>
            </div>

            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-1" aria-label="تبلیغات">
                {advertisements.map((advertisement, index) => (
                    <button
                        key={advertisement.eyebrow}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`نمایش تبلیغ ${index + 1}`}
                        className={`h-0.5 rounded-full transition-all ${index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/45"}`}
                    />
                ))}
            </div>
        </div>
    )
}
