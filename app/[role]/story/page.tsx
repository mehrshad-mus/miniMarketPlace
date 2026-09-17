import { getCurrentUser } from "@/lib/auth"
import { getAdminStories } from "@/services/story/story.service"
import StoryForm from "./StoryForm"
import StoryAdminList from "./StoryAdminList"

export default async function StoryPage() {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.userRole !== "ADMIN") {
        return (
            <main dir="rtl" className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 p-6">
                <div className="rounded-3xl bg-white px-8 py-10 text-center shadow-sm ring-1 ring-slate-200">
                    <p className="text-lg font-bold text-slate-900">دسترسی غیرمجاز</p>
                    <p className="mt-2 text-sm text-slate-500">این بخش فقط برای ادمین در دسترس است.</p>
                </div>
            </main>
        )
    }

    const stories = await getAdminStories()

    return (
        <main dir="rtl" className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                   
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">مدیریت استوری</h1>
                    <p className="mt-2 text-sm text-slate-500">ساخت و مدیریت استوری‌های سایت از این بخش انجام می‌شود.</p>
                </div>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
                    <StoryForm />
                    <StoryAdminList stories={stories} />
                </div>
            </div>
        </main>
    )
}
