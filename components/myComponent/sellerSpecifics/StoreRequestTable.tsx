"use client"
import React from 'react'
import MyTable from '../MyTable'
import StoreRequestColumn from '../columns/StoreRequestColumn'
import { SellerRequest, User } from '@/app/generated/prisma/client'

const StoreRequestTable = ({userData ,existRequestByID} : {userData : User | null , existRequestByID : SellerRequest}) => {
    const { column } = StoreRequestColumn(userData)
    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">ارسال درخواست  فروشنده </div>


            <div className="bg-white rounded-xl p-4 mb-14 pt-8">

                <MyTable columns={column} data={[existRequestByID]} />

            </div>
        </div>
    )

}

export default StoreRequestTable