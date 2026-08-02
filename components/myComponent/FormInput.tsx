import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type formFieldInput = {
    type?: string,
    inputValue ?: string | undefined,
    children?: React.ReactNode;
    placeholder?: string;
    label: string
    textarea?: boolean
    id: string;
    register: UseFormRegisterReturn
    error?: string | undefined
} & React.InputHTMLAttributes<HTMLInputElement>

export const FormInput = ({ label, id, register, error,children,inputValue, placeholder, type, textarea, ...props }: formFieldInput) => {

    return (
        <div className="flex flex-col w-1/2" {...props}>
            <label className="text-gray-800 text-base pb-2 pr-2 flex justify-start items-center gap-0.5" htmlFor={id}>
                {label}
                {children}
            </label>
            {textarea ?
                <textarea
                    className="border w-full cursor-pointer p-2 h-30 flex items-center justify-start text-[#607B8F] placeholder:text-[14px] transition-all duration-200 rounded-xl outline-none focus:border-blue-500"
                    placeholder={placeholder}
                    {...register}
                    id={id}
                />
                : <input
                    {...register}
                    defaultValue={inputValue}
                    className="border w-full cursor-pointer p-2 h-11 flex items-center justify-start text-[#607B8F] placeholder:text-[14px]  transition-all duration-200 rounded-xl outline-none focus:border-blue-500"
                    type={type ? type : "text"}
                    id={id}
                    placeholder={placeholder}
                />}
            {error && <span className="text-red-700 w-full text-xs mt-2 font-bold pr-2">{error}</span>}
        </div>
    )
}