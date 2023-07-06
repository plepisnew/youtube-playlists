import { trpc } from "@/utils/trpc";
import { PropsWithChildren, createContext, useContext, useState } from "react";

export type AuthContext = (
	| {
			authed: false;
	  }
	| {
			authed: true;
			username: string;
			pictureSrc: string;
	  }
) & {
	login: () => void;
	logout: () => void;
};

export const defaultAuthContext: AuthContext = {
	authed: false,
	login: () => (window.location.pathname = "/api/auth/login"),
	logout: () => (window.location.pathname = "/api/auth/logout"),
};

export const AuthContext = createContext(defaultAuthContext as AuthContext);

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
	const [value, setValue] = useState<AuthContext>(defaultAuthContext);

	const { data } = trpc.channel.getSelf.useQuery();
	console.log(data);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
