"use server"
import { prisma } from "@/lib/prisma";

export async function getSellerRequestCount(flag?: boolean) {

    if (flag) {
        const count = await prisma.sellerRequest.count({ where: { status: "PENDING" } })
        return { count }
    }

    const count = await prisma.sellerRequest.count({ where: { isAdminSeen: "DOSENTSEEN" } })
    return { count }
}


export async function getSellerProductRequestCount(flag?: boolean) {

    if (flag) {
        const count = await prisma.productRequest.count({ where: { status: "PENDING" } })
        return { count }
    }
    const count = await prisma.productRequest.count({ where: { isAdminSeen: "DOSENTSEEN" } })

    return { count }
}