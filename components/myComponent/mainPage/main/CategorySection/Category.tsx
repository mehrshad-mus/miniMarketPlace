"use client"
import { category } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { CategoryIcon } from './CategoryIcon'
import { motion } from 'motion/react'



const Category = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["category"],
        queryFn: category.getAllCategory
    })

    return (
        <div className='flex justify-center items-center flex-col mt-8'>
            <span className='font-bold text-xl'>دسته بندی های اصلی</span>
            <div dir='' className='flex justify-around w-full items-center mt-6'>
                {data?.map((cat) => {
                    return (
                        <motion.div

                            initial={{
                                opacity: 0,
                                y: -80,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{ amount: 0.3 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}

                            key={cat.id} className='flex justify-center items-center flex-col gap-2'>
                            <div className=' bg-red-100 p-4 rounded-full dark:bg-gray-900'>
                                {cat.iconUrl && <CategoryIcon src={cat.iconUrl} className='h-8 w-8 text-red-600 dark:text-white dark:hover:text-gray-300 hover:text-red-400 cursor-pointer' />}
                            </div>
                            <span>{cat.name}</span>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default Category