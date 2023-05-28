import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const developerRouter = createTRPCRouter({
  insertDeveloperInfo: protectedProcedure
    .input(
      z.object({
        firstname: z.string(),
        lastname: z.string(),
        birthday: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        bio: z.string(),
        portfolio: z.string(),
        id: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const developer = await opts.ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: input,
      });
      return developer;
    }),
});
