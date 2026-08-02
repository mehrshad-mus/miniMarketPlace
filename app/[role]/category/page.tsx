"use client"
import OptionDialog from '@/components/myComponent/optionDialog'
import { Button } from '@/components/ui/button'
import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/sidebar'
import { category } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { Collapsible } from 'radix-ui'
import React, { useRef, useState } from 'react'

const Category = () => {

    const categoryDialog = useRef<HTMLDialogElement>(null)

    const [dialogState, setDialogState] = useState({
        id: "",
        title: "افزودن دسته بندی",
        placeholder: "موبایل , ابزارآلات , گرمایشی ...",
        mutateFn: category.createCategory,
        mutationKey: ["categoryName"],
        invalidations: ["category"]
    })

    const { data, error, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: category.getAllCategory
    })

    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">دسته‌بندی محصولات</div>

            <div className="flex justify-end items-center mb-8">
                <Button onClick={() => {
                    setDialogState({
                        id: "",
                        title: "افزودن دسته بندی",
                        placeholder: "موبایل , ابزارآلات , گرمایشی ...",
                        mutateFn: category.createCategory,
                        mutationKey: ["categoryName"],
                        invalidations: ["category"]
                    })

                    categoryDialog.current?.showModal()
                }} className="bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-[16px]">ایجاد دسته +</Button>
            </div>


            <OptionDialog
                title={dialogState?.title}
                ref={categoryDialog}
                id={dialogState?.id}
                mutationKey={dialogState?.mutationKey}
                mutateFn={dialogState?.mutateFn}
                invalidations={dialogState?.invalidations}
                placeholder={dialogState?.placeholder}
            />


            {data && data.map((cat) => {
                return (
                    <React.Fragment key={cat.id}>
                        <Collapsible.Root defaultOpen={false} className="group/collapsible cursor-pointer p-0 pr-3" >
                            <SidebarGroup className="group-data-[collapsible=icon]:hidden pointer-coarse bg-white rounded-2xl p-2">

                                <SidebarGroupLabel asChild className="pointer-coarse text-[16px] font-bold text-black" >
                                    <Collapsible.Trigger className="pointer-coarse flex items-center justify-between">
                                        {cat.name}                                        
                                        <ChevronDown className="ml-2 transition-transform duration-500 group-data-[state=open]/collapsible:rotate-180" />                                       
                                    </Collapsible.Trigger>
                                </SidebarGroupLabel>

                                <Collapsible.Content>
                                    <div>
                                        <div className="flex justify-end items-center gap-1 mb-3 ">
                                            <Button onClick={() => {
                                                setDialogState({
                                                    id: cat.id,
                                                    title: "تغییر دسته بندی",
                                                    mutationKey: ["changeCategoryTitle"],
                                                    mutateFn: category.editCategoryName,
                                                    invalidations: ["category"],
                                                    placeholder: "موبایل , ابزارآلات , گرمایشی ..."
                                                })

                                                categoryDialog.current?.showModal()
                                            }} className="hover:border-blue-500 hover:border cursor-pointer rounded-xl text-xs bg-white border border-gray-300 hover:bg-white p-2">edit</Button>
                                            <Button onClick={() => {
                                                setDialogState({
                                                    id: cat.id,
                                                    title: "حذف",
                                                    mutationKey: ["deleteCategoryTitle"],
                                                    mutateFn: category.deleteCategory,
                                                    invalidations: ["category"],
                                                    placeholder: "آیا از حذف آپشن اطمینان دارید؟"
                                                })

                                                categoryDialog.current?.showModal()
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

export default Category