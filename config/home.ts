import { blockPageTranslations, challengePageTranslations, errorPageTranslations } from "./i18n";
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
    iconBg: "bg-gradient-to-br from-red-300 to-red-500 dark:from-red-400 dark:to-red-600",
    iconText: "text-white",
    codeBg: "bg-red-50/80 dark:bg-red-900/40",
    codeText: "text-red-600 dark:text-red-400",
    border: "border-red-100 dark:border-red-900/30",
  },
  warning: {
    itemBg: "hover:bg-amber-50/70 dark:hover:bg-amber-900/20 hover:shadow-sm",
    iconBg: "bg-gradient-to-br from-amber-300 to-amber-500 dark:from-amber-400 dark:to-amber-600",
    iconText: "text-white",
    codeBg: "bg-amber-50/80 dark:bg-amber-900/40",
    codeText: "text-amber-600 dark:text-amber-400",
    border: "border-amber-100 dark:border-amber-900/30",
  },
  primary: {
    itemBg: "hover:bg-blue-50/70 dark:hover:bg-blue-900/20 hover:shadow-sm",
    iconBg: "bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-400 dark:to-blue-600",
    iconText: "text-white",
    codeBg: "bg-blue-50/80 dark:bg-blue-900/40",
    codeText: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-900/30",
  },
};

export const sections: Section[] = [
  {
    title: "Error Pages",
    description: "Server error pages",
    icon: "triangle-alert",
    color: "danger",
    pages: Object.entries(errorPages).map(([type, config]) => ({
      title: errorPageTranslations[type].title,
      path: `/cf/error/${type}/`,
      code: config.code,
      icon: config.icon,
    })),
  },
  {
    title: "Block Pages",
    description: "Access denied pages",
    icon: "lock",
    color: "warning",
    pages: Object.entries(blockPages).map(([type, config]) => ({
      title: blockPageTranslations[type].title,
      path: `/cf/block/${type}/`,
      code: config.code,
      icon: config.icon,
    })),
  },
  {
    title: "Challenge Pages",
    description: "Security verification challenges",
    icon: "shield-check",
    color: "primary",
    pages: Object.entries(challengePages).map(([type, config]) => ({
      title: challengePageTranslations[type].title,
      path: `/cf/challenge/${type}/`,
      icon: config.icon,
    })),
  },
];
