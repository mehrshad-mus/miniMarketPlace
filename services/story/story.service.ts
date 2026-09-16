import { prisma } from "@/lib/prisma"
import { s3 } from "@/lib/s3Client"
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"

const STORY_LIFETIME_MS = 24 * 60 * 60 * 1000
const IMAGE_MAX_SIZE = 10 * 1024 * 1024
const VIDEO_MAX_SIZE = 50 * 1024 * 1024
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"])
const FILE_EXTENSIONS: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/quicktime": "mov",
}

export function validateStoryFile(file: File) {
    const isImage = IMAGE_TYPES.has(file.type)
    const isVideo = VIDEO_TYPES.has(file.type)

    if (!isImage && !isVideo) {
        throw new Error("فرمت فایل مجاز نیست")
    }

    const maxSize = isImage ? IMAGE_MAX_SIZE : VIDEO_MAX_SIZE
    if (file.size > maxSize) {
        throw new Error(isImage ? "حجم عکس نباید بیشتر از ۱۰ مگابایت باشد" : "حجم ویدیو نباید بیشتر از ۵۰ مگابایت باشد")
    }

    return { isImage, isVideo }
}

function getStoryExpiryDate() {
    return new Date(Date.now() - STORY_LIFETIME_MS)
}

async function uploadStoryFile(file: File) {
    const extension = FILE_EXTENSIONS[file.type]
    const key = `stories/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${extension}`
    const body = Buffer.from(await file.arrayBuffer())

    await s3.send(new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
        Body: body,
        ContentType: file.type,
    }))

    return key
}

export async function createStory({ title, content, file,}: {
    title: string
    content: string
    file: File
}) {
    const { isImage, isVideo } = validateStoryFile(file)
    const key = await uploadStoryFile(file)

    try {
        return await prisma.story.create({
            data: {
                title,
                content,
                imageUrl: isImage ? key : null,
                videoUrl: isVideo ? key : null,
            },
        })
    } catch (error) {
        await s3.send(new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key,
        }))
        throw error
    }
}

export async function getActiveStories(userId?: string) {
    const stories = await prisma.story.findMany({
        where: { createdAt: { gte: getStoryExpiryDate() } },
        orderBy: { createdAt: "asc" },
        select: {
            id: true,
            title: true,
            content: true,
            imageUrl: true,
            videoUrl: true,
            createdAt: true,
            storyViews: userId? { where: { userId }, select: { id: true } } : false,
        },
    })

    return Promise.all(stories.map(async (story) => ({
        id: story.id,
        title: story.title,
        content: story.content,
        createdAt: story.createdAt,
        mediaType: story.videoUrl ? "video" as const : "image" as const,
        mediaUrl: await getSignedUrl(
            s3,
            new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME!,
                Key: story.videoUrl || story.imageUrl!,
            }),
            { expiresIn: 3600 },
        ),
        viewed: Array.isArray(story.storyViews) && story.storyViews.length > 0,
    })))
}

export async function markStoryViewed({storyId, userId}: {
    storyId: string
    userId: string
}) {
    const story = await prisma.story.findFirst({
        where: {
            id: storyId,
            createdAt: { gte: getStoryExpiryDate() },
        },
        select: { id: true },
    })

    if (!story) {
        throw new Error("استوری پیدا نشد")
    }

    await prisma.storyView.upsert({
        where: { storyId_userId: { storyId, userId } },
        create: { storyId, userId },
        update: { viewedAt: new Date() },
    })
}
