"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { category } from '@/lib/queries'
import { LoaderCircle } from 'lucide-react'

const Nav = ({ userRole }: { userRole?: string | null }) => {

    const [showNav, setShowNav] = useState(true)
    const [categoryList, setCategoryList] = useState(false)
    const [sellerDialog, setSellerDialog] = useState<"login" | "already" | null>(null)
    const router = useRouter()
    const {
        data: categories = [],
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: category.getAllCategory,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    })

    useEffect(() => {
        let lastScroll = 0

        const handleScroll = () => {
            const current = window.scrollY

            if (current > lastScroll && current > 100) {
                setShowNav(false)
            } else {
                setShowNav(true)
            }

            lastScroll = current
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleSellerClick = () => {
        if (!userRole) {
            setSellerDialog("login")
            return
        }

        if (userRole === "SELLER" || userRole === "ADMIN") {
            setSellerDialog("already")
            return
        }

        router.push(`/${userRole.toLowerCase()}/shops/shopRequest`)
    }

    const handleContactClick = () => {
        document.getElementById("contact-footer")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    return (
        <>
            <nav dir="rtl" className={`
                        flex justify-between items-center pr-10 pl-8 bg-white dark:bg-gray-900 pb-3 overflow-hidden transition-all duration-300 
                        ${showNav ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}
                        `}>

                <div className="flex justify-center items-center gap-25 ">
                    <div className="flex justify-center items-center  gap-2 relative cursor-pointer">
                        <span className="font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="font-bold" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </span>

                        <p onMouseEnter={() => setCategoryList(true)} onMouseLeave={() => setCategoryList(false)} className="text-lg font-bold ">دسته بندی ها</p>
                    </div>

                    {categoryList &&
                        <div
                            onMouseEnter={() => setCategoryList(true)}
                            onMouseLeave={() => setCategoryList(false)}
                            className="absolute right-10 top-44 z-30 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 dark:border-slate-700 dark:bg-gray-800">
                            <ul className="flex max-h-72 flex-col gap-1 overflow-y-auto">
                                {isCategoriesLoading && (
                                    <li className="flex items-center justify-center gap-2 px-3 py-4 text-sm text-slate-500 dark:text-slate-300">
                                        <LoaderCircle className="size-4 animate-spin" />
                                        در حال بارگذاری
                                    </li>
                                )}
                                {isCategoriesError && (
                                    <li className="px-3 py-4 text-center text-sm text-red-600 dark:text-red-400">
                                        بارگذاری دسته‌بندی‌ها انجام نشد
                                    </li>
                                )}
                                {!isCategoriesLoading && !isCategoriesError && categories.length === 0 && (
                                    <li className="px-3 py-4 text-center text-sm text-slate-500 dark:text-slate-300">
                                        دسته‌بندی‌ای ثبت نشده است
                                    </li>
                                )}
                                {!isCategoriesLoading && !isCategoriesError && categories.map((item) => (
                                    <li
                                        key={item.id}
                                        className="w-full cursor-pointer rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-200 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }

                    <ul className="flex justify-center items-center  gap-8 cursor-pointer text-gray-700">
                        <li className="dark:hover:text-red-600 dark:text-gray-300 hover:text-red-600">صفحه نخست</li>
                        <li className="dark:hover:text-red-600 dark:text-gray-300 hover:text-red-600">مجله</li>
                        <li className="dark:hover:text-red-600 dark:text-gray-300 hover:text-red-600">پرسش های متداول</li>
                        <li>
                            <button type="button" onClick={handleSellerClick} className="dark:hover:text-red-600 dark:text-gray-300 hover:text-red-600">
                                فروشنده شوید
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={handleContactClick}
                                className="dark:hover:text-red-600 dark:text-gray-300 hover:text-red-600"
                            >
                                تماس با ما
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-center items-center gap-2">
                    <span className="text-xs text-gray-500">09924211342</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-headset" viewBox="0 0 16 16">
                            <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5" />
                        </svg>
                    </span>
                </div>
            </nav>

            {sellerDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm" dir='rTl'>
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                                {sellerDialog === "login" ? "ورود لازم است" : "وضعیت فروشندگی"}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setSellerDialog(null)}
                                className="text-xl text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
                                aria-label="بستن دیالوگ"
                            >
                                ×
                            </button>
                        </div>

                        <p className="leading-8 text-slate-600 dark:text-slate-300">
                            {sellerDialog === "login"
                                ? "برای درخواست فروشنده شدن، ابتدا باید وارد حساب خود شوید."
                                : "شما از قبل فروشنده هستید و دیگر نیازی به ثبت درخواست ندارید."}
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            {sellerDialog === "login" ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setSellerDialog(null)}
                                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                    >
                                        انصراف
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSellerDialog(null)
                                            router.push("/registration")
                                        }}
                                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                                    >
                                        ورود / ثبت‌نام
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setSellerDialog(null)}
                                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                                >
                                    متوجه شدم
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Nav