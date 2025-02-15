/** @type {import('next').NextConfig} */
const nextConfig = {
    // 生产环境使用 export mode
    output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
    reactStrictMode: true,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        // see https://nextjs.org/docs/app/api-reference/config/next-config-js/typescript
        ignoreBuildErrors: true,
    },

    compress: true,

    trailingSlash: true,
};

module.exports = nextConfig;