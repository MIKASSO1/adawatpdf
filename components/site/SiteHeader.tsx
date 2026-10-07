'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/routing';
import { Menu, X, FileText } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm" style={{ height: '56px' }}>
      <div className="mx-auto flex h-full max-w-[1300px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-base shrink-0"
          style={{ color: '#0a66c2' }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: '#0a66c2' }}
          >
            <FileText className="h-4 w-4" />
          </div>
          <span className="hidden xs:inline">AdawatPDF</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              isActive('/')
                ? 'text-[#0a66c2]'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            {t('tools')}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="hidden xs:inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: '#057642' }}
          >
            100% Free
          </span>
          <LanguageSwitcher />
          <button
            className="flex md:hidden items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="mx-auto max-w-[1300px] px-4 py-3">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
                isActive('/')
                  ? 'text-[#0a66c2] bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              {t('tools')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
