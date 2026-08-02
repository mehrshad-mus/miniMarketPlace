import { Button } from '@/components/ui/button'
import { product } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React, { useRef } from 'react'
import Image from 'next/image'
import { ProductImage } from '../loadingImage'


export const SellerProductSection = () => {

    const createOfferBySeller = useRef<HTMLDialogElement>(null)

    const { data, isLoading, error } = useQuery({
        queryKey: ["product"],
        queryFn: () => product.getAllProduct({ currentPage: 1 })
    })

    return (
        <div className="w-full justify-end flex gap-3 mb-10">

            <dialog ref={createOfferBySeller} className='bg-white w-270 h-130 rounded-2xl top-25 left-50'>
                <Button
                    type="button"
                    onClick={() => createOfferBySeller.current?.close()}
                    className="bg-white text-black hover:text-gray-700 cursor-pointer hover:bg-white">
                    X
                </Button>

                <div className='w-full flex justify-start gap-5 px-5 mt-4 flex-wrap'>


                    {data?.products.map((pro) => {
                        return (
                            <div key={pro.id} className='relative w-48 h-50 shadow-[0px_0px_20px] shadow-purple-300 rounded-xl'>


                                <Link
                                    href={`/seller/offers/create/${pro.id}`}
                                    className='absolute flex justify-center items-center z-20 right-1 top-1 text-2xl w-8 h-8 text-purple-600 font-light bg-purple-100 hover:bg-purple-600 hover:text-purple-100 rounded-lg'>
                                    +
                                </Link>
                                <Button className='absolute z-20 right-10 top-1 text-2xl w-8 h-8 text-purple-600 font-light bg-purple-100 hover:bg-purple-600 hover:text-purple-100'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>
                                </Button>

                                <div className='flex justify-between items-center flex-col w-full h-full'>
                                    <ProductImage width={150} height={110} src={pro.productImage[0].url} />
                                    <p className='w-full flex justify-center items-center text-purple-950 pb-2'>{pro.title}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </dialog>

            <Button className="rounded-xl bg-gray-100 hover:bg-purple-100" onClick={() => createOfferBySeller.current?.showModal()}>

                افزودن از محصولات
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-plus" viewBox="0 0 16 16">
                    <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z" />
                    <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
                    <path d="M8.5 6.5a.5.5 0 0 0-1 0V8H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V9H10a.5.5 0 0 0 0-1H8.5z" />
                </svg>
            </Button>
            <Link href={"/seller/product/create"} className="rounded-xl bg-purple-600 flex items-center px-2 hover:bg-purple-700 text-white">ایجاد محصول +</Link>
        </div>
    )
}

export default SellerProductSection