export const STORY_LIFETIME_MS = 24 * 60 * 60 * 1000
export const IMAGE_MAX_SIZE = 10 * 1024 * 1024
export const VIDEO_MAX_SIZE = 50 * 1024 * 1024
export const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"])
export const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"])
export const FILE_EXTENSIONS: Record<string, string> = {
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
