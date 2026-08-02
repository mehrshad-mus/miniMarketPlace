import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export default async function proxy(request: NextRequest) {
    const user = request.cookies.get("token")?.value
    const url = request.nextUrl.clone()

    if (!user) {
        url.pathname = "/registration"
        return NextResponse.redirect(url)
    }

    try {
        const decode = await verifyToken(user)
        // console.log("hello")
        
        if (decode.userRole === "USER" || decode.userRole === "SELLER") {
            url.pathname = "/registration"
            return NextResponse.redirect(url)
        }

        return NextResponse.next()
    } catch (error) {
        url.pathname = "/registration"
        return NextResponse.redirect(url)
    }
}

export const config = {
    matcher: ['/admin/:path*']
}