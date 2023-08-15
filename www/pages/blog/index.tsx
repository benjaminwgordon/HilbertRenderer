import React from "react";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import BlogPostListView from "../../components/BlogPostIndex/BlogPostListView";

const BlogPage = () => {
  return (
    <div className="mb-16">
      <h2 className="ml-4 text-3xl font-bold font-raleway">The Blog</h2>
      <BlogPostListView />
    </div>
  );
};

BlogPage.getLayout = BlogPageLayout;

export default BlogPage;
