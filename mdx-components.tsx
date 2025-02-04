import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="mt-8 mb-4 text-4xl font-bold" {...props} />,
    h2: (props) => <h2 className="mt-6 mb-3 text-3xl font-semibold" {...props} />,
    h3: (props) => <h3 className="mt-5 mb-2 text-2xl font-medium" {...props} />,
    p: (props) => <p className="my-4 text-lg leading-relaxed" {...props} />,
    a: (props) => <Link className="text-blue-600 hover:underline" {...props} />,
    ul: (props) => <ul className="my-4 list-inside list-disc" {...props} />,
    ol: (props) => <ol className="my-4 list-inside list-decimal" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-4 border-l-4 border-gray-300 pl-4 text-gray-600 italic"
        {...props}
      />
    ),
    code: (props) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm" {...props} />
    ),
    pre: (props) => <pre className="my-4 overflow-x-auto rounded-md bg-gray-100 p-4" {...props} />,
    ...components,
  };
}
