import * as YouTube from "@/@types/youtube";

export const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const getUrl = ({ resource }: { resource: YouTube.Resource }) =>
	`${BASE_URL}/${resource}s`;

export const isSuccess = (
	youtubeResponse: YouTube.Response,
): youtubeResponse is YouTube.SuccessfulResponse =>
	YouTube.successfulResponseSchema.safeParse(youtubeResponse).success;
