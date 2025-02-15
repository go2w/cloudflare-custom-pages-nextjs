import { PageWrapper, getStaticPaths as getStaticPathsHelper, getStaticProps as getStaticPropsHelper } from '@/components/cf/PageWrapper';

import { directories, types, type PageType } from '@/config/routes';

interface DynamicPageProps {
  pageType: PageType;
}

export default function DynamicPage({ pageType }: DynamicPageProps) {
  return <PageWrapper pageType={pageType} />;
}

export async function getStaticPaths() {

  const paths = directories.flatMap(directory => 
    types[directory].map(type => ({
      params: { directory, type }
    }))
  );

  return {
    paths,
    fallback: false
  };
}

export const getStaticProps = ({ params }: { params: { directory: PageType; type: string } }) => {
  const validDirectories: PageType[] = directories;
  if (!validDirectories.includes(params.directory)) {
    return {
      notFound: true 
    };
  }

  const result = getStaticPropsHelper(params.directory, { type: params.type });
  
  return {
    ...result,
    props: {
      ...((result as any).props || {}),
      pageType: params.directory
    }
  };
}; 