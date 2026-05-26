import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/shared/ui/table";
import { gameRepository } from "~/entities/game/repositories/game-repository";
import { de } from "zod/v4/locales";

export default async function GameListTable() {
    const games = await gameRepository.gameList();
    return ( 
        <div className="bg-center w-lg 50px-4">
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
    )
}

 