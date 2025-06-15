import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import { clsx as cx } from "clsx";

export function Hero({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "text-center mb-6 sm:mb-7 md:mb-8 mt-8 sm:mt-10 md:mt-12 lg:mt-16 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8",
        className
      )}>
      <div className='inline-flex justify-center p-3 sm:p-3.5 md:p-4 bg-white/90 dark:bg-gray-800/90 rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-sm'>
        <div className='flex h-14 w-14 sm:h-16 sm:w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/20 shadow-inner'>
          <Icon
            name='shield'
            className='h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 text-blue-600 dark:text-blue-400'
          />
        </div>
      </div>
      <div className='max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6'>
        <h1 className='text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent tracking-tight'>
          {siteConfig.name}
        </h1>
        <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed'>
          {siteConfig.description}
        </p>
      </div>
    </div>
  );
}
