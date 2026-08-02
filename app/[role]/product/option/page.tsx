"use client"
import OptionDialog, { OptionDialogProps } from "@/components/myComponent/optionDialog"
import Spinner from "@/components/myComponent/Spinner "
import { Button } from "@/components/ui/button"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { options } from "@/lib/queries"
import { useQuery, } from "@tanstack/react-query"
import { ChevronDown } from "lucide-react"
import { Collapsible } from "radix-ui"
import React, { useRef, useState } from "react"
import Sketch from '@uiw/react-color-sketch';
import { tryParseRGBA } from "@/lib/utils"

export const Product = () => {

    const optionDialog = useRef<HTMLDialogElement>(null)

    const [dialogState, setDialogState] = useState<OptionDialogProps>({
        id: "",
        title: "افزودن آپشن",
        placeholder: "مثال : سایز , رنگ",
        mutateFn: options.createOptionName,
        mutationKey: ["optionName"],
        invalidations: ["options"]
    })

    const { data, isLoading, error, } = useQuery({
        queryKey: ["options"],
        queryFn: () => options.getAllOptions()
    })
    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">آپشن ها</div>

            <div className="flex justify-end items-center mb-8">
                <Button onClick={() => {
                    setDialogState({
                        id: "",
                        title: "افزودن آپشن",
                        placeholder: "مثال : سایز , رنگ",
                        mutateFn: options.createOptionName,
                        mutationKey: ["optionName"],
                        invalidations: ["options"]
                    })

                    optionDialog.current?.showModal()
                }} className="bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-[16px]"> افزودن گروه آپشن +</Button>
            </div>

            <div className="text-xs text-gray-500 mb-3">
                <span className="text-[13px] font-bold">توجه :</span> در تعریف گروه و کلید فیلتر ها در ابتدای کار دقت کافی را داشته باشید. پس از استفاده از کلید آپشن ها در محصولات, تنها میتوانید عنوان کلید آپشن را ویرایش نمایید ولی امکان
                حذف کلید آپشن تا قبل از حذف از محصولات استفاده شده میسر نخواهد بود.
            </div>

            <OptionDialog
                title={dialogState?.title}
                ref={optionDialog}
                id={dialogState?.id}
                mutationKey={dialogState?.mutationKey}
                mutateFn={dialogState?.mutateFn}
                invalidations={dialogState?.invalidations}
                placeholder={dialogState?.placeholder}
            />

            {data && data.map((option) => {
                return (
                    <React.Fragment key={option.name}>
                        <Collapsible.Root defaultOpen={false} className="group/collapsible cursor-pointer p-0 pr-3" >
                            <SidebarGroup className="group-data-[collapsible=icon]:hidden pointer-coarse bg-white rounded-2xl p-2">

                                <SidebarGroupLabel asChild className="pointer-coarse text-[16px] font-bold text-black" >
                                    <Collapsible.Trigger className="pointer-coarse flex items-center justify-between">
                                        {option.name}
                                        {option.createdOptionValue && (
                                            <ChevronDown className="ml-2 transition-transform duration-500 group-data-[state=open]/collapsible:rotate-180" />
                                        )}
                                    </Collapsible.Trigger>
                                </SidebarGroupLabel>

                                <Collapsible.Content>
                                    <div>
                                        <div className="flex justify-end items-center gap-1 mb-3 ">
                                            <Button onClick={() => {
                                                setDialogState({
                                                    id: option.id,
                                                    title: `افزودن مقدار به ${option.name}`,
                                                    mutationKey: ["createOptionValue"],
                                                    mutateFn: options.createOptionValue,
                                                    invalidations: ["options"],
                                                    placeholder: "مثال : آبی , xl"
                                                })

                                                optionDialog.current?.showModal()
                                            }} className="w-9 h-9 rounded-xl hover:border-blue-500 hover:border cursor-pointer bg-white text-xl border border-gray-300 hover:bg-white p-2">+</Button>
                                            <Button onClick={() => {
                                                setDialogState({
                                                    id: option.id,
                                                    title: "تغییر آپشن",
                                                    mutationKey: ["changeOptionTitle"],
                                                    mutateFn: options.changeOptionName,
                                                    invalidations: ["options"],
                                                    placeholder: "رنگ , سایز"
                                                })

                                                optionDialog.current?.showModal()
                                            }} className="hover:border-blue-500 hover:border cursor-pointer rounded-xl text-xs bg-white border border-gray-300 hover:bg-white p-2">edit</Button>
                                            <Button onClick={() => {
                                                setDialogState({
                                                    id: option.id,
                                                    title: "حذف",
                                                    mutationKey: ["deleteOptionTitle"],
                                                    mutateFn: options.deleteOption,
                                                    invalidations: ["options"],
                                                    placeholder: "آیا از حذف آپشن اطمینان دارید؟"
                                                })

                                                optionDialog.current?.showModal()
                                            }} className="hover:border-blue-500 hover:border cursor-pointer rounded-xl text-xs bg-white border border-gray-300 hover:bg-white p-2">delete</Button>
                                        </div>

                                        {option.createdOptionValue &&
                                            <SidebarMenu>
                                                {
                                                    option.createdOptionValue.map((value) => {

                                                        const rgba = tryParseRGBA(value.value)

                                                        return (
                                                            <Collapsible.Root key={value.id} defaultOpen={false} className="group2/collapsible cursor-pointer p-0 pr-3">
                                                                <SidebarGroup className="group-data-[collapsible=icon]:hidden pointer-coarse bg-gray-100 rounded-2xl p-2">

                                                                    <SidebarGroupLabel asChild className="pointer-coarse text-[15px] font-light text-black" >
                                                                        <Collapsible.Trigger className="pointer-coarse flex items-center justify-between">

                                                                            {rgba ?
                                                                                <div className="flex justify-start items-center gap-122">
                                                                                    <span className="w-6 h-6 rounded-full"
                                                                                        style={{ backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` }} />

                                                                                    <div className="flex justify-center items-center gap-4">
                                                                                        <p><span className="text-black font-bold">a :</span> {rgba.a}</p>
                                                                                        <p><span className="text-blue-700 font-bold">b :</span> {rgba.b}</p>
                                                                                        <p><span className="text-green-700 font-bold">g :</span> {rgba.g}</p>
                                                                                        <p><span className="text-red-700 font-bold">r :</span> {rgba.r}</p>
                                                                                    </div>
                                                                                </div> :
                                                                                <span>{value.value}</span>
                                                                            }

                                                                            <ChevronDown className="ml-2 transition-transform duration-500 group-data-[state=open]/collapsible:rotate-180" />

                                                                        </Collapsible.Trigger>
                                                                    </SidebarGroupLabel>

                                                                    <Collapsible.Content>
                                                                        <SidebarMenu>
                                                                            <SidebarMenuItem key={value.id} className="pr-4">
                                                                                <SidebarMenuButton asChild className="text-[16px] font-extralight">

                                                                                    <div className="flex justify-end items-center gap-1 bg-gray-100 py-6 px-4">
                                                                                        <Button onClick={() => {
                                                                                            setDialogState({
                                                                                                id: value.id,
                                                                                                title: "تغییر مقدار",
                                                                                                mutationKey: ["changeOptionValueTitle"],
                                                                                                mutateFn: options.changeOptionValueName,
                                                                                                invalidations: ["options"],
                                                                                                placeholder: "2xl , آبی"
                                                                                            })

                                                                                            optionDialog.current?.showModal()

                                                                                        }} className="hover:border-blue-500 hover:border cursor-pointer rounded-xl text-xs bg-white border border-gray-300 hover:bg-white p-2">edit</Button>
                                                                                        <Button onClick={() => {
                                                                                            setDialogState({
                                                                                                id: value.id,
                                                                                                title: "حذف",
                                                                                                mutationKey: ["deleteOptionValue"],
                                                                                                mutateFn: options.deleteOptionValue,
                                                                                                invalidations: ["options"],
                                                                                                placeholder: "آیا از حذف مقدار اطمینان دارید؟"
                                                                                            })

                                                                                            optionDialog.current?.showModal()
                                                                                        }} className="hover:border-blue-500 hover:border cursor-pointer rounded-xl text-xs bg-white border border-gray-300 hover:bg-white p-2">delete</Button>

                                                                                    </div>

                                                                                </SidebarMenuButton>
                                                                            </SidebarMenuItem>
                                                                        </SidebarMenu>
                                                                    </Collapsible.Content>
                                                                </SidebarGroup>
                                                            </Collapsible.Root>

                                                        )
                                                    })
                                                }
                                            </SidebarMenu>
                                        }
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
export default Product
