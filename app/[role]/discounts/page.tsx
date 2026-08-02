"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Spinner from "@/components/myComponent/Spinner "
import ChangeResultButtons from "@/components/myComponent/Change-Results-Button";
import Table from "@/components/myComponent/MyTable";
import NavButton from "@/components/myComponent/NavButton";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const schema = z.object({
    title: z.string().min(3, "عنوان باید حداقل 3 کاراکتر باشد"),
    code: z.string().min(1 ,"کد تخفیف حداقل 1 کاراکتر باید باشد").max(16, "کد تخفیف حداکثر ۱۶ کاراکتر مجاز است"),
    deadDate: z.string().or(z.date()),  // اصلاح typo: deatDate → deadDate
    allowedUsesPerUser: z.number().int("باید عدد صحیح باشد").min(0, "تعداد استفاده باید عدد صحیح و غیرمنفی باشد"),
    discountPercent: z.number().min(0.5, "درصد تخفیف نمی‌تواند کمتر 0.5 درصد باشد").max(100, "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد"),
    maxDiscountAmount: z.number().min(10, "سقف مبلغ تخفیف نمی‌تواند منفی باشد")
})

type FormFields = z.infer<typeof schema>;

interface MyDataItem {
    id : string
    name: string,
    percent: string,
    code: string,
    sum: string,
    used: string
    setting: string,
    useable: string,
    user: string,
    status: string,
    date: string,
}

const data: MyDataItem[] = [
    {
        date: "1404/04/09",
        id : "123",
        status: "منقضی",
        user: "علیرضا محمدی",
        code: "12GAre5*",
        sum: "400",
        name: "تخفیف 10 درصدی بابت خرید قبلی شما",
        percent: "10%",
        setting: "...",
        useable: "1",
        used: "200"
    },
    {
        date: "1404/08/25",
        id :" 1234",
        status: "موفق",
        user: "علیرضا محمدی",
        code: "12GAre5*",
        sum: "400",
        name: "تخفیف 10 درصدی بابت خرید قبلی شما",
        percent: "10%",
        setting: "...",
        useable: "1",
        used: "200"
    },
    {
        date: "1404/08/25",
        status: "منقضی",
        id :" 12345",
        user: "علیرضا محمدی",
        code: "12GAre5*",
        sum: "400",
        name: "تخفیف 10 درصدی بابت خرید قبلی شما",
        percent: "10%",
        setting: "...",
        useable: "1",
        used: "200"
    }
]

const columns = [
    {
        key: "setting",
        title: "*",
        rowWidth: "w-1/29"
    },
    {
        key: "status",
        title: "وضعیت",
        rowWidth: "w-2/29"
    },
    {
        key: "date",
        title: "منقضی",
        rowWidth: "w-3/29"
    },
    {
        key: "used",
        title: "استفاده شده",
        rowWidth: "w-3/29"
    },
    {
        key: "user",
        title: "کاربر",
        rowWidth: "w-3/29"
    },
    {
        key: "useable",
        title: "قابل استفاده",
        rowWidth: "w-3/29"
    },
    {
        key: "sum",
        title: "تا سقف",
        rowWidth: "w-3/29"
    },
    {
        key: "percent",
        title: "درصد",
        rowWidth: "w-2/29"
    },
    {
        key: "code",
        title: "کد",
        rowWidth: "w-3/29"
    },
    {
        key: "name",
        title: "نام",
        rowWidth: "w-6/29"
    }
]

const settingItems = [
        {
            buttonTitle: "مشاهده و ویرایش",
             buttonFn : () => console.log("somthing else...")
        },
        {
            buttonTitle : "ارتقا به فروشنده",
            buttonFn : () => console.log("somthing else...")
        },
        {
            buttonTitle : "مسدود کردن",
            buttonFn : () => console.log("somthing else 2 ...")
        }
    ]

const typedColumns: Array<{ key: keyof MyDataItem; title: string; rowWidth: string }> =
    columns as Array<{ key: keyof MyDataItem; title: string; rowWidth: string }>;


export const Discount = () => {

    const [isOneUser, setIsOneUser] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [number , setNumber] = useState(0)
    const [numberError ,setNumberError] = useState<string | undefined>()
    const discountDialog = useRef<HTMLDialogElement>(null)

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<FormFields>({
        defaultValues: {},
        resolver: zodResolver(schema)
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {

        if(isOneUser){
            if(number < 1000000){
                setNumberError("شماره وجود ندارد")
                console.log("شماره وجود ندارد")
                return
            }

            setNumberError(undefined)
            const finalData = {
                ...data ,
                userNumber : number
            }
            await new Promise((resolve) => setTimeout(resolve,2000))
            console.log(finalData)
            return
        }
        await new Promise((resolve) => setTimeout(resolve,2000))
        console.log(data)
    }

    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl text-end mb-6">تراکنش ها</div>


            <div className="bg-white rounded-xl p-4 mb-15">

                <div>
                    <Button onClick={() => discountDialog.current?.showModal()} className="bg-blue-500 text-white font-bold text-[16px] rounded-xl px-5 py-4 hover:bg-blue-400">
                        % ایجاد تخفیف
                    </Button>
                </div>

                <dialog ref={discountDialog} className="bg-white top-10 left-80 pt-3 pb-4 rounded-xl">

                    <div className="flex justify-between mb-4">
                        <span onClick={() => discountDialog.current?.close()} className="px-3 hover:text-blue-500 cursor-pointer">X</span>
                        <span className="px-3 font-bold">ایجاد تخفیف</span>
                    </div>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className="px-5 w-220">

                        <div className="flex justify-between gap-5">
                            <div className="flex flex-col w-1/2">
                                <label className="text-gray-800 text-[15px]  text-end pb-2 pr-2" htmlFor="code"> کد</label>
                                <input {...register("code")} dir="rtl" className="[direction:rtl] border w-full p-2 h-11 flex items-center justify-end text-[#607B8F]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500 placeholder:text-[14px]" type="text" id="code" placeholder="مثال : yalda1402" />
                                {errors.code && <span className="text-red-700 w-full text-end text-xs mt-2 font-bold pr-2">{errors.code.message}</span>}
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label className="text-gray-800 text-[15px]  text-end pb-2 pr-2" htmlFor="title"> عنوان</label>
                                <input {...register("title")} dir="rtl" className="[direction:rtl] border w-full p-2 h-11 flex items-center justify-end text-[#607B8F] transition-all duration-200 rounded-xl outline-none focus:border-blue-500 placeholder:text-[14px]" type="text" id="title" placeholder="مثال : تخفیف یلدایی 1404" />
                                {errors.title && <span className="text-red-700 w-full text-end text-xs mt-2 font-bold pr-2">{errors.title.message}</span>}
                            </div>
                        </div>

                        <div className="flex justify-between gap-5 mt-5">
                            <div className="flex flex-col w-1/2">
                                <label className="text-gray-800 text-[15px]  text-end pb-2 pr-2" htmlFor="allowedUsesPerUser"> تعداد مجاز استفاده برای هر کاربر</label>
                                <input {...register("allowedUsesPerUser" ,{valueAsNumber : true})} dir="rtl" className="[direction:rtl] border w-full p-2 h-11 flex items-center justify-end text-[#607B8F]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500" type="number" id="allowedUsesPerUser" />
                                {errors.allowedUsesPerUser && <span className="text-red-700 w-full text-end text-xs mt-2 font-bold pr-2">{errors.allowedUsesPerUser.message}</span>}
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label className="text-gray-800 text-[15px]  text-end pb-2 pr-2" htmlFor="deadDate"> تاریخ انقضا</label>
                                <input {...register("deadDate")} dir="rtl" className="[direction:rtl] border w-full p-2 h-11 flex items-center justify-end text-[#607B8F] transition-all duration-200 rounded-xl outline-none focus:border-blue-500 placeholder:text-[14px]" type="date" id="deadDate" placeholder="برای انتخاب کلیک کنید" />
                                {errors.deadDate && <span className="text-red-700 w-full text-end text-xs mt-2 font-bold pr-2">{errors.deadDate.message}</span>}
                            </div>
                        </div>
                        <div className="flex justify-between gap-5 mt-5">
                            <div className="flex flex-col w-1/2">
                                <label className="text-gray-800 text-[15px]  text-end pb-2 pr-2" htmlFor="maxDiscountAmount"> سقف مبلغ تخفیف <span className="text-gray-600 font-bold bg-gray-200 rounded-[6px] text-[12px] px-2 py-0.5">تومان</span></label>
                                <input {...register("maxDiscountAmount" , {valueAsNumber : true})} dir="rtl" className="[direction:rtl] border w-full p-2 h-11 flex items-center justify-end text-[#607B8F]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500" type="number" id="maxDiscountAmount" />
                                {errors.maxDiscountAmount && <span className="text-red-700 w-full text-end text-xs mt-2 font-bold pr-2">{errors.maxDiscountAmount.message}</span>}
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label className="text-gray-800 text-[15px]  text-end pb-2 pr-2" htmlFor="discountPercent"> درصد تخفیف</label>
                                <input {...register("discountPercent" , {valueAsNumber : true})} dir="rtl" className="[direction:rtl] border w-full p-2 h-11 flex items-center justify-end text-[#607B8F] transition-all duration-200 rounded-xl outline-none focus:border-blue-500" type="number" id="discountPercent" />
                                {errors.discountPercent && <span className="text-red-700 w-full text-end text-xs mt-2 font-bold pr-2">{errors.discountPercent.message}</span>}
                            </div>
                        </div>

                        <span dir="rtl" className="block mt-5 mb-4">قابل استفاده برای:</span>
                        <div className="border px-7 py-5 rounded-xl">
                            <div className="w-full flex justify-center items-center gap-2">
                                <Button
                                    onClick={() => setIsOneUser(true)}
                                    type="button"
                                    className={`${isOneUser ? "bg-green-400 text-white hover:bg-green-300" : "bg-gray-100 text-black"} w-1/2 py-1`}>
                                    یک کاربر
                                </Button>
                                <Button
                                    onClick={() => setIsOneUser(false)}
                                    type="button"
                                    className={`${isOneUser ? "bg-gray-100 text-black" : "bg-green-400 text-white hover:bg-green-300"} w-1/2 py-1`}>
                                    همه
                                </Button>
                            </div>

                            {isOneUser && <>
                                <div className="w-full flex flex-col items-end justify-center mt-4 ">
                                    <label dir="rtl" className="text-gray-800 text-[15px] text-start block pb-2" htmlFor="number">شماره همراه</label>
                                    <input dir="rtl"
                                        onChange={(e) => {setNumber(Number(e.target.value))}}
                                        value={number}
                                        className="[direction:rtl] placeholder:text-[14px] border w-1/2 p-2 h-11 flex items-center justify-start text-[#607B8F] transition-all duration-200 rounded-xl outline-none focus:border-blue-500"
                                        type="number" id="number" placeholder="شماره تلفن کاربر مورد نظر" />
                                    {numberError && <span className="text-red-700 w-full text-end text-xs mt-2 font-bold pr-2">{numberError}</span>}
                                </div>
                                <div className="flex justify-end">
                                    <span dir="rtl" className="text-green-900 block text-[14px] mt-5 w-5/12 rounded-2xl bg-green-100 py-2 px-5">کد تخفیف به کاربر اطلاعرسانی میشود</span>
                                </div></>}
                        </div>

                        <Button type="submit" className="mt-3 bg-blue-500 text-white hover:bg-blue-400">
                            {isSubmitting ? <Spinner/> : "ایجاد"}
                        </Button>
                    </form>
                </dialog>

                <div className="flex justify-end items-end flex-col border-b border-gray-200 pb-7">
                    <div className={`${isSearchActive ? "border border-blue-400" : ""} [direction:rtl] border w-full p-1 h-12 flex items-center justify-end mt-5
                    text-[#607B8F]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500`}>
                        <input type="text" className="w-full h-full outline-none pr-2 cursor-pointer placeholder:text-[15px]"
                            placeholder="تراکنش ها..."
                            onFocus={() => setIsSearchActive(prev => { return !prev })}
                            onBlur={() => setIsSearchActive(prev => { return !prev })} />
                        <Button className="bg-blue-500 hover:bg-blue-400 h-10 w-10 rounded-xl cursor-pointer"></Button>
                    </div>
                </div>
                <NavButton title1="همه" title2="فعال" title3="منقضی" />
                <Table data={data} columns={typedColumns} settingItems={settingItems}/>
                <ChangeResultButtons pageNumber={23} />
            </div>
        </div>
    )
}


export default Discount
