import { getCurrentUser } from "@/lib/auth"
import { commentRateLimit } from "@/lib/rate-limit"
import {
    createComment,
    deleteComment,
    getCommentsByUserId,
} from "@/services/comment/comment.service"
import { NextResponse } from "next/server"

export async function GET() {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.json(
            { message: "ابتدا باید وارد شوید" },
            { status: 401 }
        )
    }

    const comments = await getCommentsByUserId(currentUser.userId)

    return NextResponse.json({ comments })
}

export async function PUT(req: Request) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.json(
                { message: "ابتدا باید وارد شوید" },
                { status: 401 }
            )
        }

        const { success } = await commentRateLimit.limit(
            `comment:${currentUser.userId}`
        )

        if (!success) {
            return NextResponse.json(
                { message: "Too many requests. Please try again later." },
                { status: 429 }
            )
        }

        const { commentData, productId } = await req.json()

        await createComment({
            commentData,
            productId,
            userId: currentUser.userId,
        })

        return NextResponse.json({
            message: "Comment created successfully",
        })

    }
    catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message:
                    error instanceof Error ?
                        error.message : "An unknown error occurred"
            }, { status: 500 })
    }
}

export async function DELETE(req: Request) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.json(
                { message: "ابتدا باید وارد شوید" },
                { status: 401 }
            )
        }

        const { commentId } = await req.json() as { commentId?: string }

        if (!commentId || typeof commentId !== "string") {
            return NextResponse.json(
                { message: "commentId is required" },
                { status: 400 }
            )
        }

        await deleteComment({
            commentId,
            userId: currentUser.userId,
        })

        return NextResponse.json({
            message: "Comment deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message:
                    error instanceof Error ?
                        error.message : "An unknown error occurred"
            },
            {
                status: error instanceof Error && error.message.includes("پیدا نشد")
                    ? 404
                    : 500
            }
        )
    }
}