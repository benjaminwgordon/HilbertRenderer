import NextLink from "next/link";

type LinkProps = {
  target: string;
  displayTarget: string;
};

const Link = (props: LinkProps) => {
  const { target, displayTarget } = props;
  return (
    <NextLink
      href={target}
      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
    >
      {displayTarget}
    </NextLink>
  );
};

export default Link;
