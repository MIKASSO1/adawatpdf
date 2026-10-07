import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
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

export default getRequestConfig(async () => {
  let locale: string = routing.defaultLocale;

  try {
    const { headers } = await import('next/headers');
    const headerList = headers();
    const xLocale = headerList.get('x-next-intl-locale');
    if (xLocale && routing.locales.includes(xLocale as any)) {
      locale = xLocale;
    }
  } catch {
    // headers() not available during static generation
  }

  return {
    locale,
    messages: messages[locale] || messages[routing.defaultLocale],
  };
});
