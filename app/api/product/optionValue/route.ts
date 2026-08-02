import { optionProps } from "@/lib/zodSchema/schema";
import { createOptionValue, deleteOptionValue, editOptionValue } from "@/services/productOption/optionValue/optionValue.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as optionProps

        const { id, value } = body

        
        if (!id || !value) {
            return NextResponse.json({ message: "مقدار آپشن را تایین کنید" }, { status: 401 })
        }
        
        const stringValue = JSON.stringify(value)
        
        const optionValue = await createOptionValue(id, stringValue)

        return NextResponse.json({ message: `option ID  is ${optionValue.id} value is ${optionValue.value} ` })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {

    try {
        const body = await request.json() as { id: string, value: string }

        const { id, value } = body

        if (!id || !value) {
            return NextResponse.json({ message: "مقدار آپشن را تایین کنید" }, { status: 401 })
        }

        const editedOptionValue = await editOptionValue(id , value) 

        return NextResponse.json({ message: `option ID  is ${editedOptionValue.id} value is ${editedOptionValue.value} ` })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {

    try {
        const body = await request.json() as { id: string }

        const { id } = body

        if (!id) {
            return NextResponse.json({ message: "مقدار آپشن را تایین کنید" }, { status: 401 })
        }


        const deletedOptionValue = await deleteOptionValue(id)

        return NextResponse.json({ message: `option ID  is ${deletedOptionValue}`})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}