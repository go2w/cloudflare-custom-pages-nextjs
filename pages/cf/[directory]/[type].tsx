import {
  PageWrapper,
  getStaticPaths as getStaticPathsHelper,
  getStaticProps as getStaticPropsHelper,
} from "@/components/cf/ui/PageWrapper";
import { StandalonePageWrapper } from "@/components/cf/ui/StandalonePageWrapper";

import { type PageType, directories, types } from "@/config/routes";
import { useRouter } from "next/router";

interface DynamicPageProps {
  pageType: PageType;
  type?: string;
}

/**
 * 动态页面组件
 * 支持两种模式：
 * 1. 标准模式：使用 React Context 进行语言管理（适用于完整应用）
 * 2. 独立模式：不依赖 Context，直接内置语言管理（适用于 Cloudflare 单页部署）
 *
 * 通过 URL 查询参数 `standalone=true` 来启用独立模式
 */
export default function DynamicPage({ pageType, type }: DynamicPageProps) {
  const router = useRouter();
  const { standalone } = router.query;
  const isStandalone = standalone === "true";

  // 如果启用独立模式，使用 StandalonePageWrapper
  if (isStandalone) {
    return <StandalonePageWrapper pageType={pageType} type={type} />;
  }

  // 否则使用标准的 PageWrapper
  return <PageWrapper pageType={pageType} />;
}

export async function getStaticPaths() {
  const paths = directories.flatMap((directory) =>
    types[directory].map((type) => ({
      params: { directory, type },
    })),
  );

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = ({
  params,
}: { params: { directory: PageType; type: string } }) => {
  const validDirectories: PageType[] = directories;
  if (!validDirectories.includes(params.directory)) {
    return {
      notFound: true,
    };
  }

  const result = getStaticPropsHelper(params.directory, { type: params.type });

  return {
    ...result,
    props: {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      ...((result as any).props || {}),
      pageType: params.directory,
      type: params.type,
    },
  };
};
