"use client";

import moment from "moment";
import { trpc } from "@/utils/trpc";
import * as YouTube from "@/@types/youtube";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const PlaylistsPage: React.FC = () => {
	const { data, status, error } = trpc.playlist.getSelf.useQuery({
		part: ["snippet", "contentDetails"],
	});

	if (status === "loading") return <span>Loading...</span>;

	if (status === "error")
		return (
			<div className="flex flex-col items-center gap-6">
				<h1 className="font-semibold text-2xl">Something went wrong :(</h1>
				<h2 className="font-medium text-lg">
					Send this to me at&nbsp;
					<pre className="inline rounded-lg bg-black text-green-500 p-3">
						ansis@plepis.me
					</pre>
					&nbsp;or debug it yourself pm me for the secrets
				</h2>
				<pre className="whitespace-pre-wrap rounded-lg bg-black text-green-500 p-3">
					{JSON.stringify(error, null, 2).replace("\\n ", "")}
				</pre>
			</div>
		);

	return (
		<div className="grid grid-cols-4">
			{data.items.map((playlist) => (
				<PlaylistCard key={playlist.id} playlist={playlist} />
			))}
		</div>
	);
};

const PlaylistCard: React.FC<{ playlist: YouTube.Playlist }> = ({
	playlist: { snippet, contentDetails, id },
}) => {
	return (
		<div className="rounded-lg overflow-hidden shadow-lg relative text-white">
			<div className="from-red-700 to-red-800 bg-gradient-to-br  p-3">
				<p>
					<span className="font-semibold">{snippet.title}</span> (
					{contentDetails.itemCount} videos) &#x2022;{" "}
					<span className="text-red-200">
						Created {moment(snippet.publishedAt).fromNow()}
					</span>
				</p>
			</div>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={snippet.thumbnails["maxres"].url} alt={snippet.title} />
			<Link
				href={`/playlists/${id}`}
				className="absolute bg-red-700 right-4 bottom-4 py-2 px-4 font-medium rounded-md border border-red-800 flex items-center gap-2 hover:bg-red-800 transition-colors"
			>
				Preview <FaPlay />
			</Link>
		</div>
	);
};

export default PlaylistsPage;
