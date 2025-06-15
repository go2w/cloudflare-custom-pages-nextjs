"use client";

import { ThemeSwitch } from "@/components/theme-switch";
import { Icon } from "@/components/ui/icon";
import type { IconKey } from "@/config/icons";
import { siteConfig } from "@/config/site";
import print from "@/utils/console";
import { memo } from "react";
import { clsx } from "clsx";
import type { FC } from "react";

interface FooterLinkProps {
  href: string;
  icon: IconKey;
  label: string;
}

const FooterLink = memo<FooterLinkProps>(({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    target='_blank'
    rel='noopener noreferrer'
    className='p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-default-100 dark:hover:bg-white/5'>
    <Icon
      name={icon}
      className='w-5 h-5 text-default-600 hover:text-primary-600 dark:text-default-400 dark:hover:text-primary-400 transition-colors'
    />
  </a>
));

FooterLink.displayName = "FooterLink";

const HomeFooter: FC<{ className?: string }> = ({ className }) => {
  const links: FooterLinkProps[] = [
    { href: siteConfig.links.docs, icon: "book-open", label: "Documentation" },
    { href: siteConfig.links.github, icon: "github", label: "GitHub Repository" },
  ];

  print();

  return (
    <footer
      className={clsx(
        "w-full py-6 border-t border-default-200 dark:border-default-800 bg-default-50 dark:bg-black",
        className
      )}>
      <div className='container mx-auto max-w-7xl px-6'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='text-sm text-default-500 dark:text-default-400 font-medium order-3 sm:order-1'>
            © {new Date().getFullYear()} Alice39s
          </div>

          <div className='flex items-center gap-4 order-1 sm:order-2'>
            <div className='flex items-center gap-1 p-1 rounded-lg bg-default-100 dark:bg-white/10 border border-default-200 dark:border-white/20'>
              {links.map((link) => (
                <FooterLink
                  key={link.href}
                  {...link}
                />
              ))}
            </div>
            <div className='w-px h-6 bg-default-300 dark:bg-default-700' />
            <ThemeSwitch />
          </div>

          <div className='flex items-center gap-2 text-sm text-default-400 dark:text-default-500 font-medium order-2 sm:order-3'>
            <span>Made with</span>
            <Icon
              name='heart'
              className='w-4 h-4 text-red-500'
            />
            <span>by Alice39s</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
