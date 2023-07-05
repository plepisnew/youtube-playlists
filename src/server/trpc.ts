import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async ({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) => {
  return { req, resHeaders };
};

export const t = initTRPC.context<typeof createContext>().create();
