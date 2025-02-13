import { PageWrapper, getStaticPaths as getStaticPathsHelper, getStaticProps as getStaticPropsHelper } from '@/components/cf/PageWrapper';

export default function BlockPage() {
  return <PageWrapper pageType="block" />;
}

export async function getStaticPaths() {
  return getStaticPathsHelper('block');
}

export const getStaticProps = ({ params }: { params: { type: string } }) => getStaticPropsHelper('block', params); 