import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PageShell } from '@/components/site/PageShell';
import { ToolPageContent } from '@/components/tools/ToolPageContent';
import { toolsBySlug, type ToolSlug } from '@/lib/tools-data';
import { routing, type Locale } from '@/lib/i18n/routing';

interface ToolPageProps {
  params: { locale: Locale; tool: string };
}

export function generateStaticParams() {
  const slugs = [
    'pdf-to-word',
    'word-to-pdf',
    'jpg-to-pdf',
    'pdf-to-jpg',
    'pdf-to-excel',
    'pdf-to-text',
    'merge-pdf',
    'split-pdf',
    'delete-pages',
    'rotate-pdf',
    'compress-pdf',
    'arabic-ocr',
  ];
  return routing.locales.flatMap((locale) =>
    slugs.map((tool) => ({ locale, tool }))
  );
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const tool = toolsBySlug(params.tool);
  if (!tool) return {};

  const t = await getTranslations({
    locale: params.locale,
    namespace: 'Tools',
  });

  const name = t(`${tool.messageKey}.name`);
  const description = t(`${tool.messageKey}.description`);

  return {
    title: `${name} - AdawatPDF`,
    description,
    openGraph: {
      title: `${name} - AdawatPDF`,
      description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  setRequestLocale(params.locale);

  const tool = toolsBySlug(params.tool);
  if (!tool) notFound();

  return (
    <PageShell>
      <ToolPageContent slug={tool.slug as ToolSlug} />
    </PageShell>
  );
}
