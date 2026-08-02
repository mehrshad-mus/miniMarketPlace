/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'
import { User } from '@/app/generated/prisma/client'

export const DashboardMainData = ({ user, productRequestCount, productRequestSellerCount , sellerRequest }:
    {
        user: User,
        productRequestCount: number,
        productRequestSellerCount: any
        sellerRequest ?: number
    }) => {


    const dashboardColor = () => {
        if (user.role === "ADMIN") {
            return "text-red-600"
        }
        if (user.role === "SELLER") {
            return "text-purple-700"
        }
        return "text-black"
    }

    return (
        <div className={`flex justify-between items-start 
        ${user?.role === "ADMIN" ? "bg-[#EAF3FF]" : user.role === "SELLER" ? "bg-purple-100" : "bg-red-100"} 
        w-200 p-5 rounded-2xl`}>

            <div className="flex flex-col justify-between items-start h-50">

                <div className="flex justify-center items-center gap-4">
                    {user?.avatar ? <Image src={user.avatar} alt="userAvatar" width={60} height={60} /> : <Image src={"/images (7).jfif"} alt="avatar" width={65} height={65} />}

                    <div className="flex justify-center items-center gap-1">
                        <span className="font-bold text-xl">{user?.name ?? user.phone}</span>
                        <span>عزیز , خوش امدی!</span>
                    </div>
                </div>

                <div>موارد زیر در انتظار بررسی و مدیریت شما میباشند ...</div>

                <ul className="flex justify-between items-center w-110">

                    <li className="flex justify-between items-start flex-col gap-1">
                        <span>
                            <span className={`font-bold ml-1 text-xl ${dashboardColor()}`}>0</span>
                            <span className="text-sm"> سفارش </span>
                        </span>
                        {user.role !== "USER" && <span className="text-[12px] text-gray-500">در انتظار بررسی</span>}
                    </li>

                    <li className="flex justify-between items-start flex-col gap-1">
                        <span>
                            <span className={`font-bold ml-1 text-xl ${dashboardColor()}`}>15</span>
                            <span className="text-sm"> تیکت</span>
                        </span>
                        {user.role !== "USER" && <span className="text-[12px] text-gray-500"> در انتظار پاسخ </span>}
                    </li>

                    <li className="flex justify-between items-start flex-col gap-1">
                        <span>
                            <span className={`font-bold ml-1 text-xl ${dashboardColor()}`}>
                                {user.role === "ADMIN" ? productRequestCount : user.role === "SELLER" ? productRequestSellerCount : 0}
                            </span>
                            <span className="text-sm">{user.role === "USER" ? "دیدگاه" : "محصول"}</span>
                        </span>
                        {user.role !== "USER" && <span className="text-[12px] text-gray-500">  در انتظار انتشار</span>}
                    </li>

                    <li className="flex justify-between items-start flex-col gap-1">
                        <span>
                            <span className={`font-bold ml-1 text-xl ${dashboardColor()}`}>{user.role === "ADMIN" ? sellerRequest: 2}</span>
                            <span className="text-sm">{user.role === "USER" ? "پرسش" : user.role=== "ADMIN" ? "فروشنده" : "مقاله"}</span>
                        </span>
                        {user.role !== "USER" && <span className="text-[12px] text-gray-500">در انتظار پاسخ</span>}
                    </li>

                </ul>
            </div>

            <div>
                {user?.role === "ADMIN" ?
                    <Image src={"/ChatGPT Image Jul 3, 2026, 02_12_03 AM.png"} alt="this is a image" width={300} height={150} className="rounded-xl" /> :
                    user.role === "SELLER" ?
                        <Image src={"/ChatGPT Image Jul 5, 2026, 07_56_38 PM.png"} alt="this is a image" width={280} height={150} className="rounded-xl" /> :
                        <Image src={"/ChatGPT Image Jul 21, 2026, 03_43_34 AM.png"} alt="this is a image" width={280} height={150} className="rounded-xl" />

                }
            </div>
        </div>
    )
}
