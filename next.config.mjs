/** @type {import('next').NextConfig} */
import nextMDX from "@next/mdx";

import removeImports from "next-remove-imports";


const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: false,
  experimental: {
    esmExternals: "loose",
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});


export {
  nextConfig
}

// module.exports = removeImports({});

// module.exports = nextConfig;

export default withMDX(nextConfig);
