"use client";

import { Button } from "~/shared/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function GameActionButton() {
    const utils = api.useUtils();
    const router = useRouter();
    const createGameMutation = api.game.create.useMutation({
        onSuccess: () => {
            router.refresh();
        },
        onError: (error: { message: string }) => {
            alert(error.message);
        },
    });

    const createUserMutation = api.user.create.useMutation({
        onSuccess: () => {
            router.refresh();
        },
        onError: (error: { message: string }) => {
            alert(error.message);
        },
    },
    );

    const handleClick = () => {
        createGameMutation.mutate({ name: "New Game", type: "default" });
        createUserMutation.mutate({ name: "New User", type: "default" });
    };

    return (
        <Button onClick={handleClick} disabled={createGameMutation.isPending}>
            {createGameMutation.isPending ? "Creating..." : "Create Game"}
        </Button>
    );
}

export default GameActionButton;