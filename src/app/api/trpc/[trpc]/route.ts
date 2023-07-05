import { appRouter } from "@/server/routers/_app";
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { createContext } from "@/server/trpc";
const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: (opts: FetchCreateContextFnOptions) => createContext(opts),
  });

export const GET = handler;

export const POST = handler;
