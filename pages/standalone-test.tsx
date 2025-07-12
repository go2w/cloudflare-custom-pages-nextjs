import { StandalonePageWrapper } from "@/components/cf/ui/StandalonePageWrapper";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { Providers } from "@/components/providers";
import { Button } from "@heroui/react";
import Link from "next/link";

/**
 * 独立模式测试页面
 * 用于测试不依赖 React Context 的多语言功能
 */
export default function StandaloneTestPage() {
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <BaseLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                独立模式测试页面
              </h1>

              <div className="space-y-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                    测试说明
                  </h2>
                  <p className="text-blue-800 dark:text-blue-200 mb-4">
                    这个页面用于测试独立模式的多语言功能。独立模式不依赖 React
                    Context， 适用于 Cloudflare 单页部署场景。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                      标准模式示例
                    </h3>
                    <p className="text-green-800 dark:text-green-200 mb-3">
                      使用 React Context 的传统方式
                    </p>
                    <Link href="/cf/error/500s">
                      <Button color="success" variant="bordered">
                        查看标准模式
                      </Button>
                    </Link>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                      独立模式示例
                    </h3>
                    <p className="text-purple-800 dark:text-purple-200 mb-3">
                      不依赖 Context 的独立实现
                    </p>
                    <Link href="/cf-standalone/error/500s">
                      <Button color="secondary" variant="bordered">
                        查看独立模式
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                    更多测试页面
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Link href="/cf-standalone/error/500s">
                      <Button size="sm" variant="flat">
                        错误 500
                      </Button>
                    </Link>
                    <Link href="/cf-standalone/error/1000s">
                      <Button size="sm" variant="flat">
                        错误 1000
                      </Button>
                    </Link>
                    <Link href="/cf-standalone/block/ip">
                      <Button size="sm" variant="flat">
                        IP 封禁
                      </Button>
                    </Link>
                    <Link href="/cf-standalone/block/waf">
                      <Button size="sm" variant="flat">
                        WAF 拦截
                      </Button>
                    </Link>
                    <Link href="/cf-standalone/block/rate-limit">
                      <Button size="sm" variant="flat">
                        频率限制
                      </Button>
                    </Link>
                    <Link href="/cf-standalone/challenge/interactive">
                      <Button size="sm" variant="flat">
                        交互验证
                      </Button>
                    </Link>
                    <Link href="/cf-standalone/challenge/js">
                      <Button size="sm" variant="flat">
                        JS 验证
                      </Button>
                    </Link>
                    <Link href="/cf-standalone/challenge/managed">
                      <Button size="sm" variant="flat">
                        托管验证
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    部署说明
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                      <strong>Cloudflare 部署：</strong> 使用{" "}
                      <code>/cf-standalone/</code> 路径下的页面
                    </p>
                    <p>
                      <strong>完整应用：</strong> 使用 <code>/cf/</code>{" "}
                      路径下的页面
                    </p>
                    <p>
                      <strong>独立模式优势：</strong>{" "}
                      不依赖全局状态，每个页面都是完全独立的
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseLayout>
    </Providers>
  );
}
