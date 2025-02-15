import {
  AlertCircle,
  AlertTriangle,
  Construction,
  Lock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Split,
  Timer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { blockPages, challengePages, errorPages } from "./routes";

export type ColorScheme = "danger" | "warning" | "primary";

export interface ColorClasses {
  itemBg: string;
  iconBg: string;
  iconText: string;
  codeBg?: string;
  codeText?: string;
  border: string;
}

export interface Page {
  title: string;
  path: string;
  code?: string;
  icon?: LucideIcon;
}

export interface Section {
  title: string;
  description: string;
  icon: LucideIcon;
  color: ColorScheme;
  pages: Page[];
}

export const colorSchemes: Record<ColorScheme, ColorClasses> = {
  danger: {
    itemBg: "hover:bg-red-50 dark:hover:bg-red-900/10",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconText: "text-red-500 dark:text-red-400",
    codeBg: "bg-red-100 dark:bg-red-900/30",
    codeText: "text-red-600 dark:text-red-400",
    border: "border-red-100 dark:border-red-900/30",
  },
  warning: {
    itemBg: "hover:bg-yellow-50 dark:hover:bg-yellow-900/10",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
    iconText: "text-yellow-600 dark:text-yellow-400",
    codeBg: "bg-yellow-100 dark:bg-yellow-900/30",
    codeText: "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-100 dark:border-yellow-900/30",
  },
  primary: {
    itemBg: "hover:bg-blue-50 dark:hover:bg-blue-900/10",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconText: "text-blue-500 dark:text-blue-400",
    codeBg: "bg-blue-100 dark:bg-blue-900/30",
    codeText: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-900/30",
  },
};

export const sections: Section[] = [
  {
    title: "Error Pages",
    description: "Server error pages",
    icon: AlertTriangle,
    color: "danger",
    pages: Object.entries(errorPages).map(([type, config]) => ({
      title: config.title,
      path: `/cf/error/${type}/`,
      code: config.code,
      icon: type === "500s" ? Construction : AlertCircle,
    })),
  },
  {
    title: "Block Pages",
    description: "Access denied pages",
    icon: Lock,
    color: "warning",
    pages: Object.entries(blockPages).map(([type, config]) => ({
      title: config.title,
      path: `/cf/block/${type}/`,
      code: config.code,
      icon: type === "rate-limit" ? Split : ShieldAlert,
    })),
  },
  {
    title: "Challenge Pages",
    description: "Security verification challenges",
    icon: ShieldCheck,
    color: "primary",
    pages: Object.entries(challengePages).map(([type, config]) => ({
      title: config.title,
      path: `/cf/challenge/${type}/`,
      icon: type === "javascript" ? Timer : Shield,
    })),
  },
];
