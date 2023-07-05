import { z } from "zod";

export const openIdConnectResponse = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.enum(["Bearer"]),
  id_token: z.string(),
});

export type OpenIdConnectResponse = z.infer<typeof openIdConnectResponse>;

export const youtubeResourceSchema = z.enum([
  "channel",
  "playlist",
  "playlistItem",
  "video",
]);

export type YouTubeResource = z.infer<typeof youtubeResourceSchema>;

export const youtubeActionSchema = z.enum([
  "list",
  "insert",
  "update",
  "delete",
]);

export type YouTubeAction = z.infer<typeof youtubeActionSchema>;

export const twitchResponseSuccessfulSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
    errors: z.array(z.object({
      message: z.string(),
      domain: z.string(),
      reason: z.string(),
      location: z.string(),
      locationType: z.string()
    }))
  })
})

export const twitchResponseSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  pageInfo: z.object({
    totalResults: z.number(),
    resultsPerPage: z.number(),
  }),
  items: z.array(
    z.object({
      kind: z.string(),
      etag: z.string(),
      id: z.string(),
    })
  ),
});

export type TwitchResponse = z.infer<typeof twitchResponseSchema>;
