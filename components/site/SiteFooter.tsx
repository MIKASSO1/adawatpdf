'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { FileText } from 'lucide-react';
import { tools } from '@/lib/tools-data';

export function SiteFooter() {
  const t = useTranslations('Footer');
  const tTools = useTranslations('Tools');
  const year = new Date().getFullYear();

  const aboutLinks = [
    { href: '/about', label: t('about') },
    { href: '/privacy', label: t('privacy') },
    { href: '/terms', label: t('terms') },
    { href: '/contact', label: t('contact') },
  ];

  const popularTools = tools.slice(0, 6);

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 space-y-3 sm:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-primary"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <span>AdawatPDF</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Tools */}
          <div className="hidden sm:block">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t('tools')}
            </h3>
            <ul className="space-y-2.5">
              {popularTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {tTools(`${tool.messageKey}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t('about')}
            </h3>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t('privacy')}
            </h3>
            <p className="text-sm text-muted-foreground">
              © {year} AdawatPDF
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
