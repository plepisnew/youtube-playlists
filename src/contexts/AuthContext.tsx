import { Channel } from "@/@types/youtube";
import { trpc } from "@/utils/trpc";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export type AuthContext =
	| {
			authed: false;
	  }
	| ({
			authed: true;
	  } & Channel);

export const AuthContext: React.Context<AuthContext> = createContext(
	{} as AuthContext,
);

export const useAuth = () => useContext(AuthContext);

const parseJwt = (token: string) => {
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split("")
			.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
			.join(""),
	);

	return JSON.parse(jsonPayload);
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { data: channel, isSuccess } = trpc.channel.getSelf.useQuery();

	return (
		<AuthContext.Provider
			value={{
				...(isSuccess
					? {
							authed: true,
							...channel,
					  }
					: { authed: false }),
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
