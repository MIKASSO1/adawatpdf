import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'ar', 'fr', 'es', 'de', 'pt', 'it', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);

export const localeLabels: Record<Locale, { label: string; flag: string }> = {
  en: { label: 'English', flag: '🇬🇧' },
  ar: { label: 'العربية', flag: '🇸🇦' },
  fr: { label: 'Français', flag: '🇫🇷' },
  es: { label: 'Español', flag: '🇪🇸' },
  de: { label: 'Deutsch', flag: '🇩🇪' },
  pt: { label: 'Português', flag: '🇵🇹' },
  it: { label: 'Italiano', flag: '🇮🇹' },
  zh: { label: '简体中文', flag: '🇨🇳' },
};

export const rtlLocales: Locale[] = ['ar'];
