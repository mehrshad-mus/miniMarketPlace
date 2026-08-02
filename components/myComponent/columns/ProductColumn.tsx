/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useMemo, useState } from 'react'
import { ProductImage } from '../loadingImage';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserProduct } from '@/app/[role]/offers/page';

export const ProductColumn = ({withOffer} : {withOffer?: boolean}) => {
    
    const [openRow, setOpenRow] = useState<number | null>(null);

    const userRole = useContext(UserProduct)

    const column = useMemo(() => [
        {
            key: "productImage",
            title: "عکس محصول",
            rowWidth: "w-2/16",
            render: (value: string, row: any, index: number) => {

                return (
                    <div className="flex justify-center items-center">

                        <ProductImage src={value} />
                    </div>
                )
            }
        },
        {
            key: "title",
            title: "نام محصول",
            rowWidth: "w-3/16",
        },
        {
            key: "englishTitle",
            title: "نام انگلیسی ",
            rowWidth: "w-2/16",
        },
        {
            key: "brand",
            title: "برند ",
            rowWidth: "w-1/16",
        },
        {
            key: "category",
            title: "دسته بندی",
            rowWidth: "w-2/16",
        },
        {
            key: "offer",
            title: "پیشنهاد",
            rowWidth: "w-1/16",
            render: (value: number[]) => {

                const HaveOffer = value.some((off) => off > 0)

                return (
                    <span className="flex justify-center items-center w-full">
                        {HaveOffer ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-green-700" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-red-700" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>}
                    </span>
                )
            }
        },
        {
            key: "specialProduct",
            title: " ویژه",
            rowWidth: "w-1/16",
            render: (value: boolean) => {
                return (
                    <span className="flex justify-center items-center w-full">
                        {value ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-green-700" viewBox="0 0 16 16">
                            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-red-700" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>}
                    </span>
                )
            }
        },
        {
            key: "id",
            title: "آی دی ",
            rowWidth: "w-4/16",
            hidden: true
        },
        {
            key: "setting",
            title: () => {
                return (<span className="w-full flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                    </svg>
                </span>)

            },
            rowWidth: "w-1/16",
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
                            absolute shadow-2xl rounded-2xl bg-white z-10 top-8 left-2 w-40 py-2`}>
                            {withOffer ?
                                <div className="flex justify-center items-center flex-col gap-1">
                                    <Link href={`/${userRole?.role.toLowerCase()}/offers/edit/${row.id}`} className="w-full flex justify-center items-center cursor-pointer p-2 text-[13px] bg-white hover:bg-gray-200 rounded-none">تغییر پیشنهاد</Link>
                                    <Button className="w-full cursor-pointer text-[13px] bg-white hover:bg-gray-200 rounded-none">تعداد نوع ها</Button>
                                </div> :
                                <div className="flex justify-center items-center flex-col gap-1">
                                    <Link href={`/admin/product/${row.id}`} className="w-full flex justify-center items-center cursor-pointer p-2 text-[13px] bg-white hover:bg-gray-200 rounded-none">مشاهده و ویرایش</Link>
                                    <Link href={`/admin/offers/create/${row.id}`} className="w-full flex justify-center items-center cursor-pointer p-2 text-[13px] bg-white hover:bg-gray-200 rounded-none">افزودن پیشنهاد</Link>
                                </div>
                            }
                        </div>
                    </div>
                )
            }
        }
    ], [openRow, withOffer, userRole])

    return {column}
}
