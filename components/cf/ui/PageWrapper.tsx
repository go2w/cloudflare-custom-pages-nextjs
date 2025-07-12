import { CFLayout } from "@/components/layout/CFLayout";
import { Providers } from "@/components/providers";
import {
  type SupportedLocale,
  getBlockPageTranslation,
  getChallengePageTranslation,
  getErrorPageTranslation,
} from "@/config/i18n";
import { blockPages, challengePages, errorPages } from "@/config/routes";
import type {
  BlockPageConfig,
  ChallengePageConfig,
  ErrorPageConfig,
} from "@/config/routes";
import type { PageType } from "@/config/routes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { BlockBox } from "../BlockBox";
import { CaptchaBox } from "../CaptchaBox";
import { ErrorBox } from "../ErrorBox";

type PageConfigMap = {
  error: {
    pages: typeof errorPages;
    defaultType: string;
    component: typeof ErrorBox;
    config: ErrorPageConfig;
  };
  block: {
    pages: typeof blockPages;
    defaultType: string;
    component: typeof BlockBox;
    config: BlockPageConfig;
  };
  challenge: {
    pages: typeof challengePages;
    defaultType: string;
    component: typeof CaptchaBox;
    config: ChallengePageConfig;
  };
};

const pageConfigs: {
  [K in PageType]: Omit<PageConfigMap[K], "config">;
} = {
  error: {
    pages: errorPages,
    defaultType: "500s",
    component: ErrorBox,
  },
  block: {
    pages: blockPages,
    defaultType: "ip",
    component: BlockBox,
  },
  challenge: {
    pages: challengePages,
    defaultType: "interactive",
    component: CaptchaBox,
  },
};

export function PageWrapper({ pageType }: { pageType: PageType }) {
  const router = useRouter();
  const { type } = router.query;
  const { currentLanguage } = useLanguage();
  const locale = currentLanguage;
  const { pages, defaultType, component: Component } = pageConfigs[pageType];
  const config =
    typeof type === "string" && type in pages
      ? pages[type as keyof typeof pages]
      : pages[defaultType as keyof typeof pages];

  // 获取当前页面类型的翻译
  const translations = useMemo(() => {
    const pageTypeStr = typeof type === "string" ? type : defaultType;

    switch (pageType) {
      case "block":
        return getBlockPageTranslation(pageTypeStr, locale);
      case "error":
        return getErrorPageTranslation(pageTypeStr, locale);
      case "challenge":
        return getChallengePageTranslation(pageTypeStr, locale);
      default:
        return null;
    }
  }, [pageType, type, defaultType, locale]);

  if (router.isFallback) {
    return null;
  }

  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <CFLayout>
        {/* biome-ignore lint/suspicious/noExplicitAny: TypeScript Too HARD */}
        <Component {...(config as any)} translations={translations} />
      </CFLayout>
    </Providers>
  );
}

export function getStaticPaths(pageType: PageType) {
  const { pages } = pageConfigs[pageType];
  return {
    paths: Object.keys(pages).map((type) => ({
      params: { type },
    })),
    fallback: false,
  };
}

export function getStaticProps(pageType: PageType, params: { type: string }) {
  const { pages } = pageConfigs[pageType];
  const type = params.type;

  if (!(type in pages)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}
