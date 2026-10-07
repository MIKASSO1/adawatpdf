import type { Metadata } from 'next';
import { Inter, Cairo, Noto_Sans_SC } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale, rtlLocales } from '@/lib/i18n/routing';
import enMessages from '@/messages/en.json';
import arMessages from '@/messages/ar.json';
import frMessages from '@/messages/fr.json';
import esMessages from '@/messages/es.json';
import deMessages from '@/messages/de.json';
import ptMessages from '@/messages/pt.json';
import itMessages from '@/messages/it.json';
import zhMessages from '@/messages/zh.json';

const messages: Record<string, any> = {
  en: enMessages,
  ar: arMessages,
  fr: frMessages,
  es: esMessages,
  de: deMessages,
  pt: ptMessages,
  it: itMessages,
  zh: zhMessages,
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-zh',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Meta' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://adawatpdf.com'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      siteName: 'AdawatPDF',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);

  const direction = rtlLocales.includes(locale) ? 'rtl' : 'ltr';
  const fontClass = locale === 'zh' ? `${notoSansSC.variable}` : '';
  const bodyClass =
    locale === 'ar'
      ? `${cairo.variable} font-cairo`
      : locale === 'zh'
        ? `${notoSansSC.variable} font-zh`
        : `${inter.variable} font-sans`;

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={`${bodyClass} ${fontClass} antialiased`}
        style={
          locale === 'zh'
            ? { fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif" }
            : undefined
        }
      >
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
