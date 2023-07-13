import * as YouTube from "@/@types/youtube";
import { z } from "zod";

export const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const getUrl = ({ resource }: { resource: YouTube.Resource }) =>
	`${BASE_URL}/${resource}s`;

export const didFail = (
	youtubeResponse: any,
): youtubeResponse is YouTube.UnsuccessfulResponse =>
	YouTube.unsuccessfulResponseSchema.safeParse(youtubeResponse).success;

export const paginationInputSchema = z.object({
	pageToken: z.string().optional(),
	maxResults: z.number().default(20),
});
