"use client"
import CommentSection from "@/components/myComponent/mainPage/main/Comment/CommentSection"
import Favorite1 from "@/components/myComponent/mainPage/main/Favorite/favorite1"
import AddToChart from "@/components/myComponent/orderSpecificComponent/AddToChart"
import { product } from "@/lib/queries"
import { offerType } from "@/lib/types/types"
import { tryParseRGBA } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { use, useEffect, useState } from "react"

export default function ProductById({ params }: { params: Promise<{ id: string }> }) {
    const { id: productId } = use(params)

    const { data, isLoading, error } = useQuery({
        queryKey: ["productForUser", productId],
        queryFn: () => product.getProductForUser({ productId })

    })

    const [orderCount, setOrderCount] = useState(1)

    const [chosenVariant, setChosenVariant] = useState<Record<string, string>>()

    const [chosenOffer, setChosenOffer] = useState<offerType>()

    const variantFn = () => {
        let mainVariant;
        let counter = 0

        if (data && chosenVariant) {
            for (const variant of data?.product.productVariant) {
                for (const variantValue of variant.variantValue) {
                    for (const userChose of Object.values(chosenVariant)) {
                        if (userChose === variantValue.productOptionValue.id) {

                            counter++;
                        }
                    }
                }

                if (counter === Object.keys(chosenVariant).length) {
                    mainVariant = variant
                }

                counter = 0
            }
        }

        return mainVariant
    }
    const variant = variantFn()
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setChosenVariant(() => {

                let defaultOptions: Record<string, string> = {};
                for (const opt of data.product.productOption) {
                    defaultOptions = {
                        ...defaultOptions,
                        [opt.id]: opt.productOptionValues[0].id
                    }
                }

                return defaultOptions
            })
        }
    }, [data])

    useEffect(() => {
        if (!chosenVariant) return

        const selectedVariant = variantFn()

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setChosenOffer(selectedVariant?.offer[0])
        setOrderCount(1)
    }, [chosenVariant])

    return (
        <div dir="rtl" className="relative top-56 flex min-h-screen w-full flex-col items-center justify-start bg-slate-50 px-4 py-8 text-slate-900 md:px-8 lg:px-12">

            <div className="flex w-full justify-between items-start gap-6 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70 md:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)_minmax(280px,0.7fr)] lg:gap-8">

                <div className="flex justify-start items-center gap-6"> 
                    <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                        {data?.product?.productImage?.[0]?.url && <Image src={data.product.productImage[0].url} alt="photo" width={400} height={200} className="h-auto min-h-70 w-full object-cover transition-transform duration-500 hover:scale-[1.02]" />}
                        <div className="absolute right-3 top-3 flex flex-row-reverse items-center overflow-hidden rounded-xl border border-white/70 bg-white/80 shadow-sm backdrop-blur-md">
                            <Favorite1 productId={data?.product.id} />
                            <span className="cursor-pointer border-r border-slate-200 px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                                </svg>
                            </span>
                            <span className="cursor-pointer rounded-l-xl px-3 py-2.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-sliders" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="flex h-full flex-col items-start border-x border-slate-100 px-2 md:px-6" dir="rtl">

                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                            {data?.product.brand?.name}
                        </span>

                        <p className="mt-4 text-2xl font-bold leading-relaxed tracking-tight text-slate-900">
                            {data?.product.title}
                        </p>

                        <p className="mt-1 text-xs leading-6 text-slate-400">
                            {data?.product.englishTitle}
                        </p>

                        <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5">

                            <span className="text-amber-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            </span>

                            <span className="flex items-center justify-center text-sm font-semibold text-amber-700">{data?.product.rate}</span>
                        </div>


                        <div className="mt-8 flex w-full flex-col items-center justify-center gap-5">
                            {
                                data?.product.productOption.map((opt) => {
                                    return (
                                        <div key={opt.id} className="mb-1 w-full border-t border-slate-100 pt-4 first:border-t-0 first:pt-0">
                                            <span className="p-1 text-sm font-semibold text-slate-700">{opt.name}</span>

                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                {opt.productOptionValues.map((value) => {
                                                    const rgba = tryParseRGBA(value.value)

                                                    return (
                                                        <label key={value.id} className="cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name={`option-${opt.id}`}
                                                                value={value.id}
                                                                className="peer sr-only"
                                                                checked={chosenVariant?.[opt.id] === value.id}
                                                                onChange={() => {
                                                                    setChosenVariant(prev => ({
                                                                        ...prev,
                                                                        [opt.id]: value.id
                                                                    }))
                                                                }}
                                                            />

                                                            {rgba ? (
                                                                <span
                                                                    className="block h-9 w-9 rounded-full border-2 border-transparent p-0.5 transition-all duration-200 hover:scale-105 peer-checked:scale-110 peer-checked:border-red-600"
                                                                >
                                                                    <span
                                                                        className="block w-full h-full rounded-full"
                                                                        style={{
                                                                            backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
                                                                        }}
                                                                    />
                                                                </span>
                                                            ) : (
                                                                <span
                                                                    className="block rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-600 transition-all duration-200 hover:border-red-300 hover:bg-red-50/50 peer-checked:border-red-600 peer-checked:bg-red-50 peer-checked:font-semibold peer-checked:text-red-600"
                                                                >
                                                                    {value.value}
                                                                </span>
                                                            )}
                                                        </label>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <AddToChart
                    data={data}
                    chosenOffer={chosenOffer}
                    orderCount={orderCount}
                    setChosenOffer={setChosenOffer}
                    setOrderCount={setOrderCount}
                    variant={variant}/>

            </div>

            <CommentSection productId={data?.product.id} comments= {data?.product.comment}/>

        </div>
    )
}