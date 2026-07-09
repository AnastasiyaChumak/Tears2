"use client";

import { Button } from "~/shared/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function GuessGameButton() {
    const router = useRouter();
    const createGameMutation = api.game.create.useMutation({
        onSuccess: (game) => {
            router.push(`/games/guess/${game.id}`);
        },
        onError: (error: { message: string }) => {
            alert(error.message);
        },
    });

    const handleCreateGame = () => {
        createGameMutation.mutate({ name: "New Game", type: "guess" });
    }

    return (
        <Button onClick={handleCreateGame} disabled={createGameMutation.isPending}>
            {createGameMutation.isPending ? "Creating..." : "Guess Game"}
        </Button>
    );
}

export default GuessGameButton;