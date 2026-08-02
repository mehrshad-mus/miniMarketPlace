import { createCategory, deletCategory, editCategoryName, getAllCategory } from "@/services/category/category.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const categories = await getAllCategory()

        return NextResponse.json({ message : "succses", category : categories} , {status : 200})
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

        const { value } = data

        if (!value) throw new Error("categoryName required")

        const newCategory = await createCategory(value)

        console.log(newCategory)

        return NextResponse.json({ message: newCategory }, { status: 200 })
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
        const data = await request.json() 

        const {  id, value } = data

        if (!value) throw new Error("categoryName and id required")

        const newCategory = await editCategoryName({value , id})

        console.log(newCategory)

        return NextResponse.json({ message: newCategory }, { status: 200 })
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

        const {id} = data

        if (!id) throw new Error("id required")

        const deleteCategory = await deletCategory(id)

        console.log(deleteCategory)

        return NextResponse.json({ message: deleteCategory }, { status: 200 })
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