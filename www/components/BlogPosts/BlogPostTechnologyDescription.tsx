import Image, { StaticImageData } from "next/image";
import { FC } from "react";

export type BlogPostTechnologyDescriptionProps = {
  technologyName: string;
  technologyIcon: JSX.Element;
  technologyDescription: string;
};

const BlogPostTechnologyDescription = (
  props: BlogPostTechnologyDescriptionProps
) => {
  const { technologyName, technologyIcon, technologyDescription } = props;

  return (
    <section className="mb-8">
      <header className="flex flex-row items-center font-bold gap-4">
        <div className="w-24 h-24 flex justify-center items-center">
          {technologyIcon}
        </div>
        <h3 className="text-2xl">{technologyName}</h3>
      </header>
      <p className="ml-4">{technologyDescription}</p>
    </section>
  );
};

export default BlogPostTechnologyDescription;
