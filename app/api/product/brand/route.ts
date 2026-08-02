import { dialogProps } from "@/lib/zodSchema/schema"
import { createBrand, deleteBrand, editBrand, getAllBrand } from "@/services/brand/brand.service"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const brands = await getAllBrand()

        return NextResponse.json({ message: "succses", brand: brands }, { status: 200 })
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
        const data = await request.json()
        const { value, secoundValue } = data as dialogProps

        if (!value || !secoundValue) {
            throw new Error("error")
        }

        if (typeof value !== "string") throw new Error("value must be string")

        const newBrand = await createBrand(value, secoundValue)

        return NextResponse.json({ message: `brand Name is ${newBrand.name} brandurl is ${newBrand.url}` })

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
        const data = await request.json() as dialogProps

        const { id, value, secoundValue } = data

        if(!id || !value || !secoundValue) throw new Error("id , value and secoundValue required")

        if (typeof value !== "string") throw new Error("value must be string")

        const newBrand = await editBrand(id , value , secoundValue)

        return NextResponse.json({message: newBrand} , {status : 200})
    }

    catch (error) {
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
        const data = await request.json() as dialogProps

        const {id} = data

        if (!id) throw new Error("id required")

        const deletedBrand = await deleteBrand(id)

        return NextResponse.json({ message: `Brand deleted: ${deletedBrand}` }, { status: 200 })
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