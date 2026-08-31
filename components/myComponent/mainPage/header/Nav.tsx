"use client"
import React, { useEffect, useState } from 'react'

const Nav = () => {

    const [showNav, setShowNav] = useState(true)
    const [categoryList, setCategoryList] = useState(false)

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

    return (
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
                        className="absolute top-44 right-10 w-50 bg-stone-200 dark:bg-gray-600 shodow rounded-xl shadow-lg py-4 px-2">
                        <ul className="flex justify-center items-start flex-col gap-1">
                            <li className="hover:text-white w-full rounded-2xl p-1 pr-2 hover:bg-red-600 cursor-pointer">موبایل</li>
                            <li className="hover:text-white w-full rounded-2xl p-1 pr-2 hover:bg-red-600 cursor-pointer">لپ تاپ</li>
                            <li className="hover:text-white w-full rounded-2xl p-1 pr-2 hover:bg-red-600 cursor-pointer">هدفون</li>
                            <li className="hover:text-white w-full rounded-2xl p-1 pr-2 hover:bg-red-600 cursor-pointer">کیف</li>
                            <li className="hover:text-white w-full rounded-2xl p-1 pr-2 hover:bg-red-600 cursor-pointer">یخچال</li>
                        </ul>
                    </div>
                }

                <ul className="flex justify-center items-center  gap-8 cursor-pointer text-gray-700">
                    <li className="dark:hover:text-red-600 dark:text-gray-300 hover:text-red-600">صفحه نخست</li>
                    <li className="dark:hover:text-red-600 dark:text-gray-300 hover:text-red-600">مجله</li>
                    <li className="dark:hover:text-red-600 dark:text-gray-300 hover:text-red-600">پرسش های متداول</li>
                    <li className="dark:hover:text-red-600 dark:text-gray-300 hover:text-red-600">فروشنده شوید</li>
                    <li className="dark:hover:text-red-600 dark:text-gray-300 hover:text-red-600">تماس با ما</li>
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
    )
}

export default Nav