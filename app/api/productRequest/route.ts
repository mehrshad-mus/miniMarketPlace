import { getCurrentUser } from "@/lib/auth";
import { FormFields, schema } from "@/lib/zodSchema/schema";
import { createProductRequest, deleteProductRequest, getAllProductRequest } from "@/services/productRequest/productRequest.service";
import { NextRequest, NextResponse } from "next/server";
;

export async function GET(request: NextRequest) {
    try {

        const { searchParams } = new URL(request.url);
        const productRequestId = searchParams.get("productRequestId")

        const {productRequests , totalCount} = await getAllProductRequest({productRequestId})
        

        return NextResponse.json({ productRequests, totalCount}, { status: 200 })

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
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.json({ message: "not authorized" })
        }

        const formData = await request.formData()

        const payload = JSON.parse(
            formData.get("payload") as string
        )

        const images = formData.getAll("images") as File[]
        const video = formData.get("video")

        const data: FormFields = {
            ...payload,
            images,
            video: video instanceof File ? video : undefined,
        }

        const validation = schema.safeParse(data)

        if (!validation.success) {
            return NextResponse.json({ message: "some requires arent filled" }, { status: 404 })
        }

        const create = await createProductRequest({ data , images })

        return NextResponse.json({ message: "heyyy" }, { status: 200 })

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

        if (!id) {
            return NextResponse.json({ message: "dosent succsid" }, { status: 401 })
        }

        const { deletedProductRequest } = await deleteProductRequest({ productRequestId: id })

        return NextResponse.json({ message: `productRequest with id ${deletedProductRequest} is deleted` }, { status: 200 })

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