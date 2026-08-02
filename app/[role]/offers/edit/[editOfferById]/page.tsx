import OfferSection from "@/components/myComponent/OfferSection"

const EditOffer = async ({
    params,
}: {
    params: Promise<{ editOfferById: string }>
}) => {

    const { editOfferById: productId } = await params


    return <OfferSection
        mode="update"
        mutaionKey={["updateOffer"]}
        invalidations={["productOffer"]}
        title="تغییر پیشنهاد"
        editOffer={true}
        productId={productId}
        buttonTitle="تغییر پیشنهاد" />

}

export default EditOffer