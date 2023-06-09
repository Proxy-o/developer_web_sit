import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { developerRouter } from "~/features/developer/routers/developerRouter";
import { talentsRouter } from "~/features/talents/routers/talentsRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  developer: developerRouter,
  talents: talentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
