"use client"

import { Button } from "~/shared/ui/button"
import { useRouter } from "next/navigation"
import { api } from "~/trpc/react";

export function GuessBigNumberButton() {

    const router = useRouter();
    const createGameMutation = api.game.create.useMutation({
        onSuccess: (game) => {
            router.push(`games/guessBigNumber/${game.id}`);
        },
        onError: (error: { message: string }) => {
            alert(error.message);
        },
    });

    const handleCreateGame = () => {
        createGameMutation.mutate({ name: "New game", type: "GuessBigNumber" })
    }

    return (
        <Button onClick={handleCreateGame} disabled={createGameMutation.isPending}>
            Play Guess the Number
        </Button>
    );
}

export default GuessBigNumberButton;