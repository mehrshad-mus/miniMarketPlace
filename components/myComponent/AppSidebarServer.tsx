"use server"

import React from 'react'
import { User } from '@/app/generated/prisma/browser'
import { cookies } from 'next/headers'
import AppSidebar from './AppSidebar'

const AppSidebarServer = async () => {


    const cookieStore = await cookies() 
    const res = await fetch(`http://localhost:3000/api/user?userId=${"currentUser"}` , {
        headers : {
            Cookie: cookieStore.toString(),
        },
        cache : "no-store"
    })
    
    const { currentUser, message }: { currentUser: User, message: string } = await res.json()

    if (!res.ok) {
        throw new Error(message)
    }

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