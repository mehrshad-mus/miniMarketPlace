"use client"
import ChangeResultButtons from "@/components/myComponent/Change-Results-Button";
import Table from "@/components/myComponent/MyTable";
import NavButton from "@/components/myComponent/NavButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MyDataItem {
    type: string,
    sum: string,
    user: string,
    detail: string,
    transaction: string,
    status: string,
    date: string,
}

const data: MyDataItem[] = [
    {
        date: "23:03 - 1404/08/25",
        status: "موفق",
        transaction: "913319837",
        detail: "درآمد حاصل از فروش مرسوله cn-151567522",
        user: "علیرضا محمدی",
        sum: "+24,489,150",
        type: "واریز"
    },
    {
        date: "23:03 - 1404/08/25",
        status: "موفق",
        transaction: "913319837",
        detail: "درآمد حاصل از فروش مرسوله cn-151567522",
        user: "علیرضا محمدی",
        sum: "-24,489,150",
        type: "برداشت"
    },
    {
        date: "23:03 - 1404/08/25",
        status: "موفق",
        transaction: "913319837",
        detail: "درآمد حاصل از فروش مرسوله cn-151567522",
        user: "علیرضا محمدی",
        sum: "+24,489,150 ",
        type: "واریز"
    }
]

const columns = [
    {
        key: "date",
        title: "تاریخ",
        rowWidth: "w-2/15"
    },
    {
        key: "status",
        title: "وضعیت",
        rowWidth: "w-1/15"
    },
    {
        key: "transaction",
        title: "شناسه تراکنش",
        rowWidth: "w-2/15"
    },
    {
        key: "detail",
        title: "توضیحات",
        rowWidth: "w-5/15"
    },
    {
        key: "user",
        title: "کاربر",
        rowWidth: "w-2/15"
    },
    {
        key: "sum",
        title: "مبلغ",
        rowWidth: "w-2/15"
    },
    {
        key: "type",
        title: "نوع",
        rowWidth: "w-1/15"
    }
]

const typedColumns: Array<{ key: keyof MyDataItem; title: string; rowWidth: string }> =
    columns as Array<{ key: keyof MyDataItem; title: string; rowWidth: string }>;


export const Transactions = () => {

    const [isSearchActive, setIsSearchActive] = useState(false)
    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl text-end mb-6">تراکنش ها</div>


            <div className="bg-white rounded-xl p-4 mb-15">

                <div className="flex justify-end items-end flex-col border-b pb-7">
                    <div className={`${isSearchActive ? "border border-blue-400" : ""} [direction:rtl] border w-full p-1 h-12 flex items-center justify-end mt-5
                    text-[#607B8F]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500`}>
                        <input type="text" className="w-full h-full outline-none pr-2 cursor-pointer placeholder:text-[15px]"
                            placeholder="تراکنش ها..."
                            onFocus={() => setIsSearchActive(prev => { return !prev })}
                            onBlur={() => setIsSearchActive(prev => { return !prev })} />
                        <Button className="bg-blue-500 hover:bg-blue-400 h-10 w-10 rounded-xl cursor-pointer"></Button>
                    </div>
                </div>
                <Table data={data} columns={typedColumns} />
            </div>
        </div>
    )
}
export default Transactions