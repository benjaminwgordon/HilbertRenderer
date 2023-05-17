import React from "react";
import BlogPostMetaDataType from "../../components/BlogPosts/BlogPostMetaDataType";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import Section from "../../components/BlogPosts/Section";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import BlogPostMetaDataDisplay from "../../components/BlogPosts/BlogPostMetaDataDisplay";
import HilbertThreeRenderer from "../../components/HilbertThreeRenderer";

const HilbertCurves2 = () => {
  const HilbertCurves1Metadata: BlogPostMetaDataType = BlogPostMetaDataSet[4];
  const { id, slug, title, author, publishDate, blurb, image } =
    HilbertCurves1Metadata;

  return (
    <div className="m-2">
      <article className="">
        <BlogPostMetaDataDisplay
          id={id}
          slug={slug}
          title={title}
          author={author}
          publishDate={publishDate}
          blurb={blurb}
          image={image}
        />
        <div className="w-full h-96 mb-8 flex justify-center content-center">
          <HilbertThreeRenderer
            initN={2}
            initP={5}
            initPipeThickness={0.3}
            initGeometryType={"square"}
            isControlEnabled={false}
            isSpinning={true}
            rotationSpeed={0.003}
            isCameraOffSetY={false}
          />
        </div>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            Using Web Assembly to Pass Hilbert Geometry from Rust to JavaScript
          </h3>
          <p className="pb-8">
            This article is currently under construction, please check back
            soon!
          </p>
        </Section>
      </article>
    </div>
  );
};

HilbertCurves2.getLayout = BlogPageLayout;

export default HilbertCurves2;
