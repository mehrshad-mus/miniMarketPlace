import { getCurrentUser } from "@/lib/auth"
import StoryForm from "./StoryForm"

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

    return (
        <main dir="rtl" className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8">
                   
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">ساخت استوری</h1>
                    <p className="mt-2 text-sm text-slate-500">استوری پس از ۲۴ ساعت به‌صورت خودکار از سایت حذف می‌شود.</p>
                </div>
                <StoryForm />
            </div>
        </main>
    )
}
