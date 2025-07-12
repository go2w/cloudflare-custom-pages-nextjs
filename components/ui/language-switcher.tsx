"use client";

import type { SupportedLocale } from "@/config/i18n";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@heroui/react";
import { useState } from "react";
import { Icon } from "./icon";

/**
 * 支持的语言配置
 */
const languages = [
  { code: "auto", name: "Auto", flag: "🌐", isAuto: true },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

/**
 * 语言切换组件
 * 提供下拉菜单让用户选择不同的语言，支持客户端语言切换而无需URL跳转
 */
export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, isAutoMode, detectedLanguage, switchLanguage } =
    useLanguage();

  // 确定显示的语言信息
  const getCurrentLanguageInfo = () => {
    if (isAutoMode) {
      const detectedLang = languages.find(
        (lang) => lang.code === detectedLanguage,
      );
      return {
        code: "auto",
        name: `Auto (${detectedLang?.name || "English"})`,
        flag: "🌐",
        isAuto: true,
      };
    }
    return (
      languages.find((lang) => lang.code === currentLanguage) || languages[1]
    ); // languages[1] 是 'en'
  };

  const currentLanguageInfo = getCurrentLanguageInfo();

  /**
   * 处理语言切换
   * @param locale - 目标语言代码
   */
  const handleLanguageSwitch = (locale: string) => {
    switchLanguage(locale as SupportedLocale | "auto");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{currentLanguageInfo.flag}</span>
        <span className="hidden sm:inline">{currentLanguageInfo.name}</span>
        <Icon
          name={isOpen ? "triangle-alert" : "chevron-left-right-ellipsis"}
          className="w-4 h-4 transition-transform"
        />
      </Button>

      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsOpen(false);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="关闭语言选择菜单"
          />

          {/* 下拉菜单 */}
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[160px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
            {languages.map((language) => {
              const isSelected =
                language.code === "auto"
                  ? isAutoMode
                  : language.code === currentLanguage && !isAutoMode;

              return (
                <button
                  key={language.code}
                  type="button"
                  className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => handleLanguageSwitch(language.code)}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{language.name}</span>
                    {language.code === "auto" && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        检测到:{" "}
                        {languages.find((l) => l.code === detectedLanguage)
                          ?.name || "English"}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <Icon name="check-circle" className="w-4 h-4 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageSwitcher;
