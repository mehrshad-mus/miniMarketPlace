import bcrypt from "bcrypt"

import { jwtVerify , SignJWT } from "jose";
import { cookies } from "next/headers";

export const hashPassword = async (password: string) : Promise<string> => {
    return await bcrypt.hash(password, 12);
}

export const verifyPassword = async (password: string, hashedPassword: string) : Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = async (userId : string , userRole : string) => {
    return await new SignJWT({userId, userRole})
    .setProtectedHeader({alg: "HS256"})
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}

export const verifyToken = async (token : string) => {
    const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return payload as {userId : string, userRole : string, exp : number}
}

export async function generateOtp(length = 6) {
    const otp = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString()
    console.log(otp)
    const hashedOtp = await hashPassword(otp)
    return {hashedOtp}
}

export async function getCurrentUser() {
    const cookieStroe = await cookies()
    const token = cookieStroe.get("token")?.value

    if(!token){
        // const error = new Error()
        // error.message ="you must logIn first"
        // return error
        return null
    }
    const user = await verifyToken(token)

    return user
}