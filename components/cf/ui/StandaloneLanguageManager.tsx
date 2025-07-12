"use client";

import { Icon } from "@/components/ui/icon";
import { type SupportedLocale, autoDetectLanguage } from "@/config/i18n";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

/**
 * 支持的语言配置
 */
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
] as const;

interface StandaloneLanguageManagerProps {
  /** 当前语言 */
  currentLanguage: SupportedLocale;
  /** 语言切换回调 */
  onLanguageChange: (locale: SupportedLocale | "auto") => void;
  /** 是否为自动模式 */
  isAutoMode: boolean;
  /** 检测到的语言 */
  detectedLanguage: SupportedLocale;
}

/**
 * 独立的语言管理组件
 * 不依赖 React Context，可以在单页部署中正常工作
 */
export function StandaloneLanguageManager({
  currentLanguage,
  onLanguageChange,
  isAutoMode,
  detectedLanguage,
}: StandaloneLanguageManagerProps) {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * 获取当前语言信息
   */
  const getCurrentLanguageInfo = () => {
    if (isAutoMode) {
      const detectedLang = languages.find(
        (lang) => lang.code === detectedLanguage,
      );
      return {
        code: detectedLang?.code || "en",
        name: `${detectedLang?.name || "English"} (Auto)`,
        flag: detectedLang?.flag || "🇺🇸",
      };
    }
    const currentLang = languages.find((lang) => lang.code === currentLanguage);
    return {
      code: currentLang?.code || "en",
      name: currentLang?.name || "English",
      flag: currentLang?.flag || "🇺🇸",
    };
  };

  /**
   * 处理语言切换
   */
  const handleLanguageSwitch = (locale: string) => {
    onLanguageChange(locale as SupportedLocale | "auto");
    setIsOpen(false);
  };

  const currentLangInfo = getCurrentLanguageInfo();

  // 获取自动模式的文本
  const getAutoModeText = () => {
    switch (currentLanguage) {
      case "zh":
        return "自动检测";
      case "ja":
        return "自動検出";
      case "ko":
        return "자동 감지";
      case "fr":
        return "Détection automatique";
      case "de":
        return "Automatische Erkennung";
      case "es":
        return "Detección automática";
      default:
        return "Auto Detect";
    }
  };

  return (
    <div className="relative">
      <Button
        variant="bordered"
        size="sm"
        className="min-w-[120px] justify-between"
        onClick={() => setIsOpen(!isOpen)}
        endContent={
          <Icon
            name="chevron-down"
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        }
      >
        <span className="flex items-center gap-2">
          <span>{currentLangInfo?.flag}</span>
          <span className="hidden sm:inline">{currentLangInfo?.name}</span>
          <span className="sm:hidden">
            {currentLangInfo?.code.toUpperCase()}
          </span>
        </span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]">
          <div className="p-2">
            {/* 自动模式选项 */}
            <button
              type="button"
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                isAutoMode
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleLanguageSwitch("auto")}
            >
              <div className="flex items-center gap-2">
                <span>🌐</span>
                <span>{getAutoModeText()}</span>
                {isAutoMode && (
                  <Icon name="check" className="ml-auto text-blue-600" />
                )}
              </div>
            </button>

            <div className="border-t border-gray-200 dark:border-gray-600 my-2" />

            {/* 语言选项 */}
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  !isAutoMode && currentLanguage === lang.code
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => handleLanguageSwitch(lang.code)}
              >
                <div className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                  {!isAutoMode && currentLanguage === lang.code && (
                    <Icon name="check" className="ml-auto text-blue-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 点击外部关闭下拉菜单 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsOpen(false);
            }
          }}
          role="button"
          tabIndex={-1}
          aria-label="关闭语言选择菜单"
        />
      )}
    </div>
  );
}

/**
 * 独立的语言状态管理 Hook
 * 不依赖 React Context，直接管理本地状态
 */
export function useStandaloneLanguage(initialLanguage: SupportedLocale = "en") {
  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLocale>(initialLanguage);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [detectedLanguage, setDetectedLanguage] =
    useState<SupportedLocale>("en");

  /**
   * 初始化语言设置
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const detected = autoDetectLanguage();
      setDetectedLanguage(detected);

      // 检查本地存储的语言模式设置
      const storedMode = localStorage.getItem("language-mode");
      const storedLanguage = localStorage.getItem(
        "selected-language",
      ) as SupportedLocale;

      // 如果是首次访问（没有存储的语言模式），默认启用auto模式
      if (!storedMode) {
        setIsAutoMode(true);
        setCurrentLanguage(detected);
        localStorage.setItem("language-mode", "auto");
        localStorage.setItem("selected-language", detected);
      } else {
        // 使用存储的语言模式设置
        const isAuto = storedMode === "auto";
        setIsAutoMode(isAuto);

        if (isAuto) {
          // 自动模式：使用检测到的语言
          setCurrentLanguage(detected);
          localStorage.setItem("selected-language", detected);
        } else {
          // 手动模式：使用存储的语言
          setCurrentLanguage(storedLanguage || initialLanguage);
        }
      }
    }
  }, [initialLanguage]);

  /**
   * 切换语言函数
   */
  const switchLanguage = (locale: SupportedLocale | "auto") => {
    if (locale === "auto") {
      // 启用自动模式
      setIsAutoMode(true);
      setCurrentLanguage(detectedLanguage);
      localStorage.setItem("language-mode", "auto");
      localStorage.setItem("selected-language", detectedLanguage);
    } else {
      // 禁用自动模式，切换到指定语言
      setIsAutoMode(false);
      setCurrentLanguage(locale);
      localStorage.setItem("language-mode", "manual");
      localStorage.setItem("selected-language", locale);
    }
  };

  return {
    currentLanguage,
    isAutoMode,
    detectedLanguage,
    switchLanguage,
  };
}
