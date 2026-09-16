import { prisma } from "@/lib/prisma";
import { s3 } from "@/lib/s3Client";
import { ReviewData } from "@/lib/types/types";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function createComment({commentData , productId, userId} : {commentData : ReviewData , productId : string | undefined, userId : string}) {
   
    if(!commentData.rating || !commentData.content){
        throw new Error("all fields are required ...!")
    }

    if(!productId){
        throw new Error("productId is required ...!")
    }

    const newComment = await prisma.comment.create({
        data: {
            userId : userId,
            productId : productId,
            rate : commentData.rating,
            content : commentData.content,
            strength : commentData.strengths,
            weakness : commentData.weaknesses,
            recommendation : commentData.recommend,
        }
    })

    return newComment
}

export async function getCommentsByUserId(userId: string) {
    const comment = await prisma.comment.findMany({
            where: { userId },
            orderBy: { id: "desc" },
            select: {
                id: true,
                rate: true,
                content: true,
                strength: true,
                weakness: true,
                recommendation: true,
                createdAt: true,
                updatedAt: true,
                product: {
                    select: {
                        id: true,
                        title: true,
                        englishTitle: true,
                        rate: true,
                        status: true,
                        deletedAt: true,       
    
                        brand: {
                            select: {
                                name: true,
                            },
                        },
    
                        productImage: {
                            orderBy: {
                                createdAt: "asc",
                            },
                            select: {
                                url: true,
                                altText: true,
                            },
                        },
                    },
                },
            },
        });
    
        const commentWithSignedImages = await Promise.all(
            comment.map(async (com) => {
                if (!com.product) {
                    return com;
                }
    
                const productImages = await Promise.all(
                    com.product.productImage.map(async (img) => ({
                        ...img,
                        url: await getSignedUrl(
                            s3,
                            new GetObjectCommand({
                                Bucket: process.env.S3_BUCKET_NAME!,
                                Key: img.url,
                            }),
                            {
                                expiresIn: 3600,
                            }
                        ),
                    }))
                );
    
                return {
                    ...com,
                    product: {
                        ...com.product,
                        productImage: productImages,
                    },
                };
            })
        );
    
        return commentWithSignedImages;
}

export async function deleteComment({
    commentId,
    userId,
}: {
    commentId: string;
    userId: string;
}) {
    const comment = await prisma.comment.findFirst({
        where: { id: commentId, userId },
        select: { id: true },
    });

    if (!comment) {
        throw new Error("دیدگاه پیدا نشد");
    }

    await prisma.comment.delete({ where: { id: comment.id } });
}