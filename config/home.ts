import { RiShieldLine, RiAlertLine, RiShieldCheckLine, RiLockLine, RiErrorWarningLine, RiShieldFlashLine, RiTimeLine } from '@remixicon/react';
import { blockPages, errorPages, challengePages } from './routes';

export type ColorScheme = 'danger' | 'warning' | 'primary';

export interface ColorClasses {
  border: string;
  shadow: string;
  iconBg: string;
  iconText: string;
  itemBg: string;
  codeBg: string;
  codeText: string;
}

export interface Page {
  title: string;
  path: string;
  code?: string;
  icon?: any;
}

export interface Section {
  title: string;
  description: string;
  icon: any;
  color: ColorScheme;
  pages: Page[];
}

export const colorSchemes: Record<ColorScheme, ColorClasses> = {
  danger: {
    border: 'border-danger/20 dark:border-danger/20',
    shadow: 'shadow-danger/5 hover:shadow-danger/10 hover:border-danger/30',
    iconBg: 'bg-danger/10 dark:bg-danger/10',
    iconText: 'text-danger dark:text-danger',
    itemBg: 'bg-danger/5 hover:bg-danger/10 dark:bg-danger/10 dark:hover:bg-danger/20',
    codeBg: 'bg-danger/20 dark:bg-danger/20',
    codeText: 'text-danger dark:text-danger',
  },
  warning: {
    border: 'border-warning/20 dark:border-warning/20',
    shadow: 'shadow-warning/5 hover:shadow-warning/10 hover:border-warning/30',
    iconBg: 'bg-warning/10 dark:bg-warning/10',
    iconText: 'text-warning dark:text-warning',
    itemBg: 'bg-warning/5 hover:bg-warning/10 dark:bg-warning/10 dark:hover:bg-warning/20',
    codeBg: 'bg-warning/20 dark:bg-warning/20',
    codeText: 'text-warning dark:text-warning',
  },
  primary: {
    border: 'border-primary/20 dark:border-primary/20',
    shadow: 'shadow-primary/5 hover:shadow-primary/10 hover:border-primary/30',
    iconBg: 'bg-primary/10 dark:bg-primary/10',
    iconText: 'text-primary dark:text-primary',
    itemBg: 'bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20',
    codeBg: 'bg-primary/20 dark:bg-primary/20',
    codeText: 'text-primary dark:text-primary',
  },
};

export const sections: Section[] = [
  {
    title: 'Error Pages',
    description: 'Server error pages',
    icon: RiAlertLine,
    color: 'danger',
    pages: Object.entries(errorPages).map(([type, config]) => ({
      title: config.title,
      path: `/cf/error/${type}/`,
      code: config.code,
      icon: RiErrorWarningLine
    })),
  },
  {
    title: 'Block Pages',
    description: 'Access denied pages',
    icon: RiLockLine,
    color: 'warning',
    pages: Object.entries(blockPages).map(([type, config]) => ({
      title: config.title,
      path: `/cf/block/${type}/`,
      code: config.code,
      icon: RiShieldFlashLine
    })),
  },
  {
    title: 'Challenge Pages',
    description: 'Security verification challenges',
    icon: RiShieldCheckLine,
    color: 'primary',
    pages: Object.entries(challengePages).map(([type, config]) => ({
      title: config.title,
      path: `/cf/challenge/${type}/`,
      icon: type === 'javascript' ? RiTimeLine : RiShieldLine
    })),
  },
]; 