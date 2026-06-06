import { auth } from "~/server/auth"
import { SignOutButton } from "./SignOutButton"

export default async function Header() {
    const session = await auth()
    return (
        <header className="border bg-gray-100 px-8 py-4 flex items-center justify-between h-14" >
            <span className="text-sm font-medium tracking-widest uppercase text-gray-400">Leaderboard</span>
            <div className="flex items-end gap-4">
                {session?.user && (
                    <span className="text-sm text-gray-600 font-bold m-2">
                        <span className="font-light italic">Hello </span>
                        {session.user.name ?? session.user.email}
                    </span>
                )}
                <SignOutButton />
            </div>
        </header >
    )
}