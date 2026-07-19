"use client"

import { ChevronRight, Home, Gamepad2, Grid3x3, Binary, ArrowUp01 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { api } from "~/trpc/react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "~/shared/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/shared/ui/collapsible"

function GuessGameMenuItem() {
    const router = useRouter()
    const createGameMutation = api.game.create.useMutation({
        onSuccess: (game) => {
            router.push(`/games/guess/${game.id}`)
        },
        onError: (error: { message: string }) => {
            alert(error.message)
        },
    })

    const handleCreateGame = () => {
        createGameMutation.mutate({ name: "New game", type: "GuessBigNumber" })
    }

    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton onClick={handleCreateGame}>
                <ArrowUp01 />
                {createGameMutation.isPending ? "Creating..." : "Guess"}
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    )
}

function GuessBigNumberGameMenuItem() {
    const router = useRouter();
    const createGameMutation = api.game.create.useMutation({
        onSuccess: (game) => {
            router.push(`/games/guessBigNumber/${game.id}`);
        },
        onError: (error: { message: string }) => {
            alert(error.message);
        },
    });

    const handleCreateGame = () => {
        createGameMutation.mutate({ name: "New game", type: "GuessBigNumber" })
    }

    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton onClick={handleCreateGame}>
                <Binary />
                {createGameMutation.isPending ? "Creating..." : "Guess Big Number"}
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    )
}

function TikTacToeGameMenuItem() {
    const router = useRouter();
    const createGameMutation = api.game.create.useMutation({
        onSuccess: (game) => {
            router.push(`/games/tiktactoe/${game.id}`);
        },
        onError: (error: { message: string }) => {
            alert(error.message);
        },
    });

    const handleCreateGame = () => {
        createGameMutation.mutate({ name: "New game", type: "TikTacToe" })
    }

    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton onClick={handleCreateGame}>
                <Grid3x3 />
                {createGameMutation.isPending ? "Creating..." : "Tik Tac Toe"}
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    )
}

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Home />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <Gamepad2 />
                                            <span>Games</span>
                                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <GuessGameMenuItem />
                                            <GuessBigNumberGameMenuItem />
                                            <TikTacToeGameMenuItem />
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}