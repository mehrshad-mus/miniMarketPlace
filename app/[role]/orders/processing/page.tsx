"use client"
import ChangeResultButtons from "@/components/myComponent/Change-Results-Button"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export const Processing = () => {

    const [isSearchActive, setIsSearchActive] = useState(false)

    return (
        <div className="bg-gray-100 p-6">
            <div className="font-bold text-2xl text-end mb-6">آمار محصولات</div>
            <div className="bg-white rounded-xl p-6 mb-15">

                <div className="flex justify-end items-end flex-col pb-5 border-b mb-7">
                    <div className={`${isSearchActive ? "border border-blue-400" : ""} [direction:rtl] border w-full p-1 h-12 flex items-center justify-end mt-5
                    text-[#607B8F]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500`}>
                        <input type="text" className="w-full h-full outline-none pr-2 cursor-pointer placeholder:text-[15px]"
                            placeholder="شماره سفارش ..."
                            onFocus={() => setIsSearchActive(prev => { return !prev })}
                            onBlur={() => setIsSearchActive(prev => { return !prev })} />
                        <Button className="bg-blue-500 hover:bg-blue-400 h-10 w-10 rounded-xl cursor-pointer"></Button>
                    </div>
                </div>

                <table className="w-full flex gap-2 flex-col">
                    <thead className="rounded-2xl bg-gray-200">
                        <tr className="flex">
                            <th className="w-3/20 border border-white font-bold items-center justify-center flex pr-2 py-2">تاریخ تبت</th>
                            <th className="w-2/20 border border-white font-bold items-center justify-center flex pr-2 py-2">وضعیت کلی</th>
                            <th className="w-2/20 border border-white font-bold items-center justify-center flex pr-2 py-2">مشتری</th>
                            <th className="w-2/20 border border-white font-bold items-center justify-center flex pr-2 py-2">شماره سفارش</th>
                            <th className="w-11/20 border border-white font-bold items-center justify-end flex pr-2 py-2">مرسوله ها</th>
                        </tr>
                    </thead>

                    <tbody className="rounded-2xl bg-gray-100">
                        <tr className="flex">
                            <th className="w-3/20 border border-white text-[13px] items-center justify-center flex pr-2 py-2">22:39 - 1404/12/24</th>
                            <th className="w-2/20 border border-white text-[13px] items-center justify-center flex p-2">
                                <span className="bg-blue-200 text-[10px] text-blue-600 p-0.5 px-2 rounded-2xl">در حال پردازش</span>
                            </th>
                            <th className="w-2/20 border border-white text-[13px] items-center justify-center flex p-2">مرتضی پورمقدم</th>
                            <th className="w-2/20 border border-white text-[13px] items-center justify-center flex p-2">455058905</th>

                            <th className="w-11/20 border border-white flex-wrap text-[13px] items-center justify-end pr-3 flex p-2 py-4 gap-1.5">

                                <div className="flex items-center justify-center bg-gray-200 rounded-xl ml-1.5 gap-2 p-2">
                                    <div className="flex flex-col gap-1 items-center">
                                        <span className="bg-blue-200 text-[10px] text-blue-600 p-0.5 px-2 rounded-2xl">در حال پردازش</span>
                                        <Button className="cursor-pointer bg-white hover:bg-black w-19 h-6 flex items-center justify-center rounded-[10px] hover:text-white text-black">{"< برسی"}</Button>
                                    </div>
                                    <div className="flex flex-col justify-end items-end gap-0.5">
                                        <p className="text-gray-500">شماره مرسوله :<span className="text-black font-bold">243969135</span></p>
                                        <p className="text-gray-500">ارسال توسط :<span className="text-black font-bold">فروشگاه اصلی</span></p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center bg-gray-200 ml-1.5 gap-2 p-2 rounded-xl">
                                    <div className="flex flex-col gap-1 items-center">
                                        <span className="bg-blue-200 text-[10px] text-blue-600 p-0.5 px-2 rounded-2xl">در حال پردازش</span>
                                        <Button className="cursor-pointer bg-white hover:bg-black w-19 h-6 flex items-center justify-center rounded-[10px] hover:text-white text-black">{"< برسی"}</Button>
                                    </div>
                                    <div className="flex flex-col justify-end items-end pb-1.5 gap-0.5">
                                        <p className="text-gray-500">شماره مرسوله :<span className="text-black font-bold">243969135</span></p>
                                        <p className="text-gray-500">ارسال توسط :<span className="text-black font-bold">فروشگاه آذرخش</span></p>
                                    </div>
                                </div>

                            </th>
                        </tr>

                        <tr className="flex">
                            <th className="w-3/20 border border-white text-[13px] items-center justify-center flex pr-2 py-2">22:39 - 1404/12/24</th>
                            <th className="w-2/20   border border-white text-[13px] items-center justify-center flex p-2">
                                <span className="bg-blue-200 text-[10px] text-blue-600 p-0.5 px-2 rounded-2xl">در حال پردازش</span>
                            </th>
                            <th className="w-2/20 border border-white text-[13px] items-center justify-center flex p-2">مهرشاد معصومی</th>
                            <th className="w-2/20 border border-white text-[13px] items-center justify-center flex p-2">4550589444</th>
                            <th className="w-11/20 border border-white text-[13px] items-center justify-end pl-3 flex flex-wrap py-4 p-2 gap-1.5">

                                <div className="flex items-center justify-center bg-gray-200 mb-2 rounded-xl ml-1.5 gap-2 p-2">
                                    <div className="flex flex-col gap-1 items-center">
                                        <span className="bg-blue-200 text-[10px] text-blue-600 p-0.5 px-2 rounded-2xl">در حال پردازش</span>
                                        <Button className="cursor-pointer bg-white hover:bg-black w-19 h-6 flex items-center justify-center rounded-[10px] hover:text-white text-black">{"< برسی"}</Button>
                                    </div>
                                    <div className="flex flex-col justify-end items-end gap-0.5">
                                        <p className="text-gray-500">شماره مرسوله :<span className="text-black font-bold">243969135</span></p>
                                        <p className="text-gray-500">ارسال توسط :<span className="text-black font-bold">فروشگاه اصلی</span></p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center bg-gray-200 ml-1.5 gap-2 p-2 rounded-xl">
                                    <div className="flex flex-col gap-1 items-center">
                                        <span className="bg-blue-200 text-[10px] text-blue-600 p-0.5 px-2 rounded-2xl">در حال پردازش</span>
                                        <Button className="cursor-pointer bg-white hover:bg-black w-19 h-6 flex items-center justify-center rounded-[10px] hover:text-white text-black">{"< برسی"}</Button>
                                    </div>
                                    <div className="flex flex-col justify-end items-end pb-1.5 gap-0.5">
                                        <p className="text-gray-500">شماره مرسوله :<span className="text-black font-bold">243969135</span></p>
                                        <p className="text-gray-500">ارسال توسط :<span className="text-black font-bold">فروشگاه آذرخش</span></p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center bg-gray-200 ml-1.5 gap-2 p-2 rounded-xl">
                                    <div className="flex flex-col gap-1 items-center">
                                        <span className="bg-blue-200 text-[10px] text-blue-600 p-0.5 px-2 rounded-2xl">در حال پردازش</span>
                                        <Button className="cursor-pointer bg-white hover:bg-black w-19 h-6 flex items-center justify-center rounded-[10px] hover:text-white text-black">{"< برسی"}</Button>
                                    </div>
                                    <div className="flex flex-col justify-end items-end pb-1.5 gap-0.5">
                                        <p className="text-gray-500">شماره مرسوله :<span className="text-black font-bold">243969135</span></p>
                                        <p className="text-gray-500">ارسال توسط :<span className="text-black font-bold">فروشگاه آذرخش</span></p>
                                    </div>
                                </div>

                            </th>
                        </tr>
                    </tbody>
                </table>

                <ChangeResultButtons pageNumber={5}/>
            </div>
        </div>
    )
}
export default Processing