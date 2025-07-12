import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import type { SupportedLocale } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

/**
 * 应用根组件
 * 包装所有页面组件，提供全局状态和配置
 */
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const initialLanguage = (router.locale || "en") as SupportedLocale;

  return (
    <Providers
      themeProps={{ attribute: "class", defaultTheme: "dark" }}
      initialLanguage={initialLanguage}
    >
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Providers>
  );
}
