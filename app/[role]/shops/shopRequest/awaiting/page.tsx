"use client"
import ChangeResultButtons from '@/components/myComponent/Change-Results-Button'
import StoreRequestColumn from '@/components/myComponent/columns/StoreRequestColumn'
import MyTable from '@/components/myComponent/MyTable'
import SearchBox from '@/components/myComponent/SearchBox'
import Spinner from '@/components/myComponent/Spinner '
import { storeRequest, userProfileData } from '@/lib/queries'
import {useQuery } from '@tanstack/react-query'
import React, {  useState } from 'react'

const ShopRequestPage = () => {

    const { data, isLoading, error, } = useQuery({
        queryKey: ["storeRequest"],
        queryFn: () => storeRequest.getAllStoreRequest()
    })

    const {data : user } = useQuery({
        queryKey: ["currentUser"],
        queryFn : () => userProfileData()
    })


    const [currentPage, setCurrentPage] = useState(1)
    const [searchTitle, setSearchTitle] = useState('')

    const { column } = StoreRequestColumn(user)

    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">درخواست های فروشگاه</div>


            <div className="bg-white rounded-xl p-4 mb-14">

                <SearchBox searchFn={setSearchTitle} currentPage={currentPage} setCurrentPage={setCurrentPage} placeHolder="جستجو در نام های محصول" />

                <div className="bg-white rounded-xl p-4 mb-14">
                    {data && <MyTable columns={column} data={data.storeRequests} />}
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

export default ShopRequestPage