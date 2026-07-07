export const runtime = "nodejs"

import GamePage from "./_components/GamePage"
import Header from "~/app/_components/Header"

export default function Page() {
  return (
    <div>
      <Header />
      <GamePage />
    </div>
  )
}