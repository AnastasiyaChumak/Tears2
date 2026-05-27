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
        onError: (error: Error) => {
            alert(error.message);
        },
    });

    return (
        <Button
            className="object-center w-1/5 mx-auto mt-10"
            onClick={() => createGameMutation.mutate({ name: "New Game", type: "default" })}
            disabled={createGameMutation.isPending}
        >
            {createGameMutation.isPending ? "Creating..." : "Create Game"}
        </Button>
    );
}

export default GameActionButton;