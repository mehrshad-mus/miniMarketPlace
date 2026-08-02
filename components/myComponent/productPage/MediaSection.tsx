import { DetailPageProps } from '@/lib/constant/enums'
import { FormFields } from '@/lib/zodSchema/schema'
import React, { useEffect, useState } from 'react'
import { FieldErrors, UseFormSetValue } from 'react-hook-form'
import Image from "next/image";
import { ProductRequestImage } from '@/app/generated/prisma/client';

async function urlToFile(url: string) {
    const response = await fetch(`/uploads/${url}`);

    if(!response.ok) {
        throw new Error(`Failed to fetch file from URL: ${url}`);
    }
    const blob = await response.blob();

    
    return new File([blob], url, {
        type: blob.type,
    });
}

const MediaSection = (
    { setValue, detailPage, errors, defaulImages }:
        {
            setValue: UseFormSetValue<FormFields>
            errors: FieldErrors<FormFields>
            detailPage: string,
            defaulImages?: ProductRequestImage[]
        }
) => {

    const [images, setImages] = useState<string[]>(
        () => defaulImages?.map(img => img.url) ?? []
    )

    const [video, setVideo] = useState<string>()

    const [fileImagePath , setFileImagePath] = useState(false);

    function imgHandler(e: React.ChangeEvent<HTMLInputElement>) {

        const files = Array.from(e.target.files ?? []);

        setValue("images", files, { shouldValidate: true })
        const urls = files.map((file) =>
            URL.createObjectURL(file)
        );

        setFileImagePath(true)
        setImages(urls)
    }

    function videoHandler(e: React.ChangeEvent<HTMLInputElement>) {
        // console.log(e.target)
        const file = e.target.files?.[0]

        if (file) {
            setValue("video", file, { shouldValidate: true })

            const url = URL.createObjectURL(file)

            setVideo(url)
        }
    }

    useEffect(() => {
        if (!defaulImages) return

        async function loadImages() {
            
            const imageFiles = await Promise.all(
                images.map((imgURL) => 
                    urlToFile(imgURL)
                )
            )

            setValue("images", imageFiles, { shouldValidate: true })
        }

        loadImages()

    }, [defaulImages])
    
    return (
        <div className={`justify-center items-start flex-col w-4/5 py-3 px-5 gap-6  ${detailPage === DetailPageProps.MEDIA ? "flex" : `hidden`}`}>

            <div className="flex justify-start items-start flex-col w-full gap-3 border-b pb-8">

                <span className="font-bold text-base">گالری تصاویر محصول</span>

                <p className="text-[14px] text-gray-600">تصاویر اضافه شده برای موجودی های محصول نیز در گالری تصاویر محصول نمایش داده خواهد شد.</p>

                <div className="flex gap-4 justify-start items-center flex-wrap">
                    <label className="w-60 h-60 rounded-lg border bg-gray-50 mt-5 flex justify-center flex-col items-center cursor-pointer">
                        <span className="flex justify-center items-center text-7xl font-extralight text-gray-600">+</span>
                        <span className="text-gray-600">برای انتخاب عکس کلیک کنید</span>
                        <input className="hidden" type="file" accept="image/*" onChange={imgHandler} multiple />
                    </label>

                    {images?.map((img) => {
                        return (
                            <Image key={img} src={!fileImagePath ? `/uploads/${img}` : img} className="w-60 h-60 object-cover rounded-lg border mt-5" width={240} height={240} alt="this is a photo"></Image>
                        )
                    })}
                    {errors.images && <span className="text-red-700 w-full text-xs mt-2 font-bold pr-2">{errors.images.message}</span>}
                </div>
            </div>

            <span className="font-bold text-base">ویدیوی معرفی محصول</span>

            <span className="text-gray-600 text-[14px]">برای انتخاب ویدئو کلیک کنید</span>

            <div className="border-b flex justify-center items-start gap-5 pb-8">
                <label className="w-20 h-20 rounded-lg border bg-gray-50 flex justify-center flex-col items-center cursor-pointer mb-4">
                    <span className="flex justify-center items-center text-xl font-extralight text-gray-600">+</span>
                    <input className="hidden" type="file" accept="video/*" onChange={videoHandler} />
                </label>

                {
                    video &&
                    <div className="w-60 h-60 rounded-lg border">
                        <video controls src={video} className="w-full h-full rounded-lg" />
                    </div>
                }
            </div>
            {errors.video && <span className="text-red-700 w-full text-xs mt-2 font-bold pr-2">{errors.video.message}</span>}

            <p className="text-xs text-gray-400">از قسمت کتابخانه مدیا میتوانید فایل خود را بارگذاری کرده و لینک آن را کپی کنید و در اینجا قرار دهید.</p>
        </div>
    )
}

export default MediaSection