'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { Lightbulb, Info, FileText } from 'lucide-react';

export function RightSidebar() {
  const t = useTranslations('Sidebar');
  const tFooter = useTranslations('Footer');

  const tips = [
    { num: 1, title: t('tip1Title'), desc: t('tip1Desc') },
    { num: 2, title: t('tip2Title'), desc: t('tip2Desc') },
    { num: 3, title: t('tip3Title'), desc: t('tip3Desc') },
  ];

  const links = [
    { href: '/about', label: tFooter('about') },
    { href: '/privacy', label: tFooter('privacy') },
    { href: '/terms', label: tFooter('terms') },
    { href: '/contact', label: tFooter('contact') },
  ];

  const year = new Date().getFullYear();

  return (
    <div className="space-y-3">
      {/* Ad placeholder */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div
          className="flex flex-col items-center justify-center rounded-lg bg-gray-100 text-center"
          style={{ minHeight: '250px' }}
        >
          <p className="text-xs font-medium text-gray-400">Advertisement</p>
          <p className="mt-1 text-xs text-gray-300">300 × 250</p>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
          <Lightbulb className="h-3.5 w-3.5" />
          {t('tipsTitle')}
        </h3>
        <div className="space-y-3">
          {tips.map((tip) => (
            <div key={tip.num} className="flex gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0a66c2] text-xs font-bold text-white">
                {tip.num}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">{tip.title}</p>
                <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
          <Info className="h-3.5 w-3.5" />
          {tFooter('about')}
        </h3>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-gray-600 transition-colors hover:text-[#0a66c2]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <FileText className="h-3.5 w-3.5" />
            <span>© {year} AdawatPDF</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">{tFooter('rights')}</p>
        </div>
      </div>
    </div>
  );
}
