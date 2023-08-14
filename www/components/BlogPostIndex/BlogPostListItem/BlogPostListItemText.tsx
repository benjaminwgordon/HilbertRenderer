import Link from "next/link";
import React from "react";

type BlogPostListItemTextProps = {
  slug: string;
  title: string;
  blurb: string;
};

const BlogPostListItemText = (props: BlogPostListItemTextProps) => {
  const { slug, title, blurb } = props;
  return (
    <div className="m-2">
      <div className="text-lg pl-2 font-bold mb-2">
        <Link href={`/blog/${slug}`}>{title}</Link>
      </div>
      <p className="text-gray-300 pl-6">{blurb}</p>
    </div>
  );
};

export default BlogPostListItemText;
