/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});

// Deployed as the MAC-I2 org root site at https://mac-i2.github.io/ (no base path).
const basePath = '';

const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'docs',
  basePath,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  images: {
    unoptimized: true,
    domains: [
      // 'res.cloudinary.com',
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = withMDX(nextConfig);
