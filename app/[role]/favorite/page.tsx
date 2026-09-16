"use client"
import FavoritesGrid from "./FavoritesGrid";
import { useQuery } from "@tanstack/react-query";
import { favorite } from "@/lib/queries";

export default  function FavoritePage() {
    

    const {data , isLoading , isError} = useQuery({
        queryKey: ["favorites"],
        queryFn: () => favorite.getAll(),
    })

    console.log(data )
    
    if (isError || !data) {
        return (
            <main dir="rtl" className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 p-6">
                <div className="rounded-3xl bg-white px-8 py-10 text-center shadow-sm ring-1 ring-slate-200">
                    <p className="text-lg font-bold text-slate-900">برای دیدن علاقه‌مندی‌ها وارد شوید</p>
                    <p className="mt-2 text-sm text-slate-500">محصولات منتخب شما فقط برای حساب خودتان نمایش داده می‌شوند.</p>
                </div>
            </main>
        );
    }

    return (
        <main dir="rtl" className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-medium text-red-500">انتخاب‌های شما</p>
                        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">علاقه‌مندی‌ها</h1>
                    </div>
                    <p className="text-sm text-slate-500">{data?.length} محصول ذخیره شده</p>
                </div>
                <FavoritesGrid initialFavorites={data || []} />
            </div>
        </main>
    );
}