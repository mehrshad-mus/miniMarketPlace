import MyTable from "@/components/myComponent/MyTable"
import { productWithBrandAndCategory } from "@/lib/types/types"
import { useContext, useState } from "react"
import ChangeResultButtons from "@/components/myComponent/Change-Results-Button"
import Spinner from "@/components/myComponent/Spinner "
import SearchBox from "@/components/myComponent/SearchBox"

import SellerProductSection from "./SellerProductSection"
import { UserProduct } from "@/app/[role]/offers/page"
import { ProductColumn } from "../columns/ProductColumn"


export default function ProductSection(
    { data, isLoading, title, withOffer, currentPage, setCurrentPage }:

        {
            data: { products: productWithBrandAndCategory[], totalCount: number } | undefined,
            isLoading: boolean,
            setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
            currentPage: number,
            title: string,
            withOffer?: boolean

        }) {

    const [searchTitle, setSearchTitle] = useState('')
    const userRole = useContext(UserProduct)

    const dataForTable = data?.products?.map((item) => {
        return {
            productImage: item.productImage[0].url,
            title: item.title,
            englishTitle: item.englishTitle,
            brand: item.brand.name,
            category: item.category.name,
            id: item.id,
            specialProduct: item.specialProduct,
            offer: item.productVariant.map((off) => {
                return off.offer.length
            })
        }
    })

    const {column} = ProductColumn({ withOffer })

    return (
        <div className="bg-gray-100 p-6">

            <div className="font-bold text-2xl mb-6">{title}</div>


            <div className="bg-white rounded-xl p-4 mb-14">

                <SearchBox searchFn={setSearchTitle} currentPage={currentPage} setCurrentPage={setCurrentPage} placeHolder="جستجو در نام های محصول" />

                {userRole?.role === "SELLER" && <SellerProductSection />}

                <div className="bg-white rounded-xl p-4 mb-20">
                    {dataForTable ? <MyTable columns={column} data={dataForTable} /> : <div className="text-gray-600"> محصولی وجود ندارد</div>}
                </div>

                {isLoading &&
                    <div className="flex justify-center items-center h-72">
                        <Spinner className="text-blue-600" />
                    </div>}

                <ChangeResultButtons
                    pageNumber={data?.totalCount}
                    loading={isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
            </div>

        </div>

    )
}