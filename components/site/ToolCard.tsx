'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { ArrowRight } from 'lucide-react';
import type { ToolDefinition } from '@/lib/tools-data';

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  const t = useTranslations('Tools');
  const Icon = tool.icon;

  return (
    <div className="group flex flex-col items-start rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-gray-300">
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#0a66c2] transition-colors group-hover:bg-[#0a66c2] group-hover:text-white"
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold text-gray-900">
        {t(`${tool.messageKey}.name`)}
      </h3>
      <p className="mt-1 flex-1 text-xs leading-relaxed text-gray-500">
        {t(`${tool.messageKey}.description`)}
      </p>
      <Link
        href={`/tools/${tool.slug}`}
        className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#0a66c2] hover:underline"
      >
        {t('useTool')}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
      </Link>
    </div>
  );
}
