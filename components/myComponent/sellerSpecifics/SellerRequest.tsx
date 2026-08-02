"use client"
import React, { useEffect } from 'react'
import { FormInput } from '../FormInput'
import { Button } from '../../ui/button'
import Spinner from '../Spinner '
import { toast } from 'sonner'
import { StoreRequestFields, StoreRequrstSchema } from '@/lib/zodSchema/schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { extraQueryis, storeRequest } from '@/lib/queries'
import { SellerRequest, User } from '@/app/generated/prisma/client'
import RequestStatus from './RequestStatus'

const UserStoreRequest = ({ userData, storeRequestData, editStoreRequest }:
    {
        userData?: User | null,
        storeRequestData?: SellerRequest | null,
        editStoreRequest?: boolean
    }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting, errors },
    } = useForm<StoreRequestFields>({
        resolver: zodResolver(StoreRequrstSchema),
    })

    const queryClient = useQueryClient()

    const { mutate, isPending, error: createStoreRequestPending } = useMutation({
        mutationKey: ["createStoreRequest"],
        mutationFn: editStoreRequest ? storeRequest.editStoreRequest : storeRequest.createStoreRequest,
        onSuccess: () => {
            toast.success("درخواست شما ارسال شد!", {
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
        }
    })

    const { mutate: changeAdminStatusForSellerRequestMutate, isPending: changeAdminStatusForSellerRequestPending } = useMutation({
        mutationKey: ["changeAdminStatusForSellerRequest"],
        mutationFn: extraQueryis.changeAdminStatusForSellerRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["storeRequest"] })
            queryClient.invalidateQueries({ queryKey: ["shopsRequestCount"] })
            
        }
    })

    useEffect(() => {
        if (userData) {
            setValue('phone', userData.phone)
            setValue('nationalCode', userData.nationalCode ?? "")
            setValue('location', userData.location ?? "")
            setValue('name', userData.name ?? "")
        }
        if (storeRequestData) {
            setValue('phone', storeRequestData.phone)
            setValue('nationalCode', storeRequestData.nationalCode)
            setValue('location', storeRequestData.location)
            setValue('name', storeRequestData.name)
            setValue('storeName', storeRequestData.storeName)
            setValue("id", storeRequestData.id)

            changeAdminStatusForSellerRequestMutate(storeRequestData.id)
        }
    }, [userData, storeRequestData])

    const onsubmit: SubmitHandler<StoreRequestFields> = async (data) => {
        mutate(data)
    }

    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">{userData ? "ارسال درخواست  فروشنده": " درخواست  فروشنده" }</div>


            <div className="bg-white rounded-xl p-4 mb-14 pt-8">

                {storeRequestData && <RequestStatus id={storeRequestData.id} />}

                <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-12">

                    <div className="flex justify-between gap-10 w-full">
                        <FormInput register={register("name")} label="نام" id="name" error={errors.name?.message} placeholder='نام خود را وارد کنید' />
                        <FormInput register={register("storeName")} label=" نام فروشگاه" id="storeName" error={errors.storeName?.message} placeholder='نام فروشگاه را وارد کنید' />
                    </div>

                    <div className="flex justify-between gap-10 w-full">
                        <FormInput register={register("phone")} label=" شماره تلفن" id="phone" error={errors.phone?.message} placeholder='شماره تلفن خود را وارد کنید' />
                        <FormInput register={register("nationalCode")} label="کد ملی" id="nationalCode" error={errors.nationalCode?.message} placeholder='کد ملی خود را وارد کنید' />
                    </div>

                    <div className="flex justify-between gap-5 w-full">
                        <FormInput register={register("location")}
                            className="w-full"
                            placeholder='نشانی خود را وارد کنید'
                            label="نشانی"
                            id="location"
                            textarea error={errors.location?.message} />
                    </div>

                    <div className="mt-10 flex justify-start items-center gap-3">
                        <Button type="submit" className="bg-emerald-500 text-white hover:bg-emerald-400">
                            {isPending ? <Spinner /> : <span>{editStoreRequest ? "ذخیر تغییرات" : "ارسال درخواست"}</span>}
                        </Button>
                        <Button>لغو</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default UserStoreRequest