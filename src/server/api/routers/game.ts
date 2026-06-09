import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { gameRepository } from "~/entities/game-guess/repositories/game-repository";

export const gameRouter = createTRPCRouter({
    list: publicProcedure.query(() => {
        return gameRepository.gameList();
    }),

    create: publicProcedure
        .input(z.object({ name: z.string(), type: z.string() }))
        .mutation(({ input }) => {
            return gameRepository.gameCreate(input.name, input.type);
        }),
});