'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { tools, toolsByCategory, type ToolCategory } from '@/lib/tools-data';
import { ToolCard } from '@/components/site/ToolCard';
import { LeftSidebar } from '@/components/site/LeftSidebar';
import { RightSidebar } from '@/components/site/RightSidebar';
import { ShieldCheck, Zap, Heart, ArrowRight, Menu, X } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export function HomeFeed() {
  const t = useTranslations('Hero');
  const tTools = useTranslations('Tools');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'all'>('all');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') return tools;
    return toolsByCategory(activeCategory);
  }, [activeCategory]);

  return (
    <div className="li-bg min-h-screen">
      <div className="mx-auto max-w-[1300px] px-3 py-5 sm:px-5 sm:py-6">
        <div
          className="grid gap-4 sm:gap-5"
          style={{ gridTemplateColumns: '1fr' }}
        >
          {/* Desktop: 3 columns */}
          <div className="hidden lg:grid" style={{ gridTemplateColumns: '280px 1fr 300px', gap: '24px' }}>
            {/* Left sidebar */}
            <aside className="sticky" style={{ top: '72px' }}>
              <LeftSidebar
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </aside>

            {/* Center content */}
            <main className="space-y-4">
              <CenterContent
                t={t}
                tTools={tTools}
                filteredTools={filteredTools}
                activeCategory={activeCategory}
              />
            </main>

            {/* Right sidebar */}
            <aside className="sticky" style={{ top: '72px' }}>
              <RightSidebar />
            </aside>
          </div>

          {/* Tablet: 2 columns (left + center) */}
          <div className="hidden md:grid lg:hidden" style={{ gridTemplateColumns: '260px 1fr', gap: '16px' }}>
            <aside className="sticky" style={{ top: '72px' }}>
              <LeftSidebar
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </aside>
            <main className="space-y-4">
              <CenterContent
                t={t}
                tTools={tTools}
                filteredTools={filteredTools}
                activeCategory={activeCategory}
              />
            </main>
          </div>

          {/* Mobile: 1 column + drawer */}
          <div className="md:hidden space-y-4">
            {/* Mobile sidebar trigger */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Menu className="h-4.5 w-4.5 text-[#0a66c2]" />
                {tTools('sectionTitle')}
              </button>
              <span className="text-xs font-semibold text-[#057642]">100% Free</span>
            </div>
            <CenterContent
              t={t}
              tTools={tTools}
              filteredTools={filteredTools}
              activeCategory={activeCategory}
            />
          </div>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-[300px] overflow-y-auto p-4">
          <SheetHeader className="mb-4">
            <SheetTitle className="flex items-center gap-2">
              <span className="text-[#0a66c2]">AdawatPDF</span>
            </SheetTitle>
          </SheetHeader>
          <LeftSidebar
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setMobileSidebarOpen(false);
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

interface CenterContentProps {
  t: any;
  tTools: any;
  filteredTools: typeof tools;
  activeCategory: ToolCategory | 'all';
}

function CenterContent({ t, tTools, filteredTools }: CenterContentProps) {
  return (
    <>
      {/* Hero card */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
            <ShieldCheck className="h-3.5 w-3.5 text-[#057642]" />
            {t('badge')}
          </div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {t('title')}
          </h1>
          <p className="mt-2 max-w-lg text-sm text-gray-500 sm:text-base">
            {t('subtitle')}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 sm:text-sm">
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-[#0a66c2]" />
              <span>Fast & Secure</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-[#0a66c2]" />
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#0a66c2]" />
              <span>No Signup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tools header */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-gray-900 sm:text-lg">
            {tTools('sectionTitle')}
          </h2>
          <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
            {tTools('sectionSubtitle')}
          </p>
        </div>
        <span className="text-xs font-semibold text-gray-400 shrink-0">
          {filteredTools.length} {tTools('useTool') === 'Use Tool' ? 'tools' : tTools('useTool') === 'استخدام' ? 'أداة' : ''}
        </span>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {/* CTA card */}
      <div
        className="rounded-lg p-5 text-center sm:p-6"
        style={{ backgroundColor: '#0a66c2' }}
      >
        <h2 className="text-base font-bold text-white sm:text-lg">{t('title')}</h2>
        <p className="mx-auto mt-1.5 max-w-md text-xs text-white/80 sm:text-sm">{t('subtitle')}</p>
        <Link
          href="/tools/merge-pdf"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2 text-sm font-semibold text-[#0a66c2] transition-colors hover:bg-gray-50"
        >
          {t('cta')}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </div>
    </>
  );
}
