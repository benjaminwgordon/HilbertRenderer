import BlogPostMetaData from "../../components/BlogPosts/BlogPostMetaDataDisplay";
import BlogPostMetaDataSet from "../../components/BlogPosts/BlogPostMetaDataSet";
import BlogPostMetaDataType from "../../components/BlogPosts/BlogPostMetaDataType";
import Section from "../../components/BlogPosts/Section";
import HilbertThreeRenderer from "../../components/HilbertThreeRenderer";
import Link from "../../components/Link";
import BlogPageLayout from "../../components/BlogPosts/BlogPageLayout";
import BlogPostMetaDataDisplay from "../../components/BlogPosts/BlogPostMetaDataDisplay";
import NextLink from "next/link";

const HilbertCurves1Metadata: BlogPostMetaDataType = BlogPostMetaDataSet[0];
const { id, slug, title, author, publishDate } = HilbertCurves1Metadata;
const HilbertCurves1 = () => {
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
        <div className=" w-full h-96 mb-8 flex justify-center content-center">
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
          <p>
            I recently{" "}
            <Link
              target="https://www.recurse.com/about"
              displayTarget={`\"never graduated\"`}
            />{" "}
            from the Recurse Center, a self-directed, community-driven
            educational retreat for programmers in New York City. The Recurse
            Center promotes a self-directed approach to learning, where there
            are no teachers or curriculum, rather, each student works on what
            interests them most, with the support of a community of other highly
            motivated students.
          </p>
        </Section>

        <Section>
          <p>
            During my time at the Recurse Center (which I'll now refer to as
            "RC"), I committed to self-study a list of technologies, languages,
            and concepts:
          </p>
          <ul className="list-disc pl-8 mt-2">
            <li>
              A compiled high-performance programming language (
              <Link target="https://www.rust-lang.org/" displayTarget="Rust" />)
            </li>
            <li>
              Low-level computer hardware through the{" "}
              <Link
                target="https://www.nand2tetris.org/"
                displayTarget="Nand2Tetris"
              />{" "}
              course
            </li>
            <li>
              Gaining a preliminary understanding of Distributed Systems from
              Martin Kleppman's{" "}
              <Link
                target="https://martin.kleppmann.com/"
                displayTarget="Designing Data Intensive Applications"
              />
            </li>
            <li>
              Learning more about 3D graphics through rasterization and
              rendering techniques
            </li>
          </ul>
        </Section>

        <Section>
          In this blog post, I'm going to focus primarily on Rust and 3D
          Graphics, and the unexpected journey I undertook through the land of
          Rust, Web Assembly, ThreeJS, and algorithms for generating
          space-filling curves.
        </Section>

        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            Background and Motivation
          </h3>
          <p>
            When I started this project, I had just finished an OBJ file
            renderer using WebGL, Rust, and WebAssembly. That project was a
            webpage that rendered a complex 40,000 vertex 3D model, and allowed
            to user to rotate that model with mouse controls. I had taken on
            that project with the intention of learning more about Rust and
            WebAssembly. After finishing, I felt much stronger on the core
            principles of Rust and WebAssembly using{" "}
            <Link
              target={"https://docs.rs/wasm-bindgen/0.2.85/wasm_bindgen/"}
              displayTarget={"Wasm-Bindgen"}
            ></Link>
            , but I felt I hadn't taken full advantage of WASM's performance or
            Rust's type system.
          </p>
        </Section>
        <Section>
          <p>
            For my next project, I set out to take full advantage of Rust and
            WebAssembly by generating geometries in real-time. The only question
            was "What geometry was both visually interesting and industrially
            useful enough to build a project around?" My answer is Hilbert
            Curves.
          </p>
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            So what is a Hilbert Curve?
          </h3>
          <p className="mb-8">
            A Hilbert Curve is a fractal space-filling curve. In essence, it is
            one of many possible ways to fold a line segment such that it passes
            through all points in a unit square, where the resulting curve forms
            a fractal pattern.
          </p>
          <p className="mb-8">
            Hilbert Curves have some special properties that make them stand out
            in term of industrial use. Specifically, they have good locality
            preservation, meaning that any two points on the line segment that
            are near each other in 1D space will continue to be close to each
            other once the curve is folded into a 2D arrangement. This property
            makes these curves useful for a wide variety of applications
            including data storage, data visualization, 3D graphics, image
            processing, etc...
          </p>
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            How do I make one?
          </h3>
          <p className="mb-8">
            If you want a deep dive into the math of Hilbert Curve generation,
            keep an eye out for part 2 of this series where I dig into math
            behind the Skilling Transform. For now, I'll be approaching the
            topic of Hilbert Curve construction purely visually using the
            recursive approach.
          </p>
          <p className="mb-8">
            To get us started, here is the base unit of a Hilbert Curve. This
            "U" shape is a first-order Hilbert Curve. All of our higher-order
            Hilbert Curves in the future will be built from many copies of this
            first order curve, so you can think of this as our building block.
          </p>
          <div className=" w-full h-96 mb-8 flex flex-col justify-center content-center">
            <HilbertThreeRenderer
              initN={2}
              initP={1}
              initPipeThickness={0.3}
              initGeometryType={"square"}
              isControlEnabled={false}
              isSpinning={true}
              isCameraOffSetY={false}
              rotationSpeed={0.004}
            />
            <p className="text-center text-gray-800 italic">
              2D Hilbert Curve, first order
            </p>
          </div>
          <p className="mb-8">
            To construct our second order Hilbert Curve, we will clone the first
            order Hilbert Curve 4 times, rotate each curve, then connect the
            segments together:
          </p>
          <div className=" w-full h-96 mb-8 flex flex-col justify-center content-center">
            <HilbertThreeRenderer
              initN={2}
              initP={2}
              initPipeThickness={0.3}
              initGeometryType={"square"}
              isControlEnabled={false}
              isSpinning={true}
              isCameraOffSetY={false}
              rotationSpeed={0.004}
            />
            <p className="text-center text-gray-800 italic">
              2D Hilbert Curve, second order
            </p>
          </div>
          <p className="mb-8">
            We can repeat this pattern once more, cloning the second order
            curve, rotating the copies, and then connecting each copy with a
            small line segment. This generates the third order Hilbert Curve:
          </p>
          <div className=" w-full h-96 mb-8 flex flex-col justify-center content-center">
            <HilbertThreeRenderer
              initN={2}
              initP={3}
              initPipeThickness={0.3}
              initGeometryType={"square"}
              isControlEnabled={false}
              isSpinning={true}
              isCameraOffSetY={false}
              rotationSpeed={0.004}
            />
            <p className="text-center text-gray-800 italic">
              2D Hilbert Curve, third order
            </p>
          </div>
          <p className="mb-8">
            Since the pattern is recursive, we can repeat this operation
            indefinitely to keep generating higher order curves. I'll spare you
            more boring exposition and just render the 4th, 5th, and 6th order
            curves:
          </p>
          <div className=" w-full h-96 mb-8 flex flex-col justify-center content-center">
            <HilbertThreeRenderer
              initN={2}
              initP={4}
              initPipeThickness={0.3}
              initGeometryType={"square"}
              isControlEnabled={false}
              isSpinning={true}
              isCameraOffSetY={false}
              rotationSpeed={0.004}
            />
            <p className="text-center text-gray-800 italic">
              2D Hilbert Curve, fourth order
            </p>
          </div>
          <div className=" w-full h-96 mb-8 flex flex-col justify-center content-center">
            <HilbertThreeRenderer
              initN={2}
              initP={5}
              initPipeThickness={0.3}
              initGeometryType={"square"}
              isControlEnabled={false}
              isSpinning={true}
              isCameraOffSetY={false}
              rotationSpeed={0.004}
            />
            <p className="text-center text-gray-800 italic">
              2D Hilbert Curve, fifth order
            </p>
          </div>
          <div className=" w-full h-96 mb-8 flex flex-col justify-center content-center">
            <HilbertThreeRenderer
              initN={2}
              initP={6}
              initPipeThickness={0.3}
              initGeometryType={"square"}
              isControlEnabled={false}
              isSpinning={true}
              isCameraOffSetY={false}
              rotationSpeed={0.004}
            />
            <p className="text-center text-gray-800 italic">
              2D Hilbert Curve, sixth order
            </p>
          </div>
        </Section>
        <Section>
          <h3 className="font-bold text-2xl underline mb-2">
            Hungry for More?
          </h3>
          <p className="mb-8">
            And that's all for now! If you are interested in seeing how this
            recursive method carries over from generating 2D Hilbert Planar
            Curves into 3D Hilbert Spatial Cubes, check out{" "}
            <Link target={"/blog/HilbertCurves2"} displayTarget={"Part 2"} /> of
            this series!
          </p>
          <div className="flex flex-row">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-xl rounded-md self-end">
              <NextLink href={"/blog/HilbertCurves2"}>Next Post</NextLink>
            </button>
          </div>
        </Section>
      </article>
    </div>
  );
};

HilbertCurves1.getLayout = BlogPageLayout;

export default HilbertCurves1;
