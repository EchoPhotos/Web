/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  experimental: {
    mdxRs: false,
  },
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
