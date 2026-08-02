/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react'
import { ProductImage } from '../loadingImage';
import Spinner from '../Spinner ';
import Button from 'react-multi-date-picker/components/button';
import Link from 'next/link';
import { UseMutateFunction } from '@tanstack/react-query';
import { dialogProps } from '@/lib/zodSchema/schema';

export const ProductRequestColumn = ({DeleteProductRequestPending , deleteProductRequest} : 
    {
        DeleteProductRequestPending :boolean
        deleteProductRequest : UseMutateFunction<any, Error, dialogProps, unknown>
    }
) => {
    
    const [openRow, setOpenRow] = useState<number | null>(null);
    const [prodessId, setProsessID] = useState()
    
    const column = useMemo(() => [
        {
            key: "productImage",
            title: "عکس محصول",
            rowWidth: "w-2/17",
            render: (value: string, row: any, index: number) => {

                return (
                    <div className="flex justify-center items-center">

                        <ProductImage src={`/uploads/${value}`} />
                    </div>
                )
            }
        },
        {
            key: "title",
            title: "نام ",
            rowWidth: "w-3/17",
        },
        {
            key: "englishTitle",
            title: "نام انگلیسی ",
            rowWidth: "w-2/17",
        },
        {
            key: "category",
            title: "دسته بندی",
            rowWidth: "w-2/17",
        },
        {
            key: "adminStatus",
            title: "بازدید",
            rowWidth: "w-2/17",
            render: (value: any) => {
                return (
                    <>
                        {value === "SEEN" &&
                            <span className='text-green-600'>
                                دیده شده
                            </span>
                        }
                        {value === "DOSENTSEEN" &&
                            <span className='text-gray-500'>
                                دیده نشده
                            </span>
                        }
                    </>
                )
            }
        },
        {
            key: "status",
            title: "وضعیت",
            rowWidth: "w-2/17",
            render: (value: any) => {
                return (
                    <>
                        {value === "PENDING" &&
                            <span className='text-amber-600'>
                                در انتظار
                            </span>
                        }
                        {value === "REJECTED" &&
                            <span className='text-red-600'>
                                رد شده
                            </span>
                        }
                        {value === "APPROVED" &&
                            <span className='text-green-600'>
                                تایید شده
                            </span>
                        }
                    </>


                )
            }
        },
        {
            key: "sellerNationalCode",
            title: "فروشنده",
            rowWidth: "w-2/17",
            render: (value: any) => {
                return (
                    <span className="flex justify-center items-center w-full text-blue-700">
                        {value}
                    </span>
                )
            }
        },
        {
            key: "id",
            title: "شناسه",
            rowWidth: "w-3/17",
            hidden: true,
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
            rowWidth: "w-1/17",
            render: (value: any, row: any, index: number) => {
                return (
                    <div className="relative w-full h-full cursor-pointer "
                        onClick={() => {
                            setOpenRow(openRow === index ? null : index)
                            setProsessID(row.id)
                        }}>

                        {DeleteProductRequestPending && row.id === prodessId ?
                            <span className='flex justify-center items-center w-full'>
                                <Spinner className='text-blue-600' />
                            </span> :
                            <div className="w-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                </svg>
                            </div>}

                        <div
                            className={`${openRow === index ? "block" : "hidden"} 
                                absolute shadow-2xl rounded-2xl bg-white z-10 top-8 left-2 w-40 py-2`}>

                            <div className="flex justify-center items-center flex-col gap-1">
                                <Link href={`/admin/shops/productRequest/${row.id}`} className="w-full flex justify-center items-center cursor-pointer p-2 text-[13px] bg-white hover:bg-gray-200 rounded-xl">مشاهده درخواست</Link>
                                <Button className="w-full flex justify-center items-center cursor-pointer p-2 text-[13px] bg-white hover:bg-gray-200 rounded-xl">رد کردن درخواست</Button>
                                <Button
                                    onClick={() => deleteProductRequest({ id: row.id })}
                                    className="w-full flex justify-center text-white items-center cursor-pointer p-2 text-[13px] bg-red-600 hover:bg-red-500 rounded-xl">
                                    {DeleteProductRequestPending ? <Spinner /> : " حذف درخواست"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    ], [openRow, deleteProductRequest, DeleteProductRequestPending, prodessId])
    
    return {column}
}
