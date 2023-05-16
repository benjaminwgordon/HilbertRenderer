import React from "react";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import Link from "next/link";
import Image from "next/image";

const BlogPage = () => {
  const AllBlogPostMetaData = BlogPostMetaDataSet;

  return (
    <div>
      <h2 className="ml-4 text-3xl font-bold font-raleway">The Blog</h2>
      <ul className="list-disc mt-4 max-w-3xl flex flex-col gap-6">
        {AllBlogPostMetaData.map((postMetaData) => {
          const { id, title, slug, blurb, image } = postMetaData;
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
        })}
      </ul>
    </div>
  );
};

BlogPage.getLayout = BlogPageLayout;

export default BlogPage;
