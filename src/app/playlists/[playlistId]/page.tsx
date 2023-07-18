"use client";

import { PageParams } from "@/@types/utils";
import { PlaylistItem } from "@/@types/youtube";
import { trpc } from "@/utils/trpc";
import moment from "moment";
import { FaFileDownload, FaInfoCircle, FaPlayCircle } from "react-icons/fa";

const PlaylistPage: React.FC<PageParams<"playlistId">> = ({
	params: { playlistId },
}) => {
	const { data, status } = trpc.playlist.getItems.useQuery({
		part: ["snippet"],
		playlistId,
	});

	console.log(data);
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
	return (
		<div className="rounded-lg overflow-hidden shadow-lg relative text-white group">
			<div className="from-red-700 to-red-800 bg-gradient-to-br p-3">
				<p className="font-semibold truncate">{snippet.title}</p>
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={snippet.thumbnails["medium"].url}
				alt={snippet.title}
				className="w-full"
			/>
			<div className="absolute bottom-0 top-[calc(24px_+_1.5rem)] -right-16 w-16 bg-red-800 text-white flex flex-col items-center group-hover:right-0 transition-all p-3 gap-3">
				<FaPlayCircle size={32} />
				<div className="h-[2px] bg-white w-full rounded-full"></div>
				<FaInfoCircle size={32} />
				<div className="h-[2px] bg-white w-full rounded-full"></div>
				<FaFileDownload size={32} />
			</div>
		</div>
	);
};

export default PlaylistPage;
