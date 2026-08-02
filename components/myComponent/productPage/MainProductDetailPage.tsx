import { FormFields } from '@/lib/zodSchema/schema'
import React, { useState } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { FormInput } from '../FormInput'
import { DetailPageProps } from '@/lib/constant/enums'
import { useQuery } from '@tanstack/react-query'
import { brand, category } from '@/lib/queries'
import { ScrollInput } from '../ScrollInput'
import { DefaultInputContext } from "@/app/[role]/product/[editProductById]/page";
import { useContext } from "react";


const MainProductDetailPage = (
    { errors, register, detailPage , setValue ,watch}:
        {
            errors: FieldErrors<FormFields>,
            register: UseFormRegister<FormFields>,
            detailPage: string,
            setValue : UseFormSetValue<FormFields>
            watch : UseFormWatch<FormFields>
        }
) => {

    const { data : categoryList, error, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: category.getAllCategory
    })

    const {data : brandList} = useQuery({
        queryKey: ["brand"],
        queryFn: brand.getAllBrand
    })

    const currentBrand = watch("brand")
    const currentCategory = watch("category")
    
    const defaultInputContext = useContext(DefaultInputContext);

    return (
        <div className={`justify-center items-center flex-col w-4/5 py-3 px-5 gap-6 ${detailPage === DetailPageProps.IMPORTANT_DETAIL ? " flex" : ` hidden`}`} >

            <div className="flex justify-between gap-5 w-full">
                
                <FormInput id="title" label="عنوان" error={errors.title?.message} placeholder="عنوان اصلی محصول" register={register("title")}> <span className="text-red-900 pt-1">*</span> </FormInput>
                <FormInput id="englishTitle" label="عنوان انگلیسی" error={errors.englishTitle?.message} placeholder="عنوان انگلیسی محصول" register={register("englishTitle")} />
            </div>

            <div className="flex justify-between gap-5 w-full">
                <ScrollInput setValue={setValue} currentState={currentCategory} forWitchField='category' errors={errors} title="دسته‌بندی اصلی" scrollItems={categoryList} placeholder="اتخاب دسته بندی" isRequire={true} />
                <FormInput id="tag" label="برچسب" error={errors.tag?.message} placeholder="تایپ کنید" register={register("tag")} />
            </div>

            <div className="flex justify-between gap-5 w-full">
                <ScrollInput setValue={setValue} currentState={currentBrand} errors={errors} forWitchField='brand' title="برند" scrollItems={brandList} placeholder="اتخاب برند" isRequire={true} />
                <FormInput id="id" label="شناسه محصول " error={errors.id?.message} placeholder="" register={register("id")}> <span className="bg-gray-100 text-xs text-gray-600 p-0.5 rounded-[2px] mr-1 ">اختیاری</span> </FormInput>
            </div>

            <div className="flex justify-between gap-5 w-full">
                <FormInput textarea id="warningAndDetail" className="w-full" label="هشدار ها و توضیحات" type="textarea" error={errors.warningAndDetail?.message} register={register("warningAndDetail")} />
            </div>


        </div>
    )
}

export default MainProductDetailPage