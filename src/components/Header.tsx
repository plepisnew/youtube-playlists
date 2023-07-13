import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import _ from "lodash";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

const navItems = [
	{
		title: "Home",
		path: "/",
	},
	{
		title: "Public",
		path: "/public",
	},
	{
		title: "Private",
		path: "/private",
	},
];

export const Header: React.FC = () => {
	const pathname = usePathname();
	const selectedIndex = _.findIndex(navItems, ({ path }) => path === pathname);
	const auth = useAuth();

	return (
		<header
			className={clsx(
				"fixed left-0 right-0",
				"flex items-center justify-between h-[70px] px-10",
				"from-red-700 to-red-800 bg-gradient-to-br text-white text-l",
				"shadow-md",
			)}
		>
			<nav>
				<ul className={clsx("flex gap-5")}>
					{navItems.map(({ title, path }, index) => (
						<li key={title}>
							<Link
								href={path}
								className={clsx(
									"flex justify-center items-center",
									"w-[100px]",
								)}
							>
								{title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			{auth.authed ? (
				<div className="flex h-full z-50 gap-3 items-center">
					<span>
						Signed in as&nbsp;
						<a
							href={`https://youtube.com/${auth.snippet.customUrl}`}
							className="font-semibold hover:underline"
							target="_blank"
						>
							{auth.snippet.title}
						</a>
					</span>
					<Image
						src={auth.snippet.thumbnails["default"].url}
						alt={auth.snippet.title}
						height={48}
						width={48}
						className="rounded-lg shdaow-md"
					/>
					<a href="/api/auth/logout">Sign out</a>
				</div>
			) : (
				<a href="/api/auth/login">Sign in</a>
			)}
			<div
				className={clsx(
					"absolute left-0 right-0 bottom-3",
					"h-[2px]",
					"bg-white/30",
				)}
			></div>
			<div
				className={clsx(
					"absolute bottom-3",
					"h-[2px] w-[100px]",
					"bg-white/90 transition-all",
				)}
				style={{
					left: `calc(2.5rem + ((100px + 1.25rem) * ${selectedIndex}))`,
				}}
			></div>
		</header>
	);
};
