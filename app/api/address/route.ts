import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {

        const { latitude, longitude } = await request.json()

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.json({ message: "authenticatio" }, { status: 401 })
        }

        if (!latitude) {
            return NextResponse.json({ message: "latitude needed" }, { status: 400 })
        }

        if (!longitude) {
            return NextResponse.json({ message: "latitude needed" }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id: currentUser.userId },
            include: {
                addresses: true
            }
        })

        if (!user) {
            return NextResponse.json({ message: "user dosent found" }, { status: 400 })
        }

        const myHeaders = new Headers();
        myHeaders.append("Api-Key", "service.e5a972bf64b041eca8ae60c7bab6260b");

        const res = await fetch(`https://api.neshan.org/v5/reverse?lat=${latitude}&lng=${longitude}`, {
            method: "GET",
            headers: myHeaders,
        })

        const { formatted_address } = await res.json() as { formatted_address: string }

        if (user.addresses.length === 0) {
            const address = await prisma.address.create({
                data: {
                    userId: user.id,
                    address: formatted_address,
                    latitude,
                    longitude
                }
            })

            await prisma.cart.update({
                where: { userId: user.id }, data: {
                    longitude,
                    latitude,
                    cartAddress: formatted_address
                }
            })

            return NextResponse.json({ address }, { status: 201 })
        }

        await prisma.cart.update({
            where: { userId: user.id }, data: {
                longitude,
                latitude,
                cartAddress: formatted_address
            }
        })

        return NextResponse.json({message : "cartLocation changed succsessFully"} , {status : 200})

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