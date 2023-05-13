import React from "react";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import Link from "../../components/Link";

const BlogPage = () => {
  const AllBlogPostMetaData = BlogPostMetaDataSet;

  return (
    <ul className="h-full list-disc">
      {AllBlogPostMetaData.map((postMetaData) => (
        <li key={postMetaData.id} className="text-blue-600 hover:text-blue-800">
          <Link
            target={`/blog/${postMetaData.slug}`}
            displayTarget={postMetaData.title}
          />
        </li>
      ))}
    </ul>
  );
};

BlogPage.getLayout = BlogPageLayout;

export default BlogPage;
