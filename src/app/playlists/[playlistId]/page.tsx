"use client";

import { PageParams } from "@/@types/utils";
import { PlaylistItem } from "@/@types/youtube";
import { trpc } from "@/utils/trpc";
import moment from "moment";

const PlaylistPage: React.FC<PageParams<"playlistId">> = ({
	params: { playlistId },
}) => {
	const { data, status } = trpc.playlist.getItems.useQuery({
		part: ["snippet"],
		playlistId,
	});

	// TODO add loading UI
	if (status === "loading") return <div>Loading...</div>;

	if (status === "error") return <div>Error xd</div>;

	return (
		<div className="grid grid-cols-5 gap-x-5 gap-y-5">
			{data.items.map((item) => (
				<PlaylistItemCard key={item.id} playlistItem={item} />
			))}
		</div>
	);
};

const PlaylistItemCard: React.FC<{ playlistItem: PlaylistItem }> = ({
	playlistItem: { snippet, contentDetails },
}) => {
	console.log(snippet.thumbnails);
	return (
		<div className="rounded-lg overflow-hidden shadow-lg relative text-white">
			<div className="from-red-700 to-red-800 bg-gradient-to-br p-3">
				<p className="font-semibold truncate">{snippet.title}</p>
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={snippet.thumbnails["medium"].url}
				alt={snippet.title}
				className="w-full"
			/>
		</div>
	);
};

export default PlaylistPage;
