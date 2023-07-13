import axios from "axios";
import { protectedProcedure, router } from "../trpc";
import { didFail, getUrl } from "@/utils/youtube";
import { TRPCError } from "@trpc/server";
import * as YouTube from "@/@types/youtube";

export const channelRouter = router({
	getSelf: protectedProcedure.query(async ({ ctx }) => {
		const channelsUrl = getUrl({ resource: "channel" });

		try {
			const youtubeResponse = (
				await axios.get(channelsUrl, {
					params: { mine: true, part: "snippet" },
					headers: {
						Authorization: `Bearer ${ctx.accessToken}`,
					},
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
		} catch (err) {
			throw new TRPCError({
				message: "Uknown error occurred",
				code: "BAD_REQUEST",
				cause: err,
			});
		}
	}),
});
