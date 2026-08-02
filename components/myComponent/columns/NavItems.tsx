import { User } from '@/app/generated/prisma/client';
import { navTextColor } from '@/lib/utils';
import React from 'react'
import ErrorIndicator from '../ErrorIndicator';
import { useQuery } from '@tanstack/react-query';
import { extraQueryis } from '@/lib/queries';

export const NavItems = ({ data }: { data: User | undefined }) => {

    const { data: shopsRequest } = useQuery({
        queryKey: ["shopsRequestCount"],
        queryFn: () => extraQueryis.getRequestCountForStore()
    })

    const sidebarItems = [
        {
            name: "نمای کلی",
            permission: ["admin", "seller", "user"],
            type: "lable",
            url: ""
        },
        {
            name: "پیشخوان",
            permission: ["admin", "seller", "user"],
            url: `/${data?.role.toLowerCase()}/dashboard`,
            icon: (isPathNameIncludeURL: boolean) => {
                return (
                    <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-house-gear" viewBox="0 0 16 16">
                            <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708z" />
                            <path d="M11.886 9.46c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.044c-.613-.181-.613-1.049 0-1.23l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                        </svg>
                    </span>
                )
            },
        },
        {
            name: "فعالیت های اخیر",
            permission: ["admin", "seller", "user"],
            url: "/sidebarItem-two",
            icon: (isPathNameIncludeURL: boolean) =>
                <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                </span>
        },
        {
            name: "اعلان ها",
            permission: ["admin", "seller", "user"],
            url: "/sidebarItem-two",
            icon: (isPathNameIncludeURL: boolean) =>
                <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-megaphone" viewBox="0 0 16 16">
                        <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 75 75 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0m-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233q.27.015.537.036c2.568.189 5.093.744 7.463 1.993zm-9 6.215v-4.13a95 95 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A61 61 0 0 1 4 10.065m-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68 68 0 0 0-1.722-.082z" />
                    </svg>
                </span>
        },
        {
            name: "آمار ها",
            permission: ["admin"],
            url: "/sidebarItem-two",
            // icon: () => <div></div>,
            sidebarSubItems: [
                {
                    name: "رهگیری بازدید ها",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "نمودار بازدید ها",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "آمار محصولات",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "آمار مقالات",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "آمار مالی و حسابداری",
                    permission: ["admin"],
                    url: "",
                }
            ]
        },
        {
            name: "امورمالی و سفارشات",
            permission: ["admin", "seller"],
            type: "lable",
            url: ""
        },
        {
            name: "سفارشات",
            permission: ["admin", "seller", "user"],
            url: "orders",
            sidebarSubItems: [
                {
                    name: "در حال پردازش",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "تکمیل شده",
                    permission: ["admin"],
                    url: "",
                },
            ]
        },
        {
            name: "تراکنش ها",
            permission: ["admin", "seller", "user"],
            url: "transaction",
            sidebarSubItems: [
                {
                    name: "کاربران",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "فروشندگان",
                    permission: ["admin"],
                    url: "",
                },
            ]
        },
        {
            name: "صف پرداخت سهم ها",
            permission: [],
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "برداشت ها",
            permission: ["admin"],
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "پیش فاکتور",
            permission: ["admin"],
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "تخفیفات",
            permission: ["admin"],
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "حمل و نقل",
            permission: ["admin", "seller"],
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "امور پشتیبانی",
            permission: ["admin"],
            type: "lable",
            url: ""
        },
        {
            name: "تیکت ها",
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "فرم ها",
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "پرسش های متداول",
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "امور فروشندگان و مدیران",
            type: "lable",
            url: ""
        },
        {
            name: "فروشگاه ها",
            nameFn: () => {
                return (
                    <span className='flex justify-center items-center w-full gap-3'>
                        <span>فروشگاه ها</span>
                        {(shopsRequest && (shopsRequest?.productRequest > 0 || shopsRequest?.sellerRequest > 0)) && <ErrorIndicator />}
                    </span>
                )
            },
            url: "/admin/shops/productRequest/awaiting",
            permission: ["admin"],
            icon: (isPathNameIncludeURL: boolean) => {
                return (
                    <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16">
                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
                        </svg>
                    </span>
                )
            },
            sidebarSubItems: [
                {
                    name: "لیست",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "فروشگاه در انتظار",
                    nameFn: () => {
                        return (
                            <span className='flex justify-start items-center  gap-3'>
                                <span>فروشگاه در انتظار</span>
                                {(shopsRequest && (shopsRequest?.sellerRequest > 0)) && <ErrorIndicator flag />}
                            </span>
                        )
                    },
                    permission: ["admin"],
                    url: "/admin/shops/shopRequest/awaiting",
                },
                {
                    name: "محصول در انتظار",
                    nameFn: () => {
                        return (
                            <span className='flex justify-start items-center  gap-3'>
                                <span>محصول در انتظار</span>
                                {(shopsRequest && (shopsRequest?.productRequest > 0)) && <ErrorIndicator flag />}
                            </span>
                        )
                    },
                    permission: ["admin"],
                    url: "/admin/shops/productRequest/awaiting",
                },
                {
                    name: "موجودی در انتظار",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "مقاله در انتظار",
                    permission: ["admin"],
                    url: "",
                },
            ]
        },
        {
            name: "عملیات محصولات",
            permission: ["admin"],
            type: "lable",
            url: ""
        },
        {
            name: "محصولات",
            url: `/admin/product`,
            permission: ["admin"],
            icon: (isPathNameIncludeURL: boolean) => {
                return (
                    <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-basket" viewBox="0 0 16 16">
                            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </span>
                )
            },
            sidebarSubItems: [
                {
                    name: "لیست ",
                    permission: ["admin"],
                    url: "/admin/product",
                },
                {
                    name: "ایجاد محصول",
                    permission: ["admin"],
                    url: "/admin/product/create",
                },
                {
                    name: "برچسب ها",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "آپشن ها",
                    permission: ["admin"],
                    url: "/admin/product/option",
                },
                {
                    name: "سطل زباله",
                    permission: ["admin"],
                    url: "",
                },
            ]
        },
        {
            name: "پیشنهاد های فروش ",
            permission: ["admin", "seller"],
            url: `/${data?.role.toLowerCase()}/offers`,
            icon: (isPathNameIncludeURL: boolean) => {
                return (
                    <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-percent" viewBox="0 0 16 16">
                            <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                    </span>
                )
            },
            sidebarSubItems: [
                {
                    name: "لیست ",
                    permission: ["admin", "seller"],
                    url: `/${data?.role.toLowerCase()}/offers`,
                },
                {
                    name: "ایجاد پیشنهاد",
                    permission: ["admin", "seller"],
                    url: "/admin/offers/create/offer",
                },
            ]

        },
        {
            name: "انبار داری",
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "دیدگاه ها",
            url: "/sidebarItem-two",
            permission: ["admin", "seller"],
            // icon: () => <div></div>
        },
        {
            name: "دسته‌بندی",
            url: "/admin/category",
            icon: (isPathNameIncludeURL: boolean) => {
                return (
                    <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                        </svg>
                    </span>
                )
            }
            // icon: () => <div></div>
        },
        {
            name: "برند ها",
            url: "/admin/brand",
            permission: ["admin"],
            icon: (isPathNameIncludeURL: boolean) => {
                return (
                    <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                            <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
                            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
                        </svg>
                    </span>
                )
            },
            sidebarSubItems: [
                {
                    name: "لیست",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "ایجاد برند",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "سطل زباله",
                    permission: ["admin"],
                    url: "",
                },
            ]
        },
        {
            name: "استوری ها",
            url: "/sidebarItem-two",
            permission: ["admin"],
            // icon: () => <div></div>
        },
        {
            name: "عملیات مجله",
            permission: ["admin"],
            type: "lable",
            url: ""
        },
        {
            name: "مقالات",
            permission: ["admin", "seller"],
            url: "magezin",
            sidebarSubItems: [
                {
                    name: "لیست",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "ایجاد مقاله",
                    permission: ["admin", "seller"],
                    url: "",
                },
                {
                    name: "برچسب ها",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "سطل زباله",
                    permission: ["admin"],
                    url: "",
                },
            ]
        },
        {
            name: "امور مدیریتی",
            permission: ["admin"],
            type: "lable",
            url: ""
        },
        {
            name: "کتابخانه مدیا",
            permission: ["admin"],
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "کاربران",
            permission: ["admin"],
            url: "/admin/users",
            icon: (isPathNameIncludeURL: boolean) => {
                return (
                    <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                        </svg>
                    </span>
                )
            },
            sidebarSubItems: [
                {
                    name: "لیست کاربران",
                    permission: ["admin"],
                    url: "/admin/users",
                },
                {
                    name: "لیست مدیران",
                    permission: ["admin"],
                    url: "",
                },
                {
                    name: "مقام ها , دسترسی ها",
                    permission: ["admin"],
                    url: "",
                },
            ]
        },
        {
            name: "جستجو ها",
            permission: ["admin"],
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "بروزرسانی فروشگاه",
            url: "/sidebarItem-two",
            // icon: () => <div></div>
        },
        {
            name: "کیف پول",
            permission: ["user"],
            url: "/fdsfsd"
        },
        {
            name: "علاقه مندی ها",
            permission: ["user"],
            url: "/sdfdfs"
        },
        {
            name: "نشانی ها",
            permission: ["user"],
            url: "fsdff"
        },
        {
            name: "نظرات شما",
            permission: ["user"],
            url: "fsdff"
        },
        {
            name: "بازدید های اخیر",
            permission: ["user"],
            url: "fsdff"
        },
        {
            name: "فروشنده شوید !",
            permission: ["user"],
            url: `/${data?.role.toLowerCase()}/shops/shopRequest`,
            icon: (isPathNameIncludeURL: boolean) => {
                return (
                    <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-bookmark-star" viewBox="0 0 16 16">
                            <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.18.18 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.18.18 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.18.18 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.18.18 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.18.18 0 0 0 .134-.098z" />
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                        </svg>
                    </span>
                )
            }
        },
        {
            name: "خروج از حساب",
            permission: ["user"],
            url: "fsdff",
            icon: (isPathNameIncludeURL: boolean) => {
                return (
                    <span className={`${isPathNameIncludeURL && navTextColor({ user: data })}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                        </svg>
                    </span>
                )
            }
        },
    ];

    return { sidebarItems }
}
