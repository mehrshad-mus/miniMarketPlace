import Section2 from "@/components/myComponent/mainPage/header/section2";
import Nav from "@/components/myComponent/mainPage/header/Nav";
import HeaderAdvertisement from "@/components/myComponent/mainPage/header/HeaderAdvertisement";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Toaster } from "sonner";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser()
    
    let user;
    let cartItemCount;
    if (currentUser) {
        
        user = await prisma.user.findUnique({ where: { id: currentUser.userId } })
        cartItemCount = await prisma.cart.findUnique({
            where: {
                userId: user?.id
            },
            include: {
                cartItem: {
                    omit: {
                        cartId: true,
                        createdAt: true,
                        offerId: true,
                        price: true,
                        quantity: true,
                        updatedAt: true
                    }
                }
            }
        })    
    }

    return (
        <>

            <header className="fixed w-full z-20">
                <HeaderAdvertisement />

                <Section2 user={user} cartItemCount={cartItemCount} />

                <Nav />
            </header>
            {children}
            <Toaster />
        </>
    )
}