import { PageWrapper, getStaticPaths as getStaticPathsHelper, getStaticProps as getStaticPropsHelper } from '@/components/cf/PageWrapper';

export default function ChallengePage() {
  return <PageWrapper pageType="challenge" />;
}

export async function getStaticPaths() {
  return getStaticPathsHelper('challenge');
}

export const getStaticProps = ({ params }: { params: { type: string } }) => getStaticPropsHelper('challenge', params); 