import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  type navbarLinkTarget = {
    route: string;
    name: string;
  };
  const navbarLinks: navbarLinkTarget[] = [
    {
      route: "/",
      name: "Home",
    },
    {
      route: "/blog",
      name: "Blog",
    },
    {
      route: "/hire-me",
      name: "Hire Me",
    },
  ];

  const navbarLinkJSX = navbarLinks.map((link) => {
    const router = useRouter();
    const currentPath = router.pathname.split("/")[1];

    const isActivePath = (currentPath, linkPath) => {
      return currentPath === linkPath.replace("/", "");
    };

    return (
      <li
        key={`navbar-link-to-${link.name}`}
        className={`list-none p-2 text-center border-b-2 font-semibold ${
          isActivePath(currentPath, link.route)
            ? ` border-gray-200`
            : `border-gray-800`
        }`}
      >
        <Link href={link.route}>{link.name}</Link>
      </li>
    );
  });

  return (
    <div className="p-1 bg-gray-800 text-gray-200 w-full flex flex-row justify-end">
      <nav className="max-w-xl w-full flex flex-row justify-end">
        {navbarLinkJSX}
      </nav>
    </div>
  );
};

export default Navbar;
