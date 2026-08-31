"use client"
import { Button } from '@/components/ui/button'
import { TomanIcon } from '@/components/ui/toman'
import { payment } from '@/lib/queries'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

const CartCheckList = ({ allPrices, cartLength, address , shippingPrice }: {
    allPrices: {
        beforDiscount: number;
        discount: number;
        afterDiscount: number;
    },
    cartLength: number,
    address: string | null,
    shippingPrice : number | undefined,
}) => {

    const {mutate , isPending , isError} = useMutation({
        mutationKey : ["payment"],
        mutationFn : payment.createPayment,
        onSuccess : () => {}
    })

    return (
        <>
            <div className='flex justify-center items-start w-full flex-col gap-6 mb-10'>

                <div className='flex justify-between items-center w-full'>
                    <span className='text-gray-700 text-[15px]'>قیمت کالا ها ({cartLength.toLocaleString("fa-IR")}) : </span>
                    <div className='flex justify-center items-center '>
                        <span className='font-bold text-xl'>
                            {allPrices.beforDiscount?.toLocaleString("fa-IR")}
                        </span>
                        <span>
                            <TomanIcon className='size-5 text-gray-500' />
                        </span>
                    </div>
                </div>

                <div className='flex justify-between items-center w-full'>
                    <span className='text-gray-700 text-[15px]'>جمع تخفیف ها : </span>

                    <div className='flex justify-center items-center'>
                        <span className='font-bold text-xl text-red-600'>
                            {allPrices.discount.toLocaleString("fa-IR")}
                        </span>
                        <span>
                            <TomanIcon className='size-5 text-gray-500' />
                        </span>
                    </div>
                </div>

                <div className='flex justify-between items-center w-full'>
                    <span className='text-gray-700 text-[15px]'>جمع سبد خرید : </span>
                    <div className='flex justify-center items-center '>
                        <span className='font-bold text-xl'>
                            {allPrices.afterDiscount?.toLocaleString("fa-IR")}
                        </span>
                        <span>
                            <TomanIcon className='size-5 text-gray-500' />
                        </span>
                    </div>
                </div>

                <div className='flex justify-between items-center w-full'>
                    <span className='text-gray-700 text-[16px]'>هزینه ارسال : </span>
                    <div className='flex justify-center items-center '>
                        <span className='font-bold text-xl'>
                            {shippingPrice?.toLocaleString("fa-IR")}
                        </span>
                        <span>
                            <TomanIcon className='size-5 text-gray-500' />
                        </span>
                    </div>
                </div>

                {address && <div className='border border-green-900 p-2 bg-green-100 w-full text-[14px] rounded-2xl'>
                    <span className='font-bold'>آدرس :</span> {address}
                </div>}

                <p className='text-[13px] text-gray-600'>هزینه‌ی ارسال بر اساس آدرس، زمان و نحوه‌ی ارسال انتخابی شما‌ محاسبه و به این مبلغ اضافه خواهد شد</p>
            </div>

            <div className='w-full px-4'>
                <Button onClick={() => mutate()} className='w-full bg-red-600 hover:bg-red-500 text-white'>ادامه و پرداخت</Button>
            </div>
        </>
    )
}

export default CartCheckList