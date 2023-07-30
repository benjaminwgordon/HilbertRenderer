# HSFC-Renderer

The source code for my personal blog, including the rendering component for my 3D renders of real-time generated Hilbert Cubes using Rust, WebAssembly, and Three.js.

The website is live at [benjaminwgordon.dev](https://benjaminwgordon.dev)

## Structure
`src` contains the rust code, which just serves to pass the input parameters between JavaScript and Web Assembly.  The heavy lifting is done by the imported `hilbert_curve_renderer::HilbertCurve` module, which can be found here: [https://github.com/benjaminwgordon/HSFC-generator](https://github.com/benjaminwgordon/HSFC-generator)

`www` contains the React/Next.js code.  The HilbertThreeRenderer.tsx file contains the React Component where each Hilbert Curve is rendered.  This component takes in props that allow it to generate a variety of different Hilbert Curves during runtime, none of the visualizations on the blog are pre-rendered.

