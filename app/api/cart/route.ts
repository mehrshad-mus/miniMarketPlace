import { offerType } from "@/lib/types/types";
import { createCart, deleteCartItem, getCart, updateCart, updateCartLocation } from "@/services/cart/cart.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {

        const cart = await getCart()

        return NextResponse.json({ cart }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message:
                    error instanceof Error ?
                        error.message : "An unknown error occurred"
            }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {

        const data = await request.json() as { offer: offerType, quantity: number }

        const { quantity, offer } = data

        if (quantity <= 0) {
            return NextResponse.json({ message: "Quantity must be greater than 0" }, { status: 400 })
        }

        if (!offer) {
            return NextResponse.json({ message: "Offer is required" }, { status: 400 })
        }

        const cart = await createCart({ offer, quantity: quantity })

        return NextResponse.json({ message: "Cart created successfully", cart }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message:
                    error instanceof Error ?
                        error.message : "An unknown error occurred"
            }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    try {

        const data = await request.json() as
            {
                offerId: string,
                quantity: number,
                cartItemId: string,
                location?: { latitude: number | null, longitude: number | null, formatted_address: string | null },
        
            }

        const { quantity, offerId, cartItemId, location } = data

        if(location){
            const updateAddress = await updateCartLocation({location})
            console.log(updateAddress)

            return NextResponse.json({message: "updated succsesfully"} , {status: 200})
        }


        if (quantity <= 0) {
            return NextResponse.json({ message: "Quantity must be greater than 0" }, { status: 400 })
        }

        if (!offerId) {
            return NextResponse.json({ message: "Offer is required" }, { status: 400 })
        }

        if (!cartItemId) {
            return NextResponse.json({ message: "cartItem ID requier" }, { status: 404 })
        }

        const cart = await updateCart({ offerId, quantity: quantity, cartItemId })

        return NextResponse.json({ message: "Cart updated successfully", cart }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message:
                    error instanceof Error ?
                        error.message : "An unknown error occurred"
            }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {

    try {
        const { cartItemId } = await request.json()

        if (!cartItemId) {
            return NextResponse.json({ message: "cartItemId requier" }, { status: 404 })
        }

        const { message } = await deleteCartItem({ cartItemId })

        return NextResponse.json({ message }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message:
                    error instanceof Error ?
                        error.message : "An unknown error occurred"
            }, { status: 500 })
    }



}