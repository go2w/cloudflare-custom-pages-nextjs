import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Providers } from '@/components/providers';
import Head from 'next/head';
import { siteConfig } from '@/config/site';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Providers>
  );
} 