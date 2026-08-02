import { Prisma } from "@/app/generated/prisma/client"
import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function createSeller(id: string) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        throw new Error("you havent authorized")
    }
    if (currentUser.userRole !== "ADMIN") {
        throw new Error("you havent access")
    }

    if (!id) {
        throw new Error("id is required")
    }

    
    const result = await prisma.$transaction(async (tx) => {

        const sellerRequest = await prisma.sellerRequest.findUnique({ where: { id } })
    
        if (!sellerRequest) {
            throw new Error("seller request not found")
        }

        const seller = await tx.seller.create({
            data: {
                name: sellerRequest.name,
                storeName: sellerRequest.storeName,
                phone: sellerRequest.phone,
                nationalCode: sellerRequest.nationalCode,
                location: sellerRequest.location,
                userId: sellerRequest.userId
            }
        })

        await tx.user.update({ where: { id: sellerRequest.userId }, data: { role: "SELLER" } })

        const updatedSellerRequest = await tx.sellerRequest.update({
            where: { id },
            data: { status: "APPROVED" }
        })

        return{seller , updatedSellerRequest}
    } , {isolationLevel : Prisma.TransactionIsolationLevel.Serializable})

    return { createdSeller: result.seller, updatedSellerRequest : result.updatedSellerRequest }
}