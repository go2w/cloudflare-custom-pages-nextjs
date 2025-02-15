import { useRouter } from 'next/router';
import { ErrorBox } from './ErrorBox';
import { BlockBox } from './BlockBox';
import { CaptchaBox } from './CaptchaBox';
import { blockPages, errorPages, challengePages } from '@/config/routes';
import { CFLayout } from '@/components/layout/CFLayout';
import { Providers } from '@/components/providers';
import type { BlockPageConfig, ErrorPageConfig, ChallengePageConfig } from '@/config/routes';
import type { PageType } from '@/config/routes';

type PageConfigMap = {
  error: {
    pages: typeof errorPages;
    defaultType: string;
    component: typeof ErrorBox;
    config: ErrorPageConfig;
  };
  block: {
    pages: typeof blockPages;
    defaultType: string;
    component: typeof BlockBox;
    config: BlockPageConfig;
  };
  challenge: {
    pages: typeof challengePages;
    defaultType: string;
    component: typeof CaptchaBox;
    config: ChallengePageConfig;
  };
};

const pageConfigs: {
  [K in PageType]: Omit<PageConfigMap[K], 'config'>;
} = {
  error: {
    pages: errorPages,
    defaultType: '500s',
    component: ErrorBox
  },
  block: {
    pages: blockPages,
    defaultType: 'ip',
    component: BlockBox
  },
  challenge: {
    pages: challengePages,
    defaultType: 'interactive',
    component: CaptchaBox
  }
};

export function PageWrapper({ pageType }: { pageType: PageType }) {
  const router = useRouter();
  const { type } = router.query;
  const { pages, defaultType, component: Component } = pageConfigs[pageType];
  const config = typeof type === 'string' && type in pages ? pages[type as keyof typeof pages] : pages[defaultType as keyof typeof pages];

  if (router.isFallback) {
    return null;
  }

  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <CFLayout>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Component {...(config as any)} />
        </div>
      </CFLayout>
    </Providers>
  );
}

export function getStaticPaths(pageType: PageType) {
  const { pages } = pageConfigs[pageType];
  return {
    paths: Object.keys(pages).map((type) => ({
      params: { type }
    })),
    fallback: false
  };
}

export function getStaticProps(pageType: PageType, params: { type: string }) {
  const { pages } = pageConfigs[pageType];
  const type = params.type;
  
  if (!(type in pages)) {
    return {
      notFound: true
    };
  }

  return {
    props: {}
  };
} 