import { SellerRequest, User } from "@/app/generated/prisma/client";
import { errorHandler } from "./utils";
import { dialogProps, categoryType, FormFields, OfferField, ProfileFields, StoreRequestFields } from "./zodSchema/schema";
import { cartType, offerType, productRequestType, productWithBrandAndCategory } from "./types/types";
import { getSellerProductRequestCount, getSellerRequestCount } from "@/lib/actions/getCounts";
import { changeAdminStatuSellerRequest } from "./actions/AdminStatusSellerRequest";
import { rejectSellerRequestFn } from "./actions/rejectSellerRequest";
import { autoSliderProduct } from "./actions/productForAutoSlider";

export const registration = {
    sendPhoneNumber: async (phone: string) => {

        const res = await fetch("/api/auth/otp/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone })
        })

        await errorHandler(res)

        const { message } = await res.json()

        return message
    },

    verifyPhoneNumber: async ({ phone, otp }: { phone: string | null, otp: string }) => {

        const res = await fetch("/api/auth/otp/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phone,
                otp
            })
        })

        await errorHandler(res)

        const { id, role } = await res.json() as { id: string, role: string, phone: string }

        return { id, role }
    }
}

export const users = {

    getAllUsers: async (currentPage: number, filter: string, searchPhone: string) => {

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const params = new URLSearchParams()

        if (currentPage) {
            params.set("page", String(currentPage))
        }
        if (filter) {
            params.set("filter", filter)
        }
        if (searchPhone) {
            params.set("search", searchPhone)
        }

        const res = await fetch(`http://localhost:3000/api/user?${params}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });


        await errorHandler(res)

        const { users, totalCount }: { users: User[], totalCount: number } = await res.json();

        return { users, totalCount }
    },

    changeUserRole: async (id: string) => {

        const res = await fetch("/api/user/role", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        await errorHandler(res)

        const { message } = await res.json()

        await new Promise((resolve) => setTimeout(resolve, 1000))
        return message
    },

    changeUserStatus: async ({ id }: { id?: string }) => {

        const res = await fetch("/api/user/status", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        await errorHandler(res)

        const { message } = await res.json()

        await new Promise((resolve) => setTimeout(resolve, 1000))
        // console.log(id)
        return { message: "message" }
    },
}

export const seller = {
    createSeller: async (id: string) => {
        const res = await fetch("/api/seller", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        await errorHandler(res)

        const { message } = await res.json()
        return message
    }
}

export const userProfileData = async () => {
    const res = await fetch(`http://localhost:3000/api/user?userId=${"currentUser"}`)

    const { currentUser, message }: { currentUser: User, message: string } = await res.json()

    if (!res.ok) {
        throw new Error(message)
    }

    return currentUser
}

export const editProfile = async (data: ProfileFields) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    const { message } = await res.json()

    if (!res.ok) {
        throw new Error(message)
    }
    console.log(message)

    return message
}

export const options = {

    getAllOptions: async () => {
        const res = await fetch("/api/product/option")

        await errorHandler(res)

        const options = await res.json()

        return options as { id: string, name: string, createdOptionValue: { id: string, value: string }[] }[]
    },

    createOptionName: async ({ value }: dialogProps) => {

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const res = await fetch("/api/product/option", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value })
        })

        await errorHandler(res)

        const { message } = await res.json()

        return message
    },

    changeOptionName: async ({ id, value }: dialogProps) => {

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const res = await fetch("/api/product/option", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, value })
        })

        await errorHandler(res)

        const { message } = await res.json()
        return message

    },

    deleteOption: async ({ id }: { id?: string }) => {

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const res = await fetch("/api/product/option", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        await errorHandler(res)

        const { message } = await res.json()
        return message
    },

    createOptionValue: async ({ id, value }: dialogProps) => {

        await new Promise((resolve) => setTimeout(resolve, 1000))

        const res = await fetch("/api/product/optionValue", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, value })
        })

        await errorHandler(res)

        const { message } = await res.json()

        return message

    },

    changeOptionValueName: async ({ id, value }: dialogProps) => {

        // await new Promise((resolve) => setTimeout(resolve, 1000))

        const res = await fetch("/api/product/optionValue", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, value })
        })

        await errorHandler(res)

        const { message } = await res.json()

        return message
    },

    deleteOptionValue: async ({ id }: { id?: string }) => {

        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await fetch("/api/product/optionValue", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        await errorHandler(res)

        const { message } = await res.json()

        return message
    },
}

export const category = {

    getAllCategory: async () => {
        const res = await fetch("/api/product/category")

        const data = await res.json() as { message: string, category: categoryType[] }

        if (!res.ok) {
            throw new Error(data.message)
        }

        const { category } = data
        return category
    },

    createCategory: async ({ value , file }: dialogProps) => {
        
        const formData = new FormData()
        formData.append("payload" , JSON.stringify({value}))
        file?.map((fi) => {
            formData.append("icon" , fi)    
        })

        const res = await fetch("/api/product/category", {
            method: "POST",
            body: formData
        })

        const data = await res.json() as { message: string }

        if (!res.ok) {
            throw new Error(data.message)
        }

        const { message } = data
        console.log(message)
        return { message }

    },
    editCategoryName: async ({ value, id ,file}: dialogProps) => {

        const formData = new FormData()
        formData.append("payload" , JSON.stringify({value , id}))
        file?.map((fi) => {
            formData.append("icon" , fi)    
        })

        const res = await fetch("/api/product/category", {
            method: "PATCH",
            body: formData
        })

        const data = await res.json() as { message: string }

        if (!res.ok) {
            throw new Error(data.message)
        }

        const { message } = data
        console.log(message)
        return { message }
    },

    deleteCategory: async ({ id }: dialogProps) => {
        const res = await fetch("/api/product/category", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        const data = await res.json() as { message: string }

        const { message } = data
        console.log(message)
        return { message }
    }
}

export const brand = {
    getAllBrand: async () => {
        const res = await fetch("/api/product/brand")

        const data = await res.json() as { message: string, brand: { id: string, name: string, url: string }[] }

        if (!res.ok) {
            throw new Error(data.message)
        }

        const { brand } = data
        return brand
    },

    createBrand: async ({ value, secoundValue }: dialogProps) => {

        const res = await fetch("/api/product/brand", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value, secoundValue })
        })

        const data = await res.json() as { message: string }

        if (!res.ok) {
            throw new Error(data.message)
        }

        const { message } = data
        console.log(message)
        return { message }

    },

    editBrand: async ({ value, secoundValue, id }: dialogProps) => {

        const res = await fetch("/api/product/brand", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value, secoundValue, id })
        })

        const data = await res.json() as { message: string }

        if (!res.ok) {
            throw new Error(data.message)
        }

        const { message } = data
        console.log(message)
        return { message }
    },

    deleteBrand: async ({ id }: dialogProps) => {
        const res = await fetch("/api/product/brand", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        const data = await res.json() as { message: string }

        if (!res.ok) {
            throw new Error(data.message)
        }


        const { message } = data
        console.log(message)
        return { message }

    }

}

export const product = {

    getAllProduct: async ({ currentPage, productId, name, offers }: { currentPage?: number, name?: string, productId?: string, offers?: boolean }) => {

        const params = new URLSearchParams();

        if (currentPage !== undefined) {
            params.set("page", currentPage.toString());
        }
        if (productId !== undefined) {
            params.set("id", productId.toString());
        }
        if (name) {
            params.set("name", name);
        }
        if (offers) {
            params.set("offers", offers.toString())
        }

        const res = await fetch(`/api/product?${params}`)

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { products, totalCount }: { products: productWithBrandAndCategory[], totalCount: number } = await res.json()

        return { products, totalCount }
    },

    getProductForUser: async ({ productId }: { productId: string }) => {

        const params = new URLSearchParams();
        params.set("productForUser", productId);

        const res = await fetch(`/api/product?${params}`)

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { product } = await res.json()

        return { product } as { product: productWithBrandAndCategory }
    },

    createProduct: async (data: FormFields) => {

        const formData = new FormData();

        formData.append(
            "payload",
            JSON.stringify({
                title: data.title,
                englishTitle: data.englishTitle,
                category: data.category,
                tag: data.tag,
                brand: data.brand,
                id: data.id,
                warningAndDetail: data.warningAndDetail,
                seoTitle: data.seoTitle,
                seoWord: data.seoWord,
                seoExplanation: data.seoExplanation,
                option: data.option,
                variants: data.variants,
                specialProduct: data.specialProduct,
                showComment: data.showComment,
                showView: data.showView,
            })
        );

        data.images.forEach(file => {
            formData.append("images", file);
        });

        if (data.video) {
            formData.append("video", data.video);
        }

        const res = await fetch("/api/product", {
            method: "POST",
            body: formData
        })

        if (!res.ok) {
            const data = await res.json() as { message: string }
            throw new Error(data.message)
        }

        const { message } = await res.json() as { message: string }

        return { message }
    },

    updateProduct: async (data: FormFields) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const formData = new FormData();
        // console.log(data)

        formData.append(
            "payload",
            JSON.stringify({
                title: data.title,
                englishTitle: data.englishTitle,
                category: data.category,
                tag: data.tag,
                brand: data.brand,
                id: data.id,
                warningAndDetail: data.warningAndDetail,
                seoTitle: data.seoTitle,
                seoWord: data.seoWord,
                seoExplanation: data.seoExplanation,
                option: data.option,
                variants: data.variants,
                specialProduct: data.specialProduct,
                showComment: data.showComment,
                showView: data.showView,
            })
        );

        data.images.forEach(file => {
            formData.append("images", file);
        });

        if (data.video) {
            formData.append("video", data.video);
        }

        const res = await fetch("/api/product", {
            method: "PATCH",
            body: formData
        })

        if (!res.ok) {
            const data = await res.json() as { message: string }
            throw new Error(data.message)
        }

        const { message } = await res.json() as { message: string }
        console.log(message)

        return message

    },

    deleteProduct: async ({ id }: dialogProps) => {

        const res = await fetch("/api/product", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        if (!res.ok) {
            const data = await res.json() as { message: string }
            throw new Error(data.message)
        }

        const { message } = await res.json() as { message: string }

        return { message }
    }
}

export const productRequest = {

    getAllProductRequest: async ({ productRequestId }: { productRequestId?: string }) => {

        const params = new URLSearchParams()

        if (productRequestId !== undefined) {
            params.set("productRequestId", productRequestId)
        }
        const res = await fetch(`/api/productRequest?${params}`)


        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { productRequests, totalCount } = await res.json() as { productRequests: productRequestType[], totalCount: number }

        return { productRequests, totalCount }
    },

    createProductRequest: async (data: FormFields) => {

        const formData = new FormData();

        formData.append(
            "payload",
            JSON.stringify({
                title: data.title,
                englishTitle: data.englishTitle,
                category: data.category,
                tag: data.tag,
                brand: data.brand,
                id: data.id,
                warningAndDetail: data.warningAndDetail,
                seoTitle: data.seoTitle,
                seoWord: data.seoWord,
                seoExplanation: data.seoExplanation,
                option: data.option,
                variants: data.variants,
                specialProduct: data.specialProduct,
                showComment: data.showComment,
                showView: data.showView,
            })
        );

        data.images.forEach(file => {
            formData.append("images", file);
        });

        if (data.video) {
            formData.append("video", data.video);
        }

        const res = await fetch("/api/productRequest", {
            method: "POST",
            body: formData
        })

        if (!res.ok) {
            const data = await res.json() as { message: string }
            throw new Error(data.message)
        }

        const { message } = await res.json() as { message: string }

        return message
    },

    updateProductRequest: async () => {

    },

    deleteProductRequest: async ({ id }: dialogProps) => {

        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await fetch("/api/productRequest", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        const { message } = await res.json()
        if (!res) {
            throw new Error(message)
        }


        return message
    },



}

export const offer = {
    getAllOffer: async ({ sellerId, currentPage, productId }:
        {
            sellerId?: string,
            currentPage?: number,
            productId?: string
        }) => {

        console.log(productId)

        const params = new URLSearchParams()
        if (sellerId) {
            params.set("sellerId", sellerId)
        }
        if (currentPage) {
            params.set("currentPage", currentPage.toString())
        }
        if (productId) {
            params.set("productId", productId)
        }

        const res = await fetch(`/api/product/offer?${params}`)

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { products, totalCount } = await res.json() as { products: productWithBrandAndCategory[], totalCount: number }

        return { products, totalCount }
    },

    createOffer: async (data: OfferField) => {
        await new Promise((resolve) => setTimeout(resolve, 500))

        const res = await fetch("/api/product/offer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ variants: data.variants })
        })

        if (!res.ok) {
            const data = await res.json() as { message: string }
            throw new Error(data.message)
        }

        const { message } = await res.json() as { message: string }

        return message
    },

    updateOffer: async (data: OfferField) => {

        // console.log(data)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await fetch("/api/product/offer", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ variants: data.variants })
        })

        if (!res.ok) {
            const data = await res.json() as { message: string }
            throw new Error(data.message)
        }

        const { message } = await res.json() as { message: string }

        return message
    },

    deleteOffer: async (id: string) => {
        // console.log(id)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await fetch("/api/product/offer", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        if (!res.ok) {
            const data = await res.json() as { message: string }
            throw new Error(data.message)
        }

        const { message } = await res.json() as { message: string }

        return message
    }
}

export const storeRequest = {

    getAllStoreRequest: async () => {
        const res = await fetch("/api/storeRequest")

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { storeRequests, totalCount } = await res.json() as { storeRequests: SellerRequest[], totalCount: number }
        return { storeRequests, totalCount }
    },

    createStoreRequest: async (data: StoreRequestFields) => {
        const res = await fetch("/api/storeRequest", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }
    },

    editStoreRequest: async (data: StoreRequestFields) => {
        const res = await fetch("/api/storeRequest", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }
    },

    deleteStoreRequest: async ({ id }: { id?: string }) => {
        console.log(id)
        const res = await fetch("/api/storeRequest", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { message } = await res.json()
        return message
    }
}

export const cart = {
    getCart: async () => {
        const res = await fetch("/api/cart")

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { cart } = await res.json() as { cart: cartType | null }

        return cart

    },

    createCart: async ({ offer, quantity }: { offer: offerType | undefined, quantity: number, }) => {
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ offer, quantity })
        })

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { message, cart } = await res.json()

        console.log(cart)
        return message
    },

    updateCart: async ({ offerId, quantity, cartItemId, location }:
        {
            offerId?: string,
            quantity?: number,
            cartItemId?: string,
            location?: { latitude: number | null, longitude: number | null , formatted_address: string | null }
        }) => {

        const res = await fetch("/api/cart", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ offerId, quantity, cartItemId, location})
        })

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { message, cart } = await res.json()

        console.log(cart)
        return message
    },

    deleteCart: async ({ cartItemId }: { cartItemId: string }) => {
        const res = await fetch("/api/cart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cartItemId })
        })

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { message } = await res.json()

        return message
    }
}

export const address = {
    createAddress: async ({ latitude, longitude }: { latitude: number, longitude: number }) => {

        const res = await fetch("/api/address", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude })
        })

        if (!res.ok) {
            const { message } = await res.json()
            throw new Error(message)
        }

        const { address } = await res.json()
        console.log(address)
    }
}

export const payment = {
    createPayment : async() => {
        const res = await fetch("/api/payment/create" , {
            method: "PUT",
            headers : {"Content-Type" : "application/json"},
        })
    }
}

export const extraQueryis = {

    getRequestCountForStore: async () => {

        const { count: sellerRequest } = await getSellerRequestCount()
        const { count: productRequest } = await getSellerProductRequestCount()

        return { sellerRequest, productRequest }
    },
    changeAdminStatusForSellerRequest: async (id: string) => {
        const changeAdminStatus = await changeAdminStatuSellerRequest(id)
    },
    rejectSellerRequest: async (id: string) => {
        const rejectSellerRequest = await rejectSellerRequestFn(id)
    },

    getTenProductForAutoSlider: async () => {
        const products = await autoSliderProduct()
        return products
    },
}

