import { Hero } from "@/components/home/Hero";
import HomeFooter from "@/components/home/HomeFooter";
import { StandaloneModeSwitch } from "@/components/home/StandaloneModeSwitch";
import { CardSection } from "@/components/home/ui/card-section";
import { Providers } from "@/components/providers";
import { getSections } from "@/config/home";
import {
  type HomePageTranslation,
  type SupportedLocale,
  getHomePageTranslation,
} from "@/config/i18n";
import { useLanguage } from "@/contexts/LanguageContext";
import { Divider } from "@heroui/divider";
import type { GetStaticProps } from "next";
import { useMemo, useState } from "react";

interface HomeProps {
  translations: HomePageTranslation;
  sections: ReturnType<typeof getSections>;
}

export default function Home({ translations, sections }: HomeProps) {
  const { currentLanguage } = useLanguage();
  const currentTranslations = getHomePageTranslation(currentLanguage);
  const [isStandalone, setIsStandalone] = useState(false);

  /**
   * 根据当前语言和模式动态生成sections
   */
  const currentSections = useMemo(() => {
    return getSections(currentLanguage, isStandalone);
  }, [currentLanguage, isStandalone]);

  /**
   * 处理独立模式切换
   * @param standalone - 是否启用独立模式
   */
  const handleModeChange = (standalone: boolean) => {
    setIsStandalone(standalone);
  };

  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50/50 via-blue-50/10 to-blue-50/30 dark:from-gray-900 dark:to-gray-950 dark:via-blue-950/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
          <Hero
            className="animate-fade-down animate-once animate-duration-1000 animate-ease-in-out"
            translations={currentTranslations}
          />

          {/* 独立模式切换开关 */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <StandaloneModeSwitch
              className="animate-fade-down animate-once animate-duration-1000 animate-ease-in-out animate-delay-300"
              onModeChange={handleModeChange}
            />
          </div>

          <Divider
            className="my-8 bg-gray-300/80 dark:bg-gray-700/80 shadow-sm"
            orientation="horizontal"
          />
          <section className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-6 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
              {currentSections.map((section) => (
                <div
                  key={`${section.title}-${isStandalone}`}
                  className="animate-fade-up"
                  style={{
                    animationDelay: `${currentSections.indexOf(section) * 0.15}s`,
                    animationFillMode: "backwards",
                  }}
                >
                  <CardSection {...section} />
                </div>
              ))}
            </div>
          </section>
        </div>
        <HomeFooter />
      </div>
    </Providers>
  );
}

/**
 * 获取静态页面属性，包括多语言翻译数据
 * @param context - Next.js静态生成上下文
 * @returns 页面属性
 */
export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const currentLocale = (locale || "en") as SupportedLocale;
  const translations = getHomePageTranslation(currentLocale);
  const sections = getSections(currentLocale, false); // 默认为标准模式

  return {
    props: {
      translations,
      sections,
    },
  };
};
