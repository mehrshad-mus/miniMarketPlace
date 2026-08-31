"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User } from '@/app/generated/prisma/client'
import { CartGetPayload } from '@/app/generated/prisma/models'
import { usePathname } from 'next/navigation'

type cartForCartItemCount = CartGetPayload<{
    include: {
        cartItem: {
            omit: {
                cartId: true,
                createdAt: true,
                offerId: true,
                price: true,
                quantity: true,
                updatedAt: true
            }
        }
    }
}>
const Section2 = ({ user, cartItemCount }: {
    user: User | null | undefined,
    cartItemCount: cartForCartItemCount | null | undefined
}) => {

    const [searchPanel, setSearchPanel] = useState(false)

    const changeTheme = () => {
        document.documentElement.classList.toggle("dark")
    }

    const [cartColor, setCartColor] = useState(false)

    const path = usePathname()

    const [loginHover, setLoginHover] = useState(false)

    return (
        <div className="flex justify-between items-center flex-row-reverse px-10 pl-12 bg-white dark:bg-gray-900">

            <div className="flex justify-center items-center flex-row-reverse gap-10">
                <div>
                    <Image src={"/ChatGPT Image Aug 5, 2026, 12_55_03 PM.png"} alt="shop logo" className='block dark:hidden' width={100} height={100} />
                    <Image src={"/paras_shop_logo_darktheme_v5.png"} alt="shop logo" className='hidden dark:block' width={100} height={100} />
                </div>

                <div>
                    <div dir="rtl" className="flex h-12 w-180 items-center justify-between rounded-xl bg-gray-200 dark:bg-gray-600 px-2 relative">
                        <input
                            type="text"
                            placeholder=" جستجو سراسری... "
                            className="w-4/5 bg-transparent text-right placeholder:text-gray-400 outline-none border-2 h-full border-none"
                            onFocus={() => setSearchPanel(true)}
                            onBlur={() => setSearchPanel(false)}
                        />
                        <span className="text-gray-500 bg-white dark:bg-gray-700 dark:text-gray-100 p-3 rounded-xl">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </span>

                        {searchPanel && (
                            <div className={`absolute top-16 right-0 w-180 bg-gray-100 dark:bg-gray-600 shodow rounded-xl shadow-lg p-4`}>
                                <div className="flex gap-2 items-center jucbtify-center">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                    </span>
                                    <p className="text-[14px]">محصولات پربازدید هفته</p>
                                </div>
                                <div className="flex justify-start gap-5 overflow-x-auto items-center pb-4 border-b">
                                    {/* <div className="mt-5 cursor-pointer">
                                            <div className="flex justify-center items-center gap-2 w-50  bg-white rounded-2xl p-1 ">
                                                <Image src={"/ChatGPT Image Aug 5, 2026, 12_55_03 PM.png"} height={70} width={70} alt="photo" />
                                                <div className="flex justify-center items-center flex-col w-2/3">
                                                    <p className="text-[15px] w-full  truncate">محصول سمپل برای امتحان</p>
                                                    <div className="flex justify-center items-center gap-1">
                                                        <span className="text-[14px]">120000</span>
                                                        <span className="text-xs text-gray-500">تومان</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    <div className="mt-5 cursor-pointer">
                                        <div className="flex justify-center items-center gap-2 w-50 dark:bg-gray-500 bg-white rounded-2xl p-1 ">
                                            <Image src={"/ChatGPT Image Aug 5, 2026, 12_55_03 PM.png"} height={70} width={70} alt="photo" />
                                            <div className="flex justify-center items-center flex-col w-2/3">
                                                <p className="text-[15px] w-full  truncate">محصول سمپل برای امتحان</p>
                                                <div className="flex justify-center items-center gap-1">
                                                    <span className="text-[14px]">120000</span>
                                                    <span className="text-xs text-gray-500 dark:text-white">تومان</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 cursor-pointer">
                                        <div className="flex justify-center items-center gap-2 w-50 dark:bg-gray-500 bg-white rounded-2xl p-1 ">
                                            <Image src={"/ChatGPT Image Aug 5, 2026, 12_55_03 PM.png"} height={70} width={70} alt="photo" />
                                            <div className="flex justify-center items-center flex-col w-2/3">
                                                <p className="text-[15px] w-full  truncate">محصول سمپل برای امتحان</p>
                                                <div className="flex justify-center items-center gap-1">
                                                    <span className="text-[14px]">120000</span>
                                                    <span className="text-xs text-gray-500 dark:text-white">تومان</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 cursor-pointer">
                                        <div className="flex justify-center items-center gap-2 w-50 dark:bg-gray-500 bg-white rounded-2xl p-1 ">
                                            <Image src={"/ChatGPT Image Aug 5, 2026, 12_55_03 PM.png"} height={70} width={70} alt="photo" />
                                            <div className="flex justify-center items-center flex-col w-2/3">
                                                <p className="text-[15px] w-full  truncate">محصول سمپل برای امتحان</p>
                                                <div className="flex justify-center items-center gap-1">
                                                    <span className="text-[14px]">120000</span>
                                                    <span className="text-xs text-gray-500 dark:text-white">تومان</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 items-center jucbtify-center mt-10">
                                    <span className="text-yellow-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fire" viewBox="0 0 16 16">
                                            <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15" />
                                        </svg>
                                    </span>
                                    <p className="text-[14px]">
                                        بیشترین جست و جو ها
                                    </p>
                                </div>


                                <div className="flex justify-start items-center gap-3 mt-4">
                                    <Link href={"/"} className="bg-white px-3 py-2 dark:text-gray-500 rounded-2xl hover:bg-gray-200">موبایل</Link>
                                    <Link href={"/"} className="bg-white px-3 py-2 dark:text-gray-500 rounded-2xl hover:bg-gray-200">یخچال</Link>
                                    <Link href={"/"} className="bg-white px-3 py-2 dark:text-gray-500 rounded-2xl hover:bg-gray-200">لپ تاپ</Link>
                                    <Link href={"/"} className="bg-white px-3 py-2 dark:text-gray-500 rounded-2xl hover:bg-gray-200">هدفون</Link>
                                    <Link href={"/"} className="bg-white px-3 py-2 dark:text-gray-500 rounded-2xl hover:bg-gray-200">کیف</Link>

                                </div>

                            </div>

                        )}

                    </div>

                </div>
            </div>

            <div className="flex justify-center items-center gap-5">
                {user ? <div className='flex justify-center items-center gap-5'>
                    <Link href={"/cart"} className='hover:text-red-600 relative z-0' onMouseEnter={() => setCartColor(true)} onMouseLeave={() => setCartColor(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                        </svg>

                        {cartItemCount && <span className={`h-6 w-6 -top-3 
                        ${cartColor ? "bg-white text-red-600 border border-red-600 font-bold -z-1" : "bg-red-600 text-white z-1"} 
                        -left-3 absolute rounded-full flex justify-center items-center text-xs`}>
                            {cartItemCount?.cartItem.length.toLocaleString("fa-IR")}
                        </span>}
                    </Link>
                    <Link href={`/${user?.role.toLowerCase()}/dashboard`} className='hover:text-red-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                    </Link>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-megaphone" viewBox="0 0 16 16">
                            <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 75 75 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0m-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233q.27.015.537.036c2.568.189 5.093.744 7.463 1.993zm-9 6.215v-4.13a95 95 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A61 61 0 0 1 4 10.065m-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68 68 0 0 0-1.722-.082z" />
                        </svg>
                    </span>
                </div> :
                    <Link href={"/registration"} className='relative'>
                        <svg onMouseEnter={() => setLoginHover(true)}
                            onMouseLeave={() => setLoginHover(false)}
                            xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                            <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                        </svg>
                        <span className={`${loginHover ? "opacity-100" : "opacity-0"} text-xs text-gray-500 absolute bg-gray-200 rounded-2xl px-3 py-1.5 top-7 -left-10 font-bold transition-all duration-500 ease-in-out`}>
                            ورود
                        </span>
                    </Link>}
                <span
                    className='cursor-pointer hover:text-red-600'
                    onClick={changeTheme}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-moon-stars" viewBox="0 0 16 16">
                        <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286" />
                        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                    </svg>
                </span>

                {(path !== "/") && <Link href={"/"} className='hover:text-red-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-shop-window" viewBox="0 0 16 16">
                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5m2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                </Link>}

            </div>
        </div>
    )
}

export default Section2