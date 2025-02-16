import { ThemeSwitch } from "@/components/theme-switch";
import { getSchemeClasses } from "@/components/ui/color-scheme";
import type { ColorScheme } from "@/config/home";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { clsx as cx } from "clsx";
import type { ReactNode } from "react";

interface CFCardProps {
  title: string;
  subtitle?: ReactNode;
  message: string;
  icon: ReactNode;
  watermark?: ReactNode;
  headerClassName?: string;
  iconClassName?: string;
  scheme?: ColorScheme;
  children?: ReactNode;
  footer?: ReactNode;
}

export const CFCard = ({
  title,
  subtitle,
  message,
  icon,
  watermark,
  headerClassName = "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900",
  iconClassName,
  scheme = "primary",
  children,
  footer,
}: CFCardProps) => {
  const schemeClasses = getSchemeClasses(scheme);
  const finalIconClassName =
    iconClassName ||
    cx("bg-gradient-to-br", schemeClasses.gradient, schemeClasses.iconBg);

  const getIconGlowClass = () => {
    if (scheme === "primary") return "bg-blue-500/20";
    if (scheme === "danger") return "bg-red-500/20";
    if (scheme === "warning") return "bg-amber-500/20";
    return "bg-default-500/20";
  };

  return (
    <Card
      suppressHydrationWarning
      className="max-w-xl w-full mx-auto overflow-hidden bg-white dark:bg-gray-900 shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-800 m-4 rounded-xl"
    >
      <CardHeader className={cx("relative p-6 rounded-t-xl", headerClassName)}>
        {watermark && (
          <div className="absolute right-0 top-0 h-24 w-24 opacity-20">
            {watermark}
          </div>
        )}

        <div className="absolute right-6 top-6">
          <ThemeSwitch />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="relative">
              <div
                className={cx(
                  "absolute inset-0 animate-pulse rounded-full blur-xl",
                  getIconGlowClass(),
                )}
              />
              <div
                className={cx("relative rounded-full p-3", finalIconClassName)}
              >
                {icon}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {subtitle &&
              (typeof subtitle === "string" ? (
                <span className="text-sm font-medium text-default-600 dark:text-default-400">
                  {subtitle}
                </span>
              ) : (
                subtitle
              ))}
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
        </div>
      </CardHeader>

      <CardBody suppressHydrationWarning className="space-y-6 p-6">
        <p
          suppressHydrationWarning
          className="text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          {message}
        </p>
        {children}
      </CardBody>

      {footer && (
        <CardFooter
          suppressHydrationWarning
          className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 px-6 py-4"
        >
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
