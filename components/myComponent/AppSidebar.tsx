"use client"
import Image from "next/image"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,

} from "@/components/ui/sidebar"
import * as Collapsible from "@radix-ui/react-collapsible"
import { ChevronDown } from "lucide-react"
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query"
import { userProfileData } from "@/lib/queries"
import Spinner from "./Spinner "
import { navMainColor, navTextColor } from "@/lib/utils"
import { NavItems } from "./columns/NavItems"
import { SidebarItems } from "@/lib/types/types"

export default function AppSidebar() {

    const { data, isLoading, error } = useQuery({
        queryKey: ["currentUser"],
        queryFn: userProfileData
    })

    const { sidebarItems } = NavItems({ data }) as { sidebarItems: SidebarItems[] }

    const pathName = usePathname()

    useEffect(() => {
        if (!data) return;

        const root = document.documentElement;

        if (data.role === "ADMIN") {
            root.style.setProperty("--scrollbar-thumb", "#3B82F6");
            root.style.setProperty("--scrollbar-thumb-hover", "#60A5FA");
        } else if (data.role === "SELLER") {
            root.style.setProperty("--scrollbar-thumb", "#A855F7");
            root.style.setProperty("--scrollbar-thumb-hover", "#C084FC");
        } else {
            root.style.setProperty("--scrollbar-thumb", "#EF4444");
            root.style.setProperty("--scrollbar-thumb-hover", "#F87171");
        }

    }, [data])

    return (
        <Sidebar>
            {isLoading && <p>Loading...</p>}

            {error && (
                <p>
                    Failed to load user
                </p>
            )}
            {data &&
                <SidebarContent className={data.role === "ADMIN" ? "admin-scrollbar" : data.role === "SELLER" ? "seller-scrollbar" : "user-scrollbar"}>
                    {sidebarItems.map((sidebarItems) => {

                        const isPathNameIncludeURL = pathName.includes(sidebarItems.url)
                        return (
                            <React.Fragment key={sidebarItems.name}>
                                {sidebarItems.permission?.includes(data.role.toLowerCase()) &&
                                    <React.Fragment>
                                        {sidebarItems.type === "lable" && <div className="text-gray-600 pr-2 text-xs mt-5 mb-1">{sidebarItems.name}</div>}
                                        {!sidebarItems.type && <Collapsible.Root defaultOpen={false} className="group/collapsible cursor-pointer p-0 pr-3" >
                                            <SidebarGroup className="group-data-[collapsible=icon]:hidden pointer-coarse p-0 pl-2">

                                                <SidebarGroupLabel asChild
                                                    className={`pointer-coarse text-[16px] text-black ${isPathNameIncludeURL && navMainColor({ user: data })}`} >
                                                    <Collapsible.Trigger className="flex items-center justify-between">

                                                        <div className="flex items-center justify-start gap-2 w-full">
                                                            {sidebarItems.icon && sidebarItems.icon(isPathNameIncludeURL)}
                                                            <Link
                                                                className={`${isPathNameIncludeURL && navTextColor({ user: data })}`} href={sidebarItems.url}>
                                                                {sidebarItems.nameFn ? sidebarItems.nameFn() : sidebarItems.name}
                                                            </Link>
                                                        </div>


                                                        {sidebarItems.sidebarSubItems &&
                                                            sidebarItems.sidebarSubItems.some((item) =>
                                                                item.permission.includes(data.role.toLowerCase())
                                                            ) && (
                                                                <ChevronDown className="ml-2 transition-transform duration-500 group-data-[state=open]/collapsible:rotate-180" />
                                                            )}

                                                    </Collapsible.Trigger>
                                                </SidebarGroupLabel>

                                                <Collapsible.Content>

                                                    {sidebarItems.sidebarSubItems &&
                                                        <SidebarMenu>
                                                            {sidebarItems.sidebarSubItems.map((sidebarSubItem) => {
                                                                return (
                                                                    <React.Fragment key={sidebarSubItem.name}>
                                                                        {
                                                                            sidebarSubItem.permission.includes(data.role.toLowerCase()) &&
                                                                            <SidebarMenuItem className="pr-4">
                                                                                <SidebarMenuButton asChild
                                                                                    className={`text-xs ${pathName === sidebarSubItem.url && "font-bold"} `}>
                                                                                    <Link href={sidebarSubItem.url}
                                                                                        className={`${pathName === sidebarSubItem.url && navTextColor({ user: data })}`}>

                                                                                        {sidebarSubItem.nameFn ? sidebarSubItem.nameFn() : sidebarSubItem.name}
                                                                                    </Link>
                                                                                </SidebarMenuButton>
                                                                            </SidebarMenuItem>
                                                                        }
                                                                    </React.Fragment>
                                                                )
                                                            })}

                                                        </SidebarMenu>
                                                    }

                                                </Collapsible.Content>
                                            </SidebarGroup>
                                        </Collapsible.Root>
                                        }
                                    </React.Fragment>}
                            </React.Fragment>)
                    })

                    }

                </SidebarContent>}


            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className={`${data?.role === "ADMIN" ? "bg-blue-50" : data?.role === "SELLER" ? "bg-purple-50" : "bg-red-50"} `}>
                            <Link href={`/${data?.role.toLowerCase()}/profile/${data?.id}`} className="flex justify-center items-center gap-3">
                                {isLoading ? <Spinner /> :
                                    <>
                                        {data?.avatar && <Image src={data?.avatar} alt="avatar" width={35} height={35} />}
                                        {data?.phone}
                                    </>}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}