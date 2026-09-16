import { getCurrentUser } from "@/lib/auth";
import {createFavorite,deleteFavorite,getFavoritesByUserId,} from "@/services/favorite/favorite.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json({ message: "ابتدا باید وارد شوید" }, { status: 401 });
    }

    const favorites = await getFavoritesByUserId(currentUser.userId);

    return NextResponse.json({ favorites });
}

export async function PUT(res: NextRequest) {
    try {

        const { productId } = await res.json()

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.json({ message: "ابتدا باید وارد شوید" }, { status: 401 });
        }

        await createFavorite({ productId ,userId : currentUser.userId})

        return NextResponse.json({ message: "Favorite created successfully" }, { status: 201 })


    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message:
                    error instanceof Error ?
                        error.message : "An unknown error occurred"
            }, { status: error instanceof Error && error.message.includes("قبلا") ? 409 : 500 })
    }

}

export async function DELETE(res: NextRequest) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ message: "ابتدا باید وارد شوید" }, { status: 401 });
        }

        const { favoriteId } = await res.json() as { favoriteId?: string };

        if (!favoriteId) {
            return NextResponse.json({ message: "favoriteId is required" }, { status: 400 });
        }

        await deleteFavorite({ favoriteId, userId: currentUser.userId });

        return NextResponse.json({ message: "Favorite deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: error instanceof Error && error.message.includes("پیدا نشد") ? 404 : 500 },
        );
    }
}