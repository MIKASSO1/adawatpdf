import { Locale } from './routing';

const STORAGE_KEY = 'preferred-language';

const localeToCountries: Record<string, string[]> = {
  ar: ['MA', 'DZ', 'EG', 'SA', 'AE', 'JO', 'LB', 'SY', 'IQ', 'KW', 'QA', 'BH', 'OM', 'YE', 'PS', 'LY', 'TN', 'MR', 'SD', 'SO'],
  fr: ['FR', 'CA', 'BE', 'CH', 'LU', 'MC', 'BF', 'BI', 'BJ', 'CD', 'CF', 'CG', 'CI', 'CM', 'DJ', 'GA', 'GN', 'ML', 'NE', 'RW', 'SN', 'TD', 'TG'],
  de: ['DE', 'AT', 'CH', 'LI', 'LU'],
  es: ['ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR'],
  pt: ['PT', 'BR', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'],
  it: ['IT', 'SM', 'VA', 'CH'],
  zh: ['CN', 'TW', 'HK', 'MO', 'SG'],
};

const browserLangMap: Record<string, Locale> = {
  ar: 'ar', 'ar-sa': 'ar', 'ar-ma': 'ar', 'ar-eg': 'ar', 'ar-dz': 'ar',
  fr: 'fr', 'fr-fr': 'fr', 'fr-ca': 'fr', 'fr-be': 'fr', 'fr-ch': 'fr',
  de: 'de', 'de-de': 'de', 'de-at': 'de', 'de-ch': 'de',
  es: 'es', 'es-es': 'es', 'es-mx': 'es', 'es-ar': 'es', 'es-co': 'es',
  pt: 'pt', 'pt-pt': 'pt', 'pt-br': 'pt',
  it: 'it', 'it-it': 'it', 'it-ch': 'it',
  zh: 'zh', 'zh-cn': 'zh', 'zh-tw': 'zh', 'zh-hk': 'zh', 'zh-sg': 'zh',
};

function countryToLocale(country: string): Locale | null {
  for (const [locale, countries] of Object.entries(localeToCountries)) {
    if (countries.includes(country)) {
      return locale as Locale;
    }
  }
  return null;
}

function browserLangToLocale(lang: string): Locale | null {
  const normalized = lang.toLowerCase();
  if (browserLangMap[normalized]) return browserLangMap[normalized];
  const base = normalized.split('-')[0];
  if (browserLangMap[base]) return browserLangMap[base];
  return null;
}

function timezoneToLocale(timezone: string): Locale | null {
  const tzMap: Record<string, Locale> = {
    'Africa/Casablanca': 'ar', 'Africa/Algiers': 'ar', 'Africa/Cairo': 'ar',
    'Africa/Tunis': 'ar', 'Africa/Tripoli': 'ar', 'Africa/Khartoum': 'ar',
    'Africa/Djibouti': 'ar', 'Africa/Mogadishu': 'ar', 'Africa/Nouakchott': 'ar',
    'Asia/Riyadh': 'ar', 'Asia/Dubai': 'ar', 'Asia/Qatar': 'ar', 'Asia/Kuwait': 'ar',
    'Asia/Bahrain': 'ar', 'Asia/Muscat': 'ar', 'Asia/Amman': 'ar', 'Asia/Beirut': 'ar',
    'Asia/Damascus': 'ar', 'Asia/Baghdad': 'ar', 'Asia/Aden': 'ar', 'Asia/Gaza': 'ar',
    'Asia/Hebron': 'ar', 'Asia/Jerusalem': 'ar',
    'Europe/Paris': 'fr', 'America/Montreal': 'fr', 'America/Toronto': 'fr',
    'America/Vancouver': 'fr', 'Europe/Brussels': 'fr', 'Europe/Luxembourg': 'fr',
    'Europe/Berlin': 'de', 'Europe/Vienna': 'de', 'Europe/Zurich': 'de',
    'Europe/Madrid': 'es', 'America/Mexico_City': 'es', 'America/Buenos_Aires': 'es',
    'America/Bogota': 'es', 'America/Lima': 'es', 'America/Santiago': 'es',
    'Europe/Lisbon': 'pt', 'America/Sao_Paulo': 'pt', 'America/Bahia': 'pt',
    'Europe/Rome': 'it', 'Europe/Vatican': 'it', 'Europe/San_Marino': 'it',
    'Asia/Shanghai': 'zh', 'Asia/Taipei': 'zh', 'Asia/Hong_Kong': 'zh',
    'Asia/Macau': 'zh', 'Asia/Singapore': 'zh',
  };
  return tzMap[timezone] || null;
}

export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored as Locale;
  } catch {
    // localStorage not available
  }
  return null;
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // localStorage not available
  }
}

export function hasStoredLocale(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export function detectLocale(): Locale {
  // 1. Check browser language(s)
  if (typeof navigator !== 'undefined') {
    const languages = navigator.languages || [navigator.language];
    for (const lang of languages) {
      const detected = browserLangToLocale(lang);
      if (detected) {
        console.log('[AdawatPDF] Language detected from browser:', lang, '->', detected);
        return detected;
      }
    }
  }

  // 2. Check timezone
  if (typeof Intl !== 'undefined') {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone) {
        const detected = timezoneToLocale(timezone);
        if (detected) {
          console.log('[AdawatPDF] Language detected from timezone:', timezone, '->', detected);
          return detected;
        }
      }
    } catch {
      // Intl not available
    }
  }

  // 3. Default to English
  console.log('[AdawatPDF] No language detected, defaulting to English');
  return 'en';
}
