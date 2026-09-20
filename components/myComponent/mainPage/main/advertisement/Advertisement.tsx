"use client"

import Image from "next/image"
import { motion, useScroll, useSpring, useTransform } from "motion/react"
import { useRef } from "react"

export default function Advertisement() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] })
    const smoothProgress = useSpring(scrollYProgress, { damping: 24, stiffness: 120, mass: 0.3 })
    const laptopScale = useTransform(smoothProgress, [0, 0.52, 1], [0.78, 1.08, 1.55])
    const laptopRotate = useTransform(smoothProgress, [0, 0.55, 1], [-8, 5, 20])
    const laptopX = useTransform(smoothProgress, [0, 0.55, 1], ["0vw", "-5vw", "-42vw"])
    const laptopY = useTransform(smoothProgress, [0, 0.55, 1], ["4vh", "-3vh", "-18vh"])
    const laptopOpacity = useTransform(smoothProgress, [0.72, 1], [1, 0])
    const copyOpacity = useTransform(smoothProgress, [0, 0.32, 0.72], [1, 1, 0])
    const copyY = useTransform(smoothProgress, [0, 0.72], [0, -70])
    const glowScale = useTransform(smoothProgress, [0, 1], [0.8, 1.7])
    const glowOpacity = useTransform(smoothProgress, [0, 0.65, 1], [0.35, 0.75, 0])

    return (
        <section ref={heroRef} className="relative  bg-white w-full dark:bg-gray-900" dir="rtl">
            <div className="sticky top-0 flex min-h-svh items-center overflow-hidden bg-[radial-gradient(circle_at_68%_42%,rgba(225,29,72,0.16),transparent_34%),linear-gradient(135deg,#fff7f8_0%,#ffffff_48%,#fff1f2_100%)] px-4 dark:bg-[radial-gradient(circle_at_68%_42%,rgba(225,29,72,0.25),transparent_34%),linear-gradient(135deg,#09090b_0%,#17111a_55%,#240b14_100%)] sm:px-8 lg:px-12">
                <motion.div style={{ scale: glowScale, opacity: glowOpacity }} className="pointer-events-none absolute left-[42%] top-[26%] size-128 rounded-full bg-rose-500/20 blur-3xl" />
                <div className="relative mx-auto grid w-full max-w-7xl items-center gap-4 md:grid-cols-2 md:gap-8">
                    <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative z-10 order-2 max-w-xl text-right md:order-1">
                        <span className="inline-flex rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-xs font-bold text-rose-600 shadow-sm backdrop-blur dark:border-rose-900/70 dark:bg-white/5 dark:text-rose-300">عملکردی فراتر از انتظار</span>
                        <h2 className="mt-6 text-4xl font-black leading-[1.35] text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">قدرت را<br /><span className="text-rose-600 dark:text-rose-400">از زاویه‌ای تازه</span> ببین</h2>
                        <p className="mt-6 max-w-md text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">با اسکرول کردن، جزئیات نسل جدید لپ‌تاپ را کشف کنید؛ سرعت، نمایشگر خیره‌کننده و طراحی آماده‌ی هر ایده.</p>
                        <div className="mt-8 flex items-center justify-start gap-3"><span className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-950">برای کشف ادامه دهید</span><span className="text-xs font-medium text-slate-500 dark:text-slate-400">↓ اسکرول کنید</span></div>
                    </motion.div>
                    <div className="relative order-1 flex min-h-[44svh] items-center justify-center md:order-2 md:min-h-[72svh]">
                        <motion.div style={{ scale: laptopScale, rotate: laptopRotate, x: laptopX, y: laptopY, opacity: laptopOpacity }} className="relative w-[min(125vw,50rem)] will-change-transform">
                            <Image src="/images/laptop-hero.png" alt="لپ‌تاپ حرفه‌ای با نمایشگر رنگی" width={3500} height={2000} priority sizes="(max-width: 768px) 125vw, 50rem" className="h-auto w-full select-none object-contain drop-shadow-[0_32px_32px_rgba(15,23,42,0.3)] dark:drop-shadow-[0_32px_42px_rgba(244,63,94,0.25)]" />
                        </motion.div>
                    </div>
                </div>
                <motion.p style={{ opacity: copyOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-xs font-semibold tracking-[0.28em] text-slate-400 dark:text-slate-500">SCROLL TO EXPLORE</motion.p>
            </div>
        </section>
    )
}
