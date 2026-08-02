import z, { file } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

export const phoneFormSchema = z.object({
    phone: z.string().length(11, "شماره معتبر نیست")
})

export const otpFormSchema = z.object({
    phone: z
        .string()
        .min(5, "Phone number must be at least 5 characters.")
        .max(11, "Phone number must be at most 11 characters."),
    otp: z
        .string()
        .min(4, "OTP must be at least 4 characters.")
        .max(6, "OTP must be at most 6 characters."),
})


export type TPhoneFormData = z.infer<typeof phoneFormSchema>
export type TOtpFormData = z.infer<typeof otpFormSchema>


export type dialogProps = {
    id?: string,
    value?: string | { r: number, g: number, b: number, a: number },
    secoundValue?: string
}

export type categoryType = {
    id: string,
    name: string
}

//related to product
export type Option = {
    optionId: string
    name: string
    optionValue: {
        optionValueId?: string
        value: string
    }[]
}

const optionValueSchema = z.object({
    optionValueId: z.string().optional(),
    value: z.string(),
});

const optionSchema = z.object({
    name: z.string(),
    optionId: z.string(),
    optionValue: z.array(optionValueSchema),
});

const variantSchema = z.object({
    id: z.string(),
    values: z.array(
        z.object({
            optionId: z.string(),
            optionName: z.string(),
            value: z.string(),
        })
    )
})

export const schema = z.object({
    title: z.string().min(3, "،عنوان باید حداقل 3 کاراکتر باشد"),
    englishTitle: z.string().optional(),

    category: z.object({
        id: z.string(),
        name: z.string()
    }, "لطفا یک دسته بندی انتخاب کنید"),

    tag: z.string().optional(),

    brand: z.object({
        id: z.string(),
        name: z.string(),
    }, "لطفا یک برند انتخاب کنید"),

    id: z.string().optional(),
    warningAndDetail: z.string(),

    seoTitle: z.string().optional(),
    seoWord: z.string().optional(),
    seoExplanation: z.string().optional(),

    option: z
        .array(optionSchema)
        .min(1, " حداقی یک اپشن باید انتخاب شود"),

    variants: z.array(variantSchema),

    specialProduct: z.boolean(),
    showComment: z.boolean(),
    showView: z.boolean(),

    images: z
        .array(z.instanceof(File))
        .refine(files => files.every(file => file.size <= MAX_FILE_SIZE), "حجم هر تصویر نباید بیشتر از 5 مگابایت باشد")
        .min(1, "حداقل یک تصویر وارد کنید")
        .max(6, "حداکثر 6 تصویر مجاز است"),

    video: z
        .instanceof(File)
        .optional()
        .refine(
            file => !file || file?.size <= MAX_VIDEO_SIZE,
            ("حجم ویدیو نباید بیشتر از 50 مگابایت باشد")
        )
})

export type FormFields = z.infer<typeof schema>;

//Offer Schema
const variantSchemaForOffer = z.object({
    id: z.string(),
    sellerName : z.string().optional(),

    offerId: z.string().optional(),

    price: z.number().refine(
        (value) => value === 0 || value > 1000,
        "حداقل قیمت هزار تومان میباشد"
    ).optional(),

    stock: z.number().optional(),

    discount: z.number().optional(),

    values: z.array(
        z.object({
            optionId: z.string(),
            optionName: z.string(),
            value: z.string(),
        })
    )
}).superRefine((data, ctx) => {
    const hasPrice = (data.price !== undefined && data.price > 0);
    const hasDiscount = (data.discount !== undefined && data.discount > 0);
    const hasStock = data.stock !== undefined && data.stock > 0

    if ((hasPrice || hasDiscount) && (data.stock === undefined || data.stock <= 0)) {
        ctx.addIssue({
            code: "custom",
            path: ["stock"],
            message: "برای ثبت قیمت یا تخفیف، موجودی الزامی است.",
        });
    }

    if (hasStock && !hasPrice) {
        ctx.addIssue({
            code: "custom",
            path: ["price"],
            message: "برای موجودی قیمت تعریف کنید",
        });
    }
});

export const offerSchema = z.object({
    variants: z.array(variantSchemaForOffer)
})

export type OfferField = z.infer<typeof offerSchema>;

//User profile change
export const ProfileSchema = z.object({
    id: z.string().optional(),
    avatar: z.string().optional(),
    name: z
        .string()
        .refine(
            (value) => value === "" || value.length >= 3,
            "نام باید حداقل 3 کاراکتر باشد"
        )
        .optional(),
    phone: z.string().length(11, "شماره معتبر نیست"),
    userName: z.string().max(16, "نام کاربری حداکثر ۱۶ کاراکتر مجاز است"),
    nationalCode: z
        .string()
        .refine(
            (value) => value === "" || value.length !== 11,
            "کد ملی باید حداقل 11 رقم باشد"
        )
        .optional(),
    birthday: z.string().optional(),
    gender: z.object({
        name: z.string(),
        id: z.string()
    }),
    biography: z.string().optional(),
    telegram: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    facebook: z.string().optional(),
    role: z.object({
        name: z.string(),
        id: z.string()
    }),

})

export type ProfileFields = z.infer<typeof ProfileSchema>;

//Store Request 
export const StoreRequrstSchema = z.object({
    phone: z.string().length(11, "شماره معتبر نیست"),
    name : z.string().min(3,"حداقل 3 کاراکتر باید داشته باشد"),
    storeName : z.string().min(3,"حداقل 3 کاراکتر باید داشته باشد"),
    location : z.string().min(3,"حداقل 3 کاراکتر باید داشته باشد"),
    nationalCode : z.string().length(11 , "کد ملی باید 11 عدد باشد"),
    id: z.string().optional()
})

export type StoreRequestFields = z.infer<typeof StoreRequrstSchema>