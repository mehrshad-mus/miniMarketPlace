import { category } from '@/lib/queries'
import CategoryItem from './CategoryItem'
import { prisma } from '@/lib/prisma'

const Category = async () => {

    const category = await prisma.category.findMany({
        omit: {
            createdAt: true,
            updatedAt: true,
        }
    })

    if (!category) {
        return undefined
    }

    return (
        <div className='flex justify-center items-center flex-col mt-8'>
            <span className='font-bold text-xl'>دسته بندی های اصلی</span>
            <div dir='' className='flex justify-around w-full items-center mt-6'>
                {category?.map((cat) => {
                    return (
                        <CategoryItem key={cat.id} {...cat} />
                    )
                })}
            </div>
        </div>
    )
}

export default Category