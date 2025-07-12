import type { ReactNode } from "react";
import Footer from "../cf/Footer";
import { LanguageSwitcher } from "../ui/language-switcher";
import { BaseLayout } from "./BaseLayout";

interface CFLayoutProps {
  children: ReactNode;
}

/**
 * Cloudflare页面布局组件
 * 提供统一的页面布局结构，包含语言切换功能
 * @param children - 子组件内容
 */
export const CFLayout = ({ children }: CFLayoutProps) => {
  return (
    <BaseLayout>
      <div className="flex flex-col min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-3rem)] w-full px-2 sm:px-4 lg:px-6">
        {/* 顶部语言切换器 */}
        <div className="flex justify-end pt-4 pb-2">
          <LanguageSwitcher />
        </div>

        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="w-full max-w-[360px] sm:max-w-[480px] md:max-w-[720px] lg:max-w-3xl mx-auto">
            <div className="w-full pt-2 pb-4">{children}</div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex justify-center w-full">
          <Footer />
        </div>
      </div>
    </BaseLayout>
  );
};

export default CFLayout;
