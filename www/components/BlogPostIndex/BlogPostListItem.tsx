import React from "react";
import BlogPostMetadataType from "../BlogPosts/BlogPostMetaDataType";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

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
    <li key={id} className="mx-4 list-none rounded-md overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="mx-auto w-full sm:w-64">
          {image && (
            <Link href={`/blog/${slug}`}>
              <Image
                src={image}
                alt={title + "preview image"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </Link>
          )}
        </div>{" "}
        <div className="flex flex-col bg-gray-900 rounded-r-md">
          <div className="m-2">
            <div className="text-lg pl-2 font-bold mb-2">
              <Link href={`/blog/${slug}`}>{title}</Link>
            </div>
            <p className="text-gray-300 pl-6">{blurb}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default BlogPostListItem;
