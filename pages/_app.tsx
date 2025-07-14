import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import type { AppProps } from "next/app";
import Head from "next/head";

/**
 * 应用程序主入口组件
 * 配置主题提供者，支持系统偏好自动检测，失败时回退到亮色模式
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers 
      themeProps={{ 
        attribute: "class", 
        defaultTheme: "system", 
        enableSystem: true,
        storageKey: "theme"
      }}
    >
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Providers>
  );
}
