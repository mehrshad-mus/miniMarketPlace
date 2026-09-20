import { NextRequest, NextResponse } from "next/server";
import { productAdSchema, productAdUpdateSchema } from "@/lib/zodSchema/schema";
import { createAdvertisement, deleteAdvertisement, getPublicAdvertisement, updateAdvertisement } from "@/services/advertisement/advertisement.service";

function errorResponse(error: unknown) {
    const message = error instanceof Error ? error.message : "خطای داخلی سرور";
    const status = message.includes("دسترسی") ? 403 : message.includes("پیدا نشد") ? 404 : 500;
    return NextResponse.json({ message }, { status });
}

export async function GET() {
    try {
        return NextResponse.json({ advertisement: await getPublicAdvertisement() });
    } catch (error) {
        console.error(error);
        return errorResponse(error);
    }
}

function parsePayload(value: FormDataEntryValue | null) {
    if (typeof value !== "string") {
        throw new Error("اطلاعات تبلیغ الزامی است");
    }
    return JSON.parse(value) as { title?: unknown; description?: unknown; features?: unknown };
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const payload = parsePayload(formData.get("payload"));
        const images = formData.getAll("featureImages");
        const rawFeatures = Array.isArray(payload.features) ? payload.features : [];
        const features = rawFeatures.map((feature, index) => {
            const item = feature && typeof feature === "object"
                ? feature as { label?: unknown; values?: unknown }
                : {};
            return { label: item.label, values: item.values, image: images[index] };
        });
        const validation = productAdSchema.safeParse({
            title: payload.title,
            description: payload.description,
            features,
        });

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0]?.message || "اطلاعات واردشده معتبر نیست" }, { status: 400 });
        }

        return NextResponse.json({
            message: "محصول تبلیغاتی با موفقیت ساخته شد",
            advertisement: await createAdvertisement(validation.data),
        }, { status: 201 });
    } catch (error) {
        console.error(error);
        return errorResponse(error);
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const formData = await request.formData();
        const payload = parsePayload(formData.get("payload"));
        const images = formData.getAll("featureImages");
        const rawFeatures = Array.isArray(payload.features) ? payload.features : [];
        const features = rawFeatures.map((feature, index) => {
            const item = feature && typeof feature === "object"
                ? feature as { id?: unknown; label?: unknown; values?: unknown; imageUrl?: unknown }
                : {};
            return {
                id: item.id,
                label: item.label,
                values: item.values,
                image: images[index] instanceof File && images[index].size > 0 ? images[index] : null,
                imageUrl: item.imageUrl,
            };
        });
        const validation = productAdUpdateSchema.safeParse({
            title: payload.title,
            description: payload.description,
            features,
        });

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.issues[0]?.message || "اطلاعات واردشده معتبر نیست" }, { status: 400 });
        }

        return NextResponse.json({
            message: "محصول تبلیغاتی با موفقیت ویرایش شد",
            advertisement: await updateAdvertisement(validation.data),
        });
    } catch (error) {
        console.error(error);
        return errorResponse(error);
    }
}

export async function DELETE() {
    try {
        await deleteAdvertisement();
        return NextResponse.json({ message: "محصول تبلیغاتی با موفقیت حذف شد" });
    } catch (error) {
        console.error(error);
        return errorResponse(error);
    }
}
