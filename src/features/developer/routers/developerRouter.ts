import { z } from "zod";
import type { IFormInput } from "../types";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const developerRouter = createTRPCRouter({
  insertDeveloperInfo: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        birthDay: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        bio: z.string(),
        portfolio: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const developer = await opts.ctx.prisma.developer.create({
        data: input,
      });
      return developer;
    }),
});
