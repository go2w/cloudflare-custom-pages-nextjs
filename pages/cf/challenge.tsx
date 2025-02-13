import { useRouter } from 'next/router';
import { CaptchaBox } from '@/components/cf/CaptchaBox';
import { challengePages } from '@/config/routes';
import { CFLayout } from '@/components/layout/CFLayout';
import { Providers } from '@/components/providers';

export default function ChallengePage() {
  const router = useRouter();
  const { type } = router.query;
  const config = typeof type === 'string' ? challengePages[type] : challengePages['interactive'];

  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <CFLayout>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CaptchaBox {...config} />
        </div>
      </CFLayout>
    </Providers>
  );
} 