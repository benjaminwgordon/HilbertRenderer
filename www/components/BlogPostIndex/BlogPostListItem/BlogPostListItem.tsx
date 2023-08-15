import React from "react";
import Link from "next/link";
import BlogPostListItemImage from "./BlogPostListItemImage";
import { StaticImageData } from "next/image";
import BlogPostListItemText from "./BlogPostListItemText";

type BlogPostListItemProps = {
  id: number;
  slug: string;
  title: string;
  blurb: string;
  image: StaticImageData;
};

const BlogPostListItem = (props: BlogPostListItemProps) => {
  const { id, title, slug, blurb, image } = props;

  return (
    <li key={id} className="mx-4 list-none overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="mx-auto w-full sm:w-64">
          <BlogPostListItemImage image={image} slug={slug} title={title} />
        </div>{" "}
        <div className="flex flex-col rounded-md">
          <BlogPostListItemText slug={slug} title={title} blurb={blurb} />
        </div>
      </div>
    </li>
  );
};

export default BlogPostListItem;
