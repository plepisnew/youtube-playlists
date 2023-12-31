import axios from "axios";
import { protectedProcedure, router } from "../trpc";
import { didFail, getUrl } from "@/utils/youtube";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as YouTube from "@/@types/youtube";

export const channelRouter = router({
	getSelf: protectedProcedure
		.input(z.object({ part: z.array(YouTube.channelPartSchema) }))
		.query(async ({ ctx, input }) => {
			const channelsUrl = getUrl({ resource: "channel" });
			const youtubeResponse = (
				await axios.get(channelsUrl, {
					params: { mine: true, part: input.part.join(",") },
					headers: { Authorization: `Bearer ${ctx.accessToken}` },
				})
			).data as YouTube.ChannelResponse;

			if (didFail(youtubeResponse)) {
				const { message, errors } = youtubeResponse.error;

				throw new TRPCError({
					message,
					code: "BAD_REQUEST",
					cause: errors,
				});
			}

			return youtubeResponse.items[0];
		}),
});
