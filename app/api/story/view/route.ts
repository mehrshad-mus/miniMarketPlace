import { getCurrentUser } from "@/lib/auth"
import { markStoryViewed } from "@/services/story/story.service"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return NextResponse.json({ message: "ابتدا باید وارد شوید" }, { status: 401 })
        }

        const { storyId } = await request.json() as { storyId?: string }

        if (!storyId || typeof storyId !== "string") {
            return NextResponse.json({ message: "storyId is required" }, { status: 400 })
        }

        await markStoryViewed({ storyId, userId: currentUser.userId })

        return NextResponse.json({ message: "Story viewed successfully" })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: error instanceof Error && error.message.includes("پیدا نشد") ? 404 : 500 },
        )
    }
}
