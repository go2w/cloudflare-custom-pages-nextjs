"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/router";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { fontSans, fontMono } from '@/config/fonts';

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={(path) => router.push(path)}>
      <NextThemesProvider {...themeProps}>
        <main className={`antialiased`}>
          {children}
        </main>
      </NextThemesProvider>
    </HeroUIProvider>
  );
} 