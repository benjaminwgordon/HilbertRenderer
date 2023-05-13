import React from "react";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import Link from "../../components/Link";

const BlogPage = () => {
  const AllBlogPostMetaData = BlogPostMetaDataSet;

  return (
    <div>
      <h2 className="text-3xl font-bold font-raleway">Welcome to my Blog</h2>
      <ul className="h-full list-disc mt-4 ml-6">
        {AllBlogPostMetaData.map((postMetaData) => (
          <li
            key={postMetaData.id}
            className="text-blue-600 hover:text-blue-800"
          >
            <Link
              target={`/blog/${postMetaData.slug}`}
              displayTarget={postMetaData.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

BlogPage.getLayout = BlogPageLayout;

export default BlogPage;
