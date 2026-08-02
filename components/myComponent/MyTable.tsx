/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

type Column = {
    key: string,
    title:  (() => React.ReactNode) | string,
    rowWidth?: string,
    render?: (value: any, row: any, index: number) => React.ReactNode,
    hidden? : boolean
} 

type TableProp = {
    data: any[],
    columns: Column[],
    children?: React.ReactNode,
}

export const Table = ({ data, columns, children }: TableProp) => {

    return (
        <div className="border-2 rounded-xl border-blue-200 w-full">

            <table className="w-full table-fixed border-collapse ">
                <thead >
                    <tr>
                        {
                            columns.map((col) => {
                                return (
                                    <th key={String(col.key)} className={`${col.rowWidth} border-b border-x rounded-xl text-center font-bold px-2 py-2`}>
                                        {typeof col.title === "function" ? col.title() : col.title}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => {
                        return (
                            <tr
                                key={row.id}
                                className={`${index % 2 == 1 ? "bg-gray-100" : "bg-white"}`}>
                                {
                                    columns.map((col) => {
                                        return (
                                            <th key={String(col.key)}
                                                className={`${col.rowWidth} py-2 px-2 font-normal border-x border-t text-[13px] cursor-pointer ${col.hidden && "truncate"}`}>

                                                {col.render ? col.render(row[col.key], row, index) : row[col.key] ?? "مشخص نشده"}

                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Table
