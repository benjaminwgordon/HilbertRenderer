import React from "react";
import BlogPostMetaDataType from "../../components/BlogPosts/BlogPostMetaDataType";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import Section from "../../components/BlogPosts/Section";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import BlogPostMetaDataDisplay from "../../components/BlogPosts/BlogPostMetaDataDisplay";
import HilbertThreeRenderer from "../../components/HilbertThreeRenderer";
import Link from "../../components/Link";
import { BlogPostTechnologyDescriptionProps } from "../../components/BlogPosts/BlogPostTechnologyDescription";
import BlogPostTechStack from "../../components/BlogPosts/BlogPostTechStack";

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
          <p className="pb-8">
            This is part 5 in my series on Hilbert Curves. If this is your first
            entry into my blog series, then welcome! If you aren't already
            familiar with Hilbert curves, then you may want to start from the
            beginning:{" "}
            <Link
              target={"/blog/HilbertCurves1"}
              displayTarget={BlogPostMetaDataSet[0].title}
            />
          </p>
          <p className="pb-8">
            If you are already familiar with Hilbert Curves but havent seen the
            non-recursive algorithm for generating their vertex coordinates, you
            may be interested in the fourth post in this series:{" "}
            <Link
              target={"/blog/HilbertCurves4"}
              displayTarget={BlogPostMetaDataSet[3].title}
            />
          </p>
          <p className="pb-8">
            If you are all caught up, then welcome to part 5! In this article,
            I'm going to walk through how I built this blog, including all the
            embedded 3D renders. I'll also talk about some technical choices I
            made along the way, with special attention given to why I built this
            project using Rust and WebAssembly.
          </p>
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            Architecture Overview
          </h3>
          <p className="pb-8">
            Let's start with a quick overview of the technical stack behind this
            blog site.
          </p>
          <BlogPostTechStack />
        </Section>
      </article>
    </div>
  );
};

HilbertCurves2.getLayout = BlogPageLayout;

export default HilbertCurves2;
