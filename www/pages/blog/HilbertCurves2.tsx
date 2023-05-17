import React from "react";
import BlogPostMetaDataType from "../../components/BlogPosts/BlogPostMetaDataType";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import Section from "../../components/BlogPosts/Section";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import BlogPostMetaDataDisplay from "../../components/BlogPosts/BlogPostMetaDataDisplay";
import HilbertThreeRenderer from "../../components/HilbertThreeRenderer";
import Link from "../../components/Link";
import NextLink from "next/link";

const HilbertCurves2 = () => {
  const HilbertCurves1Metadata: BlogPostMetaDataType = BlogPostMetaDataSet[1];
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
            Exploring New Dimensions
          </h3>
          <p className="mb-8">
            You may have noticed that in{" "}
            <Link target={"/blog/HilbertCurves1"} displayTarget={"Part 1"} /> of
            this Hilbert Curve series, I labeled all these curves as 2D Hilbert
            Curves. Each of the previously rendered curves has been a 2D Planar
            Curve, but there is nothing preventing us using the same methods to
            generate 3D Spatial Curves. Let's start by defining our first order
            curve in 3D, so that we have the building block to generate our
            future curves from:
          </p>
          <div className=" w-full h-96 mb-8 flex flex-col justify-center content-center">
            <HilbertThreeRenderer
              initN={3}
              initP={1}
              initPipeThickness={0.3}
              initGeometryType={"square"}
              isControlEnabled={false}
              isSpinning={true}
              isCameraOffSetY={false}
              rotationSpeed={0.004}
            />
            <p className="text-center text-gray-800 italic">
              3D Hilbert Curve, first order
            </p>
          </div>
          <p className="mb-8">
            You'll have likely noticed that our previous 2D curves were all
            square in dimension. The same will be true for all our 3D Hilbert
            Curves, only now they will be cubes. The same clone-rotate-connect
            algorithm can be used to construct 3D curves, only we will need 7
            new clones, rather then the previous 3.
          </p>
          <div className=" w-full h-96 mb-8 flex flex-col justify-center content-center">
            <HilbertThreeRenderer
              initN={3}
              initP={2}
              initPipeThickness={0.3}
              initGeometryType={"square"}
              isControlEnabled={false}
              isSpinning={true}
              isCameraOffSetY={false}
              rotationSpeed={0.004}
            />
            <p className="text-center text-gray-800 italic">
              3D Hilbert Curve, second order
            </p>
          </div>
          <div className=" w-full h-96 mb-8 flex flex-col justify-center content-center">
            <HilbertThreeRenderer
              initN={3}
              initP={3}
              initPipeThickness={0.3}
              initGeometryType={"square"}
              isControlEnabled={false}
              isSpinning={true}
              isCameraOffSetY={false}
              rotationSpeed={0.004}
            />
            <p className="text-center text-gray-800 italic">
              3D Hilbert Curve, third order
            </p>
          </div>
          <Section>
            <h3 className="font-bold text-2xl underline mb-2">
              Hungry for More?
            </h3>
            <p className="mb-8">
              That's all for this post! These renderers are computationally
              expensive, so I'm limited to only a few per page. If you'd like to
              visually explore these curves further, check out part 3 of this
              series where I provide an in-browser sandbox where you can
              manipulate a Hilbert Curve:{" "}
              <Link
                target={"/blog/HilbertCurves3"}
                displayTarget={BlogPostMetaDataSet[2].title}
              />
            </p>
            <p className="mb-2">
              If you are interested in the algorithm I use to generate these
              curves, or how I render them in your browser, you can check out
              parts 4 and 5 of this series:
            </p>
            <ul className="ml-8 list-disc">
              <li>
                <Link
                  target={"/blog/HilbertCurves4"}
                  displayTarget={BlogPostMetaDataSet[3].title}
                />
              </li>
              <li>
                <Link
                  target={"/blog/HilbertCurves5"}
                  displayTarget={BlogPostMetaDataSet[4].title}
                />
              </li>
            </ul>
          </Section>
          <div className="flex flex-row">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-xl rounded-md self-end">
              <NextLink href={"/blog/HilbertCurves3"}>Next Post</NextLink>
            </button>
          </div>
        </Section>
      </article>
    </div>
  );
};

HilbertCurves2.getLayout = BlogPageLayout;

export default HilbertCurves2;
