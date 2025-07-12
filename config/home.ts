import {
  type SupportedLocale,
  getBlockPageTranslation,
  getChallengePageTranslation,
  getErrorPageTranslation,
  getHomePageTranslation,
} from "./i18n";
import type { IconKey } from "./icons";
import { blockPages, challengePages, errorPages } from "./routes";

export type ColorScheme = "danger" | "warning" | "primary";

export interface ColorClasses {
  itemBg: string;
  iconBg: string;
  iconText: string;
  codeBg: string;
  codeText: string;
  border: string;
}

export interface Page {
  title: string;
  path: string;
  code?: string;
  icon?: IconKey;
}

export interface Section {
  title: string;
  description: string;
  icon: IconKey;
  color: ColorScheme;
  pages: Page[];
}

export const colorSchemes: Record<ColorScheme, ColorClasses> = {
  danger: {
    itemBg: "hover:bg-red-50/70 dark:hover:bg-red-900/20 hover:shadow-sm",
    iconBg:
      "bg-gradient-to-br from-red-300 to-red-500 dark:from-red-400 dark:to-red-600",
    iconText: "text-white",
    codeBg: "bg-red-50/80 dark:bg-red-900/40",
    codeText: "text-red-600 dark:text-red-400",
    border: "border-red-100 dark:border-red-900/30",
  },
  warning: {
    itemBg: "hover:bg-amber-50/70 dark:hover:bg-amber-900/20 hover:shadow-sm",
    iconBg:
      "bg-gradient-to-br from-amber-300 to-amber-500 dark:from-amber-400 dark:to-amber-600",
    iconText: "text-white",
    codeBg: "bg-amber-50/80 dark:bg-amber-900/40",
    codeText: "text-amber-600 dark:text-amber-400",
    border: "border-amber-100 dark:border-amber-900/30",
  },
  primary: {
    itemBg: "hover:bg-blue-50/70 dark:hover:bg-blue-900/20 hover:shadow-sm",
    iconBg:
      "bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-400 dark:to-blue-600",
    iconText: "text-white",
    codeBg: "bg-blue-50/80 dark:bg-blue-900/40",
    codeText: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-900/30",
  },
};

/**
 * 获取指定语言和模式的sections配置
 * @param locale - 语言代码
 * @param isStandalone - 是否为独立模式
 * @returns 对应语言和模式的sections配置
 */
export function getSections(
  locale: SupportedLocale,
  isStandalone = false,
): Section[] {
  const homeTranslations = getHomePageTranslation(locale);
  const pathPrefix = isStandalone ? "/cf-standalone" : "/cf";
  const titleSuffix = isStandalone
    ? ` ${homeTranslations.standaloneSuffix}`
    : "";

  return [
    {
      title: homeTranslations.errorPagesTitle,
      description: homeTranslations.errorPagesDescription,
      icon: "triangle-alert",
      color: "danger",
      pages: Object.entries(errorPages).map(([type, config]) => ({
        title: `${getErrorPageTranslation(type, locale).title}${titleSuffix}`,
        path: `${pathPrefix}/error/${type}/`,
        code: config.code,
        icon: config.icon,
      })),
    },
    {
      title: homeTranslations.blockPagesTitle,
      description: homeTranslations.blockPagesDescription,
      icon: "lock",
      color: "warning",
      pages: Object.entries(blockPages).map(([type, config]) => ({
        title: `${getBlockPageTranslation(type, locale).title}${titleSuffix}`,
        path: `${pathPrefix}/block/${type}/`,
        code: config.code,
        icon: config.icon,
      })),
    },
    {
      title: homeTranslations.challengePagesTitle,
      description: homeTranslations.challengePagesDescription,
      icon: "shield-check",
      color: "primary",
      pages: Object.entries(challengePages).map(([type, config]) => ({
        title: `${getChallengePageTranslation(type, locale).title}${titleSuffix}`,
        path: `${pathPrefix}/challenge/${type}/`,
        icon: config.icon,
      })),
    },
  ];
}
