import { getCurrentUser } from "@/lib/auth";
import { accessRole } from "@/lib/constant/enums";
import { prisma } from "@/lib/prisma";
import { OfferField } from "@/lib/zodSchema/schema";
import { s3 } from "@/lib/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getAllOffer({sellerId , productId , currentPage} :
    {
        sellerId: string | null,
        productId: string | null,
        currentPage: string | null
    }) {

    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.userRole === "USER") {
        throw new Error("you dont have access")
    }

    const existingSeller = await prisma.seller.findUnique({ where: { userId: currentUser.userId } })

    if (!existingSeller) {
        throw new Error("seller dosent exist!!")
    }

    const pageNumber = Number(currentPage)
    const skipPages = 5 * (pageNumber - 1)
    const totalCount = await prisma.product.count({
        where: {
            productVariant: {
                some: {
                    offer: {
                        some: {
                            sellerId: existingSeller.id
                        }
                    }
                }
            }
        },
    })

    if (productId) {
        const productWithOfferById = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                productVariant: {
                    include: {
                        offer: currentUser.userRole === "ADMIN" ?
                            {
                                include: {
                                    seller: true
                                }
                            } : {
                                where: {
                                    sellerId: existingSeller.id
                                },
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

        if (!productWithOfferById) {
            throw new Error("cant find it")
        }

        return { productWithOffers: [productWithOfferById] }
    }

    const productWithOffers = await prisma.product.findMany({
        where: {
            productVariant: {
                some: {
                    offer: {
                        some: {
                            sellerId: existingSeller.id
                        }
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
            productImage: true,
            brand: true,
            category: true,
            productVariant: {
                include: {
                    offer: {
                        include: {
                            seller: true
                        }
                    }
                }
            }
        }
    })

    const productOfferWithImage = await Promise.all(
        productWithOffers.map(async (product) => {
            return {
                ...product,
                productImage: await Promise.all(
                    product.productImage.map(async (image) => {
                        return {
                            ...image,
                            url: await getSignedUrl(
                                s3,
                                new GetObjectCommand({
                                    Bucket: process.env.S3_BUCKET_NAME!,
                                    Key: image.url,
                                }),
                                { expiresIn: 3600 } // 1 hour
                            ),
                        }
                    })
                )
            }
        }))
    
    return { offers: productOfferWithImage, totalCount: Math.ceil(totalCount / 5) }
}

export async function createOffer(data: OfferField) {
    const user = await getCurrentUser()

    if (!user || user.userRole === "USER") {
        throw new Error("you havnt access!")
    }

    const seller = await prisma.seller.findUnique({ where: { userId: user.userId } })
    if (!seller) {
        throw new Error("there is no seller with this ID!")
    }
    const { variants } = data


    for (const varr of variants) {

        if (varr.stock !== undefined && varr.stock > 0) {

            const validation = await prisma.offer.findMany({
                where: { sellerId: seller.id, productVariantId: varr.id },
                omit: {
                    createdAt: true,
                    deletedAt: true,
                }
            })

            if (validation.length === 1) {
                throw new Error(`for this ${validation[0].productVariantId} variant exist offer by you`)
            }

            if (varr.price !== undefined && varr.price > 0) {
                const offer = await prisma.offer.create({
                    data: {
                        productVariantId: varr.id,
                        sellerId: seller.id,
                        price: varr.price,
                        stock: varr.stock,
                        discount: varr.discount ?? 0
                    }
                })
                // console.log(offer)
            }
        }

    }
}

export async function updateOffer(data: OfferField) {
    const user = await getCurrentUser()

    if (!user || user.userRole === "USER") {
        throw new Error("you havnt access!")
    }

    const seller = await prisma.seller.findUnique({ where: { userId: user.userId } })
    if (!seller) {
        return new Error("you havnt access!")
    }

    const { variants: offers } = data

    // console.log(offers)

    for (const off of offers) {

        if (off.offerId) {
            const updatedOffer = await prisma.offer.update({
                where: { id: off.offerId },
                data: {
                    price: off.price,
                    stock: off.stock,
                    discount: off.discount
                }
            })
            // console.log(updatedOffer)
            continue
        }

        if (off.stock !== undefined && off.stock > 0) {

            if (off.price === undefined || off.price <= 0) {
                throw new Error("for this entity you must enter a valid price")
            }

            const newOffer = await prisma.offer.create({
                data: {
                    productVariantId: off.id,
                    sellerId: seller.id,
                    price: off.price,
                    stock: off.stock,
                    discount: off.discount ?? 0
                }
            })
            console.log(newOffer)
        }
    }
}

export async function deleteOffer(id: string) {

    const user = await getCurrentUser()

    if (!user || user.userRole !== accessRole) {
        throw new Error("you havnt access!")
    }

    await prisma.offer.delete({ where: { id } })
}