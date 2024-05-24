/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  experimental: {
    mdxRs: false,
  },
  rewrites: () => {
    return [
      {
        source: '/:locale/invites/:path*',
        destination: '/:locale/invite/:path*',
      },
    ]
  }
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
