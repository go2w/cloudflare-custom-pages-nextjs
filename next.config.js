/** @type {import('next').NextConfig} */
const baseConfig = {
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

const devConfig = {
    ...baseConfig,
};

const prodConfig = {
    ...baseConfig,
    // 生产环境使用 export mode
    output: "export",
    productionBrowserSourceMaps: false,

    webpack: (config, { isServer }) => {
        if (!isServer) {
            // 优化分包策略
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 10000, // 降低最小体积阈值
                maxSize: 244000,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    // 第三方依赖
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `npm.${packageName.replace("@", "")}`;
                        },
                        priority: 20,
                        reuseExistingChunk: true,
                    },
                    // 主页相关组件
                    home: {
                        test: /[\\/]components[\\/]home[\\/]/,
                        name: 'home',
                        minChunks: 1,
                        priority: 15,
                        reuseExistingChunk: true,
                    },
                    // Cloudflare 相关组件
                    cf: {
                        test: /[\\/]components[\\/]cf[\\/]/,
                        name: 'cf',
                        minChunks: 1,
                        priority: 15,
                        reuseExistingChunk: true,
                    },
                    // 其他组件
                    components: {
                        test: /[\\/]components[\\/]/,
                        name: 'components',
                        minChunks: 2,
                        priority: 10,
                        reuseExistingChunk: true,
                    },
                    // 工具函数
                    utils: {
                        test: /[\\/]utils[\\/]/,
                        name: 'utils',
                        minChunks: 2,
                        priority: 9,
                        reuseExistingChunk: true,
                    },
                    // 样式文件
                    styles: {
                        test: /\.(css|scss|sass)$/,
                        name: 'styles',
                        priority: 8,
                        reuseExistingChunk: true,
                    },
                    // 默认分包
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            };

            // 优化输出文件名格式
            config.output.chunkFilename = isServer
                ? "../static/chunks/[name].[contenthash].js"
                : "static/chunks/[name].[contenthash].js";
        }

        return config;
    },
};

module.exports = process.env.NODE_ENV === "production" ? prodConfig : devConfig;
