import { Button } from '@/components/ui/button'
import { extraQueryis, seller } from '@/lib/queries'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'
import Spinner from '../Spinner '



const RequestStatus = ({id} : {id: string}) => {

    const queryClient = useQueryClient()


    const {mutate : createSeller , isPending : createSellerPending , error : createSellerError} = useMutation({
        mutationKey : ["createSeller"],
        mutationFn : seller.createSeller,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["storeRequest"]})
            queryClient.invalidateQueries({queryKey : ["seller"]})
            queryClient.invalidateQueries({queryKey : ["users"]})
            toast.success(" درخواست با موفقیت تایید شد", {
                position: "bottom-left", style: {
                    background: "#98e897",
                    color: "#ffffff",
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px"
                },
            })
        }
    })

    const { mutate: rejectSellerRequestMutate, isPending: rejectSellerRequestPending, error: rejectSellerRequestError } = useMutation({
        mutationKey: ["rejectSellerRequest"],
        mutationFn: extraQueryis.rejectSellerRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["storeRequest"] })
            toast.success(" درخواست با موفقیت رد شد", {
                position: "bottom-left", style: {
                    background: "#98e897",
                    color: "#ffffff",
                    direction: "rtl",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "12px"
                },
            })
        }
    })

    return (
        <div className='flex justify-end items-center gap-3 mb-10'>
            <Button className="bg-emerald-600 text-white hover:bg-emerald-500" onClick={() => createSeller(id)}>
                {createSellerPending ? <Spinner className="text-white" /> : "تایید درخواست"}
            </Button>
            <Button className="bg-red-500 text-white hover:bg-red-400" onClick={() => rejectSellerRequestMutate(id)}>
                {rejectSellerRequestPending ? <Spinner className="text-white" /> : "رد کردن درخواست"}
            </Button>
        </div>
    )
}

export default RequestStatus