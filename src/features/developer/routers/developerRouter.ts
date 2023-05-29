import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const developerRouter = createTRPCRouter({
  updatePersoInfo: protectedProcedure
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
  updateEduInfo: protectedProcedure
    .input(
      z.object({
        school: z.string(),
        degree: z.string(),
        field: z.string(),
        startYear: z.string(),
        endYear: z.string(),
        description: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const developer = await opts.ctx.prisma.education.update({
        where: {
          userId: input.userId,
        },
        data: input,
      });
      return developer;
    }),
});
