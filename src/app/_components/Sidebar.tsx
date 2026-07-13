import { SidebarProvider, SidebarTrigger } from "~/shared/ui/sidebar"
import { AppSidebar } from "../_components/AppSidebar"

export default function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
