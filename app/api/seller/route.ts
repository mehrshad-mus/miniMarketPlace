import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StoreRequestFields } from "@/lib/zodSchema/schema";
import { createSeller } from "@/services/seller/seller.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { id } = await request.json()

        const { createdSeller, updatedSellerRequest } = await createSeller(id)


        return NextResponse.json({message : "seller request approved successfully" , data : updatedSellerRequest})

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