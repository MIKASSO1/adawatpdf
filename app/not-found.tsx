import Link from 'next/link';
import { defaultLocale } from '@/lib/i18n/routing';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-5xl sm:text-6xl font-bold text-primary">404</h1>
      <p className="text-base sm:text-xl text-muted-foreground">Page not found</p>
      <Link
        href={`/${defaultLocale}`}
        className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Go Home
      </Link>
    </div>
  );
}
