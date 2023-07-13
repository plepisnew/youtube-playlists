import clsx from "clsx";
import { PropsWithChildren } from "react";

export const PageBody: React.FC<PropsWithChildren> = ({ children }) => (
	<main
		className={clsx("from-neutral-100 to-neutral-200")}
		style={{ padding: "1.5rem 2.5rem", paddingTop: `calc(70px + 1.5rem)` }}
	>
		{children}
	</main>
);
