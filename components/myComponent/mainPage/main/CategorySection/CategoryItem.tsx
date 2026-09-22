'use client'
import { categoryType } from '@/lib/zodSchema/schema'
import { CategoryIcon } from './CategoryIcon'
import { motion } from 'motion/react'
const CategoryItem = (cat: categoryType) => {
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
                {cat.iconUrl && <CategoryIcon
                    src={cat.iconUrl}
                    className="
        h-8
        w-8
        text-red-600
        dark:text-white
        dark:hover:text-gray-300
        hover:text-red-400
        cursor-pointer
    "
                    monochrome
                />}
            </div>
            <span>{cat.name}</span>
        </motion.div>
    )
}

export default CategoryItem