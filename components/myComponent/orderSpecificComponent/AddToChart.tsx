/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductVariantGetPayload } from '@/app/generated/prisma/models'
import { Button } from '@/components/ui/button'
import { cart } from '@/lib/queries'
import { offerType, productWithBrandAndCategory } from '@/lib/types/types'
import { useMutation } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'
import Spinner from '../Spinner '

const AddToChart = (
    { data, chosenOffer, setChosenOffer, orderCount, setOrderCount, variant }:
        {
            data: { product: productWithBrandAndCategory } | undefined,
            chosenOffer: offerType | undefined,
            setChosenOffer: Dispatch<SetStateAction<offerType | undefined>>
            orderCount: number,
            setOrderCount: Dispatch<SetStateAction<number>>,
            variant : ProductVariantGetPayload<{include : {offer : { include : { seller : true}}}}> | undefined
        },
    ) => {

    let sellerSize
    if (data) {
        const sellers = new Set<string>()
        for (const variant of data.product.productVariant) {
            for (const offer of variant.offer) {
                sellers.add(offer.seller.storeName)
            }
        }
        sellerSize = sellers.size
    }

    const {mutate , isPending , isError} = useMutation({
        mutationKey : ["cart"],
        mutationFn : cart.createCart
    })


    const [offersPanel, setOffersPanel] = useState(false)
    return (
        <div className="flex flex-col justify-start items-end w-100 h-full px-5 py-2">

            <div className="flex flex-col justify-start items-end w-full px-5 py-4 bg-gray-100 rounded-2xl">
                <div className="flex justify-between items-center w-full" >
                    {sellerSize &&
                        <span className="text-blue-600 font-bold text-xs cursor-pointer" dir="rtl">
                            {sellerSize.toLocaleString("fa-IR")} دو فروشنده
                        </span>}
                    <span className="text-[16px] ">: فروشنده</span>
                </div>

                <div className="flex justify-start items-center gap-6 mt-2">
                    {chosenOffer &&
                        <span className="p-1 px-2 rounded-2xl text-gray-600 bg-gray-300 text-xs">
                            {chosenOffer.seller.storeName === "Khalij Fars" ? "فروشگاه اصلی" : chosenOffer.seller.name}
                        </span>}
                    <span className="font-bold">{chosenOffer && chosenOffer.seller.storeName}</span>
                </div>

                <div className="flex justify-center items-end flex-col w-full mt-4 gap-2">
                    <span>:شناسه محصول</span>
                    <span className="font-bold text-xs w-1/2 truncate">{data?.product.id}</span>
                </div>
            </div>

            <div className="flex justify-start items-start flex-col w-full border-t mt-4">
                <div className="flex justify-between items-center w-full mt-4 gap-2" dir="rtl">

                    <div className="flex justify-center items-center gap-1 bg-gray-200 py-1 rounded-xl">
                        <Button onClick={() => {
                            if (orderCount === chosenOffer?.stock) {
                                toast.success("حداکثر تعداد موجودی میباشد", {
                                    position: "bottom-left",
                                    style: {
                                        background: "#DC2626",
                                        color: "#ffffff",
                                        direction: "rtl",
                                        display: "flex",
                                        justifyContent: "start",
                                        alignItems: "center",
                                        gap: "12px",
                                    },
                                })
                                return
                            }
                            setOrderCount((prev) => prev + 1)

                        }} className="text-2xl w-4 text-gray-600">+</Button>
                        <span className="bg-white py-1 px-2 w-16 text-center rounded-lg">{orderCount.toLocaleString("fa-IR")}</span>
                        <Button onClick={() => {
                            if (orderCount === 1) {
                                toast.success("حداقل تعداد سفارش ۱ است", {
                                    position: "bottom-left",
                                    style: {
                                        background: "#DC2626",
                                        color: "#ffffff",
                                        direction: "rtl",
                                        display: "flex",
                                        justifyContent: "start",
                                        alignItems: "center",
                                        gap: "12px",
                                    },
                                })
                                return
                            }

                            setOrderCount((prev) => prev - 1)
                        }} className="text-2xl w-4 text-gray-600">-</Button>
                    </div>

                    <div className="flex justify-center items-center gap-2 flex-col">

                        <div className="flex justify-center items-center gap-2">
                            <span className="text-[15px] text-red-600 font-bold"><del>{chosenOffer && chosenOffer.price.toLocaleString("fa-IR")}</del></span>
                            <span className="rounded-t-lg rounded-br-lg  px-1 py-1 font-bold bg-red-600 text-white text-xs"><span className="text-black">%</span> {chosenOffer && chosenOffer.discount.toLocaleString("fa-IR")}</span>
                        </div>

                        <div className="flex justify-center items-center gap-2">
                            <span>
                                {chosenOffer && <span className="font-bold text-[22px]">{((chosenOffer.price * (100 - chosenOffer.discount) / 100) * orderCount).toLocaleString("fa-IR")}</span>}
                            </span>
                            <span className="text-[10px] text-gray-600 px-1 py-0.5 rounded-lg bg-gray-200">تومان</span>

                        </div>

                    </div>

                </div>

                <div className="relative flex justify-center items-center bg-gray-200 cursor-pointer text-xs rounded-xl mt-6">

                    <div className="flex justify-around items-center px-3 py-1 gap-2" onClick={() => setOffersPanel((prev) => !prev)}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`transition-all duration-500 ease-in-out ${offersPanel ? "rotate-180" : "rotate-0"}`} viewBox="0 0 16 16">
                                <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
                            </svg>
                        </span>
                        <span className="text-gray-800">مشاهده پیشنهاد های دیگر</span>
                    </div>


                    <div className={`bg-white  absolute py-3 top-6 transition-all duration-500 ease-in-out ${offersPanel ? "opacity-100" : "opacity-0"}`}>
                        {variant?.offer.map((off) => {
                            return (
                                <Button
                                    key={off.id} className="flex justify-between items-center gap-6 mt-2 w-full bg-white hover:bg-gray-100"
                                    onClick={() => setChosenOffer(off)}>
                                    <span>{off.price.toLocaleString("fa-IR")}</span>
                                    <span className="text-xs">{off.seller.storeName}</span>
                                </Button>
                            )
                        })}
                    </div>

                </div>

                <div className="flex items-center justify-center w-full mt-6">
                    <Button
                        className="bg-linear-to-br from-red-700 via-red-600 to-red-400 text-white w-full h-10 text-lg 
                     hover:from-red-600 hover:via-red-900 hover:to-red-700
                    shadow-[0_0_10px_#dc2626] transition-all duration-300
                     "
                     onClick={() => mutate({offer: chosenOffer, quantity : orderCount})}>
                       {isPending ? <Spinner/> : " افزودن به سبد خرید"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddToChart