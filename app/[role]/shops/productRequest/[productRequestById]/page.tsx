'use client'
import { options, product, productRequest } from '@/lib/queries';
import { Router } from 'next/router';
import { FormFields, Option, schema } from '@/lib/zodSchema/schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, use, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import NavProductDetail from '@/components/myComponent/productPage/NavProductDetail';
import MainProductDetailPage from '@/components/myComponent/productPage/MainProductDetailPage';
import MediaSection from '@/components/myComponent/productPage/MediaSection';
import OptionPage from '@/components/myComponent/productPage/OptionPage';
import { FormInput } from '@/components/myComponent/FormInput';
import VariantTable from '@/components/myComponent/productPage/VariantTable';
import { DetailPageProps } from '@/lib/constant/enums';
import Spinner from '@/components/myComponent/Spinner ';
import { Button } from '@/components/ui/button';
import OptionDialog, { OptionDialogProps } from '@/components/myComponent/optionDialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const DefaultInputContext = createContext("");
export default function EditProduct({
    params,
}: {
    params: Promise<{ productRequestById: string }>
}) {
    const { productRequestById: productRequestId } = use(params)
    const productRequestDeleteDialog = useRef<HTMLDialogElement>(null)

    const { data: currentProductRequest, isLoading, error } = useQuery({
        queryKey: ["productRequestByID", productRequestId],
        queryFn: () => productRequest.getAllProductRequest({ productRequestId }) 
    })

    const queryClient = useQueryClient();

    const [detailPage, setDetailPage] = useState("importantDetail")

    const router = useRouter()

    const dialogState: OptionDialogProps = {
        id: productRequestId,
        title: "حذف",
        mutateFn: productRequest.deleteProductRequest,
        placeholder: `آیا از حذف محصول درخواست شده توسط فروشنده  ${currentProductRequest?.productRequests[0].seller.name} اطمینان دارید؟`,
        mutationKey: ["deleteProductRequest"],
        invalidations: ["productRequests"],
        router: { fn: router, type: "push" , url : "/admin/shops/productRequest/awaiting" }
    }

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        reset,
        formState: { isSubmitting, errors }
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: { option: [], variants: [], specialProduct: false, showComment: true, showView: true },
    })

    const { fields, append, remove } = useFieldArray({
        name: "option",
        control
    });

    useEffect(() => {
        if (currentProductRequest?.productRequests?.[0]) {
            reset({
                title: currentProductRequest.productRequests[0].title,
                englishTitle: currentProductRequest.productRequests[0].englishTitle ?? "",
                brand: { name: currentProductRequest.productRequests[0].brand.name, id: currentProductRequest.productRequests[0].brand.id },
                category: { name: currentProductRequest.productRequests[0].category.name, id: currentProductRequest.productRequests[0].category.id },
                tag: currentProductRequest.productRequests[0].tag ?? "",
                warningAndDetail: currentProductRequest.productRequests[0].warningAndDetail ?? "",
                id: currentProductRequest.productRequests[0].id,
                seoTitle: currentProductRequest.productRequests[0].seoTitle ?? "",
                seoWord: currentProductRequest.productRequests[0].seoWord ?? "",
                seoExplanation: currentProductRequest.productRequests[0].seoExplanation ?? "",
                showComment: currentProductRequest.productRequests[0].showComment,
                specialProduct: currentProductRequest.productRequests[0].specialProduct,
                showView: currentProductRequest.productRequests[0].showView,
                variants: []
            });

            const options = currentProductRequest?.productRequests[0].options as Option[]

            for (const option of options) {
                append({
                    name: option.name,
                    optionId: option.optionId,
                    optionValue: option.optionValue.map((value) => {
                        return {
                            value: value.value,
                            optionValueId: value.optionValueId
                        }
                    })
                })
            }

            queryClient.invalidateQueries({
                queryKey: ["productRequests"]
            })

        }
    }, [currentProductRequest, reset, append]);


    const { mutate, isPending } = useMutation({
        mutationKey: ["createProduct"],
        mutationFn: product.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success(" ساخته شد محصول با موفقیت ", {
                position: "bottom-left", style: {
                    background: "#98e897",
                    color: "#ffffff",
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

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        mutate(data)
    }

    return (
        <div>
            <div className="bg-gray-100 p-6">

                <div className="font-bold text-2xl mb-6">محصول درخواست شده</div>


                {isLoading ? <Spinner />
                    : <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-4 px-5 mb-14 flex justify-center items-start gap-3">

                        <NavProductDetail submitButtonTitle='تایید و افزودن محصول' remove={remove} control={control} errors={errors} detailPage={detailPage} setDetailPage={setDetailPage} isLoading={isPending} />

                        <MainProductDetailPage register={register} setValue={setValue} watch={watch} errors={errors} detailPage={detailPage} />

                        <MediaSection setValue={setValue} errors={errors} detailPage={detailPage} defaulImages={currentProductRequest?.productRequests[0].images} />

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

                        <OptionDialog
                            title={dialogState?.title}
                            ref={productRequestDeleteDialog}
                            id={dialogState?.id}
                            mutationKey={dialogState?.mutationKey}
                            mutateFn={dialogState?.mutateFn}
                            invalidations={dialogState?.invalidations}
                            placeholder={dialogState?.placeholder}
                            router={dialogState.router}
                        />

                        <Button type='button' onClick={() => {
                            productRequestDeleteDialog.current?.showModal()
                        }} className="bg-red-600 text-white hover:bg-red-500 cursor-pointer"> حذف  درخواست </Button>
                    </form>}
            </div>
        </div>
    )
}