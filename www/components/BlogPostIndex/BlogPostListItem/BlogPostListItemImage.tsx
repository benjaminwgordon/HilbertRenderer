import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type BlogPostListItemImageProps = {
  image: StaticImageData;
  slug: string;
  title: string;
};

const BlogPostListItemImage = (props: BlogPostListItemImageProps) => {
  const { image, slug, title } = props;
  return (
    image && (
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
    )
  );
};

export default BlogPostListItemImage;
