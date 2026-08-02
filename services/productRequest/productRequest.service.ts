import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { FormFields } from "@/lib/zodSchema/schema"
import { unlink, writeFile } from "fs/promises"
import { join } from "path"

export async function getAllProductRequest({ productRequestId }: { productRequestId: string | null }) {

    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.userRole === "USER") throw new Error("you havnet access!")

    if (productRequestId) {
        const Request = await prisma.productRequest.findUnique({
            where: { id: productRequestId },
            include: {
                images: true,
                brand: true,
                category: true,
                seller: true
            }
        })

        if (!Request) {
            throw new Error("productRequest Dosent exist")
        }

        const updateRequest = await prisma.productRequest.update({
            where: { id: productRequestId },
            data: {
                isAdminSeen: "SEEN"
            },
            include: {
                images: true,
                brand: true,
                category: true,
                seller: true
            }
        })

        return { productRequests: [updateRequest], totalCount: 1 }
    }

    const allRequest = await prisma.productRequest.findMany({
        include: {
            images: true,
            brand: true,
            category: true,
            seller: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const count = await prisma.productRequest.count()

    return { productRequests: allRequest, totalCount: Math.ceil(count / 5) }
}

export async function createProductRequest({ data, images }: { data: FormFields, images: File[] }) {

    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.userRole === "USER") {
        throw new Error("not authorized")
    }

    const { brand,
        category,
        title,
        option,
        showComment,
        showView,
        specialProduct,
        warningAndDetail,
        englishTitle,
        id,
        seoExplanation,
        seoTitle,
        seoWord,
        tag } = data


    const seller = await prisma.seller.findUnique({ where: { userId: currentUser.userId } })

    if (!seller) {
        throw new Error("seller dosent exist")
    }

    const newProductRequest = await prisma.productRequest.create({
        data: {
            sellerId: seller.id,
            title,
            brandId: brand.id,
            categoryId: category.id,
            showComment,
            showView,
            specialProduct,
            warningAndDetail,
            englishTitle,
            seoExplanation,
            seoTitle,
            seoWord,
            tag,
            options: option
        }
    })

    for (const img of images) {
        const bytes = await img.arrayBuffer()

        const buffer = Buffer.from(bytes)

        const fileName = `${Date.now()}-${img.name}`;

        const newProductRequestImage = await prisma.productRequestImage.create({
            data: {
                url: fileName,
                productRequestId: newProductRequest.id
            }
        })

        await writeFile(
            join(process.cwd(), "public/uploads", fileName),
            buffer
        )
    }

}

export async function deleteProductRequest({ productRequestId }: { productRequestId: string }) {

    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.userRole === "USER") throw new Error("you havnet access!")

    const existingRequest = await prisma.productRequest.findUnique({ where: { id: productRequestId } })
    if (!existingRequest) throw new Error("productRequest Dosent exist")

    const productRequestImages = await prisma.productRequestImage.findMany({ where: { productRequestId } })

    for (const img of productRequestImages) {
        await unlink(
            join(process.cwd(), "/public/uploads", img.url)
        )
    }

    const deletedProductRequest = await prisma.productRequest.delete({ where: { id: productRequestId } })

    return {deletedProductRequest : deletedProductRequest.id}
}