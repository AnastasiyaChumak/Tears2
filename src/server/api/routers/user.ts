import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { userRepository } from "~/entities/user/repositories/user-repository";

export const userRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ login: z.string(), password: z.string() }))
        .mutation(({ input }) => {
            return userRepository.userCreate(input.login, input.password);
        }),
});