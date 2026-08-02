import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: NextResponse) {

    try {
        

        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ message: "id requer!", status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { id },
        })

        if(!user){
            return NextResponse.json({message : "users doset found "} ,{status :400})
        }

        if(user.role === "ADMIN"){
            return NextResponse.json({message : "نمیتوان سطح ادمین را تغییر داد"} , {status : 400})
        }

        if(user.role === "USER"){
            await prisma.user.update({
                where : {id},
                data : {role : "SELLER"}
            })
        }

        if(user.role === "SELLER"){
            await prisma.user.update({
                where : {id},
                data : {role : "USER"}
            })
        }

        return NextResponse.json({ message: `ID is ${user.id} role is ${user.role}` })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error updating user role:", error);

        if (error.code === 'P2025') { // Prisma error code for record not found
            return new NextResponse(JSON.stringify({ message: 'User not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        return NextResponse.json({ message: 'Failed to update user role', error: error.message });
    }

}