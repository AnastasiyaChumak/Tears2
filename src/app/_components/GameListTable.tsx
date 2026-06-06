import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/shared/ui/table";
import { userRepository } from "~/entities/user/repositories/user-repository";

export default async function GameListTable() {
    const users = await userRepository.userList();
    return (
        <div className="rounded-lg border bg-white overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50 text-xs uppercase tracking-wider">
                        <TableHead className="text-gray-500">Username</TableHead>
                        <TableHead className="text-gray-500">Email</TableHead>
                        <TableHead className="text-gray-500 text-right">Rating</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium text-gray-800">{user.login ?? "—"}</TableCell>
                            <TableCell className="text-gray-500">{user.email}</TableCell>
                            <TableCell className="text-right font-mono">{user.rating}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}