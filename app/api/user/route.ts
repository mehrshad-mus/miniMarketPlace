import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProfileFields, ProfileSchema } from "@/lib/zodSchema/schema";
import { editProfile, getUsers } from "@/services/user/user.service";
import { NextRequest, NextResponse } from "next/server";
import { toGregorian } from "jalaali-js";

export async function GET(request: NextRequest) {
    try {

        const { searchParams } = new URL(request.url);

        const currentPage = searchParams.get("page");
        const objectFilter = searchParams.get('filter');
        const searchPhone = searchParams.get('search')
        const userId = searchParams.get("userId")

        if (userId) {
            const user = await getCurrentUser()

            console.log(user)

            if (!user) return NextResponse.json({ message: "user dosent exist...!" }, { status: 401 })
            const currentUser = await prisma.user.findUnique({ where: { id: user?.userId } })

            return NextResponse.json({ currentUser, message: "user found" })
        }

        const { users, totalCount } = await getUsers({ currentPage, objectFilter, searchPhone })

        return NextResponse.json({
            users,
            totalCount,
        });


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
        const data = await request.json() as ProfileFields

        const validation = ProfileSchema.safeParse(data)

        if (!validation.success) {
            console.log("some requre isnt fill")

            return NextResponse.json({ message: "didnt succied" })
        }

        const updateProfileUser = await editProfile(validation.data)

        return NextResponse.json({message : "succses"}  , {status:200})
    } catch (error) {
        console.error("خطا در دریافت کاربران:", error);

        return new NextResponse(
            JSON.stringify({ message: "خطا در سرور" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

}

