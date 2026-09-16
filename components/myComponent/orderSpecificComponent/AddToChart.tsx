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
        <div className="flex flex-col justify-start items-end w-100 h-full px-4 py-3 text-slate-900">

            <div className="flex flex-col justify-start items-end w-full gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm" dir="rtl">
                <div className="flex justify-between items-center w-full">
                    <span className="text-sm font-medium text-slate-500">فروشنده</span>
                    {sellerSize &&
                        <span className="cursor-pointer text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700">
                            {sellerSize.toLocaleString("fa-IR")}  فروشنده
                        </span>}
                </div>

                <div className="flex w-full items-center justify-start gap-3">
                    {chosenOffer &&
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                            {chosenOffer.seller.storeName === "Khalij Fars" ? "فروشگاه اصلی" : chosenOffer.seller.name}
                        </span>}
                    <span className="font-semibold text-slate-800">{chosenOffer && chosenOffer.seller.storeName}</span>
                </div>

                <div className="flex w-full flex-col items-start justify-center gap-1 border-t border-slate-100 pt-3">
                    <span className="text-xs font-medium text-slate-500">شناسه محصول</span>
                    <span className="w-1/2 truncate font-mono text-xs text-slate-700">{data?.product.id}</span>
                </div>
            </div>

            <div className="flex w-full flex-col items-start justify-start border-t border-slate-200 pt-5">
                <div className="flex w-full items-center justify-between gap-3" dir="rtl">

                    <div className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
                        <Button aria-label="افزایش تعداد" onClick={() => {
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

                        }} className="h-8 w-8 rounded-lg text-xl text-slate-600 hover:bg-white hover:text-slate-900">+</Button>
                        <span className="w-12 rounded-lg bg-white py-1.5 text-center text-sm font-semibold text-slate-800 shadow-sm">{orderCount.toLocaleString("fa-IR")}</span>
                        <Button aria-label="کاهش تعداد" onClick={() => {
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
                        }} className="h-8 w-8 rounded-lg text-xl text-slate-600 hover:bg-white hover:text-slate-900">-</Button>
                    </div>

                    <div className="flex flex-col items-end justify-center gap-1">

                        <div className="flex items-center justify-center gap-2">
                            <span className="text-xs font-medium text-slate-400"><del>{chosenOffer && chosenOffer.price.toLocaleString("fa-IR")}</del></span>
                            <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"><span className="text-red-400">%</span> {chosenOffer && chosenOffer.discount.toLocaleString("fa-IR")}</span>
                        </div>

                        <div className="flex items-baseline justify-center gap-2">
                            <span>
                                {chosenOffer && <span className="text-2xl font-bold tracking-tight text-slate-900">{((chosenOffer.price * (100 - chosenOffer.discount) / 100) * orderCount).toLocaleString("fa-IR")}</span>}
                            </span>
                            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">تومان</span>

                        </div>

                    </div>

                </div>

                <div className="relative mt-6 flex w-full justify-center rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600">

                    <div className="flex w-full cursor-pointer items-center justify-center gap-2 px-3 py-2.5 transition-colors hover:text-slate-900" onClick={() => setOffersPanel((prev) => !prev)}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className={`transition-transform duration-300 ${offersPanel ? "rotate-180" : "rotate-0"}`} viewBox="0 0 16 16">
                                <path d="M3.204 11h9.592L8 5.519zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659" />
                            </svg>
                        </span>
                        <span>مشاهده پیشنهادهای دیگر</span>
                    </div>


                    <div className={`absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg transition-all duration-300 ${offersPanel ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
                        {variant?.offer.map((off) => {
                            return (
                                <Button
                                    key={off.id} className="mt-0 flex w-full items-center justify-between gap-6 rounded-none bg-white px-4 py-2.5 text-slate-700 hover:bg-slate-50"
                                    onClick={() => setChosenOffer(off)}>
                                    <span className="font-semibold">{off.price.toLocaleString("fa-IR")} <span className="text-[10px] font-normal text-slate-400">تومان</span></span>
                                    <span className="text-xs text-slate-500">{off.seller.storeName}</span>
                                </Button>
                            )
                        })}
                    </div>

                </div>

                <div className="mt-6 flex w-full items-center justify-center">
                    <Button
                        className="h-11 w-full rounded-xl bg-red-700 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/20"
                     onClick={() => mutate({offer: chosenOffer, quantity : orderCount})}>
                       {isPending ? <Spinner/> : " افزودن به سبد خرید"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddToChart