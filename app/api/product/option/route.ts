import { createOption, deleteOption, editOption, getAllOption } from "@/services/productOption/option/option.service";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const options = await getAllOption() 
        
        return NextResponse.json(options)

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const { value } = data
        
        if (!value) {
            throw new Error("error")
        }

        const newOption = await createOption(value)

        return NextResponse.json({ message: `option Name is ${newOption}` })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json()
        const { value, id } = data

        if (!id || !value) {
            throw new Error("error")
        }


        const editedOption = await editOption(id,value)

        return NextResponse.json({ message: `option Name is ${editedOption}` })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const data = await request.json()
        const { id } = data

        if (!id) {
            throw new Error("id requer!")
        }

        const option = await deleteOption(id)

        return NextResponse.json({ message: `option DeleteId is ${option}` })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}