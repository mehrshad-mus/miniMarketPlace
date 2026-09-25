"use server"
import { prisma } from "../prisma";
import { getProductImageUrl } from "@/services/product/product.service";


export const autoSliderProduct = async () => {
    const products = await prisma.product.findMany({
        take: 10,
        include: {
            productImage: true,
            productVariant: {
                include: {
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

    return productWithImage;
}