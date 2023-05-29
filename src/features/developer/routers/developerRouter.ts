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
  addEduInfo: protectedProcedure
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
      const developer = await opts.ctx.prisma.education.create({
        data: input,
      });
      return developer;
    }),
    getEducation: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      const educations = await opts.ctx.prisma.education.findMany({
        where: {
          userId: input.userId,
        },
      });
      return educations;
    }
    ),
    updateEducation: protectedProcedure
    .input(
      z.object({
        id: z.string(),
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
          id: input.id,
        },
        data: input,
      });
      return developer;
    }
    ),
});
