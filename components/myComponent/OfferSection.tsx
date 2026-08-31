"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import MyTable from '@/components/myComponent/MyTable'
import { Button } from '@/components/ui/button'
import { offer, userProfileData } from '@/lib/queries'
import { OfferField, offerSchema } from '@/lib/zodSchema/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Spinner from './Spinner '
import { toast } from 'sonner'
import OfferColumn from '@/components/myComponent/columns/OfferColumn'
import { useRouter } from 'next/navigation'

export default function OfferSection({ productId, editOffer, title, mutaionKey, mode, invalidations, buttonTitle }:
    {
        productId: string,
        buttonTitle: string,
        editOffer?: boolean,
        title: string,
        mode: "create" | "update",
        mutaionKey: string[],
        invalidations: string[],
    }) {
    const queryClient = useQueryClient();
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        formState: { isSubmitting, errors }
    } = useForm<OfferField>({
        resolver: zodResolver(offerSchema),
        defaultValues: { variants: [] },
    })

    const { data, isLoading, error } = useQuery({
        queryKey: ["productOffer", productId],
        queryFn: () => offer.getAllOffer({productId})
    })

    const { mutate, isError, isPending } = useMutation({
        mutationKey: mutaionKey,
        mutationFn: mode === "create" ? offer.createOffer : offer.updateOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: invalidations })
            router.push(`/admin/offers`)
            toast.success("با موفقیت تغییر کرد", {
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

    const {data : currentUser , isLoading:currentUserLoading} = useQuery({
        queryKey: ["currentUser"],
        queryFn: userProfileData
    })

    const variantsFromDb = data?.products[0].productVariant

    const variants = watch("variants")

    const { columns } = OfferColumn({
        productId,
        queryClient,
        errors,
        mode,
        register,
        watch
    })

    useEffect(() => {
        if (editOffer && variantsFromDb) {

            const array: { price: number, discount: number, stock: number, id: string,sellerName ?: string, offerId?: string, values: { optionId: string, optionName: string, value: string }[] }[] = [];
            for (const var1 of variantsFromDb) {
                if (var1.offer.length === 0) {
                    array.push({
                        price: 0,
                        stock: 0,
                        discount: 0,
                        id: var1.id,
                        values: var1.variantValue.map((variantvalue) => {
                            return {
                                optionId: variantvalue.productOptionValue.productOptionId,
                                optionName: variantvalue.productOptionValue.productOption.name,
                                value: variantvalue.productOptionValue.value
                            }
                        })
                    })
                }
                for (const off of var1.offer) {
                    array.push({
                        price: off.price,
                        stock: off.stock,
                        discount: off.discount,
                        id: off.id,
                        offerId: off.id,
                        sellerName : off.seller.name,
                        values: var1.variantValue.map((variantvalue) => {
                            return {
                                optionId: variantvalue.productOptionValue.productOptionId,
                                optionName: variantvalue.productOptionValue.productOption.name,
                                value: variantvalue.productOptionValue.value
                            }
                        })
                    })
                }
            }
            setValue("variants", array)
            return
        }

        const variants = variantsFromDb?.map((item) => {
            return {
                price: 0,
                discount: 0,
                stock: 0,
                id: item.id,
                values: item.variantValue.map((variantvalue) => {
                    return {
                        optionId: variantvalue.productOptionValue.productOptionId,
                        optionName: variantvalue.productOptionValue.productOption.name,
                        value: variantvalue.productOptionValue.value
                    }
                })
            }
        })

        if (variants) setValue("variants", variants)
    }, [data])

    const onSubmit: SubmitHandler<OfferField> = async (data) => {
        mutate(data)
        // console.log(data)
    }
    return (
        <>
            <div>{productId}</div>

            <div className="bg-gray-100 p-6">

                <div className="font-bold text-2xl mb-6">{title}</div>

                <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center flex-col items-end gap-3'>
                    <Button type='submit' className='text-white bg-blue-600 hover:bg-blue-500'>{isPending ? <Spinner /> : buttonTitle}</Button>
                    {variants && <MyTable data={variants} columns={columns}></MyTable>}
                </form>
            </div>
        </>
    )
}