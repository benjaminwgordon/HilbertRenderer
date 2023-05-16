import BlogPostMetadataType from "./BlogPostMetaDataType";

import Post1Img from "../../public/1.png";
import Post2Img from "../../public/2.png";
import Post3Img from "../../public/3.png";
import Post4Img from "../../public/4.png";
import Post5Img from "../../public/5.png";

const BlogPostMetaDataSet: BlogPostMetadataType[] = [
  {
    id: 0,
    slug: "HilbertCurves1",
    title: "What is a Hilbert Curve and Why Does It Matter?",
    author: "Ben Gordon",
    publishDate: new Date(2023, 4, 5),
    blurb:
      "An introduction to Hilbert Curves and what makes them interesting and useful.",
    image: Post1Img,
  },
  {
    id: 1,
    slug: "HilbertCurves2",
    title: "Hilbert Curves in 3 Dimensions",
    author: "Ben Gordon",
    publishDate: new Date(2023, 4, 7),
    blurb:
      "Extending our understanding of Hilbert Curves from 2D to 3D using 3D rendering",
    image: Post2Img,
  },
  {
    id: 2,
    slug: "HilbertCurves3",
    title: "A 3D Hilbert Curve Sandbox in Your Browser",
    author: "Ben Gordon",
    publishDate: new Date(2023, 4, 8),
    blurb:
      "An in-browser playground where you can generate and manipulate 3D Hilbert Geometry in realtime",
    image: Post3Img,
  },
  {
    id: 3,
    slug: "HilbertCurves4",
    title: "Hilbert Curves as a Transformation of Binary Reflected Gray Codes",
    author: "Ben Gordon",
    publishDate: new Date(2023, 4, 9),
    blurb:
      "Implementing a new non-recursive algorithm for finding Hilbert Curve coordinates",
    image: Post4Img,
  },
  {
    id: 4,
    slug: "HilbertCurves5",
    title: "Rendering Hilbert Curves in the Browser using ThreeJS",
    author: "Ben Gordon",
    publishDate: null,
    blurb:
      "A step-by-step guide on how I developed the 3D renders used in this blog series",
    image: Post5Img,
  },
];

export default BlogPostMetaDataSet;
