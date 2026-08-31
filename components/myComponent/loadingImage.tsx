import { useState } from "react"
import Image from "next/image"
import Spinner from "./Spinner "

export const ProductImage = ({ src , width , height }: { src: string , width?: number , height ?: number}) => {
    const [loading, setLoading] = useState(true)

    return (
        <div className={`relative`}>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner />
                </div>
            )}

            <Image
                src={src}
                width={width ? width :40}
                height={height ? height: 40}
                className="flex justify-center items-center"
                alt="product"
                onLoad={() => setLoading(false)}
            />
        </div>
    )
}
// w-${width ? width :10} h-${height ? height: 10}