'use client';

import { useTranslations } from 'next-intl';
import { Layers, ArrowLeftRight, Edit3, ShieldCheck, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ToolCategory } from '@/lib/tools-data';

interface LeftSidebarProps {
  onSelectCategory?: (cat: ToolCategory | 'all') => void;
  activeCategory?: ToolCategory | 'all';
}

export function LeftSidebar({ onSelectCategory, activeCategory = 'all' }: LeftSidebarProps) {
  const t = useTranslations('Sidebar');

  const categories = [
    { key: 'all' as const, label: t('allTools') },
    { key: 'organize' as ToolCategory, icon: Layers, label: t('organize') },
    { key: 'convert' as ToolCategory, icon: ArrowLeftRight, label: t('convert') },
    { key: 'edit' as ToolCategory, icon: Edit3, label: t('edit') },
    { key: 'ocr' as ToolCategory, icon: ShieldCheck, label: t('security') },
  ];

  return (
    <div className="flex flex-col gap-4 bg-[#f4f2ee] p-4 rounded-2xl">
      {/* Welcome Card */}
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-[#0a66c2]" />
          <h2 className="text-base font-bold">{t('welcome')}</h2>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{t('welcomeDesc')}</p>
      </div>

      {/* Categories - Vertical Pills Centered */}
      <div className="rounded-xl bg-[#f4f2ee] p-2">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">CATEGORIES</h3>
        <div className="flex flex-col items-center gap-3">
          {categories.map((cat) => {
            const Icon = (cat as any).icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => onSelectCategory?.(cat.key as any)}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold min-w-[180px] shadow-sm transition-all',
                  isActive
                   ? 'bg-[#0a66c2] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}