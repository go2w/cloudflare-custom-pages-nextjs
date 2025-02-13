import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { ReactNode } from "react";
import { ThemeSwitch } from "@/components/theme-switch";

interface CFCardProps {
  title: string;
  subtitle?: ReactNode;
  message: string;
  icon: ReactNode;
  watermark?: ReactNode;
  headerClassName?: string;
  iconClassName?: string;
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
  iconClassName = "from-default-500 to-default-600",
  children,
  footer,
}: CFCardProps) => {
  return (
    <Card suppressHydrationWarning className="max-w-xl w-full mx-auto overflow-hidden bg-white dark:bg-gray-900 shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-800 m-4 rounded-xl">
      <CardHeader className={`relative ${headerClassName} p-6`}>
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
              <div className={`absolute inset-0 animate-pulse bg-${iconClassName.split(" ")[1]}/20 rounded-full blur-xl`} />
              <div className={`relative rounded-full bg-gradient-to-br ${iconClassName} p-3`}>
                {icon}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {subtitle && (
              typeof subtitle === 'string' ? (
                <span className="text-sm font-medium text-default-600 dark:text-default-400">
                  {subtitle}
                </span>
              ) : subtitle
            )}
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
        </div>
      </CardHeader>

      <CardBody suppressHydrationWarning className="space-y-6 p-6">
        <p suppressHydrationWarning className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {message}
        </p>
        {children}
      </CardBody>

      {footer && (
        <CardFooter suppressHydrationWarning className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 px-6 py-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}; 