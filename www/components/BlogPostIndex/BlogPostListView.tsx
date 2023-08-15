import React from "react";
import BlogPostMetaDataSet from "../BlogPosts/BlogPostMetaDataSet";
import BlogPostListItem from "./BlogPostListItem/BlogPostListItem";

type BlogPostListViewProps = {};

const BlogPostListView = (props: BlogPostListViewProps) => {
  // BlogPostMetaDataSet is the source of truth for blog post data
  const AllBlogPostMetaData = BlogPostMetaDataSet;
  return (
    <ul className="list-disc mt-4 max-w-3xl flex flex-col gap-6">
      {AllBlogPostMetaData.map((postMetaData, index) => {
        const { id, title, slug, blurb, image } = postMetaData;
        return (
          <>
            {index !== 0 && (
              <div className="h-1 w-full bg-gray-800 rounded-lg"></div>
            )}
            <BlogPostListItem
              key={index}
              id={id}
              slug={slug}
              title={title}
              blurb={blurb}
              image={image}
            />
          </>
        );
      })}
    </ul>
  );
};

export default BlogPostListView;
