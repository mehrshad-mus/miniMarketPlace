"use client"

import Image from "next/image"
import { motion } from "motion/react"

export default function Advertisement() {
  

    return (
        <section className="w-full px-4 bg-white dark:bg-gray-900" dir="ltr">
            {/* Advertisement */}
            <div
                className="
                    mx-auto
                    flex
                    w-full
                    max-w-7xl
                    overflow-hidden                              
                "
            >
                {/* IMAGE */}
                <motion.div
                    initial={{
                        opacity: 0,
                        x: -120,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{ amount: 0.3 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                    className="
                        
                        w-1/2
                        overflow-hidden
                        flex justify-center items-center
                    "
                >
                    <Image
                        src="/ChatGPT Image Aug 28, 2026, 09_54_58 PM.png"
                        alt="Advertisement"
                        width={100}
                        height={100}
                        className="
                            h-120
                            min-h-50
                            w-90
                            object-cover
                            rounded-2xl
                        "
                    />
                </motion.div>

                {/* INFORMATION */}
                <motion.div
                    initial={{
                        opacity: 0,
                        x: 120,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{  amount: 0.3 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.1,
                        ease: "easeOut",
                    }}
                    dir="rtl"
                    className="
                        flex
                        w-1/2
                        flex-col
                        justify-center
                        p-6 px-8
                    "
                >
                    {/* Badge */}
                    <span
                        className="
                            mb-5
                            w-fit
                            rounded-full
                            border
                            border-rose-200
                            bg-rose-50
                            dark:bg-gray-700
                            dark:text-gray-200
                            dark:border-gray-300
                            px-4
                            py-2
                            text-xs
                            font-medium
                            text-rose-600
                        "
                    >
                        نسل جدید سرعت و عملکرد
                    </span>

                    {/* Title */}
                    <h2
                        className="
                            max-w-lg
                            text-4xl
                            font-black
                            leading-[1.4]
                            text-neutral-900
                            dark:text-gray-200
                        "
                    >
                        قدرت بی‌نهایت
                        <br />
                        <span className="text-rose-600">
                            در دستان تو
                        </span>
                    </h2>

                    {/* Description */}
                    <p
                        className="
                            mt-4
                            max-w-md
                            text-sm
                            leading-7
                            text-neutral-500
                        "
                    >
                        تجربه‌ای سریع‌تر، قدرتمندتر و متفاوت با
                        نسل جدید گوشی‌های هوشمند.
                    </p>

                    {/* Price */}
                    <div className="mt-7 flex items-center gap-5">
                        {/* Discount */}
                        <div
                            className="
                                flex
                                h-24
                                w-24
                                flex-col
                                items-center
                                justify-center
                                rounded-2xl
                                bg-red-600
                                text-white
                                shadow-[1px_1px_10px_#dc2626]
                                shadow-rose-200
                            "
                        >
                            <span className="text-xs">
                                تخفیف
                            </span>

                            <span className="text-3xl font-black">
                                ۳۰٪
                            </span>
                        </div>

                        {/* Prices */}
                        <div>
                            <span className="block text-xs text-neutral-400">
                                قیمت قبل
                            </span>

                            <span
                                className="
                                    text-sm
                                    text-neutral-400
                                    line-through
                                "
                            >
                                ۲۸,۵۰۰,۰۰۰ تومان
                            </span>

                            <span className="mt-1 block text-xs text-neutral-500">
                                قیمت بعد از تخفیف
                            </span>

                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-3xl font-black text-neutral-900 dark:text-gray-200">
                                    ۱۹,۹۰۰,۰۰۰
                                </span>

                                <span className="text-xs text-neutral-500">
                                    تومان
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-8 grid grid-cols-4 gap-3">
                        <Feature
                            title="Snapdragon"
                            value="7s Gen 2"
                        />

                        <Feature
                            title="باتری"
                            value="5100mAh"
                        />

                        <Feature
                            title="دوربین"
                            value="200MP"
                        />

                        <Feature
                            title="نمایشگر"
                            value="120Hz"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex gap-3">
                        <button
                            className="
                                group
                                flex
                                flex-1
                                items-center
                                justify-center
                                gap-3
                                rounded-2xl
                                bg-neutral-900
                                px-6
                                py-4
                                text-sm
                                font-semibold
                                text-white
                                dark:bg-gray-700
                                transition-all
                                duration-300
                                hover:bg-rose-600
                                dark:hover:shadow-[0px_0px_20px_#fff]
                                hover:shadow-[0px_0px_20px_#dc2626]
                                cursor-pointer
                            "
                        >
                            مشاهده و خرید

                            <span className="transition-transform duration-300 group-hover:-translate-x-1">
                                ←
                            </span>
                        </button>

                        <button
                            className="
                                rounded-2xl
                                border
                                border-neutral-200
                                px-6
                                py-4
                                text-sm
                                font-medium
                                text-neutral-700
                                transition-all
                                duration-300
                                hover:border-neutral-300
                                hover:bg-neutral-50
                                cursor-pointer
                            "
                        >
                            اطلاعات بیشتر
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function Feature({
    title,
    value,
}: {
    title: string
    value: string
}) {
    return (
        <div
            className="
                rounded-xl
                border
                border-neutral-100
                bg-neutral-50
                dark:bg-gray-600
                p-3
                text-center
            "
        >
            <span className="block text-[10px] dark:text-xs text-neutral-400 dark:text-neutral-800 font-bold">
                {title}
            </span>

            <span className="mt-1 block text-xs font-bold text-neutral-800 dark:text-white">
                {value}
            </span>
        </div>
    )
}