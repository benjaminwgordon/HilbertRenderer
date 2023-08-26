import React from "react";
import BlogPostTechnologyDescription, {
  BlogPostTechnologyDescriptionProps,
} from "./BlogPostTechnologyDescription";

import RustSVG from "../svg/rust-logo";
import NextjsSVG from "../svg/nextjs-logo";
import ThreeSVG from "../svg/three-logo";
import WasmSVG from "../svg/wasm-logo";

const BlogPostTechStack = () => {
  // data for tech stack description
  const techStackDescriptionData: BlogPostTechnologyDescriptionProps[] = [
    {
      technologyName: "Next.js",
      technologyIcon: NextjsSVG(null),
      technologyDescription:
        "I'm using Next.js for serving the blog as a statically rendered site.",
    },
    {
      technologyName: "Rust",
      technologyIcon: RustSVG({ filter: "invert(100%)" }),
      technologyDescription:
        "I developed the Binary Reflected Gray Code generator, the Skilling Transform, and the Hilbert Curve coordinate generator in Rust.  I'm a big fan of Rust; it's blazingly fast, and the strong typing prevented quite a few errors during development.  The speed of Rust was particularly helpful for me while I was incrementally developing and proving the various parts of the Hilbert Curve generator, as I was able to generate very large curves and write them out to OBJ files very quickly.  This let me visually prove whether or not my implementations were correct.  Had I done the Hilbert Curve generation in JavaScript, generating the large curves I used during development would have been much slower.  I'll post a more detailed performance comparison later on in this post.",
    },
    {
      technologyName: "WebAssembly",
      technologyIcon: WasmSVG(null),
      technologyDescription:
        "WebAssembly is what allows me to run my compiled Rust code in the browser.  Rust has a fantastic tool called Wasm-Bindgen that allows interop between more complex data types (normally only simple numerical types are supported), and automatically generates the necessary bindings to import the compiled .wasm as an ECMAScript module.  I'll walk through the entire process for creating all the necessary glue code and project structure later in this article.",
    },
    {
      technologyName: "Three.js",
      technologyIcon: ThreeSVG(null),
      technologyDescription:
        "Three.js is a 3D rendering framework designed for browsers.  It is a library built on WebGL 2.0, and provides a significantly easier API than working directly with WebGL.  I've built projects with WebGL 2.0 before, but after experiencing the ease of use of Three.js, I can confidently say that I'll be reaching for Three.js first on any future 3D rendering projects.",
    },
  ];

  const techStackJSX = techStackDescriptionData.map((technology, index) => {
    const { technologyName, technologyIcon, technologyDescription } =
      technology;
    return (
      <BlogPostTechnologyDescription
        key={index}
        technologyName={technologyName}
        technologyIcon={technologyIcon}
        technologyDescription={technologyDescription}
      />
    );
  });

  return <div>{techStackJSX}</div>;
};

export default BlogPostTechStack;
