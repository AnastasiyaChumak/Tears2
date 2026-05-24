import { gameRepository } from "~/entities/game/repositories/game-repository";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/shared/ui/table";

export const runtime = "nodejs";

export default async function Home() {
  const games = await gameRepository.gameList();

  return (
    <div>
      <Table>
        <TableCaption>Games</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Players</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell>{game.id}</TableCell>
              <TableCell>{game.status}</TableCell>
              <TableCell>{game.players.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}