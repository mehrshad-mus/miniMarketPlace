import { createCategory, deletCategory, editCategoryName, getAllCategory } from "@/services/category/category.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const categories = await getAllCategory()

        return NextResponse.json({ message: "succses", category: categories }, { status: 200 })
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

        const formData = await request.formData()
        const value = JSON.parse(
            formData.get("payload") as string
        )
        const icon = formData.get("icon") as File


        if (!value) throw new Error("categoryName required")
        if (!icon || icon.size === 0) return NextResponse.json({ message: "icon requeire" }, { status: 400 })

        if (icon.type !== "image/svg+xml") {
            return NextResponse.json({ message: "Only SVG files are allowed" }, { status: 400 })
        }

        const newCategory = await createCategory(value.value, icon)

        console.log(newCategory)

        return NextResponse.json({ message: "hi" }, { status: 200 })
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

        const formData = await request.formData()
        const data = JSON.parse(
            formData.get("payload") as string
        )
        const icon = formData.get("icon") as File

        if (!data.value || !data.id) throw new Error("categoryName and id required")

        const newCategory = await editCategoryName(data.value, data.id , icon )

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

        const { id } = data

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