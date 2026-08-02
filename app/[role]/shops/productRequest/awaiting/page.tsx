"use client"
import ChangeResultButtons from '@/components/myComponent/Change-Results-Button'
import { ProductRequestColumn } from '@/components/myComponent/columns/ProductRequestColumn'
import MyTable from '@/components/myComponent/MyTable'
import SearchBox from '@/components/myComponent/SearchBox'
import Spinner from '@/components/myComponent/Spinner '
import { productRequest } from '@/lib/queries'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, {useState } from 'react'
import { toast } from 'sonner'

export const Awaiting = () => {

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["productRequests"],
        queryFn: () => productRequest.getAllProductRequest({})
    })

    const { mutate: deleteProductRequest, isPending: DeleteProductRequestPending, error: productRequestDeleteError } = useMutation({
        mutationKey: ["deleteProductRequest"],
        mutationFn: productRequest.deleteProductRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["productRequests"] });
            toast.success(" محصول درخواست شده با موفقیت حذف شد", {
                position: "bottom-left", style: {
                    background: "#98e897",
                    color: "#FFF",
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px"
                },
            })
        }
    })

    //columns
    const {column} = ProductRequestColumn({deleteProductRequest,DeleteProductRequestPending})

    const [currentPage, setCurrentPage] = useState(1)
    const [searchTitle, setSearchTitle] = useState('')

    
    const dataForTable = data?.productRequests?.map((item) => {
        return {
            productImage: item.images[0].url,
            title: item.title,
            englishTitle: item.englishTitle,
            adminStatus: item.isAdminSeen,
            category: item.category.name,
            id: item.id,
            sellerNationalCode: item.seller.nationalCode,
            status: item.status
        }
    })

    
    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">پیشنهاد های محصول</div>


            <div className="bg-white rounded-xl p-4 mb-14">

                <SearchBox searchFn={setSearchTitle} currentPage={currentPage} setCurrentPage={setCurrentPage} placeHolder="جستجو در نام های محصول" />
                <div className="bg-white rounded-xl p-4 mb-14">
                    {dataForTable && <MyTable columns={column} data={dataForTable} />}
                </div>

                {isLoading &&
                    <div className="flex justify-center items-center h-72">
                        <Spinner className="text-blue-600" />
                    </div>}

                <ChangeResultButtons
                    pageNumber={data?.totalCount}
                    loading={isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
            </div>

        </div>
    )
}

export default Awaiting
