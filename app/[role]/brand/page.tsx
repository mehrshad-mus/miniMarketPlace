"use client"
import OptionDialog from '@/components/myComponent/optionDialog'
import { Button } from '@/components/ui/button'
import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar'
import { brand } from '@/lib/queries'
import { dialogProps } from '@/lib/zodSchema/schema'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { Collapsible } from 'radix-ui'
import React, { useRef, useState } from 'react'

const Brand = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ["brand"],
        queryFn: brand.getAllBrand
    })


    const brandDialog = useRef<HTMLDialogElement>(null)

    const [dialogState, setDialogState] = useState<
        {
            id: string,
            title: string,
            placeholder: string,
            mutateFn: ({ value, secoundValue }: dialogProps) => Promise<{
                message: string;
            }>,
            mutationKey: string[],
            invalidations: string[],
            secoundInput?: { title: string, placeholder: string }
        }
    >({
        id: "",
        title: "افزودن برند",
        placeholder: "موبایل , ابزارآلات , گرمایشی ...",
        mutateFn: brand.createBrand,
        mutationKey: ["BrandName"],
        invalidations: ["brand"],
        secoundInput: { title: 'لینک کمپانی', placeholder: "https://nvidia.com" }
    })


    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">برند ها</div>

            <div className="flex justify-end items-center mb-8">
                <Button onClick={() => {
                    setDialogState({
                        id: "",
                        title: "افزودن برند",
                        placeholder: "انویدیا , اپل , سامسونگ ...",
                        mutateFn: brand.createBrand,
                        mutationKey: ["brandName"],
                        invalidations: ["brand"],
                        secoundInput: { title: 'لینک کمپانی', placeholder: "https://nvidia.com" }
                    })

                    brandDialog.current?.showModal()
                }} className="bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-[16px]">ایجاد دسته +</Button>
            </div>


            <OptionDialog
                title={dialogState?.title}
                ref={brandDialog}
                id={dialogState?.id}
                mutationKey={dialogState?.mutationKey}
                mutateFn={dialogState?.mutateFn}
                invalidations={dialogState?.invalidations}
                placeholder={dialogState?.placeholder}
                secoundInput={dialogState?.secoundInput}
            />

            {data && data.map((brandItem) => {
                return (
                    <React.Fragment key={brandItem.id}>
                        <Collapsible.Root defaultOpen={false} className="group/collapsible cursor-pointer p-0 pr-3" >
                            <SidebarGroup className="group-data-[collapsible=icon]:hidden pointer-coarse bg-white rounded-2xl p-2">

                                <SidebarGroupLabel asChild className="pointer-coarse text-[16px] font-bold text-black" >
                                    <Collapsible.Trigger className="pointer-coarse flex items-center justify-between">
                                        <span>{brandItem.name}</span>
                                        <span>{brandItem.url}</span>
                                        <ChevronDown className="ml-2 transition-transform duration-500 group-data-[state=open]/collapsible:rotate-180" />
                                    </Collapsible.Trigger>
                                </SidebarGroupLabel>

                                <Collapsible.Content>
                                    <div>
                                        <div className="flex justify-end items-center gap-1 mb-3 ">
                                            <Button onClick={() => {
                                                setDialogState({
                                                    id: brandItem.id,
                                                    title: "تغییر برند",
                                                    mutationKey: ["changeBrand"],
                                                    mutateFn: brand.editBrand,
                                                    invalidations: ["brand"],
                                                    placeholder: "موبایل , ابزارآلات , گرمایشی ...",
                                                    secoundInput: { title: 'لینک کمپانی', placeholder: "https://nvidia.com"}                                                   
                                                })

                                                brandDialog.current?.showModal()
                                            }} className="hover:border-blue-500 hover:border cursor-pointer rounded-xl text-xs bg-white border border-gray-300 hover:bg-white p-2">edit</Button>
                                            <Button onClick={() => {
                                                setDialogState({
                                                    id: brandItem.id,
                                                    title: "حذف",
                                                    mutationKey: ["deleteBrand"],
                                                    mutateFn: brand.deleteBrand,
                                                    invalidations: ["brand"],
                                                    placeholder: "آیا از حذف آپشن اطمینان دارید؟"
                                                })

                                                brandDialog.current?.showModal()
                                            }} className="hover:border-blue-500 hover:border cursor-pointer rounded-xl text-xs bg-white border border-gray-300 hover:bg-white p-2">delete</Button>
                                        </div>
                                    </div>
                                </Collapsible.Content>
                            </SidebarGroup>
                        </Collapsible.Root>
                    </React.Fragment>)
            })
            }
        </div>



    )
}

export default Brand