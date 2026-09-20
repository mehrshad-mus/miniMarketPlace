"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"
import { useRef } from "react"
import { advertisement, type PublicAdvertisementFeature, type PublicAdvertisementValue } from "@/lib/queries"

type FeatureSceneProps = { feature: PublicAdvertisementFeature; index: number; total: number }

function FeatureScene({ feature, index, total }: FeatureSceneProps) {
    const sceneRef = useRef<HTMLElement>(null)
    const reduceMotion = useReducedMotion()
    const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start end", "end start"] })
    const progress = useSpring(scrollYProgress, { damping: 28, stiffness: 135, mass: 0.32 })
    const direction = index % 2 === 0 ? -1 : 1
    const textIsLeft = index % 2 === 0
    const isLast = index === total - 1

    const imageOpacity = useTransform(progress, [0.08, 0.3, 0.7, 0.94], [0, 1, 1, 0])
    const imageX = useTransform(progress, [0.08, 0.32, 0.72, 0.94], [direction * 100, 0, direction * -18, direction * -100])
    const imageY = useTransform(progress, [0.08, 0.5, 0.94], [70, -16, -110])
    const imageScale = useTransform(progress, [0.08, 0.38, 0.74, 0.94], [0.82, 1, isLast ? 1.12 : 1.04, isLast ? 1.22 : 0.9])
    const imageRotate = useTransform(progress, [0.08, 0.48, 0.94], [direction * 5, direction * -1.5, direction * -5])
    const imageBlur = useTransform(progress, [0.08, 0.26, 0.78, 0.94], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(9px)"])
    const textOpacity = useTransform(progress, [0.12, 0.32, 0.72, 0.9], [0, 1, 1, 0])
    const textX = useTransform(progress, [0.12, 0.36, 0.9], [direction * -70, 0, direction * 48])
    const textY = useTransform(progress, [0.12, 0.7, 0.9], [28, 0, -36])
    const textBlur = useTransform(progress, [0.12, 0.28, 0.78, 0.9], ["blur(7px)", "blur(0px)", "blur(0px)", "blur(6px)"])
    const lineScale = useTransform(progress, [0.2, 0.48], [0, 1])

    return <section ref={sceneRef} className="relative h-[130svh]" aria-label={`ویژگی ${index + 1}: ${feature.label}`}>
        <div className="sticky top-0 flex min-h-svh items-center overflow-hidden px-5 sm:px-8 lg:px-14">
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-linear-to-l from-transparent via-rose-300/60 to-transparent dark:via-rose-800/45" />
            <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20" dir="ltr">
                <motion.div style={reduceMotion ? undefined : { opacity: textOpacity, x: textX, y: textY, filter: textBlur }} className={`relative z-10 order-2 ${textIsLeft ? "md:order-1" : "md:order-2"}`} dir="rtl">
                    <div className="flex items-center gap-3 text-rose-600 dark:text-rose-300"><span className="font-mono text-xs tracking-[0.28em]">۰{index + 1} / ۰{total}</span><motion.span style={reduceMotion ? undefined : { scaleX: lineScale }} className="h-px w-16 origin-right bg-current" /></div>
                    <h3 className="mt-5 text-3xl font-black leading-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">{feature.label}</h3>
                    <ul className="mt-7 max-w-md space-y-4 border-r border-rose-200 pr-5 text-sm leading-8 text-slate-600 dark:border-rose-900 dark:text-slate-300 sm:text-base">
                        {feature.values.map((item: PublicAdvertisementValue) => <li key={item.id} className="flex items-start gap-3"><span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.8)]" /><span>{item.value}</span></li>)}
                    </ul>
                </motion.div>
                <motion.div style={reduceMotion ? undefined : { opacity: imageOpacity, x: imageX, y: imageY, scale: imageScale, rotate: imageRotate, filter: imageBlur }} className={`relative order-1 ${textIsLeft ? "md:order-2" : "md:order-1"}`}>
                    <div className="pointer-events-none absolute inset-[12%] rounded-full bg-rose-500/15 blur-3xl dark:bg-rose-500/20" />
                    <div className="relative aspect-4/3"><Image src={feature.imageUrl} alt={feature.label} fill sizes="(max-width: 768px) 90vw, 58vw" className="object-contain drop-shadow-[0_35px_45px_rgba(15,23,42,0.28)] dark:drop-shadow-[0_35px_45px_rgba(0,0,0,0.62)]" /></div>
                </motion.div>
            </div>
        </div>
    </section>
}

function AdvertisementShowcase({ title, description, features }: { title: string | null; description: string | null; features: PublicAdvertisementFeature[] }) {
    const visibleFeatures = features.slice(0, 5)
    return <section className="relative mt-12 overflow-clip bg-[radial-gradient(circle_at_50%_18%,rgba(251,113,133,0.16),transparent_25%),linear-gradient(135deg,#fff7f8_0%,#ffffff_46%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_50%_18%,rgba(225,29,72,0.2),transparent_25%),linear-gradient(135deg,#08080b_0%,#170e14_52%,#0f172a_100%)]" dir="rtl">
        <div className="flex min-h-[75svh] items-center px-5 text-center sm:px-8"><div className="mx-auto max-w-4xl"><p className="text-xs font-bold tracking-[0.24em] text-rose-600 dark:text-rose-300">PRODUCT EXPERIENCE</p>{title && <h2 className="mt-5 text-4xl font-black leading-[1.25] text-slate-950 dark:text-white sm:text-6xl">{title}</h2>}{description && <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">{description}</p>}<p className="mt-10 text-xs font-bold text-slate-500 dark:text-slate-400">برای ورود به تجربه، اسکرول کنید ↓</p></div></div>
        {visibleFeatures.map((feature, index) => <FeatureScene key={feature.id} feature={feature} index={index} total={visibleFeatures.length} />)}
    </section>
}

export default function AdvertisementSection() {
    const { data, isLoading, isError } = useQuery({ queryKey: ["advertisement"], queryFn: advertisement.get })
    if (isLoading) return <section className="mx-auto mt-12 w-full max-w-7xl px-4" dir="rtl" aria-label="در حال بارگذاری تبلیغ"><div className="h-72 animate-pulse rounded-3xl bg-white/70 dark:bg-gray-900/70" /></section>
    if (isError) return <section className="mx-auto mt-12 w-full max-w-7xl px-4 text-center text-sm text-gray-600 dark:text-gray-300" dir="rtl">دریافت اطلاعات تبلیغ امکان‌پذیر نیست.</section>
    if (!data || data.features.length === 0) return <section className="mx-auto mt-12 w-full max-w-7xl px-4 text-center text-sm text-gray-600 dark:text-gray-300" dir="rtl">هنوز تبلیغی برای نمایش ثبت نشده است.</section>
    return <AdvertisementShowcase title={data.title} description={data.description} features={data.features} />
}
