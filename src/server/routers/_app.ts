import { t } from "../trpc";
import { channelRouter } from "./channel";

export const appRouter = t.router({
  channel: channelRouter,
});

export type AppRouter = typeof appRouter;
