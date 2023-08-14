import React from "react";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import BlogPostListItem from "../../components/BlogPostIndex/BlogPostListItem";

const BlogPage = () => {
  const AllBlogPostMetaData = BlogPostMetaDataSet;

  return (
    <div>
      <h2 className="ml-4 text-3xl font-bold font-raleway">The Blog</h2>
      <ul className="list-disc mt-4 max-w-3xl flex flex-col gap-6">
        {AllBlogPostMetaData.map((postMetaData) => {
          const { id, title, slug, blurb, image } = postMetaData;
          return (
            <BlogPostListItem
              id={id}
              slug={slug}
              title={title}
              blurb={blurb}
              image={image}
            />
          );
        })}
      </ul>
    </div>
  );
};

BlogPage.getLayout = BlogPageLayout;

export default BlogPage;
