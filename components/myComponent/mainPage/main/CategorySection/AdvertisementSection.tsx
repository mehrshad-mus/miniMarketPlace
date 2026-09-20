"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { advertisement, PublicAdvertisementFeature, PublicAdvertisementValue } from "@/lib/queries"

export default function AdvertisementSection() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["advertisement"],
        queryFn: advertisement.get,
    })

    if (isLoading) {
        return (
            <section className="mx-auto mt-12 w-full max-w-7xl px-4" dir="rtl" aria-label="در حال بارگذاری تبلیغ">
                <div className="h-72 animate-pulse rounded-3xl bg-white/70 dark:bg-gray-900/70" />
            </section>
        )
    }

    if (isError) {
        return (
            <section className="mx-auto mt-12 w-full max-w-7xl px-4 text-center text-sm text-gray-600 dark:text-gray-300" dir="rtl">
                دریافت اطلاعات تبلیغ امکان‌پذیر نیست.
            </section>
        )
    }

    if (!data) {
        return (
            <section className="mx-auto mt-12 w-full max-w-7xl px-4 text-center text-sm text-gray-600 dark:text-gray-300" dir="rtl">
                هنوز تبلیغی برای نمایش ثبت نشده است.
            </section>
        )
    }

    return (
        <section className="mx-auto mt-12 w-full max-w-7xl px-4" dir="rtl">
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700">
                <div className="border-b border-gray-100 px-6 py-7 text-center dark:border-gray-800 sm:px-10">
                    {data.title && (
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                            {data.title}
                        </h2>
                    )}
                    {data.description && (
                        <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                            {data.description}
                        </p>
                    )}
                </div>

                <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-5 lg:p-8">
                    {data.features.map((feature: PublicAdvertisementFeature) => (
                        <article
                            key={feature.id}
                            className="overflow-hidden rounded-2xl bg-gray-50 ring-1 ring-gray-100 dark:bg-gray-800 dark:ring-gray-700"
                        >
                            <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                                <Image
                                    src={feature.imageUrl}
                                    alt={feature.label}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 dark:text-white">{feature.label}</h3>
                                <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    {feature.values.map((item: PublicAdvertisementValue) => (
                                        <li key={item.id} className="flex gap-2">
                                            <span className="text-rose-500" aria-hidden="true">•</span>
                                            <span>{item.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
