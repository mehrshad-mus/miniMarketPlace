import UserStoreRequest from '@/components/myComponent/sellerSpecifics/SellerRequest'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import React, { use } from 'react'

const EditShopRequestById = async ({
    params,
}: {
    params: Promise<{ editShopRequestById: string }>
}) => {
    const { editShopRequestById } = await params

    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.userRole === "SELLER") {
        throw new Error("you havent access...!")
    }

    let storeRequestExist = await prisma.sellerRequest.findUnique({ where: { id: editShopRequestById } })

    if(!storeRequestExist){
        throw new Error("request dosent exist...!")
    }

    if(currentUser.userRole === "ADMIN"){
        storeRequestExist = await prisma.sellerRequest.update({where : {id : storeRequestExist.id} , data: {isAdminSeen : "SEEN"}})
    }

    if (!storeRequestExist) {
        throw new Error("request dosent exist")
    }

    return (
        <UserStoreRequest storeRequestData={storeRequestExist} editStoreRequest={true}/>
    )
}

export default EditShopRequestById