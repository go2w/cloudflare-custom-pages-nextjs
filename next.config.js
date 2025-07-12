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

  // 国际化配置
  i18n: {
    // 支持的语言列表
    locales: ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'es'],
    // 默认语言
    defaultLocale: 'en',
    // 禁用Next.js内置的语言检测，使用自定义检测
    localeDetection: false,
  },
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
        chunks: "all",
        minSize: 10000, // 降低最小体积阈值
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
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
