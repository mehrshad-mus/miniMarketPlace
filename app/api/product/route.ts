import { FormFields, schema } from "@/lib/zodSchema/schema";
import { NextRequest, NextResponse } from "next/server";
import { createProduct, deleteProduct, getAllProduct, getProductByIdForUser, searchProductsForUser, updateProduct } from "@/services/product/product.service";


export async function GET(request: NextRequest) {
    try {

        const { searchParams } = new URL(request.url);

        const currentPage = searchParams.get("page");
        const productId = searchParams.get("id");
        const offers = searchParams.get("offers");
        const search = searchParams.get("search");

        if (search !== null) {
            if (search.trim().length > 80) {
                return NextResponse.json({ message: "عبارت جست‌وجو بیش از حد طولانی است" }, { status: 400 })
            }

            const products = await searchProductsForUser(search)
            return NextResponse.json({ products }, { status: 200 })
        }

        const productForUser = searchParams.get("productForUser");
        if(productForUser){
            const {product} = await getProductByIdForUser({productId : productForUser})

            return NextResponse.json({ product}, { status: 200 })
        }

        const {products,totalCount} = await getAllProduct({currentPage , productId , offers})

        return NextResponse.json({ products, totalCount}, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message: "خطای داخلی سرور"
            }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()

        const payload = JSON.parse(
            formData.get("payload") as string
        )

        const images = formData.getAll("images") as File[]
        const video = formData.get("video")

        const data: FormFields = {
            ...payload,
            images,
            video: video instanceof File ? video : undefined,
        }

        const validation = schema.safeParse(data)

        if (!validation.success) {

            console.log("didnt succses")

            return NextResponse.json({ message: "some requires arent filled" }, {status : 400})
        }

        const newProduct = await createProduct(validation.data)       
        console.log(newProduct)

        return NextResponse.json({ message: "true"  , newProduct})
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message: "خطای داخلی سرور"
            }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const formData = await request.formData()

        const payload = JSON.parse(
            formData.get("payload") as string
        )

        const images = formData.getAll("images") as File[]
        const video = formData.get("video")

        const data: FormFields = {
            ...payload,
            images,
            video: video instanceof File ? video : undefined,
        }

        const validation = schema.safeParse(data)

        if (!validation.success) {

            console.log("didnt succses")

            return NextResponse.json({ message: "some requires arent filled" } , {status : 400})
        }

        const updateProductt = await updateProduct(validation.data)
        console.log(updateProductt)
    
        return NextResponse.json({ message: "hey you seccsid...!" ,updateProductt})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "خطای داخلی سرور"
        }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const data = await request.json()

        const { id } = data

        if(!id){
            return NextResponse.json({message : "this product dosent exist"} , {status : 400})
        }

        const deletedProduct = await deleteProduct({id})

        return NextResponse.json({message : "delete succsesfully"} , {status:200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "خطای داخلی سرور"
        }, { status: 500 })
    }

}
