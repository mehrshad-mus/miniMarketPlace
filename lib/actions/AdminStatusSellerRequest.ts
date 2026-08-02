"use server"

import { getCurrentUser } from "../auth"
import { prisma } from "../prisma"

export async function changeAdminStatuSellerRequest(id : string) {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        throw new Error("you havent authorized")
    }

    if(currentUser.userRole === "ADMIN"){
        const updatedSellerRequest = await prisma.sellerRequest.update({where : {id} , data :{isAdminSeen: "SEEN"}})
    }
}