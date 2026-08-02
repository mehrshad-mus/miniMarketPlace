import { DetailPageProps } from '@/lib/constant/enums'
import { FormFields } from '@/lib/zodSchema/schema'
import React, { SetStateAction } from 'react'
import { Controller, FieldErrors, Control, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form'
import ErrorIndicator from '../ErrorIndicator'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import Spinner from '../Spinner '

const NavProductDetail = ({ errors, setDetailPage, detailPage, control, isLoading ,remove ,submitButtonTitle}:
    {
        errors: FieldErrors<FormFields>,
        control: Control<FormFields>,
        detailPage: string,
        remove: () => void,
        setDetailPage: React.Dispatch<SetStateAction<string>>
        isLoading: boolean,
        submitButtonTitle: string
    }) => {

    return (
        <div className=" w-1/5 text-[15px] flex flex-col justify-center items-center gap-5">

            <ul className="py-3 px-2 flex justify-center items-start gap-3 flex-col bg-gray-50 border rounded-xl w-full">
                <li
                    className={`cursor-pointer w-full flex justify-between items-center px-2 py-1 rounded-lg ${detailPage === DetailPageProps.IMPORTANT_DETAIL && "bg-blue-50 text-blue-800 font-bold"}`}
                    onClick={() => setDetailPage(DetailPageProps.IMPORTANT_DETAIL)}>
                    <span> اطلاعات کلی</span>
                    {(errors.title || errors.tag || errors.category) && <ErrorIndicator />}
                </li>
                <li
                    className={`cursor-pointer w-full px-2 flex justify-between items-center py-1 rounded-lg ${detailPage === DetailPageProps.MEDIA && "bg-blue-100 text-blue-800 font-bold"}`}
                    onClick={() => setDetailPage(DetailPageProps.MEDIA)}>
                    <span> تصاویر و مدیا</span>
                    {(errors.images) && <ErrorIndicator />}
                </li>
                <li
                    className={`cursor-pointer w-full flex justify-between items-center px-2 py-1 rounded-lg ${detailPage === DetailPageProps.OPTION && "bg-blue-100 text-blue-800 font-bold"}`}
                    onClick={() => setDetailPage(DetailPageProps.OPTION)}>
                    <span> آپشن ها و مشخصات</span>
                    {(errors.option) && <ErrorIndicator />}
                </li>
                <li
                    className={`cursor-pointer w-full flex justify-between items-center px-2 py-1 rounded-lg ${detailPage === DetailPageProps.SEO && "bg-blue-100 text-blue-800 font-bold"}`}
                    onClick={() => setDetailPage(DetailPageProps.SEO)}>
                    <span> تنظیمات سئو</span>
                </li>
                <li
                    className={`cursor-pointer w-full flex justify-between items-center px-2 py-1 rounded-lg ${detailPage === DetailPageProps.VARIANTS && "bg-blue-100 text-blue-800 font-bold"}`}
                    onClick={() => setDetailPage(DetailPageProps.VARIANTS)}>
                    تنوع محصول
                    {(errors.variants) && <ErrorIndicator />}
                </li>
                <li className={`cursor-pointer w-full px-2 py-1 rounded-lg`}>راهنمای محصول</li>
            </ul>

            <ul className="p-4 px-5 flex justify-center items-start gap-3 flex-col border bg-gray-50 rounded-xl w-full">
                <li className="flex justify-start items-center gap-2">
                    <Controller
                        control={control}
                        name="specialProduct"
                        render={({ field }) => (
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-600 cursor-pointer" size="sm"
                            />
                        )}
                    />

                    <span>محصول ویژه؟</span>
                </li>

                <li className="flex justify-start items-center gap-2">
                    <Controller
                        control={control}
                        name="showComment"
                        render={({ field }) => (
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-600 cursor-pointer" size="sm"
                            />
                        )}
                    />
                    <span>نمایش پرسش و پاسخ؟</span>
                </li>

                <li className="flex justify-start items-center gap-2">
                    <Controller
                        control={control}
                        name="showView"
                        render={({ field }) => (
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-600 cursor-pointer" size="sm"
                            />
                        )}
                    />
                    <span>نمایش دیدگاه؟</span>
                </li>

                <div className='flex flex-col justify-center items-center w-full '>
                    <Button type="submit" className="bg-blue-600 text-white h-8 w-full mt-4 hover:bg-blue-500">{isLoading ? <Spinner /> : submitButtonTitle}</Button>
                    <Button type="reset" onClick={() => {
                        remove()
                    }} className="bg-gray-600 text-white h-8 w-full mt-4 hover:bg-gray-500">پاک کردن</Button>
                </div>

            </ul>
        </div>
    )
}

export default NavProductDetail