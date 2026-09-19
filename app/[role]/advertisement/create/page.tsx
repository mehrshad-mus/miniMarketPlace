"use client";

import { DragEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { advertisement } from "@/lib/queries";
import { productAdSchema, productAdUpdateSchema, ProductAdFormFields, ProductAdUpdateFormFields } from "@/lib/zodSchema/schema";
import { toast } from "sonner";

type Feature = {
  label: string;
  values: string[];
  image: File | null;
  imagePreview: string;
  imageUrl?: string;
  id?: string;
};

const createFeature = (): Feature => ({
  label: "",
  values: [""],
  image: null,
  imagePreview: "",
});

type AdvertisementData = {
  id: string;
  title: string | null;
  description: string | null;
  features: Array<{
    id: string;
    label: string;
    imageUrl: string;
    values: Array<{ value: string }>;
  }>;
};

export default function ProductAdCreatePage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<Feature[]>([createFeature()]);
  const [validationMessage, setValidationMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { data: advertisementData, isLoading: isAdvertisementLoading } = useQuery<AdvertisementData | null>({
    queryKey: ["advertisement"],
    queryFn: advertisement.get,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProductAdFormFields | ProductAdUpdateFormFields) =>
      isEditing
        ? advertisement.update(data as ProductAdUpdateFormFields)
        : advertisement.create(data as ProductAdFormFields),
    onSuccess: (result) => {
      toast.success(result.message);
      queryClient.invalidateQueries({ queryKey: ["advertisement"] });
      setValidationMessage("");
    },
    onError: (error) => setValidationMessage(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: advertisement.remove,
    onSuccess: (result) => {
      toast.success(result.message);
      setTitle("");
      setDescription("");
      setFeatures([createFeature()]);
      setIsEditing(false);
      queryClient.setQueryData(["advertisement"], null);
    },
    onError: (error) => setValidationMessage(error.message),
  });

  useEffect(() => {
    if (!advertisementData || isEditing) {
      return;
    }

    setTitle(advertisementData.title || "");
    setDescription(advertisementData.description || "");
    setFeatures(advertisementData.features.map((feature) => ({
      id: feature.id,
      label: feature.label,
      values: feature.values.map((value) => value.value),
      image: null,
      imagePreview: feature.imageUrl,
      imageUrl: feature.imageUrl,
    })));
  }, [advertisementData, isEditing]);

  const updateFeatureLabel = (index: number, label: string) => {
    setFeatures((prev) =>
      prev.map((feature, featureIndex) =>
        featureIndex === index ? { ...feature, label } : feature
      )
    );
  };

  const updateFeatureValue = (featureIndex: number, valueIndex: number, value: string) => {
    setFeatures((prev) =>
      prev.map((feature, currentFeatureIndex) =>
        currentFeatureIndex === featureIndex
          ? {
              ...feature,
              values: feature.values.map((currentValue, currentValueIndex) =>
                currentValueIndex === valueIndex ? value : currentValue
              ),
            }
          : feature
      )
    );
  };

  const addFeature = () => {
    if (features.length >= 5) {
      setValidationMessage("برای ثبت محصول تبلیغاتی باید دقیقاً ۵ ویژگی اضافه کنید.");
      return;
    }
    setFeatures((prev) => [...prev, createFeature()]);
  };

  const removeFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, featureIndex) => featureIndex !== index));
  };

  const addFeatureValue = (featureIndex: number) => {
    setFeatures((prev) =>
      prev.map((feature, currentFeatureIndex) =>
        currentFeatureIndex === featureIndex
          ? { ...feature, values: [...feature.values, ""] }
          : feature
      )
    );
  };

  const removeFeatureValue = (featureIndex: number, valueIndex: number) => {
    setFeatures((prev) =>
      prev.map((feature, currentFeatureIndex) =>
        currentFeatureIndex === featureIndex
          ? { ...feature, values: feature.values.filter((_, index) => index !== valueIndex) }
          : feature
      )
    );
  };

  const setFeatureImage = (featureIndex: number, file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    setFeatures((prev) =>
      prev.map((feature, currentFeatureIndex) => {
        if (currentFeatureIndex !== featureIndex) {
          return feature;
        }

        return {
          ...feature,
          image: file,
          imagePreview: URL.createObjectURL(file),
        };
      })
    );
  };

  const handleImageDrop = (event: DragEvent<HTMLDivElement>, featureIndex: number) => {
    event.preventDefault();
    setFeatureImage(featureIndex, event.dataTransfer.files[0]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = isEditing
      ? productAdUpdateSchema.safeParse({ title, description, features })
      : productAdSchema.safeParse({ title, description, features });

    if (!validation.success) {
      setValidationMessage(validation.error.issues[0]?.message || "اطلاعات واردشده معتبر نیست");
      return;
    }

    setValidationMessage("");
    mutate(validation.data);
  };

  return (
    <div dir="rtl" className="bg-gray-100 p-6 text-right">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">محصول تبلیغاتی</h1>
        <p className="mt-2 text-sm text-gray-500">برای هر محصول، ویژگی‌ها و مقادیر آن را در قالب تبلیغ ثبت کنید.</p>
      </div>

      {isAdvertisementLoading ? (
        <div className="rounded-2xl bg-white p-6 text-sm text-gray-500">در حال دریافت محصول تبلیغاتی...</div>
      ) : advertisementData && !isEditing ? (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">{advertisementData.title || "محصول تبلیغاتی"}</h2>
          <p className="mt-2 text-sm text-gray-600">{advertisementData.description || "توضیحی ثبت نشده است."}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {advertisementData.features.map((feature) => (
              <div key={feature.id} className="rounded-xl border border-gray-200 p-4">
                <Image src={feature.imageUrl} alt={feature.label} width={96} height={96} className="h-24 w-24 rounded-lg object-cover" />
                <h3 className="mt-3 font-medium text-gray-800">{feature.label}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {feature.values.map((value) => (
                    <span key={value.value} className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">{value.value}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={() => setIsEditing(true)} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500">ویرایش</button>
            <button type="button" onClick={() => deleteMutation.mutate()} disabled={deleteMutation.isPending} className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50">
              {deleteMutation.isPending ? "در حال حذف..." : "حذف"}
            </button>
          </div>
        </div>
      ) : (
      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">عنوان تبلیغ</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none transition focus:border-blue-400 focus:bg-white"
              placeholder="مثلاً پیشنهاد ویژه"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">توضیح تبلیغ</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 outline-none transition focus:border-blue-400 focus:bg-white"
            placeholder="توضیح کوتاه درباره این تبلیغ"
          />
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">ویژگی‌ها</h2>
            <button
              type="button"
              onClick={addFeature}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              افزودن ویژگی
            </button>
          </div>
          <p className="mb-4 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-500">
            برای ثبت محصول تبلیغاتی باید دقیقاً ۵ ویژگی اضافه کنید.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">ویژگی {index + 1}</span>
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      حذف
                    </button>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">نام ویژگی</label>
                    <input
                      value={feature.label}
                      onChange={(e) => updateFeatureLabel(index, e.target.value)}
                      className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 outline-none transition focus:border-blue-400"
                      placeholder="مثلاً رنگ"
                    />
                  </div>

                  <div
                    className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white p-4 text-center transition hover:border-blue-400"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => handleImageDrop(event, index)}
                    onClick={() => document.getElementById(`feature-image-${index}`)?.click()}
                  >
                    <input
                      id={`feature-image-${index}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => setFeatureImage(index, event.target.files?.[0])}
                    />
                    {feature.imagePreview ? (
                      <Image
                        src={feature.imagePreview}
                        alt={`پیش‌نمایش عکس ویژگی ${index + 1}`}
                        width={96}
                        height={96}
                        unoptimized
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                    ) : (
                      <>
                        <span className="text-sm font-medium text-gray-700">عکس ویژگی</span>
                        <span className="text-xs text-gray-500">فایل را اینجا رها کنید یا کلیک کنید</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">مقادیر ویژگی</label>
                    <button
                      type="button"
                      onClick={() => addFeatureValue(index)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      افزودن مقدار
                    </button>
                  </div>
                  <div className="space-y-2">
                    {feature.values.map((value, valueIndex) => (
                      <div key={valueIndex} className="flex gap-2">
                        <input
                          value={value}
                          onChange={(event) => updateFeatureValue(index, valueIndex, event.target.value)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 outline-none transition focus:border-blue-400"
                          placeholder={`مقدار ${valueIndex + 1}`}
                        />
                        {feature.values.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeatureValue(index, valueIndex)}
                            className="rounded-xl px-3 text-sm text-red-500 hover:bg-red-50"
                          >
                            حذف
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {validationMessage && (
          <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">{validationMessage}</p>
        )}

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-500"
          >
            {isPending ? "در حال ذخیره..." : isEditing ? "ذخیره ویرایش" : "ذخیره تبلیغ"}
          </button>
        </div>
      </form>
      )}
    </div>
  );
}
