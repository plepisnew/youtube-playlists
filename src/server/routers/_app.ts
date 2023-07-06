import { router } from "../trpc";
import { channelRouter } from "./channel";

export const appRouter = router({
	channel: channelRouter,
});

export type AppRouter = typeof appRouter;
