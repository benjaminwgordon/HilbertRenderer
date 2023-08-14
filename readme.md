# HSFC-Renderer

The source code for my personal blog, including the rendering component for my 3D renders of real-time generated Hilbert Cubes using Rust, WebAssembly, and Three.js.

The website is live at [benjaminwgordon.dev](https://benjaminwgordon.dev)

## Build Process

This project relies on an small Rust Crate to build. The crate is bundled into the repository, and has external dependencies on public Rust crates from Crates.io.

Build and serve locally:

```bash
cd www
npm run build:wasm
npm run build
npx serve@latest out
```

Run the development server locally:

```bash
# initialize and build the rust dependencies:
# this step only needs to be done once unless you intend to modify the rust dependencies
cd www
npm run build:wasm

# on all subsequent runs after initializing the rust dependencies,
# only this command needs to be run

# start the development server
npm run dev
```
