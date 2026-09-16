"use client";

import { favorite } from "@/lib/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type FavoriteItem = Awaited<ReturnType<typeof favorite.getAll>>[number];

export default function FavoritesGrid({ initialFavorites }: { initialFavorites: FavoriteItem[] }) {

    const [removingId, setRemovingId] = useState<string | null>(null);

    const queryClient = useQueryClient();

    const { mutate: removeFavorite, isPending } = useMutation({
        mutationKey: ["removeFavorite"],
        mutationFn: favorite.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
            toast.success("از علاقه مندی ها حذف شد", {
                position: "bottom-left", style: {
                    background: "#98e897",
                    color: "#ffffff",
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px"
                },
            })
        },
    })

    if (initialFavorites.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <span className="text-3xl">♡</span>
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-900">هنوز محصولی ذخیره نکرده‌اید</h2>
                <p className="mt-2 text-sm text-slate-500">محصولات موردعلاقه‌تان را اینجا جمع کنید.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {initialFavorites.map(({ id, product }) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const offer = product.productVariant.flatMap((variant: { offer: any; }) => variant.offer)[0];
                const finalPrice = offer ? offer.price - Math.round((offer.price * offer.discount) / 100) : null;
                const image = product.productImage[0];

                return (
                    <article key={id} className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-lg">
                        <div className="relative aspect-square overflow-hidden bg-slate-100">
                            {image?.url ? (
                                <Image src={image.url} alt={image.altText || product.title} fill className="object-cover transition duration-500 group-hover:scale-105 p-8" />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-slate-400">بدون تصویر</div>
                            )}
                            <button
                                type="button"
                                onClick={() => removeFavorite({favoriteId: id})}
                                disabled={removingId === id}
                                aria-label={`حذف ${product.title} از علاقه‌مندی‌ها`}
                                className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm backdrop-blur transition hover:bg-red-500 hover:text-white disabled:cursor-wait disabled:opacity-60"
                            >
                                {removingId === id ? "…" : "♥"}
                            </button>
                        </div>
                        <div className="p-5">
                            <p className="text-xs font-semibold text-red-500">{product.brand.name}</p>
                            <h2 className="mt-2 line-clamp-2 min-h-12 text-base font-bold leading-6 text-slate-900">{product.title}</h2>
                            <div className="mt-5 flex items-center justify-between gap-3">
                                <div>
                                    {finalPrice !== null ? (
                                        <p className="text-sm font-black text-slate-900">{finalPrice.toLocaleString("fa-IR")} تومان</p>
                                    ) : (
                                        <p className="text-xs text-slate-400">در حال حاضر موجود نیست</p>
                                    )}
                                </div>
                                <Link href={`/product/${product.id}`} className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-500">
                                    مشاهده
                                </Link>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
