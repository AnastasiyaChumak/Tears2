import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "../../shared/ui/sidebar"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <h1>HELLO</h1>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
        </Sidebar>
    )
}

export default AppSidebar