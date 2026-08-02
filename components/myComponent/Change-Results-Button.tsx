"use client"

import { useContext } from "react"
import { Button } from "../ui/button"
import Spinner from "./Spinner "
import { UserProduct } from "@/app/[role]/offers/page"

export const ChangeResultButtons = ({ pageNumber, currentPage, setCurrentPage, loading }:
    {
        pageNumber: number | undefined,
        currentPage: number,
        loading?: boolean,
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    }) => {

    const userRole = useContext(UserProduct)
    async function prevButton() {

        if (currentPage === 1) {
            return alert("it is page1")
        }
        setCurrentPage(prev => { return prev - 1 })
    }

    async function nextButton() {

        if (currentPage === pageNumber) {
            return alert("there is no page more")
        }

        setCurrentPage(prev => { return prev + 1 })
    }

    async function functionButton3() {
        if (pageNumber) {
            setCurrentPage(pageNumber)
        }
    }

    async function functionButton2() {
        if (currentPage === 1) {
            setCurrentPage(2)
        }
    }

    function functionButton1() {
        setCurrentPage(1)
    }

    return (
        <div className="flex justify-end items-center  mt-8 rounded-xl w-full">

            <Button onClick={prevButton} className={`${userRole ? "bg-purple-50": "bg-blue-50"} cursor-pointer text-[17px] `}>
                {"< قبلی "}
            </Button>
            <Button onClick={functionButton1} className={`${currentPage === 1 ? userRole ? "bg-purple-500 text-white":"bg-blue-500 text-white" : "bg-blue-50"}  cursor-pointer`}>
                {loading && currentPage == 1 ? <Spinner /> : "1"}
            </Button>


            {pageNumber === 2 || currentPage !== pageNumber ? <Button onClick={functionButton2} className={`${currentPage !== 1 ? userRole ? "bg-purple-500 text-white":"bg-blue-500 text-white" : "bg-blue-50"} cursor-pointer`}>
                {loading && currentPage !== 1 && currentPage !== pageNumber ? <Spinner /> : `${currentPage === 1 ? "2" : currentPage}`}
            </Button> : null}

            {pageNumber === 1 || pageNumber === 2 ? null : <Button onClick={functionButton3} className={`${currentPage === pageNumber ? userRole ? "bg-purple-500 text-white":"bg-blue-500 text-white" : "bg-blue-50"} cursor-pointer `}>
                {loading && currentPage === pageNumber ? <Spinner /> : pageNumber}</Button>}



            <Button onClick={nextButton} className={`${userRole ? "bg-purple-50": "bg-blue-50"} cursor-pointer text-[17px] `}>
                {"بعدی >"}</Button>
        </div>
    )
}

export default ChangeResultButtons