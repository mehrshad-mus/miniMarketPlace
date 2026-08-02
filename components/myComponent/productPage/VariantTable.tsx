/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormFields } from '@/lib/zodSchema/schema'
import React, { useMemo } from 'react'
import { FieldArrayWithId, FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form'
import MyTable from '../MyTable'
import { DetailPageProps } from '@/lib/constant/enums'
import { createColumns, tryParseRGBA } from '@/lib/utils'

const VariantTable = (
    { fields, detailPage, watch}:
        {
            fields: FieldArrayWithId<FormFields, "option", "id">[],
            
            watch: UseFormWatch<FormFields>,
            
            detailPage?: string,
        }) => {

    const variants = watch("variants")

    const variantColumn = useMemo(() => createColumns(variants), [variants])

    const newUniqueColumns = variantColumn.map((obj) => {
        return {
            ...obj,
            render: (value: string, row: any) => {
                return (
                    row.values.map((item: any) => {

                        const rgba = tryParseRGBA(item.value)

                        return (item.optionName === obj.title &&
                            <div key={item.id + "e"}>
                                {rgba ?
                                    <div className="flex justify-center items-center gap-122" >
                                        <span className="w-6 h-6 rounded-full"
                                            style={{ backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` }} >

                                        </span>
                                    </div> :
                                    item.value}</div>)
                    }))
            }
        }
    })


    return (
        <div className={`justify-center items-center flex-col w-4/5 py-3 px-5 gap-6  ${detailPage === DetailPageProps.VARIANTS ? "flex" : `hidden`}`}>
            {fields.some((field) => field.name !== undefined) && <MyTable data={variants} columns={newUniqueColumns} />}
        </div>
    )
}

export default VariantTable