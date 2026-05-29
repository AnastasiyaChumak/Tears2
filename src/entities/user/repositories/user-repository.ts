import type { User } from "~/entities/user/domain";
import type { User as PrismaUser } from "@prisma/client";
import { db as prisma } from "~/shared/lib/db";

async function userList(): Promise<User[]> {
    const users = await prisma.user.findMany({
        include: {
            games: true,
        },
    });
    return users.map(dbUserToDbUserEntity);
}

async function userCreate(login: string, email: string): Promise<User> {
    const user = await prisma.user.create({
        data:
        {
            id: crypto.randomUUID(),
            login: crypto.randomUUID(),
            email: `${crypto.randomUUID()}@temp.com`,
            rating: 2,
            passwordHash: "",
        },
    });
        return dbUserToDbUserEntity(user);    
}      

function dbUserToDbUserEntity(user: PrismaUser): User {
    return {
        id: user.id,
        login: user.login,
        email: user.email,
        rating: user.rating,
    };
}

export const userRepository = { userList, userCreate };