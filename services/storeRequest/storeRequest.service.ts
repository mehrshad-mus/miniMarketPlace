import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StoreRequestFields } from "@/lib/zodSchema/schema";

export async function getAllStoreRequest() {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.userRole === "SELLER") throw new Error("you havent access")

    const existById = await prisma.sellerRequest.findUnique({where : {userId : currentUser.userId}})

    if(existById){
        const user = await prisma.user.findUnique({where : {id : currentUser.userId}})

        return {storeRequests : [existById] , totalCount : 1}
    }

    const count = await prisma.sellerRequest.count()
    const storeRequests = await prisma.sellerRequest.findMany({
        orderBy: {
            createdAt: "desc"
        },
        // take: 5
    })


    return {storeRequests , totalCount : Math.ceil(count / 5)}
}

export async function createStoreRequest(data: StoreRequestFields) {

    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.userRole !== "USER") throw new Error("you havent access")

    const {
        location,
        name,
        nationalCode,
        phone,
        storeName
    } = data

    const existByName = await prisma.sellerRequest.findFirst({where : {name}})
    if(existByName){
        throw new Error(`store with this name ${name} exist!`)
    }

    const existByNationalCode =  await prisma.sellerRequest.findFirst({where : {nationalCode}})
    if(existByNationalCode){
        throw new Error(`store with this nationalCode ${nationalCode} exist!`)
    }

    const existByPhone =  await prisma.sellerRequest.findFirst({where : {phone}})
    if(existByPhone){
        throw new Error(`store with this phone ${phone} exist!`)
    }

    const existByStoreName =  await prisma.sellerRequest.findFirst({where : {storeName}})
    if(existByStoreName){
        throw new Error(`store with this storeName ${storeName} exist!`)
    }

    const createStoreRequest = await prisma.sellerRequest.create({
        data: {
            location,
            name,
            nationalCode,
            phone,
            storeName,
            userId: currentUser.userId
        }
    })

    return { createStoreRequest }
}

export async function editStoreRequest(data: StoreRequestFields) {

    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.userRole === "SELLER") throw new Error("you havent access")

    const {
        location,
        name,
        nationalCode,
        phone,
        storeName,
        id
    } = data

    if(!id){
        throw new Error("id is required for edit store request")
    }

    const existStoreRequestById = await prisma.sellerRequest.findUnique({where : {id}})

    if(!existStoreRequestById){
        throw new Error(`store request with this id ${id} does not exist!`)
    }

    if(existStoreRequestById.name !== name){
        const count = await prisma.sellerRequest.count({where : {name}})

        if(count > 0){
            throw new Error(`store with this name ${name} exist!`)
        }
    }

    if(existStoreRequestById.nationalCode !== nationalCode){
        const count = await prisma.sellerRequest.count({where : {nationalCode}})
        
        if(count > 0){
            throw new Error(`store with this nationalCode ${nationalCode} exist!`)
        }
    }

    if(existStoreRequestById.phone !== phone){
        const count = await prisma.sellerRequest.count({where : {phone}})
    
        if(count > 0){
            throw new Error(`store with this phone ${phone} exist!`)
        }
    }

    if(existStoreRequestById.storeName !== storeName){
        const count = await prisma.sellerRequest.count({where : {storeName}})
    
        if(count > 0){
            throw new Error(`store with this storeName ${storeName} exist!`)
        }
    }

    const updatedStoreRequest = await prisma.sellerRequest.update({
        where : {id},
        data: {
            location,
            name,
            nationalCode,
            phone,
            storeName,
            userId: currentUser.userId
        }
    })

    return { updatedStoreRequest }
}

export async function deleteStoreRequest(id: string) {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.userRole === "SELLER") throw new Error("you havent access")

    const deletedStoreRequest = await prisma.sellerRequest.delete({ where: { id } })

    return { deletedStoreRequest }
}