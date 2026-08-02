"use server"
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";

export async function rejectSellerRequestFn(id: string) {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        throw new Error("you havent authorized")
    }

    if(currentUser.userRole !== "ADMIN"){
        throw new Error("you havent access")
    }

    const rejectedSellerRequest = await prisma.sellerRequest.update({where : {id} , data :{status: "REJECTED"}})

    return rejectedSellerRequest
}