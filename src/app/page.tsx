
import GameListTable from "./_components/GameListTable";
import Header from "./_components/Header";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "~/shared/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar";

export const runtime = "nodejs"

export default async function Home() {
return (
    <div className="mx-auto max-w-2xl px-4 py-12 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Players</h1>
      </div>
      <GameListTable />
    </div>
  );
}
/*

const GAMES = [
{ slug: "guess", label: "Guess the Number" },

]

<main className="min-h-screen">
  <Header />
  <div className="mx-auto max-w-2xl px-4 py-12 flex flex-col gap-6">
    <h1 className="text-xl font-semibold text-gray-800">Games</h1>
    <div className="flex gap-4">
      {GAMES.map((game) => (
        <Link
          key={game.slug}
          href={`/games/${game.slug}`}
          className="rounded-lg border px-6 py-4 hover:bg-gray-50 transition"
        >
          {game.label}
        </Link>
      ))}
    </div>
  </div>
</main>
*/


