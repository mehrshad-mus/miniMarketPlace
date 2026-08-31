"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import Image from 'next/image'
import { tryParseRGBA } from '@/lib/utils'
import { cartItemType } from '@/lib/types/types'
import { useMutation } from '@tanstack/react-query'
import { cart } from '@/lib/queries'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const CartItem = ({ item }: { item: cartItemType }) => {

    const router = useRouter()

    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationKey: ["updateCartItem"],
        mutationFn: cart.updateCart,
        onSuccess: () => {
            router.refresh()
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message, {
                position: "bottom-left", style: {
                    background: "#dc2626",
                    color: "#ffffff",
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px"
                },
            })
        }
    })

    const { mutate : deleteMutate, isPending:deletePendig, isError: deleteError } = useMutation({
        mutationKey: ["updateCartItem"],
        mutationFn: cart.deleteCart,
        onSuccess: () => {
            router.refresh()
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message, {
                position: "bottom-left", style: {
                    background: "#dc2626",
                    color: "#ffffff",
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px"
                },
            })
        }
    })

    const [deleteStyle, setDeleteStyle] = useState(false)

    return (
        <div className='border-b px-6 pb-4 flex justify-start items-center' key={item.id}>
            <div className=' w-76'>
                <Image alt='photo' src={item.offer.productVariant.product.productImage[0].url} width={288} height={208} className='w-72 h-52' />
            </div>

            <div className='border-r flex justify-between items-start flex-col  pr-10 w-170'>
                <div>
                    <span className='text-xl font-bold'>
                        {item.offer.productVariant.product.title}
                    </span>

                    <div className='flex flex-col justify-center items-start gap-2 mt-4'>
                        {item.offer.productVariant.variantValue.map((variant) => {
                            const rgba = tryParseRGBA(variant.productOptionValue.value)

                            return (
                                <div key={variant.id} className='flex justify-center items-start flex-col'>
                                    <span className='font-bold text-[16px]'>{variant.productOptionValue.productOption.name}:</span>
                                    {rgba ? <span
                                        className=" block w-7 h-7 rounded-full"
                                    >
                                        <span
                                            className="block w-full h-full rounded-full border border-gray-300"
                                            style={{
                                                backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
                                            }}
                                        />
                                    </span> :
                                        <span className='text-[14px] text-gray-800'>{variant.productOptionValue.value}</span>}
                                </div>
                            )
                        })}
                    </div>

                    <div className='flex justify-center items-start flex-col mt-4'>
                        <span className='font-bold text-[16px]'>فروشنده :</span>
                        <span className='text-[14px] text-gray-800'>{item.offer.seller.storeName}</span>
                    </div>
                </div>

                <div className='flex justify-between items-center w-full mt-4'>

                    <div className='flex justify-center items-center gap-6'>
                        <div className='flex justify-center items-center bg-white gap-1 border rounded-xl'>
                            <Button
                                className='bg-white hover:bg-gray-100 text-2xl'
                                onClick={() => mutate({ offerId: item.offerId, quantity: item.quantity + 1, cartItemId: item.id })}>
                                +
                            </Button>
                            <span className='p-2'>{item.quantity}</span>
                            <Button
                                className='bg-white hover:bg-gray-100 text-2xl'
                                onClick={() => mutate({ offerId: item.offerId, quantity: item.quantity - 1, cartItemId: item.id })}>
                                -
                            </Button>
                        </div>

                        <div
                            className='flex justify-center items-center gap-1 cursor-pointer'
                            onMouseEnter={() => setDeleteStyle(true)}
                            onMouseLeave={() => setDeleteStyle(false)}
                            onClick={() => deleteMutate({cartItemId : item.id})}
                        >
                            <span className={`text-gray-700 ${deleteStyle && "text-red-600"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg>
                            </span>
                            <span className={`text-gray-700 text-[14px] ${deleteStyle && "text-red-600"}`}>حذف</span>
                        </div>

                    </div>

                    <div className='flex flex-col justify-center items-end '>
                        <span className='text-red-600 text-[16px]'>
                            <del>{(item.offer.price * item.quantity).toLocaleString("fa-IR")}</del>
                        </span>
                        <span className=' font-bold flex justify-center items-center gap-1'>
                            <span className='text-[22px]'>{Number(item.price).toLocaleString("fa-IR")}</span>
                            <span className='text-xs text-gray-600'>تومان</span>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartItem