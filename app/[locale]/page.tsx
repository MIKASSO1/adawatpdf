import { setRequestLocale } from 'next-intl/server';
import { SiteHeader } from '@/components/site/SiteHeader';
import { HomeFeed } from '@/components/home/HomeFeed';
import type { Locale } from '@/lib/i18n/routing';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HomeFeed />
      </main>
    </div>
  );
}
