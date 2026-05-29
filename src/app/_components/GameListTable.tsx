import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "~/shared/ui/table";
import { gameRepository } from "~/entities/game/repositories/game-repository";
import { userRepository } from "~/entities/user/repositories/user-repository";

export default async function GameListTable() {
    const games = await gameRepository.gameList();
    const users = await userRepository.userList();
    return (
         <Table>
            <TableCaption>Users</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rating</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.login}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.rating}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}


 