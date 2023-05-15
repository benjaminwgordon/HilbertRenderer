import React from "react";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import Link from "next/link";

const BlogPage = () => {
  const AllBlogPostMetaData = BlogPostMetaDataSet;

  return (
    <div>
      <h2 className="text-3xl font-bold font-raleway">Welcome to my Blog</h2>
      <ul className="h-full list-disc mt-4">
        {AllBlogPostMetaData.map((postMetaData) => {
          const { id, title, slug, blurb } = postMetaData;
          return (
            <li key={id} className="list-none mb-4 ">
              <div className=" text-lg font-bold">
                <Link href={`/blog/${slug}`}>{title}</Link>
              </div>
              <p className=" pl-4 rounded-b-md">{blurb}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

BlogPage.getLayout = BlogPageLayout;

export default BlogPage;
