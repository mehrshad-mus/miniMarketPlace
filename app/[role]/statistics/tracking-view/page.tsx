import ChangeResultButtons from "@/components/myComponent/Change-Results-Button";

export default function TrackingView() {
    return (
        <div className="bg-gray-100 p-6 pt-5 mb-3">
            <p className="font-bold text-xl text-end  mb-6">رهگیری بازدید ها</p>

            <div className="bg-white rounded-xl py-4 px-5">
                <p className="text-[13px] text-end bg-gray-100 text-gray-600 rounded-2xl px-3 py-2">
                    بازدید های اخیر مدیران و فروشندگان و کاربران تا 30 روز اخیر ثبت میشوند</p>

                <div className="w-full ">
                    <table className="w-full">
                        <thead className="w-full">
                            <tr className="flex border bg-gray-100 mt-5 w-full">
                                <th className="w-3/15 border font-bold text-[15px] items-center justify-center flex pr-2 py-2">تاریخ</th>
                                <th className="w-4/15 border font-bold text-[15px] items-center justify-end flex pr-2 py-2">مرورگر</th>
                                <th className="w-2/15 border font-bold text-[15px] items-center justify-end flex pr-2 py-2">	سیستم عامل</th>
                                <th className="w-2/15 border font-bold text-[15px] items-center justify-end flex pr-2 py-2">قسمت</th>
                                <th className="w-1/15 border font-bold text-[15px] items-center justify-end flex pr-2 py-2">پلتفرم</th>
                                <th className="w-2/15 border font-bold text-[15px] items-center justify-end flex pr-2 py-2">IP</th>
                                <th className="w-1/15 border font-bold text-[15px] items-center justify-end flex pr-2 py-2">کاربر</th>
                                <th className="w-2/15 border font-bold text-[15px] items-center justify-end flex pr-2 py-2">آدرس</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            <tr className="flex w-full h-10">
                                <th className="w-3/15 border text-[13px] items-center justify-center flex pr-1 py-1" dir="rtl">	11:37 - 1405/01/01</th>
                                <th className="w-4/15 border text-[13px] items-center justify-start flex pr-1 py-1" dir="rtl">Google Chrome 145.0.0.0</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-1 py-1" dir="rtl">Android</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-1 py-1" dir="rtl">صفحه اول فروشگاه</th>
                                <th className="w-1/15 border text-[13px] items-center justify-start flex pr-1 py-1" dir="rtl">فروشگاه</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-1 py-1" dir="rtl">5.822.207.24</th>
                                <th className="w-1/15 border text-[13px] items-center justify-start flex pr-1 py-1" dir="rtl">کاربر 1</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-1 py-1 text-blue-400" dir="rtl">
                                    <a href="">لینک بازدید شده</a>
                                </th>
                            </tr>
                            <tr className="flex bg-gray-100 h-10">
                                <th className="w-3/15 border text-[13px] items-center justify-center flex pr-2 py-1" dir="rtl">	11:35 - 1405/01/01</th>
                                <th className="w-4/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">Google Chrome 145.0.0.0</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">Windows</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">پنل فروشندگی</th>
                                <th className="w-1/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">فروشگاه</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">5.122.205.24</th>
                                <th className="w-1/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">کاربر 2</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-2 py-1 text-blue-400" dir="rtl">
                                    <a href="">لینک بازدید شده</a>
                                </th>
                            </tr>
                            <tr className="flex h-10">
                                <th className="w-3/15 border text-[13px] items-center justify-center flex pr-2 py-1" dir="rtl">	11:35 - 1405/01/01</th>
                                <th className="w-4/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">Google Chrome 145.0.0.0</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">Windows</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">پنل فروشندگی</th>
                                <th className="w-1/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">فروشگاه</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">5.122.205.24</th>
                                <th className="w-1/15 border text-[13px] items-center justify-start flex pr-2 py-1" dir="rtl">کاربر 3</th>
                                <th className="w-2/15 border text-[13px] items-center justify-start flex pr-2 py-1 text-blue-400" dir="rtl">
                                    <a href="">لینک بازدید شده</a>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>

               
            </div>
        </div>
    )
}