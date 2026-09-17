import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/myComponent/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { getCurrentUser } from "@/lib/auth";
import AppSidebarServer from "@/components/myComponent/AppSidebarServer";


export default async function PanelLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    const currentUser = await getCurrentUser()

    return (
        <SidebarProvider dir="rtl">
            <section className="flex justify-between w-full">
                
                <AppSidebarServer/>
                <div className="w-full">

                    <SidebarTrigger userRole= {currentUser?.userRole}/>
                    {children}
                    <Toaster />
                </div>

            </section>
        </SidebarProvider>
    );
}
