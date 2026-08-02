import UserStoreRequest from '@/components/myComponent/sellerSpecifics/SellerRequest'
import StoreRequestTable from '@/components/myComponent/sellerSpecifics/StoreRequestTable'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const ShopRequest = async () => {

    const user = await getCurrentUser()
    if (!user || user.userRole === "SELLER") {
        return <h1>ERROR</h1>
    }

    const userData = await prisma.user.findUnique({ where: { id: user.userId } })

    const existRequestByID = await prisma.sellerRequest.findUnique({ where: { userId: userData?.id } })

    if (existRequestByID) {
        return <StoreRequestTable userData={userData} existRequestByID={existRequestByID} />
    }


    return (
        <UserStoreRequest userData={userData} />
    )
}

export default ShopRequest