import { z } from "zod";

/**
 * Response from Authorization Server's token endpoint
 */

export const openIdConnectResponse = z.object({
	access_token: z.string(),
	expires_in: z.number(),
	token_type: z.enum(["Bearer"]),
	id_token: z.string(),
});

export type OpenIdConnectResponse = z.infer<typeof openIdConnectResponse>;

/**
 * Enumeration of Authorization Server's supported resources
 */

export const youtubeResourceSchema = z.enum([
	"channel",
	"playlist",
	"playlistItem",
	"video",
]);

export type YouTubeResource = z.infer<typeof youtubeResourceSchema>;

/**
 * Authorization Server's supported resources
 */

export const baseSchema = z.object({
	kind: z.string(),
	etag: z.string(),
});

export const scrollableSchema = z.object({
	pageInfo: z
		.object({
			totalResults: z.number(),
			resultsPerPage: z.number(),
		})
		.optional(),
	nextPageToken: z.string().optional(),
});

export const channelSchema = z
	.object({
		snippet: z.object({
			title: z.string(),
			description: z.string(),
			customUrl: z.string(),
			publishedAt: z.string().datetime(),
			thumbnails: z.record(
				z.string(),
				z.object({
					url: z.string().url(),
					width: z.number(),
					height: z.number(),
				}),
			),
			defaultLanguage: z.string(),
			localized: z.object({
				title: z.string(),
				descrpition: z.string(),
			}),
			country: z.string(),
		}),
		contentDetails: z.object({
			relatedPlaylists: z.object({
				likes: z.string(),
				favorites: z.string(),
				uploads: z.string(),
			}),
		}),
		statistics: z.object({
			viewCount: z.number(),
			subscriberCount: z.number(),
			hiddenSubscriberCount: z.number(),
			videoCount: z.number(),
		}),
		topicDetails: z.object({
			topicIds: z.array(z.string()),
			topicCategories: z.array(z.string()),
		}),
		status: z.object({
			privacyStatus: z.string(),
			isLinked: z.boolean(),
			longUploadStatus: z.string(),
			madeForKids: z.boolean(),
			selfDeclaredMadeForKids: z.boolean(),
		}),
		brandedSettings: z.object({
			channel: z.object({
				title: z.string(),
				description: z.string(),
				keywords: z.string(),
				trackingAnalyticsAccountId: z.string(),
				moderateComments: z.boolean(),
				unsubscribedTrailer: z.string(),
				defaultLanguage: z.string(),
				country: z.string(),
			}),
			watch: z.object({
				textColor: z.string(),
				backgroundColor: z.string(),
				featuredPlaylistId: z.string(),
			}),
		}),
		auditDetails: z.object({
			overallGoodStanding: z.boolean(),
			communityGuidelinesGoodStanding: z.boolean(),
			copyrightStrikesGoodStanding: z.boolean(),
			contentIdClaimsGoodStanding: z.boolean(),
		}),
		contentOwnerDetails: z.object({
			contentOwner: z.string(),
			timeLinked: z.string().datetime(),
		}),
		localizations: z.record(
			z.string(),
			z.object({
				title: z.string(),
				description: z.string(),
			}),
		),
	})
	.merge(baseSchema)
	.merge(scrollableSchema);

export type Channel = z.infer<typeof channelSchema>;

/**
 * Enumeration of Authorization Server's supported actions
 */

export const youtubeActionSchema = z.enum([
	"list",
	"insert",
	"update",
	"delete",
]);

export type YouTubeAction = z.infer<typeof youtubeActionSchema>;

/**
 * Unsuccessful response from Authorization Server (error received)
 */

export const youtubeResponseUnsuccessfulSchema = z.object({
	error: z.object({
		code: z.number(),
		message: z.string(),
		errors: z.array(
			z.object({
				message: z.string(),
				domain: z.string(),
				reason: z.string(),
				location: z.string(),
				locationType: z.string(),
			}),
		),
	}),
});

export type YouTubeResponseUnsuccessful = z.infer<
	typeof youtubeResponseUnsuccessfulSchema
>;

/**
 * Successful response from Authorization Server (data received)
 */

export const youtubeResponseSuccessfulSchema = z.object({
	kind: z.string(),
	etag: z.string(),
	pageInfo: z
		.object({
			totalResults: z.number(),
			resultsPerPage: z.number(),
		})
		.optional(),
	items: z.array(
		z.object({
			kind: z.string(),
			etag: z.string(),
			id: z.string(),
		}),
	),
});

export type YouTubeResponseSuccessful = z.infer<
	typeof youtubeResponseSuccessfulSchema
>;

export type YouTubeResponse =
	| YouTubeResponseSuccessful
	| YouTubeResponseUnsuccessful;
