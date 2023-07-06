import { TRPCError, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async ({
	req,
	resHeaders,
}: FetchCreateContextFnOptions) => {
	return { req, resHeaders };
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	const cookies = ctx.req.headers.get("Cookie")?.split("; ");
	const cookie = cookies?.find((c) => c.startsWith("qid="));
	const qid = cookie?.split("=")[1];

	const [accessToken, idToken] = qid?.split("/") || [];

	if (!accessToken || !idToken) {
		if (!qid) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "I don't know who you are",
			});
		}
	}

	return next({
		ctx: { ...ctx, accessToken, idToken },
	});
});
