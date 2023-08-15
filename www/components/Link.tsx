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
      className="underline text-blue-500 hover:text-blue-200 visited:text-purple-500"
    >
      {displayTarget}
    </NextLink>
  );
};

export default Link;
