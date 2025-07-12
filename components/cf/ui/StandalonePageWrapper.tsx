"use client";

import { BaseLayout } from "@/components/layout/BaseLayout";
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
  PageType,
} from "@/config/routes";
import { type ReactNode, useMemo } from "react";
import { BlockBox } from "../BlockBox";
import { CaptchaBox } from "../CaptchaBox";
import { ErrorBox } from "../ErrorBox";
import Footer from "../Footer";
import {
  StandaloneLanguageManager,
  useStandaloneLanguage,
} from "./StandaloneLanguageManager";

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

interface StandaloneLayoutProps {
  children: ReactNode;
  currentLanguage: SupportedLocale;
  onLanguageChange: (locale: SupportedLocale | "auto") => void;
  isAutoMode: boolean;
  detectedLanguage: SupportedLocale;
}

/**
 * 独立的 Cloudflare 页面布局组件
 * 不依赖 React Context，适用于单页部署
 */
function StandaloneLayout({
  children,
  currentLanguage,
  onLanguageChange,
  isAutoMode,
  detectedLanguage,
}: StandaloneLayoutProps) {
  return (
    <BaseLayout>
      <div className="flex flex-col min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] w-full px-2 sm:px-4 lg:px-6">
        {/* 顶部语言切换器 */}
        <div className="flex justify-end pt-4 pb-2">
          <StandaloneLanguageManager
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            isAutoMode={isAutoMode}
            detectedLanguage={detectedLanguage}
          />
        </div>

        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[720px] lg:max-w-3xl mx-auto">
            <div className="w-full pt-2 pb-4">{children}</div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex justify-center w-full">
          <Footer />
        </div>
      </div>
    </BaseLayout>
  );
}

interface StandalonePageWrapperProps {
  pageType: PageType;
  type?: string;
}

/**
 * 独立的页面包装器组件
 * 不依赖 React Context，直接管理语言状态，适用于 Cloudflare 单页部署
 */
export function StandalonePageWrapper({
  pageType,
  type,
}: StandalonePageWrapperProps) {
  // 使用独立的语言管理 Hook
  const { currentLanguage, isAutoMode, detectedLanguage, switchLanguage } =
    useStandaloneLanguage();

  const { pages, defaultType, component: Component } = pageConfigs[pageType];
  const pageTypeStr = type || defaultType;
  const config =
    pageTypeStr in pages
      ? pages[pageTypeStr as keyof typeof pages]
      : pages[defaultType as keyof typeof pages];

  // 获取当前页面类型的翻译
  const translations = useMemo(() => {
    switch (pageType) {
      case "block":
        return getBlockPageTranslation(pageTypeStr, currentLanguage);
      case "error":
        return getErrorPageTranslation(pageTypeStr, currentLanguage);
      case "challenge":
        return getChallengePageTranslation(pageTypeStr, currentLanguage);
      default:
        return null;
    }
  }, [pageType, pageTypeStr, currentLanguage]);

  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <StandaloneLayout
        currentLanguage={currentLanguage}
        onLanguageChange={switchLanguage}
        isAutoMode={isAutoMode}
        detectedLanguage={detectedLanguage}
      >
        {/* biome-ignore lint/suspicious/noExplicitAny: TypeScript Too HARD */}
        <Component {...(config as any)} translations={translations} />
      </StandaloneLayout>
    </Providers>
  );
}

/**
 * 为静态生成创建路径
 */
export function getStaticPaths(pageType: PageType) {
  const { pages } = pageConfigs[pageType];
  return {
    paths: Object.keys(pages).map((type) => ({
      params: { type },
    })),
    fallback: false,
  };
}

/**
 * 为静态生成获取属性
 */
export function getStaticProps(pageType: PageType, params: { type: string }) {
  const { pages } = pageConfigs[pageType];
  const type = params.type;

  if (!(type in pages)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      type,
    },
  };
}
