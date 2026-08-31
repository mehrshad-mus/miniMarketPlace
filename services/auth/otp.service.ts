import { generateOtp, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

//send otp
export async function sendOtp(phone: string) {

    const isOtpexists = await prisma.otp.findFirst({ where: { phone } });

    if (isOtpexists) {
        if (isOtpexists.expiresAt > new Date()) {
            throw new Error(
                "OTP already sent to this phone number, please wait before requesting a new one"
            )
        }

        await prisma.otp.delete({
            where: {
                id: isOtpexists.id,
            },
        })
    }


    const { hashedOtp } = await generateOtp();

    if (!hashedOtp)
        throw new Error("Failed to generate OTP, please try again later")

    const otp = await prisma.otp.create({
        data: {
            phone,
            code: hashedOtp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        }
    })

    return otp.code;
}

//verify otp
export async function verifyOtp(phone: string, otp: string) {

    const otpFromDb = await prisma.otp.findFirst({ where: { phone } })
    if (!otpFromDb) {
        throw new Error("OTP not found for this phone number")
    }

    if (otpFromDb.expiresAt < new Date()) {
        throw new Error("OTP has expired, please request a new one")
    }

    const isOtpValid = await verifyPassword(otp, otpFromDb.code)

    if (!isOtpValid) {
        throw new Error("Invalid OTP")
    }

    const user = await prisma.user.findUnique({
        where: { phone }
    })

    const deletedOtp = await prisma.otp.delete({
        where: { phone }
    })

    if (!user) {
        const userCount = await prisma.user.count()
        const role = userCount > 0 ? "USER" : "ADMIN"

        const newUser = await prisma.user.create({
            data: {
                phone,
                role
            }
        })

        return newUser
    }

    return user

}