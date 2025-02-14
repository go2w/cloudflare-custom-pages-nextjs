'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { RiBookOpenLine, RiGithubFill, RiHeartFill } from '@remixicon/react';
import { siteConfig } from "@/config/site";
import print from "@/utils/console";

import { ThemeSwitch } from "@/components/theme-switch";

interface FooterLinkProps {
  href: string;
  key: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface FooterSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const MotionDiv = motion.div as React.ComponentType<
  MotionProps & React.HTMLAttributes<HTMLDivElement>
>;

const FooterLink = ({ href, icon: Icon, key }: FooterLinkProps) => (
  <MotionDiv
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="p-2 rounded-full hover:bg-default-100 transition-colors"
  >
    <a
      href={href}
      aria-label={`Link ${key}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="w-5 h-5 text-default-500 hover:text-primary-500 transition-colors" />
    </a>
  </MotionDiv>
);

const FooterSection: React.FC<FooterSectionProps> = ({
  children,
  className,
  delay = 0
}) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </MotionDiv>
);

const HomeFooter = () => {
  const links = [
    { href: siteConfig.links.docs, icon: RiBookOpenLine },
    { href: siteConfig.links.github, icon: RiGithubFill },
  ];

  print();

  return (
    <footer className="w-full py-8 border-t bg-gradient-to-b from-background/60 to-background/80 backdrop-blur-lg">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <FooterSection className="flex flex-col items-center md:items-start space-y-2">
            <div className="text-sm text-default-500">
              Copyright © {new Date().getFullYear()} Alice39s
            </div>
          </FooterSection>

          <FooterSection className="flex justify-center items-center gap-6" delay={0.2}>
            {links.map((link, index) => (
              <FooterLink key={index} {...link} />
            ))}
            <ThemeSwitch />
          </FooterSection>

          <FooterSection className="flex justify-center md:justify-end" delay={0.4}>
            <div className="text-xs text-default-400 flex items-center gap-2">
              Made with <RiHeartFill className="w-4 h-4 text-red-500" /> by Alice39s
            </div>
          </FooterSection>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;