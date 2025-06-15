"use client";

import { Icon } from "@/components/ui/icon";
import type { ColorClasses, Page } from "@/config/home";
import { Link } from "@heroui/link";
import { clsx as cx } from "clsx";

interface CardItemProps {
  page: Page;
  classes: ColorClasses;
}

export const CardItem = ({ page, classes }: CardItemProps) => {
  return (
    <Link
      href={page.path}
      isExternal
      className={cx(
        "group flex items-center justify-between py-2 sm:py-2.5 md:py-3 px-3 sm:px-3.5 md:px-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]",
        classes.itemBg,
      )}
    >
      <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
        <div
          className={cx(
            "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg shadow-sm",
            classes.iconBg,
          )}
        >
          {page.icon && (
            <Icon
              name={page.icon}
              className={cx("h-3.5 w-3.5 sm:h-4 sm:w-4", classes.iconText)}
            />
          )}
        </div>
        <span className="text-sm sm:text-base text-gray-800 dark:text-gray-200 font-medium">
          {page.title}
        </span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {page.code && (
          <span
            className={cx(
              "text-xs px-1.5 sm:px-2 py-0.5 font-mono rounded-full",
              classes.codeBg,
              classes.codeText,
            )}
          >
            {page.code}
          </span>
        )}
        <Icon
          name="arrow-right"
          className={cx(
            "h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out",
            classes.iconText,
          )}
        />
      </div>
    </Link>
  );
};
