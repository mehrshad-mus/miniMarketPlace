import Spinner from '@/components/myComponent/Spinner '
import React from 'react'

export const loading = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>

            <Spinner className='text-blue-500 font-bold w-10 h-10' />
        </div>
    )
}

export default loading
