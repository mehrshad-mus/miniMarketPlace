"use client"
import { FormInput } from "@/components/myComponent/FormInput";
import MainProductDetailPage from "@/components/myComponent/productPage/MainProductDetailPage";
import MediaSection from "@/components/myComponent/productPage/MediaSection";
import NavProductDetail from "@/components/myComponent/productPage/NavProductDetail";
import OptionPage from "@/components/myComponent/productPage/OptionPage";
import VariantTable from "@/components/myComponent/productPage/VariantTable";
import { DetailPageProps } from "@/lib/constant/enums";
import { product, productRequest, userProfileData } from "@/lib/queries";
import { schema, FormFields } from "@/lib/zodSchema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export const Create = () => {
    const queryClient = useQueryClient();
    const router = useRouter()

    const [detailPage, setDetailPage] = useState("importantDetail")

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        getValues,
        formState: { isSubmitting, errors }
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: { option: [], variants: [], specialProduct: false, showComment: true, showView: true, },
    })

    const { fields, append, remove } = useFieldArray({
        name: "option",
        control
    });

    const { mutate, isPending: adminRequestPending } = useMutation({
        mutationKey: ["createProduct"],
        mutationFn: product.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("محصول با موفقیت ساخته شد", {
                position: "bottom-left", style: {
                    background: "#CBC3E3",
                    color: "#5D3FD3",
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px"
                },
            })
            router.push("/admin/product")
        },
        onError: (err) => { console.log(err) }
    })

    const { mutate: sellerRequestMutate, isPending: sellerRequestPending } = useMutation({
        mutationKey: ["createProductRequest"],
        mutationFn: productRequest.createProductRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productRequests"] });
            toast.success("درخواست شما با مفقیت ثبت شد", {
                position: "bottom-left", style: {
                    background: "#CBC3E3",
                    color: "#5D3FD3",
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px"
                },
            })
        },
        onError: (err) => { console.log(err) }
    })

    const { data: currentUser, isLoading: currentUserLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: userProfileData
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        if (currentUser?.role === "ADMIN") {
            mutate(data)
            return
        }
        sellerRequestMutate(data)
    }

    return (

        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">ایجاد محصول</div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-4 px-5 mb-14 flex justify-center items-start gap-3">

                <NavProductDetail submitButtonTitle={currentUser?.role === "ADMIN" ? "ایجاد محصول" : "ارسال برای تایید"} remove={remove} control={control} errors={errors} detailPage={detailPage} setDetailPage={setDetailPage}
                    isLoading={currentUser?.role === "ADMIN" ? adminRequestPending : sellerRequestPending} />

                <MainProductDetailPage register={register} setValue={setValue} watch={watch} errors={errors} detailPage={detailPage} />

                <MediaSection watch={watch} setValue={setValue} errors={errors} detailPage={detailPage}/>

                <OptionPage append={append} control={control} errors={errors} fields={fields} watch={watch} setValue={setValue} detailPage={detailPage} />

                <div className={`justify-center items-center flex-col w-4/5 py-3 px-5 gap-6  ${detailPage === DetailPageProps.SEO ? "flex" : `hidden`}`}>
                    <div className="flex justify-between gap-5 w-full">
                        <FormInput id="seoTitle" label="عنوان سئو" error={errors.seoTitle?.message} placeholder="عنوان اصلی برای سئو" register={register("seoTitle")}></FormInput>
                        <FormInput id="seoWord" label="کلمات کلیدی" error={errors.seoWord?.message} placeholder="تایپ کنید و اینتر بزنید" register={register("seoWord")} />
                    </div>
                    <div className="flex justify-between gap-5 w-full">
                        <FormInput id="seoExplanation" label="توضیحات سئو" className="w-full" textarea error={errors.seoExplanation?.message} placeholder="مختصری از محتوا رت در دو خط توضیح دهید(نمایش در سرچ گوگل)" register={register("seoExplanation")}></FormInput>
                    </div>
                </div>

                <VariantTable
                    detailPage={detailPage}
                    fields={fields}
                    watch={watch} />

            </form>
        </div>
    )
}

export default Create
