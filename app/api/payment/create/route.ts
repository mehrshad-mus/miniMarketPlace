import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {

        const currentUser = await getCurrentUser()
        if(!currentUser){
            return NextResponse.json({message : "you dont authorized"} , {status : 401})
        }

        const existCart = await prisma.cart.findUnique({where : {userId : currentUser.userId} , include: {cartItem : true}})
        if(!existCart){
            return NextResponse.json({message : "cart dosent exist!"}, { status : 400})
        }

        let totalPrice = 0;

        for(const item of existCart.cartItem){

            const offer = await prisma.offer.findUnique({where : {id : item.offerId}})
            if(!offer){
                return NextResponse.json({message : "offer dosent exist anymore"}, {status : 400})
            }

            if(offer.stock < item.quantity){
                return NextResponse.json({message : "there is no more of this product"}, {status : 400})
            }


            totalPrice += ((offer.price - (offer.price * offer.discount / 100)) * item.quantity) 
        }

        const newPayment = await prisma.payment.create({data : {
            userId : currentUser.userId,
            amount : totalPrice,
            status : "PENDING",
        }})
        console.log(totalPrice)
    
        return NextResponse.json({message : "hiii"} , {status: 200})

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                message:
                    error instanceof Error ?
                        error.message : "An unknown error occurred"
            }, { status: 500 })
    }


}