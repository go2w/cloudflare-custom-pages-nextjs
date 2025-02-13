import { useRouter } from 'next/router';
import { ErrorBox } from '@/components/cf/ErrorBox';
import { errorPages } from '@/config/routes';
import { CFLayout } from '@/components/layout/CFLayout';

export default function ErrorPage() {
  const router = useRouter();
  const { type } = router.query;
  const config = typeof type === 'string' ? errorPages[type] : errorPages['500s'];

  return (
    <CFLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ErrorBox {...config} />
      </div>
    </CFLayout>
  );
} 