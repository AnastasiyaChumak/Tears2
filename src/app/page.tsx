import { gameRepository } from "~/entities/game/repositories/game-repository";
import { GameActionButton } from "./_components/GameActionButton";
import GameListTable from "./_components/GameListTable";

export const runtime = "nodejs";

export default async function Home() {

  return (
    <div>
      <GameListTable />
      <GameActionButton />
    </div>
  );
}