import { FormFields } from "@/lib/zodSchema/schema";
import { tryParseRGBA } from "@/lib/utils";
import { useState } from "react"
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";

// type VariantItem = {
//     optionName: string
//     value: string
// }

export type ScrollInputProp = {
    data: {
        id: string;
        name: string;
        createdOptionValue: {
            id: string;
            value: string;
        }[];
    }[] | undefined,

    optionName: { name: string, id: string }
    optionIndex: number
    control: Control<FormFields>
    watch: UseFormWatch<FormFields>
}



export const OptionValueSection = ({ optionName, data, control, optionIndex, watch }: ScrollInputProp) => {
    const [isScrollOpen, setIsScrollOpen] = useState(false)

    const { append } = useFieldArray({
        control,
        name: `option.${optionIndex}.optionValue`
    })

    function changeOptionValue(valueId: string, value: string) {

        const currentValues = watch(`option.${optionIndex}.optionValue`) || []

        const alreadyExists = currentValues.some((item) => item.value === value)


        if (alreadyExists) return

        append({
            optionValueId: valueId,
            value
        })
    }


    const options = watch(`option`)
    return (
        <div className="flex w-full relative gap-3 justify-start items-center">
            <div onClick={() => { setIsScrollOpen(prev => { return !prev }) }} className="border w-1/4 p-2 h-11 cursor-pointer relative items-center text-base text-black transition-all duration-200 rounded-xl">
                {optionName.name}

                <div className={`${isScrollOpen ? "absolute" : "hidden"} w-full overflow-y-scroll shadow absolute top-12 left-1 bg-white rounded-xl transition-all duration-300 z-10`}>
                    <ul className="w-full flex justify-center items-center flex-col rounded-xl ">
                        {data && data.map((option) => {

                            if (option.name === optionName.name) {

                                return option.createdOptionValue.map((value) => {

                                    const rgba = tryParseRGBA(value.value)
                                    return (
                                        <li
                                            key={value.id}
                                            onClick={() => changeOptionValue(value.id, value.value)}
                                            className={`flex justify-start  cursor-pointer items-center hover:bg-gray-100 rounded-xl w-full gap-5 p-3`}>
                                            {rgba ?
                                                <div className="flex justify-start items-center gap-122" >
                                                    <span className="w-7 h-7 rounded-full"
                                                        style={{ backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` }} />
                                                </div> : value.value}
                                        </li>
                                    )
                                })
                            }
                        })}
                    </ul>
                </div>
            </div>

            <div className="w-3/4 flex justify-start gap-1 items-center">

                {options &&
                    options.map((option) => {
                        return (
                            option.optionId === optionName?.id && option.optionValue?.map((optionValue) => {

                                const rgba = tryParseRGBA(optionValue.value)

                                if (rgba) {
                                    return (
                                        <div key={optionValue.optionValueId} className="flex justify-start items-center gap-122" >
                                            <span className="w-8 h-8 rounded-full"
                                                style={{ backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` }} />
                                        </div>
                                    )
                                }
                                return (<div key={optionValue.optionValueId} className="border border-blue-200 p-2 h-11 cursor-pointer flex items-center text-base text-black rounded-xl">{optionValue.value}</div>)
                            })
                        )
                    })}

            </div>

        </div>
    )
}




{/* {error && <span className="text-red-700 w-full text-end text-xs mt-2 font-bold pr-2">{error}</span>} */ }