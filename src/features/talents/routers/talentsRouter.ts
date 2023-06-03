import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const talentsRouter = createTRPCRouter({
    getTalents: protectedProcedure
    .input(
        z.object({
            take: z.number(),
            skip: z.number(),
        })
    )
    .query(async (opts) => {
        const { input } = opts;
        const talents = await opts.ctx.prisma.user.findMany({
            where: {
                role: "talent",
            },
            skip: input.skip,
            take: input.take,
        });
        return talents;
    }
    ),
    talentsCount: protectedProcedure
    .query(async (opts) => {
        const talents = await opts.ctx.prisma.user.count({
            where: {
                role: "talent",
            },
        });
        return talents;
    }
    ),
    getTalent: protectedProcedure
    .input(
        z.object({
            id: z.string(),
        })
    )
    .query(async (opts) => {
        const { input } = opts;
        const talent = await opts.ctx.prisma.user.findUnique({
            where: {
                id: input.id,
            },
        });
        return talent;
    }
    ),
});
