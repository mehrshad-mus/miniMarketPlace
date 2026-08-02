import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest) {

    try {
        const body = await request.json()
        const { id } = await body

        if (!id) {
            return NextResponse.json({ message: "id requer!", status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id },
        })

        if (!user) {
            return NextResponse.json({ message: "user dosent exist" }, { status: 400 })
        }

        if (user.status === "ACTIVE") {
            await prisma.user.update({
                where: { id },
                data: { status: "INACTIVE" }
            })
        }
        if (user.status === "INACTIVE") {
            await prisma.user.update({
                where: { id },
                data: { status: "ACTIVE" }
            })
        }

        return NextResponse.json({ message: `ID is ${id} and new status is ${user.status}` })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error updating user role:", error);

        if (error.code === 'P2025') { // Prisma error code for record not found
            return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        return NextResponse.json({ message: 'Failed to update user role', error: error.message });
    }
}