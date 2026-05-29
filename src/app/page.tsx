import { gameRepository } from "~/entities/game/repositories/game-repository";
import { GameActionButton } from "./_components/GameActionButton";
import GameListTable from "./_components/GameListTable";

export const runtime = "nodejs";

export default async function Home() {
  return (
    <main className="min-h-screen p-10">
      <div className="mx-auto max-w-3xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Games</h1>
          <GameActionButton />
        </div>
        <GameListTable />
      </div>
    </main>
  );
}