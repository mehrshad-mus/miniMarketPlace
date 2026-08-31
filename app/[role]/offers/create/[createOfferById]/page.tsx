import OfferSection from "@/components/myComponent/OfferSection"
import { Button } from "@/components/ui/button"
import { offer } from "@/lib/queries"
import Link from "next/link"

const CreateOffer = async({
    params,
}: {
    params: Promise<{ createOfferById: string }>
}) => {

    const { createOfferById: productId } =  await params
    
    if (productId === "offer") {
        return (
            <div className="bg-gray-100 p-6">

                <div className="font-bold text-2xl mb-10">ایجاد پیشنهاد</div>
                <Link href="/admin/product" className='text-white bg-blue-600 hover:bg-blue-500 rounded-xl px-3 py-1'>انتخاب محصول</Link>
            </div>
        )
    }


    return <OfferSection mode="create" mutaionKey={["createOffer"]} invalidations={["offer"]} title="ایجاد پیشنهاد" productId={productId} buttonTitle="ایجاد پیشنهاد"/>
   
    
}

export default CreateOffer