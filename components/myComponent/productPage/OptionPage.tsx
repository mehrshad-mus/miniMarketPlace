import { DetailPageProps } from '@/lib/constant/enums'
import React, { useState } from 'react'
import { ScrollInput } from '../ScrollInput'
import { Button } from '@/components/ui/button'
import { Control, FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { FormFields } from '@/lib/zodSchema/schema'
import { OptionValueSection } from '../OptionValueSection'
import { generateVariants } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { options } from '@/lib/queries'

const OptionPage = ({ detailPage, errors, fields, append, control, watch, setValue }:
    {
        watch: UseFormWatch<FormFields>,
        control: Control<FormFields>,
        append: UseFieldArrayAppend<FormFields, "option">,
        fields: FieldArrayWithId<FormFields, "option", "id">[],
        errors: FieldErrors<FormFields>,
        detailPage: string,
        setValue: UseFormSetValue<FormFields>
    }
) => {

    const selectedOption = watch("option")
    const { data : optionsData } = useQuery({
        queryKey: ["options"],
        queryFn: options.getAllOptions
    })

    function addOption() {
        setValue("variants", generateVariants(selectedOption))
    }

    const [optionVariables, setOptionVariables] = useState<{ name: string, id: string }>()

    return (
        <div className={`justify-center items-center flex-col w-4/5 py-3 px-5 gap-6  ${detailPage === DetailPageProps.OPTION ? "flex" : `hidden`}`}>

            <div className="flex justify-start items-start flex-col w-full gap-3 border-b pb-8">

                <span className="font-bold text-base">آپشن ها</span>

                <p className="text-[14px] text-gray-600">ابتدا از بخش آپشن ها گروه و کلید های آپشن های مورد نیازتان را ایجاد کنید. سپس در این بخش میتوانید از آپشن ها  استفاده کنید. .
                </p>

            </div>

            <div className="flex justify-start items-start flex-col w-full gap-3 ">

                <div className="flex justify-start items-end gap-2 w-full">

                    <ScrollInput currentState={optionVariables} customSetterFn={setOptionVariables} title="انتخاب آپشن ها" errors={errors} scrollItems={optionsData} placeholder="نوع آپشن" />

                    <Button
                        onClick={() => {

                            if (!optionVariables) return

                            const isOptionExist = fields.some((option) => option.name === optionVariables.name)
                            if (isOptionExist) return

                            append({
                                optionId: optionVariables.id,
                                name: optionVariables.name,
                                optionValue: []
                            })
                        }}

                        className="bg-blue-600 hover:bg-blue-500 text-3xl font-light text-white rounded-xl w-11 h-11"
                        type={"button"}>
                        +
                    </Button>

                </div>
                {errors.option && <span className="text-red-700 w-full text-xs mt-2 font-bold pr-2">{errors.option.message}</span>}
                <div className="flex justify-start flex-col items-end gap-2 w-full mt-5 border-t border-blue-600 pt-8">
                    {fields.map((field, index) => {
                        return (
                            <OptionValueSection
                                key={field.name}
                                optionIndex={index}
                                optionName={{ name: field.name, id: field.optionId }}
                                data={optionsData}
                                control={control}
                                watch={watch} />
                        )
                    })}
                </div>

                <Button type="button" onClick={addOption}>ثبت آپشن ها</Button>
            </div>
        </div>
    )
}

export default OptionPage