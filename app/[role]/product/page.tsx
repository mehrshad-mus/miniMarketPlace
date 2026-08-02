"use client"
import { offer, product, userProfileData } from "@/lib/queries"
import { useQuery } from "@tanstack/react-query"
import { createContext, useState } from "react"
import ProductSection from "@/components/myComponent/productPage/ProductSection"
import { User } from "@/app/generated/prisma/client"



export const Product = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [searchTitle, setSearchTitle] = useState('')

    const { data, isLoading, error } = useQuery({
        queryKey: ["product", currentPage],
        queryFn: () => product.getAllProduct({ currentPage }),
    })

    return (
        <ProductSection title="محصولات" data={data} isLoading={isLoading} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    )
}
export default Product