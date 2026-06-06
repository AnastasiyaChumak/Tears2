"use client";

import { Button } from "~/shared/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function GameActionButton() {
    const utils = api.useUtils();
    const router = useRouter();
    const createGameMutation = api.game.create.useMutation({
        onSuccess: (game) => {
            router.push(`/game/${game.id}`);
        },
        onError: (error: { message: string }) => {
            alert(error.message);
        },
    });

    const handleCreateGame = () => {
        createGameMutation.mutate({ name: "New Game", type: "tic-tac-toe" });
    }

    return (
        <Button onClick={handleCreateGame} disabled={createGameMutation.isPending}>
            {createGameMutation.isPending ? "Creating..." : "Create Game"}
        </Button>
    );
}

export default GameActionButton;