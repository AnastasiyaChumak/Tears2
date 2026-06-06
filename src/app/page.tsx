import { GameActionButton } from "./_components/GameActionButton";
import GameListTable from "./_components/GameListTable";
import { SignOutButton } from "./_components/SignOutButton";
import { auth } from "~/server/auth"

export const runtime = "nodejs"
const session = await auth()

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-8 py-4 flex items-center justify-between">
        <span className="text-sm font-medium tracking-widest uppercase text-gray-400">Leaderboard</span>
        <div className="flex flex-col items-end gap-4">
          <SignOutButton />
          {session?.user && (
            <span className="text-sm text-gray-600 font-bold ">
              <span className="font-light italic">Hello </span>
              {session.user.name ?? session.user.email}
            </span>
          )}
        </div>
      </header>
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