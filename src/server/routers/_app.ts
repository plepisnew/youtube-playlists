import { router } from "../trpc";
import { channelRouter } from "./channel";
import { playlistRouter } from "./playlist";

export const appRouter = router({
	channel: channelRouter,
	playlist: playlistRouter,
});

export type AppRouter = typeof appRouter;
