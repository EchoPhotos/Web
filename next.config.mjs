import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365 * 20, // 20 year in seconds
  },
  rewrites: () => {
    return [];
  },
};

const withMDX = createMDX({
  remarkPlugins: [remarkGfm],
  rehypePlugins: [],
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
