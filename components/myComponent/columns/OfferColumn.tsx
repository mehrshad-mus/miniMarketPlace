/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { FieldError, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import Spinner from "@/components/myComponent/Spinner ";
import { Button } from "@/components/ui/button";
import { QueryClient, UseMutateFunction, useMutation } from "@tanstack/react-query";
import { OfferField } from "@/lib/zodSchema/schema";
import { createColumns, tryParseRGBA } from "@/lib/utils";
import { toast } from "sonner";
import { offer } from "@/lib/queries";


export default function OfferColumn({ register, watch ,errors  , mode ,queryClient ,productId}:
    {
        register: UseFormRegister<OfferField>,
        watch: UseFormWatch<OfferField>,
        errors: FieldErrors<OfferField>,
        queryClient :  QueryClient,
        productId : string
        mode : "update" | "create"
    }) {
    const [openRow, setOpenRow] = useState<number | null>(null);

    const variants = watch("variants")

    const variantColumn = useMemo(() => createColumns(variants), [variants])

    const { mutate: deleteMutate, isError: deleteError, isPending: deletePending } = useMutation({
            mutationKey: ["deleteOffer"],
            mutationFn: offer.deleteOffer,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["product"] })
                toast.success("با موفقیت حذف شد", {
                    position: "bottom-left", style: {
                        background: "#bd0808",
                        color: "#fff",
                        direction: "rtl",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "12px"
                    },
                })
            },
            onError: (err) => { console.log(err) }
        })


    const newUniqueColumns = variantColumn.map((obj) => {
        return {
            ...obj,
            render: (value: string, row: any) => {
                return (
                    row.values.map((item: any) => {

                        const rgba = tryParseRGBA(item.value)

                        return (item.optionName === obj.title &&
                            <div key={item.id + "e"}>
                                {rgba ?
                                    <div className="flex justify-center items-center gap-122" >
                                        <span className="w-6 h-6 rounded-full"
                                            style={{ backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` }} >

                                        </span>
                                    </div> :
                                    item.value}</div>)
                    }))
            }
        }
    })

    const columns = [
        ...newUniqueColumns,
        {
            title : "فروشنده",
            key : "sellerName",
        },
        {
            title: "تعداد",
            key: "stock",
            render: (value: string, row: any, index: number) => {
                return (
                    <div className="flex flex-col items-center justify-center">
                        <input
                            {...register(`variants.${index}.stock`, {
                                valueAsNumber: true
                            })}
                            type="text"
                            className="border w-3/4 cursor-pointer p-2 h-7 flex items-center justify-start text-[#607B8F] placeholder:text-[14px]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500" />
                        {errors.variants && <span className="text-red-700 w-full text-xs mt-2 font-bold pr-2">{errors.variants?.[index]?.stock?.message}</span>}
                    </div>
                )
            }
        },
        {
            title: "قیمت",
            key: "price",
            render: (value: string, row: any, index: number) => {
                return (
                    <div className="flex flex-col items-center justify-center">
                        <input
                            {...register(`variants.${index}.price`, {
                                valueAsNumber: true
                            })}
                            type="text"
                            className="border w-3/4 cursor-pointer p-2 h-7 flex items-center justify-start text-[#607B8F] placeholder:text-[14px]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500" />
                        {errors.variants && <span className="text-red-700 w-full text-xs mt-2 font-bold pr-2">{errors.variants?.[index]?.price?.message}</span>}
                    </div>
                )
            }
        },
        {
            title: "تخفیف",
            key: "discount",
            rowWidth : "w-1/12",
            render: (value: string, row: any, index: number) => {
                return (
                    <div className="flex flex-col items-center justify-center">
                        <input
                            {...register(`variants.${index}.discount`, {
                                valueAsNumber: true
                            })}
                            type="text"
                            className="border w-3/4 cursor-pointer p-2 h-7 flex items-center justify-start text-[#607B8F] placeholder:text-[14px]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500" />
                    </div>
                )
            }
        },
        {
            key: "setting",
            rowWidth : "w-1/12",
            title: () => {
                return (
                    <div>
                        {deletePending ? <Spinner />
                            :
                            <span className="w-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                </svg>
                            </span>
                        }

                    </div>
                )

            },
            render: (value: any, row: any, index: number) => {
                return (
                    <div className="relative w-full h-full cursor-pointer "
                        onClick={() => setOpenRow(openRow === index ? null : index)}>

                        <div className="w-full flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                            </svg>
                        </div>

                        <div
                            className={`${openRow === index ? "block" : "hidden"} 
                            absolute shadow-2xl rounded-2xl bg-white z-10 top-5 left-2 py-2`}>
                            {mode === "update" &&
                                <Button
                                    className="w-full  cursor-pointer text-[13px] text-white bg-red-600 hover:bg-red-500 rounded-xl"
                                    type='button'
                                    onClick={() => deleteMutate(row.offerId)}
                                    disabled={deletePending}>
                                    حذف پیشنهاد
                                </Button>}
                        </div>
                    </div>
                )
            }
        }
    ]

    return {columns}
}