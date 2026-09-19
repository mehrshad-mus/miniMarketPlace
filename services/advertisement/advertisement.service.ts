import { del, put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { getCurrentUser } from "@/lib/auth";
import { accessRole } from "@/lib/constant/enums";
import { IMAGE_MAX_SIZE, IMAGE_TYPES } from "@/lib/file/validation";
import { prisma } from "@/lib/prisma";

type AdvertisementFeatureInput = {
    label: string;
    values: string[];
    image: File;
};

type CreateAdvertisementInput = {
    title: string;
    description: string;
    features: AdvertisementFeatureInput[];
};

type UpdateAdvertisementFeatureInput = {
    id?: string;
    label: string;
    values: string[];
    image: File | null;
    imageUrl?: string;
};

type UpdateAdvertisementInput = {
    title: string;
    description: string;
    features: UpdateAdvertisementFeatureInput[];
};

function assertAdmin(user: Awaited<ReturnType<typeof getCurrentUser>>) {
    if (!user || user.userRole !== accessRole) {
        throw new Error("فقط ادمین دسترسی دارد");
    }
}

function validateAdvertisementImage(file: File) {
    if (!IMAGE_TYPES.has(file.type)) {
        throw new Error("فرمت تصویر باید jpg، png یا webp باشد");
    }
    if (file.size > IMAGE_MAX_SIZE) {
        throw new Error("حجم تصویر نباید بیشتر از ۱۰ مگابایت باشد");
    }
}

export async function createAdvertisement(data: CreateAdvertisementInput) {
    assertAdmin(await getCurrentUser());

    if (data.features.length !== 5) {
        throw new Error("برای ثبت محصول تبلیغاتی باید دقیقاً ۵ ویژگی اضافه کنید");
    }

    console.log("Creating advertisement with data:", data);
    const existingAdvertisement = await prisma.productAd.findFirst({ select: { id: true } });
    if (existingAdvertisement) {
        throw new Error("محصول تبلیغاتی از قبل وجود دارد");
    }

    const uploadedUrls: string[] = [];
    try {
        const features = await Promise.all(data.features.map(async (feature) => {
            validateAdvertisementImage(feature.image);
            const blob = await put(
                `advertisements/${new Date().toISOString().slice(0, 10)}/${randomUUID()}`,
                feature.image,
                { access: "public", contentType: feature.image.type }
            );
            uploadedUrls.push(blob.url);
            return { label: feature.label, imageUrl: blob.url, values: feature.values };
        }));

        return await prisma.$transaction((transaction) => transaction.productAd.create({
            data: {
                title: data.title || null,
                description: data.description || null,
                features: {
                    create: features.map((feature, index) => ({
                        label: feature.label,
                        imageUrl: feature.imageUrl,
                        sortOrder: index,
                        values: { create: feature.values.map((value) => ({ value })) },
                    })),
                },
            },
            include: {
                features: {
                    include: { values: true },
                    orderBy: { sortOrder: "asc" },
                },
            },
        }));
    } catch (error) {
        await Promise.allSettled(uploadedUrls.map((url) => del(url)));
        throw error;
    }
}

export async function getAdvertisement() {
    assertAdmin(await getCurrentUser());
    return prisma.productAd.findFirst({
        include: {
            features: {
                include: { values: true },
                orderBy: { sortOrder: "asc" },
            },
        },
    });
}

export async function updateAdvertisement(data: UpdateAdvertisementInput) {
    assertAdmin(await getCurrentUser());

    if (data.features.length !== 5) {
        throw new Error("برای ثبت محصول تبلیغاتی باید دقیقاً ۵ ویژگی اضافه کنید");
    }

    const existing = await prisma.productAd.findFirst({
        include: { features: true },
    });
    if (!existing) {
        throw new Error("محصول تبلیغاتی پیدا نشد");
    }

    const uploadedUrls: string[] = [];
    const removedUrls: string[] = [];

    try {
        const features = await Promise.all(data.features.map(async (feature, index) => {
            const oldFeature = existing.features.find((item) => item.id === feature.id);
            let imageUrl = oldFeature?.imageUrl;

            if (feature.image) {
                validateAdvertisementImage(feature.image);
                const blob = await put(
                    `advertisements/${new Date().toISOString().slice(0, 10)}/${randomUUID()}`,
                    feature.image,
                    { access: "public", contentType: feature.image.type }
                );
                imageUrl = blob.url;
                uploadedUrls.push(blob.url);
            }

            if (!imageUrl) {
                throw new Error(`تصویر ویژگی ${index + 1} الزامی است`);
            }
            if (oldFeature && oldFeature.imageUrl !== imageUrl) {
                removedUrls.push(oldFeature.imageUrl);
            }

            return { label: feature.label, imageUrl, sortOrder: index, values: feature.values };
        }));

        const retainedUrls = new Set(features.map((feature) => feature.imageUrl));
        existing.features.forEach((feature) => {
            if (!retainedUrls.has(feature.imageUrl)) {
                removedUrls.push(feature.imageUrl);
            }
        });

        const result = await prisma.$transaction(async (transaction) => {
            await transaction.productAdFeature.deleteMany({ where: { productAdId: existing.id } });
            return transaction.productAd.update({
                where: { id: existing.id },
                data: {
                    title: data.title || null,
                    description: data.description || null,
                    features: {
                        create: features.map((feature) => ({
                            label: feature.label,
                            imageUrl: feature.imageUrl,
                            sortOrder: feature.sortOrder,
                            values: { create: feature.values.map((value) => ({ value })) },
                        })),
                    },
                },
                include: {
                    features: {
                        include: { values: true },
                        orderBy: { sortOrder: "asc" },
                    },
                },
            });
        });

        await Promise.allSettled(removedUrls.map((url) => del(url)));
        return result;
    } catch (error) {
        await Promise.allSettled(uploadedUrls.map((url) => del(url)));
        throw error;
    }
}

export async function deleteAdvertisement() {
    assertAdmin(await getCurrentUser());

    const existing = await prisma.productAd.findFirst({
        include: { features: { select: { imageUrl: true } } },
    });
    if (!existing) {
        throw new Error("محصول تبلیغاتی پیدا نشد");
    }

    await prisma.productAd.delete({ where: { id: existing.id } });
    await Promise.allSettled(existing.features.map((feature) => del(feature.imageUrl)));
}
