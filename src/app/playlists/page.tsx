"use client";

import moment from "moment";
import { trpc } from "@/utils/trpc";
import * as YouTube from "@/@types/youtube";

const PlaylistsPage: React.FC = () => {
	const {
		data: playlists,
		status,
		error,
	} = trpc.playlist.getSelf.useQuery({ part: ["snippet", "contentDetails"] });

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
		<div>
			{playlists.map((playlist) => (
				<PlaylistCard key={playlist.id} playlist={playlist} />
			))}
		</div>
	);
};

const PlaylistCard: React.FC<{ playlist: YouTube.Playlist }> = ({
	playlist,
}) => {
	const { snippet, contentDetails } = playlist;
	return (
		<div className="text-white rounded-lg overflow-hidden flex">
			<img
				src={snippet.thumbnails["medium"].url}
				alt={contentDetails.itemCount.toString()}
			/>
			<div className="bg-red-700/40 border-2 border-red-700 grow p-2">
				<h1>{snippet.title}</h1>
				<p>{snippet.description}</p>
				<p>{moment(snippet.publishedAt).fromNow()}</p>
				<p>{contentDetails.itemCount} videos</p>
			</div>
		</div>
	);
};

export default PlaylistsPage;
