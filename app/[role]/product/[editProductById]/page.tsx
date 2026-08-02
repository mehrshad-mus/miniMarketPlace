'use client'
import { options, product, productRequest } from '@/lib/queries';
import { FormFields, schema } from '@/lib/zodSchema/schema';
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
    params: Promise<{ editProductById: string }>
}) {
    const { editProductById: productId } = use(params)

    const router = useRouter()

    const productDeleteDialog = useRef<HTMLDialogElement>(null)

    const { data, isLoading, error } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => product.getAllProduct({ productId })
    })

    const queryClient = useQueryClient();

    const [detailPage, setDetailPage] = useState("importantDetail")

    const [dialogState, setDialogState] = useState<OptionDialogProps>({
        id: productId,
        title: "حذف",
        mutateFn: product.deleteProduct,
        placeholder: "آیا از حذف محصول اطمینان دارید؟",
        mutationKey: ["deleteProduct"],
        invalidations: ["product"]
    })

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
        console.log("RESET RUNNING");
        if (data?.products?.[0]) {
            reset({
                title: data.products[0].title,
                englishTitle: data.products[0].englishTitle ?? "",
                brand: { name: data.products[0].brand.name, id: data.products[0].brand.id },
                category: { name: data.products[0].category.name, id: data.products[0].category.id },
                tag: data.products[0].tag ?? "",
                warningAndDetail: data.products[0].warningAndDetail ?? "",
                id: data.products[0].id,
                seoTitle: data.products[0].seoTitle ?? "",
                seoWord: data.products[0].seoWord ?? "",
                seoExplanation: data.products[0].seoExplanation ?? "",
                showComment: data.products[0].showComment,
                specialProduct: data.products[0].specialProduct,
                showView: data.products[0].showView,
                variants: []
            });

            for (const option of data.products[0].productOption) {
                append({
                    name: option.name,
                    optionId: option.id,
                    optionValue: option.productOptionValues.map((value) => {
                        return {
                            value: value.value,
                            optionValueId: value.id
                        }
                    })
                })
            }
        }
    }, [data, reset, append]);


    const { mutate, isPending } = useMutation({
        mutationKey: ["createProduct"],
        mutationFn: product.updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("با موفقیت تغییر کرد", {
                position: "bottom-left", style: {
                    background: "#98e897",
                    color: "#054f04",
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
            <p>{productId}</p>

            <div className="bg-gray-100 p-6">

                <div className="font-bold text-2xl mb-6">تغییر محصول</div>


                {isLoading ? <Spinner />
                    : <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-4 px-5 mb-14 flex justify-center items-start gap-3">

                        <NavProductDetail submitButtonTitle='اعمال تغییرات' remove={remove} control={control} errors={errors} detailPage={detailPage} setDetailPage={setDetailPage} isLoading={isPending} />

                        <MainProductDetailPage register={register} setValue={setValue} watch={watch} errors={errors} detailPage={detailPage} />

                        <MediaSection setValue={setValue} errors={errors} detailPage={detailPage} />

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
                            ref={productDeleteDialog}
                            id={dialogState?.id}
                            mutationKey={dialogState?.mutationKey}
                            mutateFn={dialogState?.mutateFn}
                            invalidations={dialogState?.invalidations}
                            placeholder={dialogState?.placeholder}
                            router={{fn: router , type:"push" , url:"/admin/product"}}

                        />

                        <Button type='button' onClick={() => {
                            productDeleteDialog.current?.showModal()
                        }} className="bg-red-600 text-white hover:bg-red-500 cursor-pointer"> حذف محصول</Button>
                    </form>}
            </div>
        </div>
    )
}