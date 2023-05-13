import React from "react";
import BlogPostMetaDataType from "../../components/BlogPosts/BlogPostMetaDataType";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import Section from "../../components/BlogPosts/Section";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import BlogPostMetaDataDisplay from "../../components/BlogPosts/BlogPostMetaDataDisplay";
import HilbertThreeRenderer from "../../components/HilbertThreeRenderer";
import Link from "../../components/Link";
import NextLink from "next/link";

const HilbertCurves3 = () => {
  const HilbertCurves1Metadata: BlogPostMetaDataType = BlogPostMetaDataSet[2];
  const { id, slug, title, author, publishDate } = HilbertCurves1Metadata;

  return (
    <div className="m-2">
      <article className="">
        <BlogPostMetaDataDisplay
          id={id}
          slug={slug}
          title={title}
          author={author}
          publishDate={publishDate}
        />

        <Section>
          <p className="mb-8">
            This is part 3 of a series on Hilbert Curves. To start from the
            beginning, please visit{" "}
            <Link
              target={"/blog/HilbertCurves1"}
              displayTarget={BlogPostMetaDataSet[0].title}
            />
          </p>
          <p className="mb-8">
            Now that we've discussed how Hilbert Curves are built, I think its
            only fair I let you play around in my Hilbert Curve Sandbox! Feel
            free to play with the controls and see what effects they have on the
            Hilbert Curve.
          </p>

          <div className="bg-gray-200 p-6 rounded-md mb-8">
            <p className="">
              One word of caution, the performance of this sandbox is heavily
              reliant on the power of your graphics card. Computers with less
              recent hardware will see signifigant slowdown when increasing the
              magnitude of the Hilbert Curve. If you are visiting this site on
              mobile, or a computer with older hardware, you will likely see the
              best results with Hilbert Curves of order 4 or less. (The initial
              curve is of order 3)
            </p>
          </div>
          <p className="mb-8">
            Once you are done, check out the next post in the series where I dig
            into the algorithm I use to generate the Hilbert Geometry:{" "}
            <Link
              target={"/blog/HilbertCurves4"}
              displayTarget={BlogPostMetaDataSet[3].title}
            />
          </p>
          <div className="m-auto w-screen left-0 h-screen flex justify-center pb-8">
            <div className=" w-full flex justify-center content-center">
              <HilbertThreeRenderer
                initN={3}
                initP={3}
                initPipeThickness={0.3}
                initGeometryType={"square"}
                isControlEnabled={true}
                isSpinning={true}
                rotationSpeed={0.003}
                isCameraOffSetY={true}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-xl rounded-md self-end">
              <NextLink href={"/blog/HilbertCurves4"}>Next Post</NextLink>
            </button>
          </div>
        </Section>
      </article>
    </div>
  );
};

HilbertCurves3.getLayout = BlogPageLayout;

export default HilbertCurves3;
