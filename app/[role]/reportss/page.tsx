"use client"
import ChangeResultButtons from "@/components/myComponent/Change-Results-Button";
import NavButton from "@/components/myComponent/NavButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Reports() {
    const [isSearchActive, setIsSearchActive] = useState(false)
    return (
        <div className="bg-gray-100 p-6 pt-5 mb-3">
            <p className="font-bold text-xl text-end  mb-6">گزارش ها</p>

            <div className="bg-white rounded-xl py-4">
                <div className="flex justify-end items-end flex-col p-8 border-b">
                    <p className="text-[13px] text-end bg-gray-100 text-gray-600 rounded-2xl px-3 py-2">فعالیت های اخیر مدیران و فروشندگان و کاربران تا 60 روز اخیر ثبت میشوند</p>
                    <div className={`${isSearchActive ? "border border-blue-400" : ""} [direction:rtl] border w-full p-1 h-12 flex items-center justify-end mt-5
                    text-[#607B8F]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500`}>
                        <input type="text" className="w-full h-full outline-none pr-2 cursor-pointer placeholder:text-[15px]"
                            placeholder="شماره یا نام کاربری(به صورت کامل وارد شود)..."
                            onFocus={() => setIsSearchActive(prev => { return !prev })}
                            onBlur={() => setIsSearchActive(prev => { return !prev })} />
                        <Button className="bg-blue-500 hover:bg-blue-400 h-10 w-10 rounded-xl cursor-pointer"></Button>
                    </div>
                </div>

                <NavButton title1={"همه"} title2={"مدیر"} title3={"فروشنده"} title4={"کاربر"}/>

                <div className="w-full px-8">
                    <table className="w-full">
                        <thead className="w-full">
                            <tr className="flex border bg-gray-100 mt-5">
                                <th className="w-1/6 border border-red font-bold text-[14px] items-center justify-center flex pr-2 py-2">تاریخ</th>
                                <th className="w-5/6 border border-red font-bold text-[14px] items-center justify-end flex pr-2 py-2">گزارش</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="flex">
                                <th className="w-1/6 border text-[13px] items-center justify-center flex pr-2 py-2">17:42 - 1404/12/25</th>
                                <th className="w-5/6 border text-[14px] items-center justify-start flex pr-2 py-2" dir="rtl">
                                 مدیریت توحید زمانی, یک دیدگاه گزارش شده از محصول <a href="" className="text-blue-400 mx-2">  لپ تاپ 13.6 اینچی اپل مدل MacBook Air MRXN3 2024 </a> را بررسی کرد.</th>
                            </tr>
                            <tr className="flex">
                                <th className="w-1/6 border text-[13px] items-center justify-center flex pr-2 py-2">	17:42 - 1404/12/25</th>
                                <th className="w-5/6 border text-[14px] items-center justify-start flex pr-2 py-2" dir="rtl">
                                مدیریت توحید زمانی, یک دیدگاه گزارش شده از محصول <a href="" className="text-blue-400 mx-2"> گوشی موبایل سامسونگ مدل Galaxy A54 5G </a> دو سیم کارت را بررسی کرد.</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <ChangeResultButtons pageNumber={121}/>
            </div>

        </div>
    )
}