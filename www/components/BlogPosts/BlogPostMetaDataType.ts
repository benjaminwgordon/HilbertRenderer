import { StaticImageData } from "next/image";

type BlogPostMetadataType = {
  id: number;
  slug: string;
  title: string;
  author: string;
  publishDate: Date | null;
  blurb: string;
  image: StaticImageData;
};

export default BlogPostMetadataType;
