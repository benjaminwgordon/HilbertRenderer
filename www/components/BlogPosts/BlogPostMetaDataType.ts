type BlogPostMetadataType = {
  id: number;
  slug: string;
  title: string;
  author: string;
  publishDate: Date | null;
  blurb: string;
};

export default BlogPostMetadataType;
