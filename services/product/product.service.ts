import { ProductGetPayload } from "@/app/generated/prisma/internal/prismaNamespaceBrowser"
import { getCurrentUser } from "@/lib/auth"
import { accessRole } from "@/lib/constant/enums"
import { IMAGE_MAX_SIZE, IMAGE_TYPES } from "@/lib/file/validation"
import { prisma } from "@/lib/prisma"
import { s3 } from "@/lib/s3Client"
import { generateVariantsForAPI } from "@/lib/utils"
import { FormFields } from "@/lib/zodSchema/schema"
import { del, put } from "@vercel/blob"
import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"

function validateProductImage(file: File) {
    if (!IMAGE_TYPES.has(file.type)) {
        throw new Error("فرمت تصویر باید jpg، png یا webp باشد")
    }

    if (file.size > IMAGE_MAX_SIZE) {
        throw new Error("حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد")
    }
}

function validateProductImages(images: File[]) {
    if (images.length < 1 || images.length > 6) {
        throw new Error("تعداد تصاویر باید بین ۱ تا ۶ تصویر باشد")
    }

    images.forEach(validateProductImage)
}

export async function getProductImageUrl(value: string) {
    try {
        const url = new URL(value)
        if (url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com")) {
            return value
        }
    } catch {
        // Legacy product images are stored as S3 object keys.
    }

    return getSignedUrl(
        s3,
        new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: value,
        }),
        { expiresIn: 3600 }
    )
}

async function deleteProductImage(value: string) {
    try {
        const url = new URL(value)
        if (url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com")) {
            await del(value)
            return
        }
    } catch {
        // Legacy product images are stored as S3 object keys.
    }

    await s3.send(new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: value,
    }))
}

export async function getAllProduct({ currentPage, productId, offers }: { currentPage: string | null, productId: string | null, offers?: string | null }) {
    const user = await getCurrentUser()

    if (!user || user.userRole === "USER") {
        throw new Error("you havnt access!")
    }

    const pageNumber = Number(currentPage)
    const skipPages = 5 * (pageNumber - 1)
    const totalCount = await prisma.product.count()

    if (productId) {
        const productById = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                brand: true,
                category: true,
                productImage: true,
                productOption: {
                    include: {
                        productOptionValues: true
                    }
                },
                productVariant: {
                    include: {
                        offer: {
                            include: {
                                seller: true
                            }
                        },
                        variantValue: {
                            include: {
                                productOptionValue: {
                                    include: {
                                        productOption: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!productById) throw new Error("dosent exist form database")

        const productWithImage = [{
            ...productById,
            productImage: await Promise.all(
                productById.productImage.map(async (img) => ({
                    ...img,
                    url: await getProductImageUrl(img.url),
                }))
            ),
        }]

        return { products: productWithImage }
    }

    if (offers) {
        const products = await prisma.product.findMany({
            where: {
                productVariant: {
                    some: {
                        offer: {
                            some: {}
                        }
                    }
                }
            },
            skip: skipPages,
            take: 5,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                brand: true,
                category: true,
                productImage: true,
                productOption: {
                    include: {
                        productOptionValues: true
                    }
                },
                productVariant: {
                    include: {
                        variantValue: true,
                        offer: true
                    }
                }
            }
        })

        const productWithImage = await Promise.all(
            products.map(async (product) => {
                return {
                    ...product,
                    productImage: await Promise.all(
                        product.productImage.map(async (image) => {
                            return {
                                ...image,
                                url: await getProductImageUrl(image.url),
                            }
                        })
                    )
                }
            }))
        return { products: productWithImage }
    }

    const products = await prisma.product.findMany({
        skip: skipPages,
        take: 5,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            brand: true,
            category: true,
            productImage: true,
            productOption: {
                include: {
                    productOptionValues: true
                }
            },
            productVariant: {
                include: {
                    offer: true,
                    variantValue: true
                }
            }
        }
    })


    const productWithImage = await Promise.all(
        products.map(async (product) => {
            return {
                ...product,
                productImage: await Promise.all(
                    product.productImage.map(async (image) => {
                        return {
                            ...image,
                            url: await getProductImageUrl(image.url),
                        }
                    })
                )
            }
        }))



    return { products: productWithImage, totalCount: Math.ceil(totalCount / 5) }
}

export async function getProductByIdForUser({ productId }: { productId: string }) {

    const productById = await prisma.product.findUnique({
        where: { id: productId },
        include: {
            brand: true,
            category: true,
            productImage: true,

            productOption: {
                include: {
                    productOptionValues: true,
                },
            },

            productVariant: {
                include: {
                    variantValue:{
                        include: {
                            productOptionValue : {
                                include: {
                                    productOption : true
                                }
                            }
                        }
                    },
                    offer: {
                        include: {
                            seller: true
                        }
                    }
                }
            },

            comment: {
                include: {
                    user: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            }
        }

    })

    if (!productById) throw new Error("dosent exist form database")

    const productWithImage = {
        ...productById,
        productImage: await Promise.all(
            productById.productImage.map(async (img) => ({
                ...img,
                url: await getProductImageUrl(img.url),
            }))
        ),
    }

    return { product: productWithImage }

}

export async function searchProductsForUser(query: string) {
    const normalizedQuery = query.trim()

    if (normalizedQuery.length < 2) {
        return []
    }

    const products = await prisma.product.findMany({
        where: {
            deletedAt: null,
            OR: [
                { title: { contains: normalizedQuery, mode: "insensitive" } },
                { englishTitle: { contains: normalizedQuery, mode: "insensitive" } },
                { brand: { name: { contains: normalizedQuery, mode: "insensitive" } } },
            ],
        },
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
            id: true,
            title: true,
            brand: { select: { name: true } },
            productImage: {
                take: 1,
                orderBy: { createdAt: "asc" },
                select: { url: true, altText: true },
            },
            productVariant: {
                select: {
                    offer: {
                        where: {
                            status: "ACTIVE",
                            deletedAt: null,
                            stock: { gt: 0 },
                        },
                        orderBy: { price: "asc" },
                        take: 1,
                        select: { price: true, discount: true },
                    },
                },
            },
        },
    })

    return Promise.all(products.map(async (product) => {
        const offer = product.productVariant.flatMap((variant) => variant.offer)[0]
        const image = product.productImage[0]

        return {
            id: product.id,
            title: product.title,
            brandName: product.brand.name,
            imageUrl: image
                ? await getProductImageUrl(image.url)
                : null,
            imageAlt: image?.altText || product.title,
            price: offer?.price ?? null,
            discount: offer?.discount ?? 0,
        }
    }))
}

export async function createProduct(data: FormFields) {

    const user = await getCurrentUser()

    if (!user || user.userRole !== accessRole) {
        throw new Error("you havnt access!")
    }

    validateProductImages(data.images)

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


    //checking the requerments
    const existingProductByID = await prisma.product.findUnique({
        where: { id }
    })

    const existingProductByTitle = await prisma.product.findFirst({
        where: { title }
    })

    if (englishTitle) {
        const existingProductByEnglishTitle = await prisma.product.findFirst({
            where: { englishTitle }
        })

        if (existingProductByEnglishTitle) {
            throw new Error("product with the same english title already exists")
        }
    }

    if (existingProductByID || existingProductByTitle) {
        throw new Error("product with the same id or title or already exists")
    }

    const brandData = await prisma.brand.findUnique({
        where: { id: brand.id }
    })

    if (!brandData) {
        throw new Error("brand not found")
    }

    const categoryData = await prisma.category.findUnique({
        where: { id: category.id }
    })

    if (!categoryData) {
        throw new Error("category not found")
    }


    //creating the product ...
    const newProduct = await prisma.product.create({
        data: {
            id: id?.length ? id : randomUUID(),
            title,
            englishTitle,
            seoTitle,
            seoExplanation,
            tag,
            seoWord,
            showComment,
            showView,
            specialProduct,
            warningAndDetail,
            brandId: brandData.id,
            categoryId: categoryData.id,
        }
    })

    //for creatint variantValue(find the exactly optionID and ValueID)
    const optionValueMap = new Map<
        string,
        {
            optionValueId: string
            optionId: string
        }
    >()

    for (const opt of option) {
        const newOption = await prisma.productOption.create({
            data: {
                name: opt.name,
                productId: newProduct.id,
            }
        })

        for (const value of opt.optionValue) {
            const newOptionValue = await prisma.productOptionValue.create({
                data: {
                    value: value.value,
                    productOptionId: newOption.id,
                }
            })

            optionValueMap.set(
                `${opt.name}:${value.value}`,
                {
                    optionValueId: newOptionValue.id,
                    optionId: newOption.id,
                }
            )
        }
    }

    //generat the variants using a fun from AI
    const generatedVariants = generateVariantsForAPI(option)

    //variantTable and variantValueTable creating using the variants and Map
    for (const variant of generatedVariants) {
        const productVariant =
            await prisma.productVariant.create({
                data: {
                    productId: newProduct.id,
                },
            })


        for (const value of variant) {
            const optionValue =
                optionValueMap.get(
                    `${value.optionName}:${value.value}`
                )


            if (!optionValue) {
                throw new Error(
                    `Option value not found: ${value.optionName}:${value.value}`
                )
            }

            const variantValue2 = await prisma.variantValue.create({
                data: {
                    productVariantId: productVariant.id,
                    productOptionValueId: optionValue.optionValueId,
                },
            })

        }
    }

    const uploadedUrls: string[] = []
    try {
        const imageUrls = await Promise.all(data.images.map(async (image) => {
            validateProductImage(image)
            const blob = await put(
                `products/${newProduct.id}/${randomUUID()}`,
                image,
                { access: "public", contentType: image.type }
            )
            uploadedUrls.push(blob.url)
            return blob.url
        }))

        await prisma.productImage.createMany({
            data: imageUrls.map((url) => ({
                url,
                productId: newProduct.id,
                altText: "this is an image"
            }))
        })
    } catch (error) {
        await Promise.allSettled(uploadedUrls.map((url) => del(url)))
        throw error
    }

    return { newProduct }
}

export async function updateProduct(data: FormFields) {

    const user = await getCurrentUser()

    if (!user || user.userRole !== accessRole) {
        throw new Error("you havnt access!")
    }

    validateProductImages(data.images)

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

    const existingProductByID = await prisma.product.findUnique({
        where: { id },
        include: {
            productOption: {
                include: {
                    productOptionValues: {
                        include: {
                            variantValue: true
                        }
                    }
                }
            },
            productImage: true,
            productVariant: true
        },
    })

    if (!existingProductByID) { return new Error("محصول وجدود ندارد") }


    if (!(title === existingProductByID.title)) {
        const existingProductByTitle = await prisma.product.findFirst({
            where: { title }
        })

        if (existingProductByTitle) { return new Error("product with the same title already exists") }
    }

    if (englishTitle) {

        const isTheSameEnglishTitle = englishTitle === existingProductByID.englishTitle

        if (!isTheSameEnglishTitle) {
            const existingProductByEnglishTitle = await prisma.product.findFirst({
                where: { englishTitle }
            })

            if (existingProductByEnglishTitle) {
                return new Error("product with the same english title already exists")
            }
        }
    }

    const brandData = await prisma.brand.findUnique({
        where: { id: brand.id }
    })

    if (!brandData) {
        return new Error("brand not found")
    }

    const categoryData = await prisma.category.findUnique({
        where: { id: category.id }
    })

    if (!categoryData) {
        return new Error("category not found")
    }

    const updateProduct = await prisma.product.update({
        where: { id },
        data: {
            title,
            englishTitle,
            warningAndDetail,
            tag,
            seoExplanation,
            seoTitle,
            seoWord,
            showComment,
            specialProduct,
            showView,
            brandId: brandData.id,
            categoryId: categoryData.id,

        }
    })

    const optionValueMap = new Map<
        string,
        {
            optionValueId: string
            optionId: string
        }
    >()

    //for less trouble
    await prisma.productOption.deleteMany({ where: { productId: id } })
    await prisma.productVariant.deleteMany({ where: { productId: id } })

    for (const opt of option) {
        const newOption = await prisma.productOption.create({
            data: {
                name: opt.name,
                productId: updateProduct.id,
            }
        })

        for (const value of opt.optionValue) {
            const newOptionValue = await prisma.productOptionValue.create({
                data: {
                    value: value.value,
                    productOptionId: newOption.id,
                }
            })

            optionValueMap.set(
                `${opt.name}:${value.value}`,
                {
                    optionValueId: newOptionValue.id,
                    optionId: newOption.id,
                }
            )
        }
    }

    const generatedVariants = generateVariantsForAPI(option)

    // console.log("generated variants", generatedVariants)

    for (const variant of generatedVariants) {
        const productVariant =
            await prisma.productVariant.create({
                data: {
                    productId: updateProduct.id,
                },
            })

        // console.log("variant", variant)

        for (const value of variant) {
            const optionValue =
                optionValueMap.get(
                    `${value.optionName}:${value.value}`
                )

            // console.log( value)

            if (!optionValue) {
                throw new Error(
                    `Option value not found: ${value.optionName}:${value.value}`
                )
            }

            // console.log("successfully found option value for", value.optionName, value.value)

            const variantValue2 = await prisma.variantValue.create({
                data: {
                    productVariantId: productVariant.id,
                    productOptionValueId: optionValue.optionValueId,
                },
            })

            console.log({ first: variantValue2.productOptionValueId, secound: variantValue2.productVariantId })
        }
    }

    const uploadedUrls: string[] = []
    try {
        const imageUrls = await Promise.all(data.images.map(async (image) => {
            validateProductImage(image)
            const blob = await put(
                `products/${updateProduct.id}/${randomUUID()}`,
                image,
                { access: "public", contentType: image.type }
            )
            uploadedUrls.push(blob.url)
            return blob.url
        }))

        await prisma.productImage.deleteMany({ where: { productId: updateProduct.id } })
        await prisma.productImage.createMany({
            data: imageUrls.map((url) => ({
                url,
                productId: updateProduct.id,
                altText: "this is an image"
            }))
        })

        await Promise.allSettled(
            existingProductByID.productImage.map((image) => deleteProductImage(image.url))
        )
    } catch (error) {
        await Promise.allSettled(uploadedUrls.map((url) => del(url)))
        throw error
    }

    return { updateProduct }
}

export async function deleteProduct({ id }: { id: string }) {
    const user = await getCurrentUser()

    if (!user || user.userRole !== accessRole) {
        throw new Error("you havnt access!")
    }

    const existingProduct = await prisma.product.findUnique({
        where: { id },
        select: { productImage: { select: { url: true } } },
    })

    if (!existingProduct) {
        throw new Error("محصول وجود ندارد")
    }

    const deleteProduct = await prisma.product.delete({
        where: { id }
    })

    await Promise.allSettled(
        existingProduct.productImage.map((image) => deleteProductImage(image.url))
    )

    return deleteProduct

}