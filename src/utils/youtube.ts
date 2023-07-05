import { YouTubeAction, YouTubeResource } from "@/@types/youtube";

export const BASE_URL =
  "https://developers.google.com/apis-explorer/#p/youtube/v3/youtube";

export type GetUrl = (options: {
  resource: YouTubeResource;
  action: YouTubeAction;
}) => string;

export const getUrl: GetUrl = ({ resource, action }) =>
  `${BASE_URL}.${resource}s.${action}`;
