import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ToolNotFound() {
  const t = useTranslations('ToolPage');

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 px-4 py-24 text-center">
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <h2 className="text-xl font-semibold text-foreground">
        {t('notFound')}
      </h2>
      <p className="text-muted-foreground">{t('notFoundDesc')}</p>
      <Button asChild className="mt-4 gap-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t('backToTools')}
        </Link>
      </Button>
    </div>
  );
}
