"use client"
import { User } from '@/app/generated/prisma/client'
import ProductSection from '@/components/myComponent/productPage/ProductSection'
import { offer, product, userProfileData } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import { createContext, useState } from 'react'

export const UserProduct = createContext<User | null>(null);

const Offers = () => {

    const [currentPage, setCurrentPage] = useState(1)

    const offers = true

    const { data: currentUser, isLoading: currentUserLoading, error: currentUserError } = useQuery({
        queryKey: ["currentUser"],
        queryFn: userProfileData
    })

    const isAdmin = currentUser?.role === "ADMIN"
    const { data, isLoading, error } = useQuery({
        queryKey: ["productt", currentPage, offers],
        queryFn: () => product.getAllProduct({ currentPage, offers }),
        enabled: isAdmin
    })

    const { data: sellerOfferData, isLoading: sellerOfferLoading } = useQuery({
        queryKey: ["offers", currentUser?.id],
        queryFn: () => offer.getAllOffer({sellerId: currentUser?.id, currentPage}),
        enabled:  !!currentUser?.id && !isAdmin,
    })

    // console.log(sellerOfferData)

    if (currentUser?.role === "SELLER") {
        return (
            <UserProduct value={currentUser}>
                <ProductSection title="پیشنهادها" data={sellerOfferData} withOffer isLoading={isLoading} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </UserProduct>
        )
    }

    return (
        <ProductSection data={data} isLoading={isLoading} title='محصولات به همراه پیشنهاد ها' withOffer={true} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    )
}

export default Offers