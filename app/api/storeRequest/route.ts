import { StoreRequestFields, StoreRequrstSchema } from "@/lib/zodSchema/schema";
import { createStoreRequest, deleteStoreRequest, editStoreRequest, getAllStoreRequest } from "@/services/storeRequest/storeRequest.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const { storeRequests , totalCount} = await getAllStoreRequest()

        return NextResponse.json({ storeRequests, totalCount, message: "storeRequests found" })

    } catch (error) {
        console.error("خطا در دریافت کاربران:", error);

        return new NextResponse(
            JSON.stringify({ message: "خطا در سرور" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function PUT(request: NextRequest) {

    try {
        const data = await request.json() as StoreRequestFields

        const validation = StoreRequrstSchema.safeParse(data)

        if (!validation.success) {
            return NextResponse.json({ message: "some requier is missing ...!" }, { status: 403 })
        }

        const { createStoreRequest: StoreRequest } = await createStoreRequest(validation.data)

        console.log(StoreRequest)

        return NextResponse.json({ mesaage: `succses` }, { status: 200 })
    } catch (error) {
        console.error("خطا در دریافت کاربران:", error);

        return new NextResponse(
            JSON.stringify({ message: "خطا در سرور" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function PATCH(request: NextRequest) {

    try {
        const data = await request.json() as StoreRequestFields

        const validation = StoreRequrstSchema.safeParse(data)

        if (!validation.success) {
            return NextResponse.json({ message: "some requier is missing ...!" }, { status: 403 })
        }

        const { updatedStoreRequest } = await editStoreRequest(validation.data)

        console.log(updatedStoreRequest)

        return NextResponse.json({ mesaage: `succses` }, { status: 200 })
    } catch (error) {
        console.error("خطا در دریافت کاربران:", error);

        return new NextResponse(
            JSON.stringify({ message: "خطا در سرور" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
export async function DELETE(request: NextRequest) {

    try {
        const data = await request.json()

        const {id} = data

        if (!id) {
            return NextResponse.json({ message: "id rqueier" }, { status: 403 })
        }

        const { deletedStoreRequest } = await deleteStoreRequest(id)


        return NextResponse.json({ mesaage: `succses` }, { status: 200 })
    } catch (error) {
        console.error("خطا در دریافت کاربران:", error);

        return new NextResponse(
            JSON.stringify({ message: "خطا در سرور" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

