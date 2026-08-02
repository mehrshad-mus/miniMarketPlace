"use client"
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/myComponent/AppSidebar";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";


export default function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [open, setOpen] = useState(true)

    return (
        <SidebarProvider dir="rtl">
            <section className="flex justify-between w-full">
                
                <AppSidebar />
                <div className="w-full">

                    <SidebarTrigger/>
                    {children}
                    <Toaster />
                </div>

            </section>
        </SidebarProvider>
    );
}
