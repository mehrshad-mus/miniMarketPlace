"use client"
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
        <div className="absolute flex justify-center items-center gap-8 w-full  top-56 h-100 py-6 px-20 flex-row-reverse">

            <div className="relative ">

                {data?.product?.productImage?.[0]?.url && <Image src={data.product.productImage[0].url} alt="photo" width={400} height={200} className="rounded-2xl" />}
                <div className="flex absolute justify-center items-center cursor-pointer top-2 right-2 flex-row-reverse bg-gray-200 rounded-2xl">
                    <span className="bg-gray-200 px-2 rounded-r-2xl py-2 border-white hover:bg-red-600 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg>
                    </span>
                    <span className="bg-gray-200 px-2 py-2 border-white  hover:bg-red-600 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                        </svg>
                    </span>
                    <span className="bg-gray-200 px-2 rounded-l-2xl py-2 border-white hover:bg-red-600 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-sliders" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
                        </svg>
                    </span>
                </div>
            </div>

            <div className="flex items-start flex-col w-140 h-full border-l border-r pr-6" dir="rtl">

                <span>
                    {data?.product.brand?.name}
                </span>

                <p className="font-bold text-2xl mt-4">
                    {data?.product.title}
                </p>

                <p className="text-gray-500 mt-2 text-xs">
                    {data?.product.englishTitle}
                </p>

                <div className="flex justify-center items-center gap-1 mt-4">

                    <span className="text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    </span>

                    <span className="flex justify-center items-center pt-1">{data?.product.rate}</span>
                </div>


                <div className="flex justify-center items-center gap-2 mt-4 flex-col">
                    {
                        data?.product.productOption.map((opt) => {
                            return (
                                <div key={opt.id} className="mb-2 w-full">
                                    <span className="text-[14px] text-gray-500 p-1 font-bold">{opt.name} :</span>

                                    <div className="mt-3 flex items-center gap-2">
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
                                                            className=" block w-8 h-8 rounded-full border-2 border-transparent p-0.5 transition-all duration-200 peer-checked:border-red-600 peer-checked:scale-110 hover:scale-110"
                                                        >
                                                            <span
                                                                className="block w-full h-full rounded-full border border-gray-300"
                                                                style={{
                                                                    backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
                                                                }}
                                                            />
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className=" block rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm transition-all duration-200 hover:border-red-400 peer-checked:border-red-600 peer-checked:bg-red-50 peer-checked:text-red-600 peer-checked:font-bold"
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

            <AddToChart
                data={data}
                chosenOffer={chosenOffer}
                orderCount={orderCount}
                setChosenOffer={setChosenOffer}
                setOrderCount={setOrderCount}
                variant={variant} />

        </div >
    )
}