"use client";

import { PropsWithChildren } from "react";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/Header";
import "./index.css";
import { PageBody } from "@/components/PageBody";
import { trpc } from "@/utils/trpc";
import { AuthProvider } from "@/contexts/AuthContext";

const montserrat = Montserrat({ subsets: ["latin"] });

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<html>
			<head>
				<title>YPI - YouTube Playlist Inspector</title>
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<meta name="description" content="YouTube OAuth Client demo" />
			</head>
			<body className={montserrat.className}>
				<AuthProvider>
					<Header />
					<PageBody>{children}</PageBody>
				</AuthProvider>
			</body>
		</html>
	);
};

export default trpc.withTRPC(RootLayout);
