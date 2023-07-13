import axios from "axios";
import { protectedProcedure, router } from "../trpc";
import { getUrl, isSuccess } from "@/utils/youtube";
import { TRPCError } from "@trpc/server";
import * as YouTube from "@/@types/youtube";

export const channelRouter = router({
	getSelf: protectedProcedure.query(async ({ ctx }) => {
		const channelsUrl = getUrl({ resource: "channel" });

		try {
		} catch (err) {
			throw new TRPCError({
				message: JSON.stringify(err),
				code: "BAD_REQUEST",
			});
		}
		const youtubeResponse = (
			await axios.get(channelsUrl, {
				params: { mine: true, part: "snippet" },
				headers: {
					Authorization: `Bearer ${ctx.accessToken}`,
				},
			})
		).data as YouTube.Response;

		if (!isSuccess(youtubeResponse)) {
			throw new TRPCError({
				message: "Idek when you would see this",
				code: "BAD_REQUEST",
			});
		}

		return youtubeResponse.items[0];
	}),
});
