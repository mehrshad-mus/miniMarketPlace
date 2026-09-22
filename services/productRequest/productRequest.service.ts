import { getCurrentUser } from "@/lib/auth"
import { IMAGE_MAX_SIZE, IMAGE_TYPES } from "@/lib/file/validation"
import { prisma } from "@/lib/prisma"
import { FormFields } from "@/lib/zodSchema/schema"
import { del, put } from "@vercel/blob"
import { unlink } from "fs/promises"
import { join } from "path"
import { randomUUID } from "crypto"

function validateProductRequestImages(images: File[]) {
    if (images.length < 1 || images.length > 6) {
        throw new Error("تعداد تصاویر باید بین ۱ تا ۶ تصویر باشد")
    }

    for (const image of images) {
        if (!IMAGE_TYPES.has(image.type)) {
            throw new Error("فرمت تصویر باید jpg، png یا webp باشد")
        }

        if (image.size > IMAGE_MAX_SIZE) {
            throw new Error("حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد")
        }
    }
}

function getProductRequestImageUrl(value: string) {
    try {
        const url = new URL(value)
        if (url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com")) {
            return value
        }
    } catch {
        // Legacy product request images are stored in public/uploads.
    }

    return `/uploads/${value}`
}

async function deleteProductRequestImage(value: string) {
    try {
        const url = new URL(value)
        if (url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com")) {
            await del(value)
            return
        }
    } catch {
        // Legacy product request images are stored in public/uploads.
    }

    await unlink(join(process.cwd(), "public", "uploads", value))
}

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

        return {
            productRequests: [{
                ...updateRequest,
                images: updateRequest.images.map((image) => ({
                    ...image,
                    url: getProductRequestImageUrl(image.url),
                })),
            }],
            totalCount: 1,
        }
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

    return {
        productRequests: allRequest.map((request) => ({
            ...request,
            images: request.images.map((image) => ({
                ...image,
                url: getProductRequestImageUrl(image.url),
            })),
        })),
        totalCount: Math.ceil(count / 5),
    }
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
        seoExplanation,
        seoTitle,
        seoWord,
        tag } = data


    const seller = await prisma.seller.findUnique({ where: { userId: currentUser.userId } })

    if (!seller) {
        throw new Error("seller dosent exist")
    }

    validateProductRequestImages(images)

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

    const uploadedUrls: string[] = []
    try {
        const imageUrls = await Promise.all(images.map(async (image) => {
            const blob = await put(
                `product-requests/${newProductRequest.id}/${randomUUID()}`,
                image,
                { access: "public", contentType: image.type }
            )
            uploadedUrls.push(blob.url)
            return blob.url
        }))

        await prisma.productRequestImage.createMany({
            data: imageUrls.map((url) => ({
                url,
                productRequestId: newProductRequest.id,
            })),
        })
    } catch (error) {
        await Promise.allSettled(uploadedUrls.map((url) => del(url)))
        await prisma.productRequest.delete({ where: { id: newProductRequest.id } })
        throw error
    }

    return { productRequest: newProductRequest }
}

export async function deleteProductRequest({ productRequestId }: { productRequestId: string }) {

    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.userRole === "USER") throw new Error("you havnet access!")

    const existingRequest = await prisma.productRequest.findUnique({ where: { id: productRequestId } })
    if (!existingRequest) throw new Error("productRequest Dosent exist")

    const productRequestImages = await prisma.productRequestImage.findMany({ where: { productRequestId } })

    const deletedProductRequest = await prisma.productRequest.delete({ where: { id: productRequestId } })

    await Promise.allSettled(
        productRequestImages.map((image) => deleteProductRequestImage(image.url))
    )

    return {deletedProductRequest : deletedProductRequest.id}
}