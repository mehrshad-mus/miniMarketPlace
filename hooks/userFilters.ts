import { SetStateAction } from "react"

export const useUserFilters = (
    setPageFilter: React.Dispatch<SetStateAction<{ status: undefined | string, role: undefined | string }>>,
    setCurrentPage: React.Dispatch<SetStateAction<number>>) => {

    const NavButtonOptions = [
        {
            title: "همه",
            fn: () => {
                setPageFilter({ status: undefined, role: undefined })
                setCurrentPage(1)
            }
        },
        {
            title: "فعال",
            fn: () => {
                setPageFilter({ status: "ACTIVE", role: undefined })
                setCurrentPage(1)
            }
        },
        {
            title: "مسدود",
            fn: () => {
                setPageFilter({ status: "INACTIVE", role: undefined })
                setCurrentPage(1)
            }
        },
        {
            title: "مدیر",
            fn: () => {
                setPageFilter({ status: undefined, role: "ADMIN" })
                setCurrentPage(1)
            }
        }
        ,
        {
            title: "فروشنده",
            fn: () => {
                setPageFilter({ status: undefined, role: "SELLER" })
                setCurrentPage(1)
            }
        },
        {
            title: "کاربر",
            fn: () => {
                setPageFilter({ status: undefined, role: "USER" })
                setCurrentPage(1)
            }
        },
    ]

    return {
        NavButtonOptions
    }
}