import { category } from '@/lib/queries'
import CategoryItem from './CategoryItem'

const Category = async () => {
    const data = await category.getAllCategory();
    return (
        <div className='flex justify-center items-center flex-col mt-8'>
            <span className='font-bold text-xl'>دسته بندی های اصلی</span>
            <div dir='' className='flex justify-around w-full items-center mt-6'>
                {data?.map((cat) => {
                    return (
                        <CategoryItem key={cat.id} {...cat} />
                    )
                })}
            </div>
        </div>
    )
}

export default Category