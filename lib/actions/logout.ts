"use server"
import { cookies } from "next/headers"

export async function userLogoutAction() {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const cookieStore = await cookies()

    cookieStore.delete("token")

}