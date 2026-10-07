'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { UploadArea } from '@/components/site/UploadArea';
import { ToolCard } from '@/components/site/ToolCard';
import {
  toolsBySlug,
  getRelatedTools,
  type ToolSlug,
} from '@/lib/tools-data';
import { Button } from '@/components/ui/button';

interface ToolPageContentProps {
  slug: ToolSlug;
}

export function ToolPageContent({ slug }: ToolPageContentProps) {
  const t = useTranslations('ToolPage');
  const tTools = useTranslations('Tools');
  const tool = toolsBySlug(slug);

  if (!tool) return null;

  const Icon = tool.icon;
  const relatedTools = getRelatedTools(slug);

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:py-12">
      {/* Breadcrumb / back */}
      <div className="mb-6 sm:mb-8">
        <Button asChild variant="ghost" size="sm" className="gap-2 px-0 text-muted-foreground hover:bg-transparent">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t('backToTools')}
          </Link>
        </Button>
      </div>

      {/* Tool header */}
      <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-16 sm:w-16">
          <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
            {tTools(`${tool.messageKey}.name`)}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base lg:text-lg">
            {tTools(`${tool.messageKey}.description`)}
          </p>
        </div>
      </div>

      {/* Upload area */}
      <UploadArea acceptedFormats={tool.acceptedFormats} />

      {/* FAQ */}
      <section className="mt-10 sm:mt-12">
        <div className="mb-5 flex items-center gap-2 sm:mb-6">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {t('faqTitle')}
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className="rounded-xl border border-border/60 px-4 sm:px-5"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-sm font-medium text-foreground sm:text-base">{faq.q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground sm:text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="mt-10 sm:mt-12">
          <h2 className="mb-5 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
            {t('relatedToolsTitle')}
          </h2>
          <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {relatedTools.map((relatedTool) => (
              <ToolCard key={relatedTool.slug} tool={relatedTool} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
