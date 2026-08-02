import { FormFields, ProfileFields } from "@/lib/zodSchema/schema"
import { SetStateAction, useState } from "react"
import { FieldErrors, UseFormSetValue } from "react-hook-form"

export type ScrollInputProp = {
    title: string,
    scrollItems: { id: string, name: string }[] | undefined,
    setValue?: UseFormSetValue<FormFields>,
    profileSetValue ?: {
        setterFn : UseFormSetValue<ProfileFields>,
        field : "gender" | "role"
    },

    customSetterFn?: React.Dispatch<SetStateAction<{ name: string, id: string } | undefined>>
    currentState?: {
        id: string;
        name?: string;
    } | undefined

    forWitchField? : "category" | "brand"

    errors?: FieldErrors<FormFields>,
    placeholder?: string
    isRequire?: boolean
}

export const ScrollInput = ({ setValue, profileSetValue, errors, scrollItems, title, placeholder, currentState, customSetterFn, isRequire ,forWitchField}: ScrollInputProp) => {

    const [isScrollOpen, setIsScrollOpen] = useState(false)

    return (
        <div className="flex flex-col w-1/2 relative">
            <label className="text-gray-800 text-[15px] text-start pb-2 pr-2 flex justify-start items-center" htmlFor="brand"><span>{title}</span>{isRequire && <span className="text-red-900">*</span>}</label>
            <div onClick={() => { setIsScrollOpen(prev => { return !prev }) }} className="border w-full p-2 h-11 cursor-pointer flex items-center text-[14px] text-gray-500 transition-all duration-200 rounded-xl" id="brand">{currentState ? currentState.name : placeholder}</div>
            <div className={`${isScrollOpen ? "absolute" : "hidden"} w-full overflow-y-scroll shadow absolute top-20 bg-white rounded-xl transition-all duration-300 z-10`}>
                <ul className="w-full flex justify-center items-center flex-col rounded-xl ">
                    {scrollItems && scrollItems.map((item) => {
                        return (
                            <li
                                key={item.id}
                                onClick={() => {

                                    if(forWitchField){ if (setValue) { setValue(forWitchField, { id: item.id, name: item.name }) }}

                                    if (customSetterFn) { customSetterFn({ id: item.id, name: item.name }) }

                                    if(profileSetValue){ profileSetValue.setterFn( profileSetValue.field , {id : item.id , name: item.name})}

                                    setIsScrollOpen(prev => { return !prev })
                                }}
                                className={`flex justify-start ${currentState?.name === item.name ? "bg-green-100 " : "bg-transparent"} cursor-pointer items-center hover:bg-gray-100 rounded-xl w-full h-1/3 p-3`}>
                                {item.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
            {
                forWitchField === "category" ? errors?.category && <span className="text-red-700 w-full text-start text-xs mt-2 font-bold pr-2">{errors.category.message}</span> :
                errors?.brand && <span className="text-red-700 w-full text-start text-xs mt-2 font-bold pr-2">{errors.brand.message}</span>
            }   
        </div>
    )
}