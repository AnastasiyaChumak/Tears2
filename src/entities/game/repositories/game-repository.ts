import { db as prisma } from "~/shared/lib/db";
import { type Prisma } from "@prisma/client";
import { type Game, type GameIdle, type Player, type GameFinished, type GameInProgress } from "~/entities/game/domain";


async function gameList(): Promise<Game[]> {

    const games = await prisma.game.findMany({
        include: {
            winner: true,
            players: true,
        },
    });

    return games.map(dbGameToDbGameEntity);
}

async function gameCreate(name: string, type: string): Promise<GameIdle> {
    const game = await prisma.game.create({
        data: {
            name,
            type,
            status: "idle",
        },
        include: {
            winner: true,
            players: true,
        },
    });

    return dbGameToDbGameEntity(game) as GameIdle;
}

function dbGameToDbGameEntity(
    game: Prisma.GameGetPayload<{
        include: { players: true; winner: true }
    }>
): Game {
    switch (game.status) {
        case "idle":
            return {
                id: game.id,
                players: game.players,
                status: game.status,
                field: game.field,
            } satisfies GameIdle;


        case "inProgress":
            return {
                id: game.id,
                players: game.players,
                status: game.status,
                field: game.field,
            } satisfies GameInProgress;


        case "gameOver":
            return {
                id: game.id,
                players: game.players,
                status: game.status,
                field: game.field,
            } satisfies GameFinished;
    }
}

export const gameRepository = { gameList, gameCreate };