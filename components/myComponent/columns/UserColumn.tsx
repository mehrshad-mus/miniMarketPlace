/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns-jalali';
import Button from 'react-multi-date-picker/components/button';
import { UseMutateFunction } from '@tanstack/react-query';
import Spinner from '../Spinner ';

export const UserColumn = ({ changeRole, changeStatus, changeRoleState, changeStatusState }: {
    changeRole: UseMutateFunction<any, Error, string>,
    changeStatus: UseMutateFunction<{
        message: string;
    }, Error, {
        id?: string;
    }, unknown>,
    changeRoleState: boolean,
    changeStatusState: boolean
}) => {

    const [openRow, setOpenRow] = useState<number | null>(null);
    const [roleProcessId, setRoleProcessId] = useState<string>()
    const [statusProcessId, setStatusProcessId] = useState<string>()

    const columns = useMemo(
        () => [
            {
                key: "avatar",
                title: "آواتار",
                rowWidth: "w-2/30",
                render: (value: string | null) => {
                    return (
                        <>
                            {value ? <Image src={value} alt="avatar" width={35} height={35} /> : <Image src={"/images (7).jfif"} alt="avatar" width={35} height={35} />}
                        </>
                    )
                }
            },
            {
                key: "name",
                title: "نام",
                rowWidth: "w-4/30",
                render: (value: string, row: any) => {
                    return (
                        <Link href={"/"} dir="rtl" className="w-full justify-start items-center flex pr-3 cursor-pointer hover:text-blue-400">{value ?? "مشخص نشده"}</Link>
                    )
                }
            },
            {
                key: "phone",
                title: "شماره تلفن",
                rowWidth: "w-4/30",
                render: (value: string) => {
                    return (
                        <span className="w-full flex justify-start items-center pr-3" dir="rtl">{value}</span>
                    )
                }
            },
            {
                key: "userName",
                title: "نام کاربری",
                rowWidth: "w-5/30",
                render: (value: string) => {
                    return (
                        <span className="w-full flex justify-start items-center pr-3" dir="rtl">{value ?? "مشخص نشده"}</span>
                    )
                }
            },
            {
                key: "wallet",
                title: "کیف پول",
                rowWidth: "w-5/30",
                render: (value: string) => {
                    return (
                        <span className="flex justify-center flex-row-reverse gap-1 ">
                            <span>{value ?? 0}</span>
                            <span className="text-[12px] text-gray-400">تومان</span>
                        </span>)

                }
            },
            {
                key: "role",
                title: "سطح",
                rowWidth: "w-3/30",
                render: (value: string, row: any, index: number) => {
                    return (
                        <div className="w-full flex justify-start items-center pr-3" dir="rtl">
                            {changeRoleState && row.id === roleProcessId ? <Spinner className="text-blue-600" /> :
                                <span>
                                    {value === "USER" ? "کاربر" : value === "ADMIN" ? "ادمین" : "فروشنده"}
                                </span>}
                        </div>)
                }
            },
            {
                key: "status",
                title: "وضعیت",
                rowWidth: "w-3/30",
                render: (value: string, row: any) => {
                    return (
                        <div className="w-full justify-between flex items-center pr-2">
                            {changeStatusState && row.id === statusProcessId ? <Spinner className="text-blue-600" /> :
                                <span className={`${value === "ACTIVE" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"} rounded-2xl p-1 text-[10px] flex justify-center items-center w-12`}>
                                    {value === "ACTIVE" ? "فعال" : "غیرفعال"}
                                </span>}
                        </div>
                    )
                }
            },
            {
                key: "createdAt",
                title: "تاریخ پیوستن",
                rowWidth: "w-4/30",
                render: (value: string) => {
                    const date = new Date(value)
                    const formattedDate = format(date, 'dd MMMM yyyy');
                    return (
                        <span dir="rtl" className="w-full  h-full flex justify-start items-center pr-2">{formattedDate}</span>
                    )
                }
            },
            {
                key: "setting",
                title: () => {
                    return (<span className="w-full flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                        </svg>
                    </span>)

                },
                rowWidth: "w-1/30",
                render: (value: any, row: any, index: number) => {
                    return (
                        <div className="relative w-full h-full cursor-pointer "
                            onClick={() => setOpenRow(openRow === index ? null : index)}>

                            <div className="w-full flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                </svg>
                            </div>
                            <div
                                className={`${openRow === index ? "block" : "hidden"} 
                            absolute shadow-2xl rounded-2xl bg-white z-10 top-8 left-2 w-40 py-2`}>
                                <div className="flex justify-center items-center flex-col">

                                    <Link href={`/admin/profile/${row.id}`}>
                                        <Button className="w-full cursor-pointer text-[13px] bg-white hover:bg-gray-200 rounded-none">
                                            مشاهده و ویرایش
                                        </Button>
                                    </Link>

                                    <Button className="w-full cursor-pointer text-[13px] bg-white hover:bg-gray-200 rounded-none"
                                        onClick={() => {
                                            changeRole(row.id)
                                            setRoleProcessId(row.id)
                                        }
                                        }>
                                        {row.role === "SELLER" ? "عزل از فروشنده" : " ارتقا به فروشنده"}
                                    </Button>

                                    <Button className="w-full cursor-pointer text-[13px] bg-white hover:bg-gray-200 rounded-none"
                                        onClick={() => {
                                            changeStatus(row.id)
                                            setStatusProcessId(row.id)
                                        }}>
                                        {row.status === "ACTIVE" ? " بلاک " : "آنبلاک"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }
            },
        ], [changeRole, changeStatus, changeRoleState, changeStatusState, openRow, roleProcessId, statusProcessId]
    )

    return {columns}
}
