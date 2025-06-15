import { Icon } from "@/components/ui/icon";
import type { Section } from "@/config/home";
import { colorSchemes } from "@/config/home";
import { clsx as cx } from "clsx";
import { CardItem } from "./card-item";

interface CardSectionProps extends Section {}

export const CardSection = ({
  title,
  description,
  icon,
  color,
  pages,
}: CardSectionProps) => {
  const classes = colorSchemes[color];

  return (
    <div
      className={cx(
        "group relative rounded-2xl sm:rounded-3xl border bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full",
        classes.border,
      )}
    >
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/50 dark:border-gray-800/50 pointer-events-none" />
      <div className="p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col h-full">
        <div className="flex items-start sm:items-center gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
          <div
            className={cx(
              "flex-shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-lg sm:rounded-xl shadow-lg",
              classes.iconBg,
            )}
          >
            <Icon
              name={icon}
              className={cx(
                "h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7",
                classes.iconText,
              )}
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1 sm:mb-2">
              {title}
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex-grow grid gap-1.5 sm:gap-2 lg:gap-3 grid-cols-1">
          {pages.map((page) => (
            <CardItem key={page.path} page={page} classes={classes} />
          ))}
        </div>
      </div>
    </div>
  );
};
