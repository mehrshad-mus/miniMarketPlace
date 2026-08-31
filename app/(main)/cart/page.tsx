import React from 'react'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3 } from '@/lib/s3Client'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import CartItem from '@/components/myComponent/orderSpecificComponent/CartItem'
import CartCheckList from '@/components/myComponent/orderSpecificComponent/CartCheckList'
import MyMap from '@/components/myComponent/MyMap'

import ChoseLocation from '@/components/myComponent/orderSpecificComponent/ChoseLocation'

const Page = async () => {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        throw new Error("you must authenticate first")
    }

    const addresses = await prisma.address.findMany({ where: { userId: currentUser.userId } })

    let defaultLocation;
    if (addresses) {
        defaultLocation = addresses.find((add) => add.showAsDefaul === true)
    }

    const cart = await prisma.cart.findUnique({
        where: { userId: currentUser.userId },
        include: {
            cartItem: {
                include: {
                    offer: {
                        include: {
                            seller: true,
                            productVariant: {
                                include: {
                                    variantValue: {
                                        include: {
                                            productOptionValue: {
                                                include: {
                                                    productOption: true
                                                }
                                            }
                                        }
                                    },
                                    product: {
                                        include: {
                                            productImage: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    })

    let cartWithImage;
    let allPrices;
    let shippingPrice;

    if (cart) {
        cartWithImage = {
            ...cart,
            cartItem: await Promise.all(
                cart.cartItem.map(async (item) => ({
                    ...item,
                    price: Number(item.price),
                    offer: {
                        ...item.offer,
                        productVariant: {
                            ...item.offer.productVariant,
                            product: {
                                ...item.offer.productVariant.product,

                                productImage: await Promise.all(
                                    item.offer.productVariant.product.productImage.map(async (img) => ({
                                        ...img,
                                        url: await getSignedUrl(
                                            s3,
                                            new GetObjectCommand({
                                                Bucket: process.env.S3_BUCKET_NAME!,
                                                Key: img.url,
                                            }),
                                            { expiresIn: 3600 }
                                        ),
                                    }))
                                ),
                            }
                        }
                    }
                })
                )
            )
        }

        const cartt = cartWithImage

        allPrices = () => {
            let beforDiscount = 0;
            let discount = 0;
            let afterDiscount = 0

            for (const item of cart.cartItem) {
                beforDiscount += (item.offer.price * item.quantity)
                discount += (item.offer.price * item.quantity - Number(item.price))
                afterDiscount += Number(item.price)
            }

            return { beforDiscount, discount, afterDiscount }
        }

        if (cart.cartAddress) {
            const myHeaders = new Headers();
            myHeaders.append("Api-Key", "service.e5a972bf64b041eca8ae60c7bab6260b");

            const res = await fetch(`https://api.neshan.org/v1/distance-matrix?type=car&origins=29.61782640294099,52.475420913198896&destinations=${cart.latitude},${cart.longitude}`, {
                method: "GET",
                headers: myHeaders
            })

            const data = await res.json()
            const distance = data.rows[0].elements[0].distance.value

            if (distance < 10000) {
                shippingPrice = 20000
            }
            if (10000 < distance && distance < 100000) {
                shippingPrice = 70000
            }
            if (100000 < distance && distance < 500000) {
                shippingPrice = 120000
            }
            if (500000 < distance && distance < 1300000) {
                shippingPrice = 170000
            }
        }
    }

    // console.log(cartWithImage)

    return (
        <div className='pt-50 bg-gray-100 pb-20' dir='rtl'>
            <div>

                {cartWithImage &&
                    <>
                        <div className='flex justify-center items-start gap-10'>

                            <div className='p-2 flex justify-start items-center flex-col gap-4 bg-white rounded-xl'>
                                {cartWithImage.cartItem.map((item) => {
                                    return (
                                        <CartItem key={item.id} item={item} />
                                    )
                                })}
                            </div>

                            <div className='flex justify-center items-center flex-col w-1/4 bg-white p-4 gap-8 rounded-xl'>
                                <div className='w-full  flex flex-col justify-between items-center '>
                                    {allPrices &&
                                        <CartCheckList
                                            allPrices={allPrices()}
                                            cartLength={cartWithImage.cartItem.length}
                                            address={cartWithImage.cartAddress}
                                            shippingPrice = {shippingPrice}
                                        />}
                                </div>


                                <div className='w-full flex justify-center items-start flex-col gap-4'>
                                    <p className='text-[14px] font-bold'>انتخاب موقعیت مکانی</p>
                                    {defaultLocation && <ChoseLocation defaultLocation={defaultLocation} cartLocation={cartWithImage.cartAddress} />}
                                    <MyMap />
                                </div>

                            </div>
                        </div>
                    </>
                }

                {!cart &&
                    <div className='flex justify-center items-start flex-col gap-4 pr-10 mt-10'>
                        <p className='text-gray-800 bg-gray-200 rounded-xl px-4 py-1 text-lg font-bold'>کارتی ساخته نشده است</p>
                        <p className='text-gray-800 bg-gray-200 rounded-2xl px-4 py-1 text-xs'>برای ساختن کارت ابتدا باید حداقل یک محصول به سبد خرید خود اضاف کنید</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default Page