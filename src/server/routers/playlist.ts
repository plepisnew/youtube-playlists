import axios from "axios";
import { protectedProcedure, router } from "../trpc";
import { didFail, getUrl } from "@/utils/youtube";
import * as YouTube from "@/@types/youtube";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const playlistRouter = router({
	getSelf: protectedProcedure
		.input(z.object({ part: z.array(YouTube.playlistPartSchema) }))
		.query(async ({ ctx, input }) => {
			const playlistsUrl = getUrl({ resource: "playlist" });
			const youtubeResponse = (
				await axios.get(playlistsUrl, {
					params: { mine: true, part: input.part.join(",") },
					headers: { Authorization: `Bearer ${ctx.accessToken}` },
				})
			).data as YouTube.PlaylistResponse;

			if (didFail(youtubeResponse)) {
				const { message, errors } = youtubeResponse.error;

				throw new TRPCError({
					message,
					code: "BAD_REQUEST",
					cause: errors,
				});
			}

			return youtubeResponse.items;
		}),
});
