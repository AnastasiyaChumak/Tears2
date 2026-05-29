import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { userRepository } from "~/entities/user/repositories/user-repository";

export const userRouter = createTRPCRouter({
    list: publicProcedure.query(() => {
        return userRepository.userList();
    }),

    create: publicProcedure
        .input(z.object({ name: z.string(), type: z.string() }))
        .mutation(({ input }) => {
            return userRepository.userCreate(input.name, input.type);
        }),
});