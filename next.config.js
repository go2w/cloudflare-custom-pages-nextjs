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

    // 生产环境路径映射有问题，特殊处理一下
    // see https://nextjs.org/docs/pages/api-reference/config/next-config-js/exportPathMap
    ...(process.env.NODE_ENV === 'production' ? {
        exportPathMap: async function () {
            const paths = {
                '/': { page: '/' },
            };

            ['500s', '1000s'].forEach((type) => {
                paths[`/cf/error/${type}`] = {
                    page: '/cf/error/[type]',
                    query: { type },
                };
            });

            ['ip', 'waf', 'rate-limit'].forEach((type) => {
                paths[`/cf/block/${type}`] = {
                    page: '/cf/block/[type]',
                    query: { type },
                };
            });

            ['interactive', 'managed', 'country', 'javascript'].forEach((type) => {
                paths[`/cf/challenge/${type}`] = {
                    page: '/cf/challenge/[type]',
                    query: { type },
                };
            });

            return paths;
        }
    } : {}),
};

module.exports = nextConfig;