import { GameActionButton } from "./_components/GameActionButton";
import GameListTable from "./_components/GameListTable";
import Header from "./_components/Header";

export const runtime = "nodejs"

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-2xl px-4 py-12 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Players</h1>
          <GameActionButton />
        </div>
        <GameListTable />
      </div>
    </main>
  );
}