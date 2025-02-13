import { useRouter } from 'next/router';
import { BlockBox } from '@/components/cf/BlockBox';
import { blockPages } from '@/config/routes';
import { CFLayout } from '@/components/layout/CFLayout';
import { Providers } from '@/components/providers';

export default function BlockPage() {
  const router = useRouter();
  const { type } = router.query;
  const config = typeof type === 'string' ? blockPages[type] : blockPages['ip'];

  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <CFLayout>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <BlockBox {...config} />
        </div>
      </CFLayout>
    </Providers>
  );
} 