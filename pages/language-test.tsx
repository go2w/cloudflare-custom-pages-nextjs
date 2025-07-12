import { BaseLayout } from "@/components/layout/BaseLayout";
import {
  type SupportedLocale,
  autoDetectLanguage,
  detectBestLanguage,
  getBrowserLanguages,
} from "@/config/i18n";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

/**
 * 语言检测测试页面
 * 用于演示和测试自动语言检测功能
 */
export default function LanguageTestPage() {
  const { currentLanguage, isAutoMode, detectedLanguage, switchLanguage } =
    useLanguage();
  const [browserLanguages, setBrowserLanguages] = useState<readonly string[]>(
    [],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const languages = getBrowserLanguages();
      setBrowserLanguages(languages);
    }
  }, []);

  const testLanguageDetection = (testLanguages: string[]) => {
    const result = detectBestLanguage(testLanguages);
    return result;
  };

  const switchToAuto = () => {
    switchLanguage("auto");
  };

  const switchToManual = (locale: SupportedLocale) => {
    switchLanguage(locale);
  };

  return (
    <BaseLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              语言检测测试页面
            </h1>

            {/* 当前状态 */}
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                当前状态
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    当前语言:
                  </span>
                  <span className="ml-2 text-blue-600 dark:text-blue-400">
                    {currentLanguage}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    检测到的语言:
                  </span>
                  <span className="ml-2 text-green-600 dark:text-green-400">
                    {detectedLanguage}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    自动模式:
                  </span>
                  <span
                    className={`ml-2 ${isAutoMode ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {isAutoMode ? "启用" : "禁用"}
                  </span>
                </div>
              </div>
            </div>

            {/* 浏览器语言信息 */}
            <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                浏览器语言偏好
              </h2>
              <div className="space-y-2">
                {browserLanguages.map((lang) => (
                  <div
                    key={lang}
                    className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {lang}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      映射到: {testLanguageDetection([lang])}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 测试用例 */}
            <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
                语言映射测试
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["zh-TW", "繁体中文"],
                  ["zh-HK", "香港中文"],
                  ["pt-BR", "巴西葡萄牙语"],
                  ["es-MX", "墨西哥西班牙语"],
                  ["ru-RU", "俄语"],
                  ["it-IT", "意大利语"],
                  ["th-TH", "泰语"],
                  ["vi-VN", "越南语"],
                ].map(([code, name]) => (
                  <div
                    key={code}
                    className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {name} ({code})
                    </span>
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      → {testLanguageDetection([code])}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex flex-wrap gap-4">
              <Button
                color={isAutoMode ? "success" : "default"}
                variant={isAutoMode ? "solid" : "bordered"}
                onClick={switchToAuto}
                disabled={isAutoMode}
              >
                启用自动模式
              </Button>

              {(
                ["en", "zh", "ja", "ko", "fr", "de", "es"] as SupportedLocale[]
              ).map((locale) => (
                <Button
                  key={locale}
                  color={
                    currentLanguage === locale && !isAutoMode
                      ? "primary"
                      : "default"
                  }
                  variant={
                    currentLanguage === locale && !isAutoMode
                      ? "solid"
                      : "bordered"
                  }
                  onClick={() => switchToManual(locale)}
                  size="sm"
                >
                  {locale.toUpperCase()}
                </Button>
              ))}
            </div>

            {/* 说明文档 */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                功能说明
              </h2>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>自动模式:</strong>{" "}
                  根据浏览器语言偏好自动选择最合适的支持语言。
                </p>
                <p>
                  <strong>语言映射:</strong>{" "}
                  不支持的语言会映射到最相近的支持语言，如繁体中文→简体中文，葡萄牙语→西班牙语。
                </p>
                <p>
                  <strong>优先级:</strong>{" "}
                  按照浏览器语言偏好列表的顺序进行匹配，优先匹配精确语言代码，然后匹配语言前缀。
                </p>
                <p>
                  <strong>持久化:</strong>{" "}
                  语言模式选择会保存在localStorage中，页面刷新后保持状态。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
