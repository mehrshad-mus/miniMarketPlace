import { getCurrentUser } from "@/lib/auth"
import { createStory, getActiveStories } from "@/services/story/story.service"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        const currentUser = await getCurrentUser()
        const stories = await getActiveStories(currentUser?.userId)

        return NextResponse.json({ stories })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            {
                status: error instanceof Error && (
                    error.message.includes("فرمت فایل") ||
                    error.message.includes("حجم")
                ) ? 400 : 500,
            },
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser || currentUser.userRole !== "ADMIN") {
            return NextResponse.json({ message: "فقط ادمین دسترسی دارد" }, { status: 403 })
        }

        const formData = await request.formData()
        const title = formData.get("title")
        const content = formData.get("content")
        const file = formData.get("file")

        if (
            typeof title !== "string" ||
            typeof content !== "string" ||
            !(file instanceof File)
        ) {
            return NextResponse.json({ message: "عنوان، متن و فایل الزامی هستند" }, { status: 400 })
        }

        const normalizedTitle = title.trim()
        const normalizedContent = content.trim()

        if (!normalizedTitle || !normalizedContent) {
            return NextResponse.json({ message: "عنوان و متن نمی‌توانند خالی باشند" }, { status: 400 })
        }

        if (normalizedTitle.length > 80 || normalizedContent.length > 500) {
            return NextResponse.json({ message: "طول عنوان یا متن بیش از حد مجاز است" }, { status: 400 })
        }

        const story = await createStory({ title: normalizedTitle, content: normalizedContent, file})

        return NextResponse.json({ message: "استوری با موفقیت ساخته شد", story }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 },
        )
    }
}
