/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/HilbertRenderer",
  images: {
    unoptimized: true,
  },
  webpack(config, { isServer, dev }) {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    config.output.webassemblyModuleFilename =
      isServer && !dev
        ? "../static/wasm/[modulehash].wasm"
        : "static/wasm/[modulehash].wasm";
    config.optimization.moduleIds = "named";
    return config;
  },
};

module.exports = nextConfig;
