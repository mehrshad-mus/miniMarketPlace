import React from 'react'
import { User } from '@/app/generated/prisma/browser'
import { cookies } from 'next/headers'
import AppSidebar from './AppSidebar'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const AppSidebarServer = async () => {


    // const cookieStore = await cookies()
    // const res = await fetch(`http://localhost:3000/api/user?userId=${"currentUser"}`, {
    //     headers: {
    //         Cookie: cookieStore.toString(),
    //     },
    //     cache: "no-store"
    // })

    // const { currentUser, message }: { currentUser: User, message: string } = await res.json()

    // if (!res.ok) {
    //     throw new Error(message)
    // }

    // if (!currentUser) {
    // return (
    //     <div className='flex justify-center items-center h-screen'>
    //         <p className='text-gray-500 text-lg'>Loading...</p>
    //     </div>
    // )
    // }

    const user = await getCurrentUser()

    if (!user) return (
        <div className='flex justify-center items-center h-screen'>
            <p className='text-gray-500 text-lg'>Loading...</p>
        </div>
    )

    const currentUser = await prisma.user.findUnique({ where: { id: user?.userId } })

    if (!currentUser) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className='text-gray-500 text-lg'>Loading...</p>
            </div>
        )
    }


    console.log("user in AppSidebarServer", currentUser)

    return (
        <AppSidebar data={currentUser} />

    )
}

export default AppSidebarServer