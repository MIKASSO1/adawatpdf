'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { routing, type Locale } from '@/lib/i18n/routing';
import { getStoredLocale, setStoredLocale, detectLocale } from '@/lib/i18n/detect';

export default function RootPage() {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // 1. Check if user has a saved preference (manual override)
    const stored = getStoredLocale();
    let targetLocale: Locale;

    if (stored) {
      // User previously chose a language - respect it
      console.log('[AdawatPDF] Using saved language preference:', stored);
      targetLocale = stored;
    } else {
      // 2. Auto-detect from browser/timezone
      targetLocale = detectLocale();
      // Save the detected language so we don't re-detect on every visit
      setStoredLocale(targetLocale);
    }

    // Redirect to the detected locale
    router.replace(`/${targetLocale}`);
  }, [router]);

  // Minimal loading state while detecting
  if (redirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}
