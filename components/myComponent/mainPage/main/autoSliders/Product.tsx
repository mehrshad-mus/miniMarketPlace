"use client"

import { ProductImage } from "@/components/myComponent/loadingImage"
import { useRouter } from "next/navigation"
import { useState } from "react"

type ProductProps = {
    title?: string
    id: string
    images: string
    maxDiscount: number
    minDiscount: number
}

export const Product = ({
    title,
    id,
    images,
    minDiscount,
    maxDiscount,
}: ProductProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const router = useRouter()

    const hasDiscount = maxDiscount > 0

    const discountText =
        minDiscount === maxDiscount
            ? `${maxDiscount.toLocaleString("fa-IR")}٪`
            : `${minDiscount.toLocaleString("fa-IR")}٪ - ${maxDiscount.toLocaleString("fa-IR")}٪`

    return (
        <article
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => router.push(`/product/${id}`)}
            className="
                group
                relative
                w-full
                h-full
                min-h-82.5
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                border-neutral-200/70
                bg-white
                dark:bg-gray-600
                transition-all
                duration-500
                ease-out
                hover:-translate-y-1
                hover:border-neutral-300
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]
            "
        >
            {/* Background glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-48
                    w-48
                    rounded-full
                    dark:bg-gray-600
                    dark:group-hover:bg-gray-100/70
                    bg-rose-100/60
                    blur-3xl
                    transition-all
                    duration-700
                    group-hover:bg-rose-100/70
                    group-hover:scale-150
                "
            />

            {/* Top controls */}
            <div
                className="
                    absolute
                    left-4
                    right-4
                    top-4
                    z-20
                    flex
                    items-center
                    justify-between
                "
            >
                {/* Discount */}
                {hasDiscount ? (
                    <div
                        className="
                            flex
                            items-center
                            rounded-full
                            border
                            border-rose-200
                            bg-white/90
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-rose-600
                            shadow-sm
                            backdrop-blur-md
                        "
                    >
                        <span>{discountText}</span>
                    </div>
                ) : (
                    <div />
                )}

                {/* Favorite */}
                <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-neutral-200
                        bg-white/90
                        text-neutral-500
                        shadow-sm
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:border-rose-200
                        hover:bg-rose-50
                        hover:text-rose-500
                    "
                    aria-label="افزودن به علاقه‌مندی‌ها"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                        />
                    </svg>
                </button>
            </div>

            {/* Product Image */}
            <div
                className="
                    relative
                    flex
                    h-57.5
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    pt-8
                "
            >
                {/* Image background */}
                <div
                    className="
                        absolute
                        h-44
                        w-44
                        rounded-full
                        bg-neutral-50
                        dark:bg-gray-600
                        transition-all
                        duration-700
                        group-hover:scale-110
                        group-hover:bg-rose-50
                    "
                />

                <div
                    className="
                        relative
                        z-10
                        transition-all
                        duration-700
                        ease-out
                        group-hover:scale-110
                        group-hover:-translate-y-2
                    "
                >
                    <ProductImage
                        src={images}
                        width={210}
                        height={210}
                    />
                </div>

                {/* View button */}
                <div
                    className={`
                        absolute
                        bottom-3
                        left-1/2
                        z-20
                        -translate-x-1/2
                        transition-all
                        duration-500
                        ${isHovered
                            ? "translate-y-0 opacity-100"
                            : "translate-y-5 opacity-0"
                        }
                    `}
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            whitespace-nowrap
                            rounded-full
                            bg-neutral-950
                            px-4
                            py-2.5
                            text-xs
                            font-medium
                            text-white
                            shadow-xl
                        "
                    >
                        <span>مشاهده محصول</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                d="M5 12h14"
                                strokeLinecap="round"
                            />

                            <path
                                d="m13 6 6 6-6 6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Product information */}
            <div
                className="
                    relative
                    z-10
                    flex
                    flex-col
                    px-5
                    pb-5
                    pt-2
                "
            >
                {/* Small category-like label */}
                <span
                    className="
                        w-full
                        text-end
                        mb-2
                        text-[10px]
                        font-medium
                        tracking-wide
                        text-neutral-400
                    "
                >
                    محصول ویژه
                </span>

                {/* Title */}
                <h3
                    className="
                        w-full
                        text-end
                        line-clamp-2
                        min-h-10.5
                        text-sm
                        font-semibold
                        leading-6
                        dark:text-gray-100
                        text-neutral-800
                        transition-colors
                        duration-300
                        group-hover:text-rose-600
                    "
                >
                    {title}
                </h3>

                {/* Bottom */}
                <div
                    className="
                        mt-4
                        flex
                        items-center
                        justify-between
                    "
                >
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs text-neutral-400 ">
                            مشاهده
                        </span>

                        <span
                            className="
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                bg-neutral-100
                                dark:bg-gray-500
                                dark:group-hover:bg-rose-500
                                text-neutral-700
                                transition-all
                                duration-300
                                group-hover:bg-rose-500
                                group-hover:text-white
                            "
                        >
                            ↗
                        </span>
                    </div>

                    {hasDiscount && (
                        <span
                            className="
                                text-xs
                                font-medium
                                text-rose-500
                            "
                        >
                            پیشنهاد ویژه
                        </span>
                    )}
                </div>
            </div>
        </article>
    )
}

export default Product

