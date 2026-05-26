"use client";

import { Button } from "~/shared/ui/button";
import { api } from "~/trpc/react";

export function GameActionButton() {
  const createGameMutation = api.game.create.useMutation({
    onSuccess: (game: any) => {
      alert(`Game created with ID: ${game?.id}`);
      window.location.reload();
    },
    onError: (error: any) => {
      alert(`${error.message}`);
    },
  });

  const handleCreateGame = () => {
    createGameMutation.mutate({ title: "New Game" });
  };

  return (
    <Button 
      onClick={handleCreateGame}
      disabled={createGameMutation.isPending}
    >
      {createGameMutation.isPending ? "Creating..." : "Create Game"}
    </Button>
  );
}

export default GameActionButton;