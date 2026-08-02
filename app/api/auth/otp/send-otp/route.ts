import { generateOtp } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { phoneFormSchema, TPhoneFormData } from "@/lib/zodSchema/schema";
import { sendOtp } from "@/services/auth/otp.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as TPhoneFormData;

        //validation the input in api /backend 
        const dataValidation = phoneFormSchema.safeParse(data)
        if (!dataValidation.success) {
            return NextResponse.json(
                {
                    message: "Phone number is required or enter a real Phone number",
                    error: dataValidation.error.issues[0].message
                },
                { status: 422 }
            );
        }
        const { phone } = data
        
        const result = await sendOtp(phone)
        
        return NextResponse.json({ message: result }, { status: 200 })

    } catch (error) {
        console.log("Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}



