import type { User } from "~/entities/user/domain";
import type { User as PrismaUser } from "@prisma/client";
import { db as prisma } from "~/shared/lib/db";
import bcrypt from "bcryptjs";

async function userList(): Promise<User[]> {
    const users = await prisma.user.findMany({
        include: {
            games: true,
        },
    });
    return users.map(dbUserToDbUserEntity);
}

async function userCreate(login: string, password: string): Promise<User> {
    const existing = await prisma.user.findFirst({
        where: { login },
    });

    if (existing) {
        throw new Error("Login already taken");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            login,
            email: `${login}@temp.com`,
            rating: 0,
            passwordHash,
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