"use client";

import { HeroUIProvider } from "@heroui/react";
import type { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { SupportedLocale } from "@/config/i18n";
// import { fontSans, fontMono } from '@/config/fonts';

export interface ProvidersProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
  /** 初始语言设置 */
  initialLanguage?: SupportedLocale;
}

/**
 * 应用提供者组件
 * 包装所有全局状态提供者，包括主题、语言等
 */
export function Providers({ children, themeProps, initialLanguage }: ProvidersProps) {
  const router = useRouter();

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <HeroUIProvider navigate={(path) => router.push(path)}>
        <NextThemesProvider {...themeProps}>
          <main className={"antialiased"}>{children}</main>
        </NextThemesProvider>
      </HeroUIProvider>
    </LanguageProvider>
  );
}
