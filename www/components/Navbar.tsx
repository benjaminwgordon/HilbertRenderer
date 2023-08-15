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
      name: "About",
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
        className={`list-none p-2 text-center border-b-2 text-xl ${
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
    <div className="bg-gray-800">
      <div className="px-4 mx-auto lg:max-w-3xl text-gray-200 font-sourcecodepro flex flex-row py-2 items-center">
        <h1 className="text-xl font-extrabold whitespace-nowrap">Ben Gordon</h1>
        <div className="w-full flex flex-row justify-end">
          <nav className="max-w-3xl w-full flex flex-row justify-end">
            {navbarLinkJSX}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
