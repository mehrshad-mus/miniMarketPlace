import { favorite } from '@/lib/queries'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

const Favorite1 = ({ productId }: { productId: string | undefined }) => {

    const queryClient =  useQueryClient();

    const {mutate , isPaused , isError} = useMutation({
            mutationKey : ["createFavorite"],
            mutationFn : favorite.addTofavorite,
            onSuccess : () => {
                queryClient.invalidateQueries({ queryKey: ["favorites"] });
                toast.success("به علاقه مندی ها اضاف شد", {
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
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError : (error : any) => {
                toast.error(error?.message || "خطایی رخ داده است", {
                    position: "bottom-left", style: {
                        background: "#dc2626",
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
        <span className="cursor-pointer px-3 py-2.5 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
            onClick={() => { mutate({ productId }) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
        </span>
    )
}

export default Favorite1