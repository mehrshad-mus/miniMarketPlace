import { getCurrentUser } from "@/lib/auth";
import { accessRole } from "@/lib/constant/enums";
import { prisma } from "@/lib/prisma";
import { OfferField, offerSchema, schema } from "@/lib/zodSchema/schema";
import { createOffer, deleteOffer, getAllOffer, updateOffer } from "@/services/offer/offer.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {

        const currentUser = await getCurrentUser()

        const { searchParams } = new URL(request.url)

        const sellerId = searchParams.get("sellerId")
        const currentPage = searchParams.get("currentPage")
        const productId = searchParams.get("productId")

        const { offers: productOfferWithImage, totalCount } = await getAllOffer(
            {
                sellerId: sellerId ,
                productId: productId,
                currentPage: currentPage
            })


        return NextResponse.json({ products: productOfferWithImage, totalCount }, { status: 200 })

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
        const data = await request.json() as OfferField
        const validation = offerSchema.safeParse(data)

        if (!validation.success) {
            console.log("didnt succses")
            return NextResponse.json({ message: "some requires arent filled" }, { status: 400 })
        }

        const newOffer = await createOffer(validation.data)

        return NextResponse.json({ message: "heyyy success!" })

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
        const data = await request.json() as OfferField

        const validation = offerSchema.safeParse(data)

        if (!validation.success) {
            console.log("didnt succses")
            return NextResponse.json({ message: "some requires arent filled" }, { status: 400 })
        }

        const updatedOffer = await updateOffer(validation.data)

        return NextResponse.json({ message: "succses" })

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

        const data = await request.json()
        const { id } = data

        const deletedOffer = await deleteOffer(id)
        return NextResponse.json({ message: id })
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