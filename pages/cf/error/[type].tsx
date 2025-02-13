import { PageWrapper, getStaticPaths as getStaticPathsHelper, getStaticProps as getStaticPropsHelper } from '@/components/cf/PageWrapper';

export default function ErrorPage() {
  return <PageWrapper pageType="error" />;
}

export async function getStaticPaths() {
  return getStaticPathsHelper('error');
}

export const getStaticProps = ({ params }: { params: { type: string } }) => getStaticPropsHelper('error', params); 