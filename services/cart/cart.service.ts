import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { offerType } from "@/lib/types/types";

export async function getCart() {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new Error("you must authenticate first")
    }

    const cart = await prisma.cart.findUnique({
        where: { userId: currentUser.userId },
        include: {
            cartItem: {
                include: {
                    offer: {
                        include: {
                            productVariant: {
                                include: {
                                    variantValue: {
                                        include: {
                                            productOptionValue: {
                                                include: {
                                                    productOption: true
                                                }
                                            }
                                        }
                                    },
                                    product: {
                                        include: {
                                            productImage: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    })

    const cartWithImages = {
        ...cart,

    }
}

export async function createCart({ offer, quantity }: { offer: offerType; quantity: number }) {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new Error("you must authenticate first")
    }

    const existCart = await prisma.cart.findUnique({ where: { userId: currentUser.userId }, include: { cartItem: true } })

    if (existCart) {
        const existCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: existCart.id,
                offerId: offer.id
            }
        })

        if (existCartItem) {
            await prisma.cartItem.update({
                where: { id: existCartItem.id },
                data: {
                    quantity: existCartItem.quantity + quantity,
                    price: (offer.price - (offer.price * offer.discount / 100)) * (existCartItem.quantity + quantity)
                }
            })
        } else {
            const cartItem = await prisma.cartItem.create({
                data: {
                    cartId: existCart.id,
                    offerId: offer.id,
                    quantity: quantity,
                    price: (offer.price - (offer.price * offer.discount / 100)) * quantity
                }
            })
        }

        return existCart
    }

    const newCart = await prisma.cart.create({
        data: {
            userId: currentUser.userId,
        }
    })

    const cartItem = await prisma.cartItem.create({
        data: {
            cartId: newCart.id,
            offerId: offer.id,
            quantity: quantity,
            price: (offer.price - (offer.price * offer.discount / 100)) * quantity
        }
    })

    const cart = await prisma.cart.findUnique({
        where: { id: newCart.id },
        include: {
            cartItem: true
        }
    })

    return cart
}

export async function updateCart({ offerId, quantity, cartItemId }: { offerId: string; quantity: number, cartItemId: string }) {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new Error("you must authenticate first")
    }

    const existOffer = await prisma.offer.findUnique({ where: { id: offerId } })
    if (!existOffer) {
        throw new Error("offer dosent exist")
    }

    const existCartItem = await prisma.cartItem.findUnique({ where: { id: cartItemId } })
    if (!existCartItem) {
        throw new Error("cartItem dosent exist")
    }

    const quantityValidation = quantity <= existOffer.stock

    if (!quantityValidation) {
        throw new Error("موجودی در انبار تمام شده")
    }

    await prisma.cartItem.update({
        where: { id: cartItemId },
        data: {
            quantity,
            price: (existOffer.price - (existOffer.price * existOffer.discount / 100)) * quantity

        }
    })

    const cart = await prisma.cart.findUnique({ where: { userId: currentUser.userId }, include: { cartItem: true } })

    return cart
}

export async function updateCartLocation({ location }:
    {

        location?:
        {
            latitude: number | null,
            longitude: number | null,
            formatted_address: string | null
        }
    }) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new Error("you must authenticate first")
    }

    if (!location) {
        throw new Error("you must provide location")
    }

    const existingCart = await prisma.cart.findUnique({ where: { userId: currentUser.userId } })
    if (!existingCart) {
        throw new Error("cart dosent exist")
    }

    if (!location.formatted_address || !location.latitude || !location.longitude) {

        const cart = await prisma.cart.update({
            where: { userId: currentUser.userId },
            data: {
                cartAddress: null,
                latitude: null,
                longitude: null
            }
        })

        return cart
    }

    const cart = await prisma.cart.update({
        where: { userId: currentUser.userId },
        data: {
            cartAddress: location.formatted_address,
            latitude: location.latitude,
            longitude: location.longitude
        }
    })

    return cart
}

export async function deleteCartItem({ cartItemId }: { cartItemId: string }) {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new Error("you must authenticate first")
    }

    const existCart = await prisma.cart.findUnique({ where: { userId: currentUser.userId } })

    if (!existCart) {
        throw new Error("cart not found")
    }

    const existCartItem = await prisma.cartItem.findUnique({
        where: {
            id: cartItemId
        }
    })

    if (!existCartItem) {
        throw new Error("cart item not found")
    }

    await prisma.cartItem.delete({
        where: {
            id: cartItemId
        }
    })

    return { message: "cart item deleted successfully" }
}