import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import _ from "lodash";

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

  return (
    <header
      className={clsx(
        "fixed left-0 right-0",
        "flex items-center justify-between h-[70px] px-10",
        "from-red-700 to-red-800 bg-gradient-to-br text-white text-l",
        "shadow-md"
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
                  "w-[100px]"
                )}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <a href="/api/auth/login">Sign in</a>
      <div
        className={clsx(
          "absolute left-0 right-0 bottom-3",
          "h-[2px]",
          "bg-white/30"
        )}
      ></div>
      <div
        className={clsx(
          "absolute bottom-3",
          "h-[2px] w-[100px]",
          "bg-white/90 transition-all"
        )}
        style={{
          left: `calc(2.5rem + ((100px + 1.25rem) * ${selectedIndex}))`,
        }}
      ></div>
    </header>
  );
};
