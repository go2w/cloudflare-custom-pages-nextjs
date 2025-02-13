'use client';

import type { Page, ColorClasses } from '@/config/home';
import { Link } from '@heroui/link';
import { RiArrowRightLine } from '@remixicon/react';

interface CardItemProps {
  page: Page;
  classes: ColorClasses;
}

export const CardItem = ({ page, classes }: CardItemProps) => {
  return (
    <Link
      href={page.path}
      isExternal
      className={`group flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${classes.itemBg} hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${classes.iconBg} shadow-sm`}>
          {page.icon && <page.icon className={`h-4 w-4 ${classes.iconText}`} />}
        </div>
        <span className="text-gray-800 dark:text-gray-200 font-medium">
          {page.title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {page.code && (
          <span className={`text-xs px-2 py-0.5 font-mono rounded-full ${classes.codeBg} ${classes.codeText}`}>
            {page.code}
          </span>
        )}
        <RiArrowRightLine className={`h-4 w-4 ${classes.iconText} opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200`} />
      </div>
    </Link>
  );
}; 