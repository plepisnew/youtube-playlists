import axios from "axios";
import { protectedProcedure, router } from "../trpc";
import { didFail, getUrl, paginationInputSchema } from "@/utils/youtube";
import * as YouTube from "@/@types/youtube";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const playlistRouter = router({
	getSelf: protectedProcedure
		.input(
			z
				.object({ part: z.array(YouTube.playlistPartSchema) })
				.merge(paginationInputSchema),
		)
		.query(async ({ ctx, input: { part, maxResults, pageToken } }) => {
			const playlistsUrl = getUrl({ resource: "playlist" });
			const youtubeResponse = (
				await axios.get(playlistsUrl, {
					params: { mine: true, part: part.join(","), maxResults, pageToken },
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

			return youtubeResponse;
		}),
	getItems: protectedProcedure
		.input(
			z
				.object({
					playlistId: z.string(),
					part: z.array(YouTube.playlistItemsPartSchema),
				})
				.merge(paginationInputSchema),
		)
		.query(
			async ({ ctx, input: { playlistId, part, maxResults, pageToken } }) => {
				const playlistItemsUrl = getUrl({ resource: "playlistItem" });
				const youtubeResponse = (
					await axios.get(playlistItemsUrl, {
						params: { part: part.join(","), playlistId, pageToken, maxResults },
						headers: { Authorization: `Bearer ${ctx.accessToken}` },
					})
				).data as YouTube.PlaylistItemResponse;

				if (didFail(youtubeResponse)) {
					const { message, errors } = youtubeResponse.error;

					throw new TRPCError({
						message,
						code: "BAD_REQUEST",
						cause: errors,
					});
				}

				return youtubeResponse;
			},
		),
});
