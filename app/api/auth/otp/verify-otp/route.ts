import { generateToken, verifyPassword } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { otpFormSchema, TOtpFormData } from "@/lib/zodSchema/schema"
import { verifyOtp } from "@/services/auth/otp.service"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json() as TOtpFormData
        
        const dataValidation = otpFormSchema.safeParse(body)
        
        if (!dataValidation.success) {
            return NextResponse.json(
                {
                    message: "Phone and otp is requer!!",
                    error: dataValidation.error.issues[0].message
                },
                { status: 422 })
        }

        const { phone, otp } = body
        
        const result = await verifyOtp(phone, otp)

        const response = NextResponse.json({
            id : result.id,
            role :result.role,
            name : result.name,
            phone : result.phone
        })

        const token = await generateToken(result.id , result.role)

        response.cookies.set("token" , token ,{
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            sameSite : "lax",
            maxAge: 7 * 24 * 60 * 60
        })

        return response
    }

    catch (error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}