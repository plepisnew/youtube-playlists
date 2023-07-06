import {
	YouTubeAction,
	YouTubeResource,
	YouTubeResponse,
	YouTubeResponseSuccessful,
	youtubeResponseSuccessfulSchema,
} from "@/@types/youtube";

export const BASE_URL = "https://www.googleapis.com/youtube/v3";

export type GetUrl = (options: { resource: YouTubeResource }) => string;

export const getUrl: GetUrl = ({ resource }) => `${BASE_URL}/${resource}s`;

export const isSuccess = (
	youtubeResponse: YouTubeResponse,
): youtubeResponse is YouTubeResponseSuccessful =>
	youtubeResponseSuccessfulSchema.safeParse(youtubeResponse).success;
