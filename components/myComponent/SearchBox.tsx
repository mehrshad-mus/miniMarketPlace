import { SetStateAction, useContext, useState } from "react"
import { Button } from "../ui/button"
import { useUsers } from "@/hooks/users"
import { UserProduct } from "@/app/[role]/offers/page"

export default function SearchBox({ searchFn, setCurrentPage, currentPage, placeHolder }: {
    searchFn: React.Dispatch<SetStateAction<string>>
    , setCurrentPage: React.Dispatch<SetStateAction<number>>,
    currentPage: number,
    placeHolder?: string
}) {
    const [isSearchActive, setIsSearchActive] = useState(false)

    const userRole = useContext(UserProduct)

    return (
        <div className="flex justify-end items-end flex-col pb-5 border-b mb-7">
            <div className={`${isSearchActive ? userRole? "border border-purple-400" :"border border-blue-400" : ""} [direction:rtl] border w-full p-1 h-12 flex items-center justify-end mt-5
                    text-[#607B8F]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500`}>
                <input type="text" className="w-full h-full outline-none pr-2 cursor-pointer placeholder:text-[15px]"
                    placeholder={placeHolder}
                    onFocus={() => setIsSearchActive(prev => { return !prev })}
                    onBlur={() => setIsSearchActive(prev => { return !prev })}
                    onChange={(e) => {
                        searchFn(e.target.value)
                        if (currentPage !== 1) { setCurrentPage(1) }
                    }} />
                <Button className={`${userRole ? "bg-purple-500 hover:bg-purple-400": "bg-blue-500 hover:bg-blue-400"} h-10 w-10 rounded-xl cursor-pointer`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </Button>
            </div>
        </div>
    )
}