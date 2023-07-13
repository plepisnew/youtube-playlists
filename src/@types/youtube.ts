import { z } from "zod";

// $ YOUTUBE INTERNALS

/**
 * * Enumeration of Authorization Server's supported actions
 * `list` corresponds to a GET request
 * `insert` corresponds to a POST request
 * `update` corresponds to a PUT request
 * `delete` corresponds to a DELETE request
 */

export const actionSchema = z.enum(["list", "insert", "update", "delete"]);

/**
 * * Enumeration of Authorization Server's supported resources
 */

export const resourceSchema = z.enum([
	"channel",
	"playlist",
	"playlistItem",
	"video",
]);

/**
 * * Base shape of a single resource
 */

export const singleSchema = z.object({
	kind: z.string(),
	etag: z.string(),
	id: z.string(),
});

/**
 * * Base shape of a pagable resource
 */

export const manySchema = z.object({
	kind: z.string(),
	etag: z.string(),
	pageInfo: z.object({
		totalResults: z.number(),
		resultsPerPage: z.number(),
	}),
});

export type Action = z.infer<typeof actionSchema>;

export type Resource = z.infer<typeof resourceSchema>;

export type Single = z.infer<typeof singleSchema>;

export type Many = z.infer<typeof manySchema>;

// $ YOUTUBE RESOURCES

/**
 * * Channel, which represents a single user
 * * https://developers.google.com/youtube/v3/docs/channels
 */

export const channelSchema = z.object({
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
});

/**
 * * Playlist, which represents a collection of playlist items (videos, streams)
 * * https://developers.google.com/youtube/v3/docs/playlists
 */

export const playlistSchema = z.object({
	snippet: z.object({
		publishedAt: z.string().datetime(),
		channelId: z.string(),
		title: z.string(),
		description: z.string(),
		thumbnails: z.record(
			z.string(),
			z.object({
				url: z.string().url(),
				width: z.number(),
				height: z.number(),
			}),
		),
		channelTitle: z.string(),
		defaultLanguage: z.string(),
		localized: z.object({
			title: z.string(),
			description: z.string(),
		}),
	}),
	status: z.object({
		privacyStatus: z.string(),
	}),
	contentDetails: z.object({
		itemCount: z.number(),
	}),
	player: z.object({
		embedHtml: z.string(),
	}),
	localizations: z.record(
		z.string(),
		z.object({
			title: z.string(),
			description: z.string(),
		}),
	),
});

/**
 * * Playlist Items, which belong to a Playlist and hold the properties of the actual media
 * * https://developers.google.com/youtube/v3/docs/playlistItems
 */

export const playlistItemSchema = z.object({
	snippet: z.object({
		publishedAt: z.string().datetime(),
		channelId: z.string(),
		title: z.string(),
		description: z.string(),
		thumbnails: z.record(
			z.string(),
			z.object({
				url: z.string().url(),
				width: z.number(),
				height: z.number(),
			}),
		),
		channelTitle: z.string(),
		videoOwnerChannelTitle: z.string(),
		videoOwnerCannelId: z.string(),
		playlistId: z.string(),
		position: z.number(),
		resourceId: z.object({
			kind: z.string(),
			videoId: z.string(),
		}),
	}),
	contentDetails: z.object({
		videoId: z.string(),
		startAt: z.string(),
		endAt: z.string(),
		note: z.string(),
		videoPublishedAt: z.string().datetime(),
	}),
	status: z.object({
		privacyStatus: z.string(),
	}),
});

export type Channel = z.infer<typeof channelSchema>;

export type Playlist = z.infer<typeof playlistSchema>;

export type PlaylistItem = z.infer<typeof playlistItemSchema>;

// $ YOUTUBE RESPONSES

/**
 * * Unsuccessful response from Authorization Server (error received)
 */

export const unsuccessfulResponseSchema = z.object({
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

/**
 * * Successful response from Authorization Server (data received)
 */

export const successfulResponseSchema = manySchema.merge(
	z.object({ items: z.array(z.object({})) }),
);

/**
 * * Different resource responses (inherently successful)
 */

export const channelResponseSchema = successfulResponseSchema.merge(
	z.object({ items: z.array(channelSchema) }),
);

export const playlistResponseSchema = successfulResponseSchema.merge(
	z.object({ items: z.array(playlistItemSchema) }),
);

export const playlistItemResponseSchema = successfulResponseSchema.merge(
	z.object({ items: z.array(playlistItemSchema) }),
);

export type UnsuccessfulResponse = z.infer<typeof unsuccessfulResponseSchema>;

export type SuccessfulResponse = z.infer<typeof successfulResponseSchema>;

export type Response = UnsuccessfulResponse | SuccessfulResponse;

export type ChannelResponse = z.infer<typeof channelResponseSchema>;

export type PlaylistResponse = z.infer<typeof playlistResponseSchema>;

export type PlaylistItemResponse = z.infer<typeof playlistItemResponseSchema>;

// $ EXAMPLES
// * or go to `.http/schema.rest`

const channelItemExample: Partial<Channel> = {
	snippet: {
		country: "",
		customUrl: "",
		defaultLanguage: "",
		description: "",
		localized: {
			descrpition: "",
			title: "",
		},
		publishedAt: "",
		thumbnails: {},
		title: "",
	},
};

const channelResponseExample: ChannelResponse = {
	etag: "",
	kind: "",
	pageInfo: {
		resultsPerPage: 5,
		totalResults: 2,
	},
	items: [channelItemExample as Channel, channelItemExample as Channel],
};
