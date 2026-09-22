import { prisma } from "@/lib/prisma";
import { getProductImageUrl } from "@/services/product/product.service";

export async function getFavoritesByUserId(userId: string) {

    const favorites = await prisma.favorite.findMany({
        where: { userId },
        orderBy: { id: "desc" },
        select: {
            id: true,
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

                    productVariant: {
                        select: {
                            offer: {
                                where: {
                                    status: "ACTIVE",
                                    deletedAt: null,
                                    stock: {
                                        gt: 0,
                                    },
                                },
                                orderBy: {
                                    price: "asc",
                                },
                                take: 1,
                                select: {
                                    price: true,
                                    discount: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    const favoritesWithSignedImages = await Promise.all(
        favorites.map(async (favorite) => {
            if (!favorite.product) {
                return favorite;
            }

            const productImages = await Promise.all(
                favorite.product.productImage.map(async (img) => ({
                    ...img,
                    url: await getProductImageUrl(img.url),
                }))
            );

            return {
                ...favorite,
                product: {
                    ...favorite.product,
                    productImage: productImages,
                },
            };
        })
    );

    return favoritesWithSignedImages;
}

export async function createFavorite({ productId, userId }: { productId: string | undefined, userId: string }) {

    if (!productId) {
        throw new Error("productId is required")
    }

    const existingFavorite = await prisma.favorite.findUnique({
        where: {
            userId_productId: {
                userId: userId,
                productId: productId
            }
        }
    })

    if (existingFavorite) {
        throw new Error("این محصول قبلا به علاقه مندی ها اضافه شده است")
    }

    await prisma.favorite.create({
        data: {
            userId: userId,
            productId: productId
        }
    })
}

export async function deleteFavorite({
    favoriteId,
    userId,
}: {
    favoriteId: string;
    userId: string;
}) {
    const favorite = await prisma.favorite.findFirst({
        where: { id: favoriteId, userId },
        select: { id: true },
    });

    if (!favorite) {
        throw new Error("علاقه‌مندی پیدا نشد");
    }

    await prisma.favorite.delete({ where: { id: favorite.id } });
}