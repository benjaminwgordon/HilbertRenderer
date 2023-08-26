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
import SectionParagraph from "../../components/BlogPosts/SectionParagraph";
import DarkCodeBlock from "../../components/BlogPosts/DarkCodeBlock";
import SectionHeader from "../../components/BlogPosts/SectionHeader";

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
          <SectionParagraph>
            This is part 5 in my series on Hilbert Curves. If this is your first
            entry into my blog series, then welcome! If you aren't already
            familiar with Hilbert curves, then you may want to start from the
            beginning:{" "}
            <Link
              target={"/blog/HilbertCurves1"}
              displayTarget={BlogPostMetaDataSet[0].title}
            />
          </SectionParagraph>
          <SectionParagraph>
            If you are already familiar with Hilbert Curves but haven't seen the
            non-recursive algorithm for generating their vertex coordinates, you
            may be interested in the fourth post in this series:{" "}
            <Link
              target={"/blog/HilbertCurves4"}
              displayTarget={BlogPostMetaDataSet[3].title}
            />
          </SectionParagraph>
          <SectionParagraph>
            If you are all caught up, then welcome to part 5! In this article,
            I'm going to walk through how I built this blog, including all the
            embedded 3D renders. I'll also talk about some technical choices I
            made along the way, with special attention given to why I built this
            project using Rust and WebAssembly.
          </SectionParagraph>
        </Section>
        <Section>
          <SectionHeader>Architecture Overview</SectionHeader>
          <BlogPostTechStack />
        </Section>
        <Section>
          <SectionHeader>Implementation</SectionHeader>
          <SectionParagraph>
            Now that we've discussed all the technologies involved, let's walk
            through how they all fit together. I've built a React component for
            the Three.js renders, which uses a React ref to mount a WebGL 2.0
            canvas into the DOM. The component takes as props various parameters
            that control the shape of the generated Hilbert curve, such as the
            number of dimensions, the scale of each dimension, rendering mode,
            etc...
          </SectionParagraph>
          <SectionParagraph>
            On first render, or on any of these input parameters being changed
            by the user, a useEffect fires. This useEffect triggers clearing the
            canvas and preparing it for a new draw using ThreeJS calls. Now that
            the canvas is prepared for a new content draw, a call is made to the
            imported WASM module. The call into WASM passes two arguments, "n"
            and "p", which specify dimensions and scale on the Hilbert Curve.
            This is the Rust code that generates the called function. It takes
            two arguments, n and p, and calculates the coordinates of a Hilbert
            Curve by calling into the hilbert_curve_generator crate, which is a
            public library crate on Crates.io that I developed and published.
          </SectionParagraph>
          <DarkCodeBlock
            text={`#[wasm_bindgen]
pub fn hilbert_coordinates(n: u32, p: u32) -> js_sys::Uint32Array {
    let hilbert_curve = HilbertCurve::new(n, p).unwrap();
    let hilbert_curve_len = (hilbert_curve.coordinates.len() * 3) as u32;
    let out = js_sys::Uint32Array::new_with_length(hilbert_curve_len);

    for i in 0..hilbert_curve.coordinates.len() {
        let (x, y, z) = hilbert_curve.coordinates[i];
        out.set_index((i * 3) as u32, x);
        out.set_index((i * 3 + 1) as u32, y);
        out.set_index((i * 3 + 2) as u32, z);
    }

    out
}`}
            language={"Rust"}
          />
          <SectionParagraph>
            Effectively, this is just glue code that takes in the arguments
            passed from the JS, passes them into the function imported from the
            HilbertCurve crate, converts the result into a flattened array, and
            returns it as a js_sys Uint32Array back to the calling JS function.
            The calling JS function is responsible for unflattening this array.
          </SectionParagraph>
          <SectionParagraph>
            Due to the impressive Wasm-Bindgen and js-sys tooling, I can ignore
            many of the layers of interop, and just think of my React component
            as calling directly into this Rust code. Here is the snippet from
            the React component:
          </SectionParagraph>
          <DarkCodeBlock
            text={`const hilbert_flat_buffer = wasm.hilbert_coordinates(n, p);
const hilbertVectors = unflattenHilbertVectors(hilbert_flat_buffer);
`}
            language={"TypeScript"}
          />
          <SectionParagraph>
            From this point, the remaining code is entirely TypeScript-focused
            on Three.js. First, we set up the scene for a new draw, including
            creating a new Camera that is positioned for the new geometry:
          </SectionParagraph>
          <DarkCodeBlock
            text={`const hilbert_flat_buffer = wasm.hilbert_coordinates(n, p);
const hilbertVectors = unflattenHilbertVectors(hilbert_flat_buffer)
          
// remove all geometries from the scene
clearScene(scene);

// replace the existing camera with a new camera
camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

/* create a Three.js geometry representing a line "pipe" 
 of the Hilbert Curve.  These pipes can be square or rounded
 depending on the value of the geometryType boolean.
 
 This geometry will never enter the scene, instead it is used
 as a template that we will clone repeatedly for each line segment
 of the Hilbert Curve. */
const roundedGeometry = new THREE.CapsuleGeometry(pipeThickness, 1, 2);
const squareGeometry = new THREE.BoxGeometry(
  pipeThickness,
  1 + pipeThickness,
  pipeThickness
);
const pipeGeometry =
      geometryType == "round" ? roundedGeometry : squareGeometry;
      
// rotate the template pipe 90 degrees around X and Z
pipeGeometry.rotateX(1.5708);
pipeGeometry.rotateZ(1.5708);
`}
            language={"TypeScript"}
          />
          <SectionParagraph>
            At this point, we've cleared the scene, and built the template for
            each new line segment. What remains is to process the HilbertCurve
            coordinates we've generated by the imported WASM module. To generate
            each line segment, we need the vector from the previous coordinate
            to the current coordinate. We can then clone the template, and
            rotate and translate the clone into the correct position based on
            the calculated vector.
          </SectionParagraph>
          <DarkCodeBlock
            text={`const geometries = [];
for (let i = 1; i < hilbertVectors.length; i++) {

  // clone the template pipe
  const lineInGeometry = pipeGeometry.clone();

  // edge case, the first vertex in the series doesn't have a previous vertex
  const previousVertex =
    i == 0 ? new THREE.Vector3(0, 0, 0) : hilbertVectors[i - 1];

  // lineInDirection is the vector from the previous vertex to the current vertex
  const lineInDirection = hilbertVectors[i]
    .clone()
    .sub(previousVertex)
    .normalize();
  
  // rotate the new pipe to align it to the lineInDirection vector
  lineInGeometry.lookAt(lineInDirection);

  // move the pipe into the correct position in the scene
  lineInGeometry.translate(
    hilbertVectors[i].x - lineInDirection.x * 0.5,
    hilbertVectors[i].y - lineInDirection.y * 0.5,
    hilbertVectors[i].z - lineInDirection.z * 0.5
  );
  geometries.push(lineInGeometry);
}
`}
            language={"TypeScript"}
          />
          <SectionParagraph>
            Now we have a "geometries" array representing all the pipes of the
            Hilbert Curve. The remaining code is Three.js configuration.
          </SectionParagraph>
          <DarkCodeBlock
            text={`// Merge all the pipe geometries in the array into a single complex geometry
const hilbertGeometries = mergeGeometries(geometries);

// construct a Three.Mesh from the geometries and a previously defined material
const hilbertMeshes = new THREE.Mesh(hilbertGeometries, pipeMaterial);

/* The geometries have all been merged, so we can use Three.Geometry.center() to 
translate the entire geometry to be centered on (0,0,0) in the scene.  This makes
rotating the camera around the model much easier */
hilbertMeshes.geometry.center();
scene.add(hilbertMeshes);
`}
            language={"TypeScript"}
          />
          <SectionParagraph>
            At this point, we've added the Hilbert Curve to the scene, but it
            won't be visually interesting without some colors. Instead of
            coloring the individual faces of each pipe using textures or
            materials, it will be easier to add directional lights to the scene
            which will "paint" colors onto the different faces of the mesh.
          </SectionParagraph>
          <DarkCodeBlock
            text={`// 4 directional lights will create different colors on each face of the pipes
const lightOne = new THREE.DirectionalLight(0x00ffff, 0.7);
const lightTwo = new THREE.DirectionalLight(0x00ff00, 0.6);
const lightThree = new THREE.DirectionalLight(0xff00ff, 0.7);
const lightFour = new THREE.DirectionalLight(0xff0000, 0.7);

/* the directional lights always point towards (0,0,0), so 
 translating them also changes their direction */
lightOne.position.set(0, -1, 0);
lightTwo.position.set(0, 1, 0);
lightThree.position.set(-1, 0, 0);
lightFour.position.set(1, 0, 0);

for (const light of [lightOne, lightTwo, lightThree, lightFour]) {
  scene.add(light);
}

/* adding an ambient light to the scene allows finer control over
 the overall brightness of the colors */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);`}
            language={"JavaScript"}
          />
        </Section>
        <Section>
          <SectionHeader>Wrap Up</SectionHeader>
          <SectionParagraph>
            And that's effectively all there is to it! There is some glue code,
            UI and React State management, and additional Three.js setup that
            you are welcome to view on my{" "}
            <Link
              target={"https://github.com/benjaminwgordon"}
              displayTarget={"GitHub"}
            ></Link>{" "}
          </SectionParagraph>
          <SectionParagraph>
            I set out to build this renderer as a way to learn more about
            Hilbert Curves, Rust, Web Assembly, and Three.js. It was maybe too
            many new technologies to tackle all in one new project, but I'm
            still very happy with how it turned out. I hope you found this
            material as interesting as I did, and thanks for coming along for
            the ride!
          </SectionParagraph>
          <SectionParagraph>
            I'm also currently looking for a new software engineering role. If
            you'd like to know more, please take a moment to read my{" "}
            <Link target={"/hire-me"} displayTarget={"About"}></Link> Page
          </SectionParagraph>
        </Section>
      </article>
    </div>
  );
};

HilbertCurves2.getLayout = BlogPageLayout;
1;
export default HilbertCurves2;
