import { Hero } from "@/components/home/Hero";
import HomeFooter from "@/components/home/HomeFooter";
import { CardSection } from "@/components/home/ui/card-section";
import { Providers } from "@/components/providers";
import { sections } from "@/config/home";
import React from "react";

export default function Home() {
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <div className='flex min-h-screen flex-col bg-gradient-to-br from-gray-50/50 to-blue-50/50 dark:from-gray-900 dark:to-gray-950 dark:via-blue-950/10'>
        <main className='flex-1'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 pt-12 sm:pt-14 lg:pt-16'>
            <section className='flex flex-col gap-8 sm:gap-10 lg:gap-16'>
              <Hero />
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 pt-8 sm:pt-12 lg:pt-16'>
                {sections.map((section) => (
                  <CardSection
                    key={section.title}
                    {...section}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
        <HomeFooter />
      </div>
    </Providers>
  );
}
