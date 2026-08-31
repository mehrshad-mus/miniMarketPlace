"use server"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "../prisma";
import { s3 } from "../s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";


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
    return productWithImage;
}