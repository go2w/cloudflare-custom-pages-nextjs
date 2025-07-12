import { StandalonePageWrapper } from "@/components/cf/ui/StandalonePageWrapper";
import { type PageType, directories, types } from "@/config/routes";
import type { GetStaticPaths, GetStaticProps } from "next";

interface StandalonePageProps {
  pageType: PageType;
  type: string;
}

/**
 * Cloudflare 独立部署页面
 * 专为 Cloudflare 单页部署设计，不依赖 React Context
 * 直接内置多语言功能，确保在单页环境中正常工作
 */
export default function CloudflareStandalonePage({
  pageType,
  type,
}: StandalonePageProps) {
  return <StandalonePageWrapper pageType={pageType} type={type} />;
}

/**
 * 生成静态路径
 */
export const getStaticPaths: GetStaticPaths<{
  directory: string;
  type: string;
}> = async () => {
  const paths = directories.flatMap((directory) =>
    types[directory].map((type) => ({
      params: { directory, type },
    })),
  );

  return {
    paths,
    fallback: false,
  };
};

/**
 * 获取静态属性
 */
export const getStaticProps: GetStaticProps<
  StandalonePageProps,
  { directory: string; type: string }
> = ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { directory, type } = params;
  const validDirectories: PageType[] = directories;

  // 验证目录是否有效
  if (!validDirectories.includes(directory as PageType)) {
    return {
      notFound: true,
    };
  }

  const pageType = directory as PageType;

  // 验证类型是否有效
  const validTypes = types[pageType];
  if (!validTypes.includes(type)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageType,
      type,
    },
  };
};
