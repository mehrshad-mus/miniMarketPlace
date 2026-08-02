import { User } from '@/app/generated/prisma/client'
import React from 'react'
import { Button } from '../ui/button'

export const BankCart = ({ user }: { user: User }) => {

    const cartColor = () => {
        if (user.role === "USER") {
            return "text-black"
        }
        return "text-white"
    }
    return (
        <>
            {(user.role === "SELLER" || user.role === "USER") &&

                <div className="w-80 h-60 rounded-4xl  text-white flex-col flex justify-center items-center p-3 pt-7"
                    style={{
                        backgroundImage: user.role === "SELLER" ?
                            "url('/ChatGPT Image Jul 5, 2026, 09_43_01 PM.png')" :
                            "url('/ChatGPT Image Jul 21, 2026, 03_20_35 AM.png')"
                    }}>

                    <div className={`${cartColor()} flex justify-between items-start h-1/3 w-full`}>
                        <span className="font-bold text-xl">کیف پول</span>
                        <span>628023132454467</span>
                    </div>

                    <div className={`flex justify-start items-center flex-col gap-2 h-1/3 ${cartColor()}`} >
                        <span className="font-bold ">موجودی : </span>
                        <span className="flex justify-center items-center gap-1">
                            <span className="text-green-500 text-xl">10000000</span>
                            <span className={`text-[12px] ${user.role === "SELLER" ? "text-gray-200": "text-gray-700"}`}>تومان</span>
                        </span>
                    </div>

                    <div className={`${cartColor()} flex justify-between items-center h-1/3 w-full px-3`}>
                        <span>افزایش اعتبار</span>
                        <Button className={`rounded-xl w-10 h-10 text-4xl 
                            ${user.role === "SELLER" ? "text-purple-800 hover:bg-purple-200" : "text-rose-100 hover:bg-rose-400 bg-rose-500"} `}>
                            +
                        </Button>
                    </div>
                </div>
            }
        </>
    )
}
